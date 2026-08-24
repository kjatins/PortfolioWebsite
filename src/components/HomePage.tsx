import React from 'react';
import { motion } from 'motion/react';
import { HeroSection } from './HeroSection';
import { WorkCard } from './WorkCard';
import { CASE_STUDIES } from '../data/portfolioData';
import { PageRoute } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const handleScrollToWork = () => {
    const workEl = document.getElementById('work');
    if (workEl) {
      workEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection onExploreWork={handleScrollToWork} />

      {/* Selected Work Section */}
      <section id="work" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#ededee]">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-[#737373] uppercase">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0d0d0d]">
              Selected Work
            </h2>
            <p className="text-sm sm:text-base text-[#737373]">
              Products that solve, not just impress.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-[#f2f2f2] text-[#1c1c1c] font-medium border border-[#e5e5e5]">
              05 projects
            </span>
          </div>
        </div>

        {/* Work Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {CASE_STUDIES.map((study, index) => {
            // Give the 1st project full width if appropriate, or a balanced grid
            const isFullWidth = index === 0;
            return (
              <div
                key={study.id}
                className={isFullWidth ? 'md:col-span-2' : 'col-span-1'}
              >
                <WorkCard
                  study={study}
                  index={index}
                  onSelect={(slug) => onNavigate(slug as PageRoute)}
                />
              </div>
            );
          })}
        </div>

        {/* Approach Teaser Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 sm:p-12 rounded-3xl bg-[#f7f7f6] border border-[#ededee] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#c7c7c7] transition-all"
        >
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#737373] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#0d0d0d]" />
              <span>Methodology & Mindset</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d]">
              Complexity is the starting point. Clarity is the goal.
            </h3>
            <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
              Explore the 5 core principles I use to untangle convoluted enterprise journeys and design predictable AI products.
            </p>
          </div>

          <button
            onClick={() => {
              onNavigate('approach');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0d0d0d] hover:bg-black text-white text-xs sm:text-sm font-medium transition-colors"
          >
            <span>Read My Approach</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>
    </div>
  );
};
