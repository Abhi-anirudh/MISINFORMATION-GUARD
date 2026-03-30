'use client';

import { motion } from 'framer-motion';
import { Smartphone, MonitorSmartphone, Zap } from 'lucide-react';

export default function FutureScope() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Future Scope</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">Roadmap to ubiquitous digital protection.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {[
          { icon: MonitorSmartphone, title: "Browser Extension", desc: "Real-time flagging of articles and tweets directly in the browser." },
          { icon: Zap, title: "Streaming Video Analysis", desc: "Live frame-by-frame deepfake detection for video calls and streams." },
          { icon: Smartphone, title: "Mobile Application", desc: "On-the-go verification for WhatsApp forwards and social media." }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex-1 glass-effect p-8 rounded-3xl text-center border-t border-l border-white/20"
          >
            <div className="w-16 h-16 mx-auto bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-700 dark:text-slate-300">
              <item.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{item.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}