'use client';

import { Globe2, Layers, SearchCheck, Image } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Features() {
  const features = [
    { icon: Globe2, title: "Multilingual Detection", desc: "Cross-lingual representations allow detection of fake news regardless of origin language or translation shifts." },
    { icon: Layers, title: "Hybrid AI Engine", desc: "Combines the speed of traditional ML classifiers with the deep reasoning power of modern LLMs." },
    { icon: SearchCheck, title: "Explainable Outputs", desc: "Instead of just getting an arbitrary 'fake' flag, users receive a detailed breakdown of exactly why the content is suspicious." },
    { icon: Image, title: "Multimodal Analysis", desc: "Seamlessly handles both text inputs and uploaded images, detecting textual propaganda alongside visual deepfakes." }
  ];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Key Features</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-4 p-6 glass-effect rounded-2xl border border-white/10 hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
          >
            <div className="flex-shrink-0 p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400">
              <feature.icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}