'use client';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';

interface ResultProps {
  final_verdict: string;
  text_model?: {
    label: string;
    confidence: number;
    prob_fake: number;
    prob_real: number;
  };
  gemini_analysis?: string;
  timestamp?: string;
  system?: string;
}

// Helper to parse Gemini's plain text response into sections
const parseGeminiText = (text: string) => {
  const sections = {
    verdict: "",
    confidence: "",
    reasoning: "",
    redFlags: "",
    verify: "",
    sources: ""
  };

  if (!text) return sections;

  const lines = text.split("\n");
  let currentKey: keyof typeof sections | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("VERDICT:")) {
      sections.verdict = trimmed.replace("VERDICT:", "").trim();
      currentKey = null;
    } else if (trimmed.startsWith("CONFIDENCE:")) {
      sections.confidence = trimmed.replace("CONFIDENCE:", "").trim();
      currentKey = null;
    } else if (trimmed.startsWith("REASONING:")) {
      sections.reasoning = trimmed.replace("REASONING:", "").trim();
      currentKey = "reasoning";
    } else if (trimmed.startsWith("RED FLAGS:")) {
      sections.redFlags = trimmed.replace("RED FLAGS:", "").trim();
      currentKey = "redFlags";
    } else if (trimmed.startsWith("HOW TO VERIFY:") || trimmed.startsWith("HOW TO VERIFY THIS:")) {
      sections.verify = trimmed.replace(/HOW TO VERIFY( THIS)?:/, "").trim();
      currentKey = "verify";
    } else if (trimmed.startsWith("SOURCES:") || trimmed.startsWith("SOURCES TO CHECK:")) {
      sections.sources = trimmed.replace(/SOURCES( TO CHECK)?:/, "").trim();
      currentKey = "sources";
    } else if (currentKey) {
      sections[currentKey] += " " + trimmed;
    }
  }

  return sections;
};

export default function ResultCard({ result }: { result: ResultProps | null }) {
  if (!result) return null;

  // Safe field extraction
  const probFake = result?.text_model?.prob_fake ?? 0;
  const probReal = result?.text_model?.prob_real ?? 0;
  const verdict = result?.final_verdict ?? "UNCERTAIN";
  const gemini = parseGeminiText(result?.gemini_analysis ?? "");
  
  const isFake = verdict.includes("FAKE");
  const isReal = verdict.includes("REAL");
  
  const colorClass = isFake ? 'text-red-500' : isReal ? 'text-green-500' : 'text-yellow-500';
  const bgClass = isFake ? 'bg-red-500' : isReal ? 'bg-green-500' : 'bg-yellow-500';
  const Icon = isFake ? AlertCircle : isReal ? CheckCircle2 : HelpCircle;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="w-full flex flex-col p-8 rounded-3xl glass-effect shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Analysis Result</h2>
        <div className={`flex flex-col items-end`}>
          <div className={`flex items-center gap-2 font-bold text-xl ${colorClass}`}>
            <Icon className="w-6 h-6" />
            {verdict}
          </div>
          {gemini.confidence && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Gemini Confidence: {gemini.confidence}
            </span>
          )}
        </div>
      </div>

      {/* ML Model Scores */}
      {result.text_model && (
        <div className="mb-6 space-y-3">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">ML Model Scores</p>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium w-12 text-red-500">FAKE</span>
            <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} animate={{ width: `${probFake}%` }} transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-red-500"
              />
            </div>
            <span className="text-sm font-medium w-12 text-right">{probFake.toFixed(1)}%</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium w-12 text-green-500">REAL</span>
            <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} animate={{ width: `${probReal}%` }} transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-green-500"
              />
            </div>
            <span className="text-sm font-medium w-12 text-right">{probReal.toFixed(1)}%</span>
          </div>
        </div>
      )}

      {/* Gemini Analysis Details */}
      <div className="space-y-4">
        {gemini.reasoning && (
          <div className="p-4 rounded-xl glass-effect text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
            <h3 className="font-semibold mb-2 text-slate-900 dark:text-white flex items-center gap-2">
              🤖 Reasoning
            </h3>
            <p>{gemini.reasoning}</p>
          </div>
        )}

        {gemini.redFlags && gemini.redFlags.toLowerCase() !== "none detected" && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
            <h3 className="font-semibold mb-2 text-red-700 dark:text-red-400 flex items-center gap-2">
              ⚠️ Red Flags
            </h3>
            <p>{gemini.redFlags}</p>
          </div>
        )}

        {(gemini.verify || gemini.sources) && (
          <div className="p-4 rounded-xl glass-effect text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
            {gemini.verify && (
              <div className="mb-3">
                <h3 className="font-semibold mb-1 text-slate-900 dark:text-white">🔍 How to Verify</h3>
                <p className="text-slate-600 dark:text-slate-400">{gemini.verify}</p>
              </div>
            )}
            {gemini.sources && (
              <div>
                <h3 className="font-semibold mb-1 text-slate-900 dark:text-white">📚 Sources</h3>
                <p className="text-slate-600 dark:text-slate-400">{gemini.sources}</p>
              </div>
            )}
          </div>
        )}
      </div>

    </motion.div>
  );
}