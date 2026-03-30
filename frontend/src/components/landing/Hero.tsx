'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center justify-center text-center px-6 min-h-[90vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 backdrop-blur-md"
      >
        <ShieldCheck className="w-5 h-5" />
        <span className="text-sm font-medium tracking-wide text-slate-800 dark:text-slate-200">Advanced Threat Intelligence</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
          Misinformation Guard
        </span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg md:text-2xl text-slate-700 dark:text-slate-300 max-w-2xl mb-10 leading-relaxed font-light backdrop-blur-sm"
      >
        Enterprise-grade AI to detect fake news and deepfakes instantly. Protect your platforms with our hybrid ML & LLM reasoning engine.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link href="/analyze" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full font-semibold text-lg shadow-xl shadow-blue-500/25 transition-all overflow-hidden flex items-center justify-center gap-2">
          <span>Analyze Now</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
        </Link>
        <a href="#how-it-works" className="px-8 py-4 rounded-full font-semibold text-lg border border-slate-300 dark:border-white/20 bg-white/10 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-white/10 backdrop-blur-md text-slate-900 dark:text-white transition-all">
          How it Works
        </a>
      </motion.div>
    </section>
  );
}