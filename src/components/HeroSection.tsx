import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowDown, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreWork }) => {
  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
      {/* Top Profile Intro Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-6"
      >
        {/* Name Badge & Role Tags */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f2f2f2] border border-[#e5e5e5] text-xs font-mono text-[#555555]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>I'm Jatin Kumar</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[#737373]">
            <span>Product Designer</span>
            <span className="text-[#c7c7c7]">•</span>
            <span>Design Hacker</span>
          </div>
        </div>

        {/* What I Do Header */}
        <div className="space-y-4">
          <span className="text-xs font-mono tracking-widest text-[#737373] uppercase">
            What I Do
          </span>

          {/* Main Statement */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0d0d0d] leading-[1.12] max-w-4xl">
            I design products that people understand instantly, even when the technology behind them is anything but simple.
          </h1>
        </div>

        {/* Bottom Banner Highlight & Action */}
        <div className="pt-8 sm:pt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[#ededee] pb-12">
          <div className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[#555555]">
            <Sparkles className="w-4 h-4 text-[#0d0d0d]" />
            <span className="italic font-serif text-lg sm:text-xl text-[#0d0d0d]">
              {PERSONAL_INFO.heroBanner}
            </span>
          </div>

          <button
            onClick={onExploreWork}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0d0d0d] hover:bg-black text-white text-xs sm:text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <span>Explore Selected Work</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};
