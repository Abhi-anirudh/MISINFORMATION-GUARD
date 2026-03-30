'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Navbar from '@/components/Navbar';
import Hero from '@/components/landing/Hero';
import About from '@/components/landing/About';
import HowItWorks from '@/components/landing/HowItWorks';
import TechStack from '@/components/landing/TechStack';
import Performance from '@/components/landing/Performance';
import Features from '@/components/landing/Features';
import FutureScope from '@/components/landing/FutureScope';
import Footer from '@/components/landing/Footer';
import Link from 'next/link';

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen bg-slate-900" />;

  return (
    <main className="relative min-h-screen text-slate-900 dark:text-slate-100 overflow-x-hidden scroll-smooth">
      {/* Dynamic Background Video */}
      <video
        key={theme} // Force re-mount of video element when theme changes
        autoPlay loop muted playsInline
        className="fixed inset-0 w-full h-full object-cover -z-20 scale-105"
      >
        <source src={theme === 'dark' ? '/dark-mode.mp4' : '/light-mode.mp4'} type="video/mp4" />
      </video>

      {/* Overlay for readability and scroll blending */}
      <div className="fixed inset-0 bg-white/60 dark:bg-black/60 -z-10 transition-colors duration-500" />

      <Navbar />

      {/* Landing Page Content */}
      <div className="relative z-10 flex flex-col gap-24 pt-20">
        <Hero />
        <About />
        <HowItWorks />
        <TechStack />
        <Performance />
        <Features />
        <FutureScope />
        
        {/* Live Demo CTA Section */}
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <div className="glass-effect rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 -z-10" />
            <h2 className="text-4xl font-extrabold mb-6 text-slate-900 dark:text-white">Ready to test the system?</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Experience the power of our Hybrid AI architecture. Upload an image or paste a news article to get an instant analysis, complete with reasoning and confidence metrics.
            </p>
            <Link href="/analyze" className="inline-block px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-blue-500/50 transition-all hover:-translate-y-1">
              Try the Live Demo
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}