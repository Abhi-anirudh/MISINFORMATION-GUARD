'use client';

import { motion } from 'framer-motion';

export default function Performance() {
  const metrics = [
    { label: "Overall Accuracy", value: 92.4, color: "bg-blue-500" },
    { label: "F1-Score (Text)", value: 89.1, color: "bg-purple-500" },
    { label: "Recall Improvement", value: 14.5, color: "bg-emerald-500", suffix: "%+" }
  ];

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <div className="glass-effect rounded-3xl p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">System Performance</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">Benchmark results against standard baseline models.</p>
        </div>

        <div className="space-y-8">
          {metrics.map((metric, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{metric.label}</span>
                <span className="font-bold text-slate-900 dark:text-white">{metric.value}{metric.suffix || '%'}</span>
              </div>
              <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${metric.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 }}
                  className={`h-full ${metric.color} rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
          <p className="text-orange-800 dark:text-orange-300 font-medium">
            * The Hybrid AI Architecture (ML + LLM) demonstrated a 14.5% improvement in recall on edge-case synthetic data compared to standalone XLM-R models.
          </p>
        </div>
      </div>
    </section>
  );
}