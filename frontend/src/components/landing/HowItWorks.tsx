'use client';

import { motion } from 'framer-motion';
import { Database, Cpu, BrainCircuit, ShieldAlert } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    { icon: Database, title: "1. Data Intake", desc: "User submits text, URLs, or potential deepfake images via the dashboard or API endpoint." },
    { icon: Cpu, title: "2. Base ML Processing", desc: "XLM-RoBERTa scans text syntax. ViT/EfficientNet breaks down visual frequency artifacts." },
    { icon: BrainCircuit, title: "3. LLM Reasoning", desc: "Gemini interprets the findings, providing context, intent, and resolving edge cases." },
    { icon: ShieldAlert, title: "4. Verdict & Explanation", desc: "Dashboard updates with Confidence Score, Fake/Real Verdict, and structured reasoning." },
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Pipeline Architecture</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">How data moves through the hybrid analysis engine.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
        {/* Connection line for desktop */}
        <div className="hidden md:block absolute top-[50px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-500/10 via-blue-500/50 to-purple-500/10 -z-10"></div>

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-24 h-24 rounded-2xl glass-effect flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <step.icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{step.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}