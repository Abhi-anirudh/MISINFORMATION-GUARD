'use client';

import { useState } from 'react';
import { UploadCloud, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InputCard({ onSubmit, isLoading }: { onSubmit: (text: string, file: File | null) => void; isLoading: boolean }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !file) return;
    onSubmit(text, file);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col p-8 rounded-3xl glass-effect shadow-2xl"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Analyze Content</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste article text, tweet, or news snippet here..."
          className="w-full h-32 p-4 rounded-xl glass-effect focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
        />

        <div className="relative border-2 border-dashed border-slate-400/50 dark:border-slate-500/50 rounded-xl p-6 text-center hover:bg-white/10 dark:hover:bg-white/5 transition-colors cursor-pointer group">
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors">
            <UploadCloud className="w-8 h-8" />
            <span className="text-sm font-medium">
              {file ? file.name : "Drag & drop an image or click to browse"}
            </span>
          </div>
        </div>

        <button 
          disabled={isLoading || (!text.trim() && !file)}
          type="submit" 
          className="mt-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          {isLoading ? 'Analyzing...' : 'Analyze Content'}
        </button>
      </form>
    </motion.div>
  );
}