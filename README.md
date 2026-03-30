# Misinformation Guard

A full-stack application for detecting misinformation and deepfakes. This project utilizes an LLM (Phi-3 via Ollama) and custom deep learning models for reasoning and media detection.

## Project Structure

- `/frontend`: Next.js frontend application.
- `/backend`: FastAPI Python backend for serving predictions and processing data.
- `/models`: Machine learning models, weights (`.safetensors`, `.pt`), and Jupyter notebooks for training (Deepfake detector, etc.). *Note: Large model weights are ignored in source control and should be downloaded separately.*

## Model Statistics & Performance

### 1. Vision Misinformation (Deepfake Detector)
- **Architecture:** EfficientNet-B0
- **Test Accuracy:** 100% (1.0)
- **F1 Score:** 1.0
- *Evaluation:* Perfect score of 200 True Positives and 200 True Negatives on the evaluation dataset.

### 2. Text Misinformation (Fake News Model v2)
- **Architecture:** XLM-RoBERTa-base (with Class Weighted Retraining)
- **Test Accuracy:** ~60.4%
- **F1 Score (Weighted):** ~60.5%
- **Key Insight:** FAKE recall improved significantly (from 36.5% to 61.3%, effectively a +24.8% improvement over v1).
- *Evaluation:* The weighted loss approach allowed the model to proactively catch 339 fake examples, improving textual misinformation flagging.

## Prerequisites

- **Python 3.8+**
- **Node.js & npm**
- **[Ollama](https://ollama.com/)** (for running the local Phi-3 model)

## Getting Started

### 1. Backend

Use the provided `start.bat` script to automatically pull the required Phi-3 model via Ollama, install Python dependencies, and run the Python FastAPI backend server:

```bash
.\start.bat
```

The backend server will run at `http://localhost:8000`.

### 2. Frontend

Open a new terminal, navigate to the frontend directory, install dependencies, and start the Next.js development server:

```bash
cd frontend
npm install
npm run dev
```

The frontend application will be available at `http://localhost:3000`.