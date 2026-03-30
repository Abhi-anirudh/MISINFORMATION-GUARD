'use client';

import { motion } from 'framer-motion';

export default function TechStack() {
  const models = [
    {
      name: "XLM-RoBERTa",
      role: "Multilingual Base Model",
      params: "~278M Parameters",
      dataset: "Fine-tuned on LIAR Dataset",
      desc: "Handles multi-language text syntax and semantics, instantly flagging linguistic anomalies and historically recognized fake news patterns across 100+ languages.",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      name: "EfficientNet-B0 / ViT",
      role: "Vision Deepfake Detection",
      params: "Computer Vision",
      dataset: "Trained on Deepfake Datasets",
      desc: "Analyzes uploaded images for manipulation artifacts, AI-generation signatures (like stable diffusion flaws), and adversarial blending techniques.",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      name: "Gemini API",
      role: "Reasoning Layer",
      params: "LLM Contextualization",
      dataset: "Real-time Knowledge",
      desc: "Takes ML probability vectors and produces human-readable, explainable logic confirming why a specific artifact or text block is likely fabricated.",
      color: "from-cyan-500/20 to-emerald-500/20"
    }
  ];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Core Technology Stack</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">Powering detection with a multimodal, hybrid approach.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {models.map((model, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4 }}
            className={`glass-effect rounded-3xl p-8 border border-white/20 bg-gradient-to-br ${model.color} relative overflow-hidden`}
          >
            <div className="text-sm font-semibold tracking-wider text-blue-600 dark:text-blue-400 mb-2 uppercase">{model.role}</div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{model.name}</h3>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                {model.params}
              </li>
              <li className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></span>
                {model.dataset}
              </li>
            </ul>

            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-300 dark:border-slate-700/50 pt-4">
              {model.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}