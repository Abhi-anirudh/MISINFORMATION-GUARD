'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Navbar from '@/components/Navbar';
import InputCard from '@/components/InputCard';
import ResultCard from '@/components/ResultCard';
import API_BASE from '../../config';

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => setMounted(true), []);

  const handleAnalyze = async (text: string, file: File | null) => {
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      let response;

      if (file) {
        const formData = new FormData();
        formData.append('statement', text || '');
        formData.append('image', file);
        
        response = await fetch(`${API_BASE}/analyze/multimodal`, {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch(`${API_BASE}/analyze/text`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ statement: text }),
        });
      }

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.detail?.[0]?.msg || `Failed to analyze content (${response.status})`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
<main className="relative min-h-screen text-slate-900 dark:text-slate-100 overflow-x-hidden">
      {/* Dynamic Background Video */}
      <video
        key={theme}
        autoPlay loop muted playsInline
        className="fixed inset-0 w-full h-full object-cover -z-20 scale-105" 
      >
        <source src={theme === 'dark' ? '/dark-mode.mp4' : '/light-mode.mp4'} type="video/mp4" />
      </video>

      {/* Overlay for readability */}
      <div className="fixed inset-0 bg-white/60 dark:bg-black/60 -z-10 transition-colors duration-500" />

      <Navbar />

      <div className="pt-28 pb-12 px-6 max-w-6xl mx-auto min-h-screen flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <InputCard onSubmit={handleAnalyze} isLoading={isLoading} />
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm backdrop-blur-md">
              {error}
            </div>
          )}
        </div>
        
        <div className="w-full md:w-1/2">
          {result ? (
            <ResultCard result={result} />
          ) : (
            <div className="h-full min-h-[400px] rounded-3xl border border-white/20 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 text-center p-8 glass-effect">
              <p>Submit content on the left to see the AI verification results here.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}