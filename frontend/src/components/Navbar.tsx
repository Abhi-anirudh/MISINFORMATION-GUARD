import { ShieldAlert } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/10 dark:bg-black/30 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-sm">
      <div className="flex items-center gap-2">
        <ShieldAlert className="w-7 h-7 text-blue-600 dark:text-blue-400" />
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Misinformation Guard
        </h1>
      </div>
      <ThemeToggle />
    </nav>
  );
}