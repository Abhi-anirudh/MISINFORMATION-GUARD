'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              Why <span className="text-blue-600 dark:text-blue-400">Misinformation Guard?</span>
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-4">
              In an era of rapid AI advancements, sophisticated deepfakes and mass-produced synthetic propaganda have degraded digital trust. Standard filters and moderation teams can no longer keep up with the volume and complexity.
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
              Misinformation Guard bridges this gap. By utilizing a cutting-edge hybrid architecture—combining lightning-fast neural networks for pattern recognition with large language models for nuanced, explainable reasoning—we provide actionable intelligence to secure digital ecosystems.
            </p>
          </div>
          
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            {[
              { stat: '100+', label: 'Languages Supported' },
              { stat: '~278M', label: 'RoBERTa Parameters' },
              { stat: 'Visual', label: 'Deepfake Detection' },
              { stat: 'LLM', label: 'Explainable Logic' }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 text-center hover:-translate-y-1 transition-transform">
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">{item.stat}</div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}