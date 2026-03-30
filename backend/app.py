# ============================================================
# LOCAL OFFLINE VERSION — misinformation-guard/backend/app.py
# Runs on localhost:8000 with no internet needed
# Gemini is optional — falls back to ML-only if no API key
# ============================================================

import os
import io
import torch
import torch.nn.functional as F
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    pipeline
)
from PIL import Image
from datetime import datetime
from contextlib import asynccontextmanager

# ── Config ──
# Change these paths to match your folder structure
TEXT_MODEL_PATH = "../models/model_v2/model_v2"       # local path
GEMINI_API_KEY  = ""  # optional
USE_LOCAL_LLM   = os.environ.get("USE_LOCAL_LLM", "false").lower() == "true"

# ── Globals ──
tokenizer     = None
text_model    = None
deepfake_pipe = None
gemini_model  = None
ollama_ready  = False
device        = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global tokenizer, text_model, deepfake_pipe
    global gemini_model, ollama_ready, device

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"\n{'='*50}")
    print(f"🛡️  Misinformation Guard — Local Server")
    print(f"{'='*50}")
    print(f"Device: {device}")

    # ---- Text model (fully offline) ----
    print(f"\n⏳ Loading text model from: {TEXT_MODEL_PATH}")
    tokenizer  = AutoTokenizer.from_pretrained(TEXT_MODEL_PATH)
    text_model = AutoModelForSequenceClassification.from_pretrained(
        TEXT_MODEL_PATH
    )
    text_model = text_model.to(device).eval()
    print("✅ Text model ready (offline)")

    # ---- Deepfake detector ----
    # First run downloads and caches — subsequent runs are offline
    print("\n⏳ Loading deepfake detector...")
    print("   (First run downloads ~350MB — cached after that)")
    try:
        deepfake_pipe = pipeline(
            "image-classification",
            model="dima806/deepfake_vs_real_image_detection",
            device=0 if torch.cuda.is_available() else -1
        )
        print("✅ Deepfake detector ready")
    except Exception as e:
        print(f"⚠️  Deepfake detector failed: {e}")
        print("   Image analysis will be unavailable")

    # ---- Reasoning layer ----
    if USE_LOCAL_LLM:
        # Ollama — fully offline LLM
        try:
            import requests
            r = requests.get("http://localhost:11434/api/tags", timeout=3)
            if r.status_code == 200:
                ollama_ready = True
                print("✅ Ollama (local LLM) ready — fully offline!")
            else:
                print("⚠️  Ollama not running — start with: ollama serve")
        except:
            print("⚠️  Ollama not found — install from ollama.ai")

    elif GEMINI_API_KEY:
        try:
            import google.generativeai as genai
            genai.configure(api_key=GEMINI_API_KEY)
            gemini_model = genai.GenerativeModel("gemini-2.5-flash")
            test = gemini_model.generate_content("Reply: OK")
            print(f"✅ Gemini connected (needs internet): {test.text.strip()}")
        except Exception as e:
            print(f"⚠️  Gemini failed: {e}")
            print("   Running without reasoning layer")
    else:
        print("ℹ️  No reasoning layer — set GEMINI_API_KEY or USE_LOCAL_LLM=true")

    print(f"\n🚀 Server ready at http://localhost:8000")
    print(f"   Docs: http://localhost:8000/docs\n")

    yield
    print("\n👋 Shutting down...")


# ── App ──
app = FastAPI(
    title       = "Misinformation Guard — Local",
    description = "Offline-capable misinformation detection API",
    version     = "2.0.0-local",
    lifespan    = lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins     = ["*"],
    allow_credentials = False,
    allow_methods     = ["*"],
    allow_headers     = ["*"],
)


# ── Inference ──
def _predict_text(statement: str) -> dict:
    inputs = tokenizer(
        statement, return_tensors="pt",
        truncation=True, max_length=128, padding=True
    ).to(device)
    with torch.no_grad():
        probs = F.softmax(
            text_model(**inputs).logits, dim=1
        )[0].cpu().numpy()
    pred = int(probs.argmax())
    return {
        "label"     : "FAKE" if pred == 0 else "REAL",
        "confidence": round(float(probs[pred]) * 100, 2),
        "prob_fake" : round(float(probs[0]) * 100, 2),
        "prob_real" : round(float(probs[1]) * 100, 2),
    }

def _predict_image(img: Image.Image) -> Optional[dict]:
    if deepfake_pipe is None:
        return None
    results = deepfake_pipe(img.convert("RGB"))
    scores  = {r["label"].upper(): round(r["score"]*100, 2) for r in results}
    top     = max(results, key=lambda x: x["score"])
    label   = "FAKE" if "FAKE" in top["label"].upper() else "REAL"
    return {
        "label"     : label,
        "confidence": round(top["score"]*100, 2),
        "prob_fake" : scores.get("FAKE", 0),
        "prob_real" : scores.get("REAL", 0),
    }

async def _reason(statement: str, text_result: dict,
            image_result: dict = None) -> str:

    img_section = ""
    if image_result:
        img_section = f"\nIMAGE: {image_result['label']} ({image_result['confidence']}%)"

    prompt = f"""Fact-check this claim.

CLAIM: "{statement}"
ML MODEL: {text_result['label']} ({text_result['confidence']}%)
{img_section}

Reply in this format:
VERDICT: [LIKELY FAKE / LIKELY REAL / UNCERTAIN]
CONFIDENCE: [HIGH / MEDIUM / LOW]
REASONING: [2-3 sentences]
RED FLAGS: [2-3 points or "None detected"]
HOW TO VERIFY: [1 sentence]
SOURCES: [2-3 sources]"""

    # Try Ollama first (offline)
    if ollama_ready:
        import asyncio
        def invoke_ollama():
            import requests as req
            r = req.post(
                "http://localhost:11434/api/generate",
                json={"model" : "phi3", "prompt": prompt, "stream": False},
                timeout=60
            )
            return r.json().get("response", "")
        try:
            return await asyncio.to_thread(invoke_ollama)
        except Exception as e:
            return f"Ollama error: {e}"

    # Try Gemini (needs internet)
    elif gemini_model:
        try:
            res = await gemini_model.generate_content_async(prompt)
            return res.text.strip()
        except Exception as e:
            return f"Gemini error: {e}"

    # No LLM available — return ML-only result
    else:
        verdict = "LIKELY FAKE" if text_result['label'] == "FAKE" else "LIKELY REAL"
        return f"""VERDICT: {verdict}
CONFIDENCE: {"MEDIUM" if text_result['confidence'] < 70 else "HIGH"}
REASONING: ML model classified this as {text_result['label']} with {text_result['confidence']}% confidence. No LLM reasoning available — set GEMINI_API_KEY or install Ollama for full analysis.
RED FLAGS: None detected by ML model alone.
HOW TO VERIFY: Cross-check with fact-checking websites like Snopes or FactCheck.org.
SOURCES: Snopes.com · FactCheck.org · PolitiFact.com"""

async def _full_analysis(statement: str, image_pil=None) -> dict:
    text_result  = _predict_text(statement)
    image_result = _predict_image(image_pil) if image_pil else None
    ml_conf      = text_result["confidence"]
    rule = (
        "Rule 1 — ML high confidence (≥70%)"  if ml_conf >= 70 else
        "Rule 2 — Gemini+context (55-70%)"     if ml_conf >= 55 else
        "Rule 3 — Blind LLM (<55%)"
    )
    reasoning    = await _reason(statement, text_result, image_result)
    verdict_line = [l for l in reasoning.split("\n") if "VERDICT:" in l]
    final_verdict = "UNCERTAIN"
    if verdict_line:
        v = verdict_line[0].upper()
        final_verdict = (
            "LIKELY FAKE" if "FAKE" in v else
            "LIKELY REAL" if "REAL" in v else
            "UNCERTAIN"
        )
    return {
        "statement"      : statement,
        "final_verdict"  : final_verdict,
        "fusion_rule"    : rule,
        "text_model"     : text_result,
        "image_model"    : image_result,
        "gemini_analysis": reasoning,
        "timestamp"      : datetime.now().isoformat(),
        "system"         : "Misinformation Guard v2.0 (local)",
    }


# ── Endpoints ──
class TextRequest(BaseModel):
    statement : str
    language  : Optional[str] = "auto"

class BatchRequest(BaseModel):
    statements: list[str]

@app.get("/")
async def root():
    return {
        "name"   : "Misinformation Guard — Local",
        "status" : "running",
        "docs"   : "http://localhost:8000/docs",
        "mode"   : "offline" if (ollama_ready or not GEMINI_API_KEY) else "online"
    }

@app.get("/health")
async def health():
    return {
        "status"         : "healthy",
        "device"         : str(device),
        "text_model"     : "loaded",
        "deepfake_model" : "loaded" if deepfake_pipe else "unavailable",
        "reasoning"      : "ollama" if ollama_ready else ("gemini" if gemini_model else "ml-only"),
        "version"        : "2.0.0-local",
        "timestamp"      : datetime.now().isoformat(),
    }

@app.post("/analyze/text")
async def analyze_text(req: TextRequest):
    if not req.statement.strip():
        raise HTTPException(400, "Statement cannot be empty.")
    try:
        return await _full_analysis(req.statement)
    except Exception as e:
        raise HTTPException(500, str(e))

@app.post("/analyze/multimodal")
async def analyze_multimodal(
    statement: str        = Form(...),
    image    : UploadFile = File(...)
):
    try:
        img_bytes = await image.read()
        import asyncio
        img_pil   = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        return await _full_analysis(statement, img_pil)
    except Exception as e:
        raise HTTPException(500, str(e))

@app.post("/analyze/batch")
async def analyze_batch(req: BatchRequest):
    if len(req.statements) > 10:
        raise HTTPException(400, "Max 10 statements per batch.")
    results = []
    
    import asyncio
    # Just run the batch sequentially but in a thread to unblock
    def _run_batch():
        res = []
        for s in req.statements:
            if s.strip():
                r = _predict_text(s)
                res.append({
                    "statement" : s[:100],
                    "verdict"   : r["label"],
                    "confidence": r["confidence"],
                    "prob_fake" : r["prob_fake"],
                    "prob_real" : r["prob_real"],
                })
        return res
    results = await asyncio.to_thread(_run_batch)
    return {
        "results"   : results,
        "n_analyzed": len(results),
        "timestamp" : datetime.now().isoformat(),
    }

if __name__ == "__main__":
    import uvicorn
    # Change port to 8000 in sync with frontend
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)

