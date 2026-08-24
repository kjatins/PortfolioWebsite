import React from 'react';
import { motion } from 'motion/react';
import { APPROACH_DATA } from '../data/portfolioData';
import { PageRoute } from '../types';
import { ArrowRight, Compass, Target, Lightbulb, Sparkles, Layers } from 'lucide-react';

interface ApproachPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenImage: (src: string, caption?: string) => void;
}

export const ApproachPage: React.FC<ApproachPageProps> = ({ onNavigate, onOpenImage }) => {
  const principleIcons = [Compass, Lightbulb, Sparkles, Layers, Target];

  return (
    <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto space-y-20 sm:space-y-28">
      
      {/* 1. Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6 max-w-4xl"
      >
        <span className="text-xs font-mono tracking-widest text-[#737373] uppercase">
          {APPROACH_DATA.hero.heading}
        </span>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0d0d0d] leading-[1.12]">
          {APPROACH_DATA.hero.subheading}
        </h1>

        <p className="text-base sm:text-xl text-[#555555] leading-relaxed max-w-3xl">
          {APPROACH_DATA.hero.description}
        </p>

        <div className="pt-4 inline-block">
          <div className="px-5 py-2.5 rounded-full bg-[#f4f4f3] border border-[#e5e5e4] text-xs sm:text-sm font-medium text-[#1c1c1c] italic font-serif">
            "{APPROACH_DATA.hero.tagline}"
          </div>
        </div>
      </motion.section>

      {/* 2. Stats Bento Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
      >
        {APPROACH_DATA.stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-[#fcfcfc] border border-[#ededee] flex flex-col justify-between gap-4 hover:border-[#d9d9d9] transition-all hover:shadow-sm"
          >
            <div className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0d0d0d]">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm font-medium text-[#737373] leading-snug">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.section>

      {/* 3. Visual Graphic Banner 1 */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        onClick={() => onOpenImage(APPROACH_DATA.images.banner1, 'Approach conceptual thinking')}
        className="cursor-zoom-in relative rounded-3xl overflow-hidden border border-[#ededee] bg-[#f7f7f6] aspect-[16/8] sm:aspect-[21/9]"
      >
        <img
          src={APPROACH_DATA.images.banner1}
          alt="Approach visualization diagram"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          loading="lazy"
        />
      </motion.section>

      {/* 4. Core Philosophy Statement */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-8 sm:p-12 md:p-16 rounded-3xl bg-[#f7f7f6] border border-[#ededee] space-y-6"
      >
        <span className="text-xs font-mono tracking-widest text-[#737373] uppercase">
          Mindset
        </span>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0d0d0d] leading-tight max-w-3xl">
          {APPROACH_DATA.philosophy.heading}
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-[#555555] leading-relaxed max-w-3xl">
          {APPROACH_DATA.philosophy.description}
        </p>

        <div className="pt-2">
          <span className="inline-block text-base sm:text-xl font-semibold text-[#0d0d0d] border-b-2 border-[#0d0d0d] pb-1">
            {APPROACH_DATA.philosophy.highlight}
          </span>
        </div>
      </motion.section>

      {/* 5. The 5 Principles / Steps */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono tracking-widest text-[#737373] uppercase">
            Principles
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0d0d0d]">
            How I Solve Problems
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {APPROACH_DATA.principles.map((pr, pIdx) => {
            const Icon = principleIcons[pIdx % principleIcons.length];
            const isFullWidth = pIdx === APPROACH_DATA.principles.length - 1;

            return (
              <motion.div
                key={pIdx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: pIdx * 0.08 }}
                className={`p-8 sm:p-10 rounded-3xl bg-[#fdfdfc] border border-[#ededee] hover:border-[#c7c7c7] transition-all hover:shadow-md flex flex-col justify-between gap-6 ${
                  isFullWidth ? 'md:col-span-2 md:flex-row md:items-center' : ''
                }`}
              >
                <div className="space-y-4 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#f0f0f0] text-[#1c1c1c] font-semibold">
                      {pr.number}
                    </span>
                    <Icon className="w-4 h-4 text-[#737373]" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d]">
                    {pr.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
                    {pr.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 6. Visual Graphic Banner 2 */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        onClick={() => onOpenImage(APPROACH_DATA.images.banner2, 'Design artifact details')}
        className="cursor-zoom-in relative rounded-3xl overflow-hidden border border-[#ededee] bg-[#f7f7f6] aspect-[16/8] sm:aspect-[21/9]"
      >
        <img
          src={APPROACH_DATA.images.banner2}
          alt="Design artifact exploration"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          loading="lazy"
        />
      </motion.section>

      {/* 7. Closing Standard Card & CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-8 sm:p-12 md:p-16 rounded-3xl bg-[#0d0d0d] text-white space-y-8 shadow-xl"
      >
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono tracking-widest text-white/60 uppercase">
            The Standard
          </span>

          <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {APPROACH_DATA.closing.title}
          </h3>

          <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed">
            {APPROACH_DATA.closing.text}
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <span className="text-sm font-medium text-white/80">
            {APPROACH_DATA.closing.ctaQuestion}
          </span>

          <button
            onClick={() => {
              onNavigate('home');
              setTimeout(() => {
                const workEl = document.getElementById('work');
                if (workEl) workEl.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0d0d0d] hover:bg-[#f0f0f0] text-xs sm:text-sm font-semibold transition-colors"
          >
            <span>View Selected Work</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.section>
    </div>
  );
};
