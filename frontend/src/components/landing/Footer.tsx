import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-8 text-center border-t border-slate-300 dark:border-white/10 glass-effect mt-20 relative z-10 bg-white/30 dark:bg-black/30 backdrop-blur-lg">
      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
        Misinformation Guard
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 mb-4">
        AI-powered Fake News & Deepfake Detection. Built for security & transparency.
      </p>
      
      <div className="flex justify-center gap-6 text-sm font-medium">
        <Link href="/analyze" className="text-slate-700 hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
          Try the App
        </Link>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-700 hover:text-purple-500 dark:text-slate-300 dark:hover:text-purple-400 transition-colors">
          GitHub Repository
        </a>
      </div>

      <div className="text-xs text-slate-500 mt-8">
        &copy; {new Date().getFullYear()} Misinformation Guard. All rights reserved.
      </div>
    </footer>
  );
}