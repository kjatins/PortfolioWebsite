import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { PageRoute } from '../types';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  isDarkTheme?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, isDarkTheme = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWorkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage === 'home') {
      const workEl = document.getElementById('work');
      if (workEl) {
        workEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      onNavigate('home');
      setTimeout(() => {
        const workEl = document.getElementById('work');
        if (workEl) workEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setMobileMenuOpen(false);
  };

  const handleApproachClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('approach');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const isCaseStudy = !['home', 'approach'].includes(currentPage);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 md:px-8 pt-4 pb-2 transition-all duration-300 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Brand / Logo Button */}
        <button
          onClick={handleLogoClick}
          className={`group flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 ${
            isDarkTheme
              ? 'bg-[#181818]/90 text-white border-white/10 hover:bg-[#222222] backdrop-blur-md'
              : 'bg-[#fdfdfc]/90 text-[#1c1c1c] border-[#ebebeb] hover:bg-white backdrop-blur-md'
          }`}
          aria-label="Jatin Kumar Portfolio Home"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-semibold tracking-tight">
            {PERSONAL_INFO.titleBadge}
          </span>
        </button>

        {/* Desktop Navigation Pill */}
        <nav
          className={`hidden md:flex items-center gap-1 p-1.5 rounded-full border transition-all duration-300 ${
            isDarkTheme
              ? 'bg-[#181818]/90 text-white/80 border-white/10 backdrop-blur-md'
              : 'bg-[#fdfdfc]/90 text-[#737373] border-[#ebebeb] backdrop-blur-md'
          }`}
        >
          <button
            onClick={handleWorkClick}
            className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
              currentPage === 'home' || isCaseStudy
                ? isDarkTheme
                  ? 'text-white'
                  : 'text-[#1c1c1c]'
                : isDarkTheme
                ? 'text-white/60 hover:text-white'
                : 'text-[#737373] hover:text-[#1c1c1c]'
            }`}
          >
            {(currentPage === 'home' || isCaseStudy) && (
              <motion.div
                layoutId="navPill"
                className={`absolute inset-0 rounded-full ${
                  isDarkTheme ? 'bg-white/15' : 'bg-[#f0f0f0]'
                }`}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">Work</span>
          </button>

          <button
            onClick={handleApproachClick}
            className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
              currentPage === 'approach'
                ? isDarkTheme
                  ? 'text-white'
                  : 'text-[#1c1c1c]'
                : isDarkTheme
                ? 'text-white/60 hover:text-white'
                : 'text-[#737373] hover:text-[#1c1c1c]'
            }`}
          >
            {currentPage === 'approach' && (
              <motion.div
                layoutId="navPill"
                className={`absolute inset-0 rounded-full ${
                  isDarkTheme ? 'bg-white/15' : 'bg-[#f0f0f0]'
                }`}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">Approach</span>
          </button>

          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-1 px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
              isDarkTheme
                ? 'text-white/60 hover:text-white hover:bg-white/10'
                : 'text-[#737373] hover:text-[#1c1c1c] hover:bg-[#f0f0f0]'
            }`}
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2.5 rounded-full border transition-all ${
              isDarkTheme
                ? 'bg-[#181818]/90 text-white border-white/10'
                : 'bg-[#fdfdfc]/90 text-[#1c1c1c] border-[#ebebeb]'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`md:hidden pointer-events-auto mt-3 p-4 rounded-3xl border backdrop-blur-xl ${
              isDarkTheme
                ? 'bg-[#141414]/95 border-white/10 text-white'
                : 'bg-[#fdfdfc]/95 border-[#ebebeb] text-[#1c1c1c]'
            }`}
          >
            <div className="flex flex-col gap-2">
              <button
                onClick={handleWorkClick}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium ${
                  currentPage === 'home' || isCaseStudy
                    ? isDarkTheme
                      ? 'bg-white/10 text-white'
                      : 'bg-[#ebebeb] text-[#0d0d0d]'
                    : isDarkTheme
                    ? 'hover:bg-white/5 text-white/70'
                    : 'hover:bg-[#f5f5f5] text-[#737373]'
                }`}
              >
                <span>Selected Work</span>
                <span className="text-xs font-mono text-[#737373]">05</span>
              </button>

              <button
                onClick={handleApproachClick}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium ${
                  currentPage === 'approach'
                    ? isDarkTheme
                      ? 'bg-white/10 text-white'
                      : 'bg-[#ebebeb] text-[#0d0d0d]'
                    : isDarkTheme
                    ? 'hover:bg-white/5 text-white/70'
                    : 'hover:bg-[#f5f5f5] text-[#737373]'
                }`}
              >
                <span>Design Approach</span>
                <span className="text-xs font-mono text-[#737373]">5 Steps</span>
              </button>

              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium ${
                  isDarkTheme
                    ? 'hover:bg-white/5 text-white/70'
                    : 'hover:bg-[#f5f5f5] text-[#737373]'
                }`}
              >
                <span>Resume (PDF)</span>
                <ArrowUpRight className="w-4 h-4 text-[#737373]" />
              </a>

              <div className="pt-2 mt-1 border-t border-[#ebebeb]/50 text-xs text-[#737373] px-2 flex justify-between">
                <span>{PERSONAL_INFO.email}</span>
                <span>{PERSONAL_INFO.phone}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
