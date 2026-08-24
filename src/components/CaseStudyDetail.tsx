import React from 'react';
import { motion } from 'motion/react';
import { CaseStudy, PageRoute } from '../types';
import { ArrowLeft, ArrowRight, ExternalLink, ShieldAlert, CheckCircle2, ZoomIn } from 'lucide-react';

interface CaseStudyDetailProps {
  study: CaseStudy;
  onNavigate: (page: PageRoute) => void;
  onOpenImage: (src: string, caption?: string) => void;
}

export const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({
  study,
  onNavigate,
  onOpenImage
}) => {
  const isDark = study.isDarkTheme;

  return (
    <div
      className={`min-h-screen pt-28 sm:pt-36 pb-20 transition-colors duration-300 ${
        isDark ? 'bg-[#0f0f0f] text-[#fafafa] dark-theme-page' : 'bg-[#fdfdfc] text-[#1c1c1c]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 space-y-16 sm:space-y-24">
        
        {/* Top Back Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between"
        >
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`inline-flex items-center gap-2 text-xs sm:text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white/80 hover:text-white'
                : 'bg-[#f7f7f6] hover:bg-[#ebebeb] border-[#ededee] text-[#555555] hover:text-[#0d0d0d]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Work</span>
          </button>

          <span
            className={`text-xs font-mono px-3 py-1 rounded-full border ${
              isDark
                ? 'bg-white/5 border-white/10 text-white/60'
                : 'bg-[#f7f7f6] border-[#ededee] text-[#737373]'
            }`}
          >
            {study.number}
          </span>
        </motion.div>

        {/* Confidentiality Notice Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`p-4 rounded-2xl border flex items-start gap-3 text-xs sm:text-sm leading-relaxed ${
            isDark
              ? 'bg-[#1c1c1c]/70 border-white/10 text-white/70'
              : 'bg-[#f5f5f4] border-[#e8e8e7] text-[#666666]'
          }`}
        >
          <ShieldAlert
            className={`w-4 h-4 shrink-0 mt-0.5 ${
              isDark ? 'text-white/60' : 'text-[#888888]'
            }`}
          />
          <div>
            <span className="font-semibold text-inherit mr-1">Confidentiality Note:</span>
            <span>{study.confidentialityNote.replace('Note: ', '')}</span>
          </div>
        </motion.div>

        {/* Case Study Header & Meta Information */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-8"
        >
          <div className="space-y-4 max-w-4xl">
            <h1
              className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.12] ${
                isDark ? 'text-white' : 'text-[#0d0d0d]'
              }`}
            >
              {study.title}
            </h1>
            <p
              className={`text-base sm:text-xl leading-relaxed ${
                isDark ? 'text-white/70' : 'text-[#555555]'
              }`}
            >
              {study.heroSubtitle}
            </p>
          </div>

          {/* Project Details Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl border ${
              isDark
                ? 'bg-[#161616] border-white/10 text-white'
                : 'bg-[#fcfcfc] border-[#ededee] text-[#1c1c1c]'
            }`}
          >
            {/* Client */}
            <div className="space-y-1.5">
              <span
                className={`text-[11px] font-mono uppercase tracking-wider ${
                  isDark ? 'text-white/50' : 'text-[#737373]'
                }`}
              >
                Client
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm sm:text-base">
                  {study.client}
                </span>
                {study.clientUrl && (
                  <a
                    href={study.clientUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-1 rounded hover:bg-white/10 ${
                      isDark ? 'text-white/70' : 'text-[#737373]'
                    }`}
                    aria-label="Visit client website"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-1.5">
              <span
                className={`text-[11px] font-mono uppercase tracking-wider ${
                  isDark ? 'text-white/50' : 'text-[#737373]'
                }`}
              >
                Duration
              </span>
              <div className="font-semibold text-sm sm:text-base">
                {study.duration}
              </div>
            </div>

            {/* Responsibilities */}
            <div className="space-y-1.5 sm:col-span-2 md:col-span-1">
              <span
                className={`text-[11px] font-mono uppercase tracking-wider ${
                  isDark ? 'text-white/50' : 'text-[#737373]'
                }`}
              >
                Responsibilities
              </span>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-white/80' : 'text-[#555555]'
                }`}
              >
                {study.responsibilities.join(', ')}
              </p>
            </div>

            {/* Scope */}
            <div className="space-y-1.5 sm:col-span-2 md:col-span-1">
              <span
                className={`text-[11px] font-mono uppercase tracking-wider ${
                  isDark ? 'text-white/50' : 'text-[#737373]'
                }`}
              >
                Scope
              </span>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-white/80' : 'text-[#555555]'
                }`}
              >
                {study.scope.join(', ')}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Hero Full-width Image */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={() => onOpenImage(study.heroImage, study.title)}
          className={`cursor-zoom-in group relative rounded-3xl overflow-hidden border shadow-lg ${
            isDark ? 'border-white/10 bg-[#141414]' : 'border-[#ededee] bg-[#f7f7f6]'
          }`}
        >
          <img
            src={study.heroImage}
            alt={study.title}
            referrerPolicy="no-referrer"
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          />
          <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Click to Expand</span>
          </div>
        </motion.section>

        {/* Overview Section */}
        <section
          className={`p-8 sm:p-12 rounded-3xl border space-y-6 ${
            isDark
              ? 'bg-[#141414] border-white/10 text-white'
              : 'bg-[#f7f7f6] border-[#ededee] text-[#1c1c1c]'
          }`}
        >
          <span
            className={`text-xs font-mono tracking-widest uppercase ${
              isDark ? 'text-white/50' : 'text-[#737373]'
            }`}
          >
            Project Overview
          </span>

          {study.overview.lead && (
            <p
              className={`text-lg sm:text-2xl font-semibold leading-snug ${
                isDark ? 'text-white' : 'text-[#0d0d0d]'
              }`}
            >
              {study.overview.lead}
            </p>
          )}

          <div className="space-y-4">
            {study.overview.description.map((para, pIdx) => (
              <p
                key={pIdx}
                className={`text-sm sm:text-base leading-relaxed ${
                  isDark ? 'text-white/70' : 'text-[#555555]'
                }`}
              >
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Detailed Case Study Sections & Visuals */}
        <section className="space-y-20 sm:space-y-28">
          {study.sections.map((section, sIdx) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Section Header & Narrative */}
              <div className="space-y-4 max-w-3xl">
                <span
                  className={`text-xs font-mono px-3 py-1 rounded-full border ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-white/60'
                      : 'bg-[#f2f2f2] border-[#e5e5e5] text-[#737373]'
                  }`}
                >
                  Section 0{sIdx + 1}
                </span>

                <h2
                  className={`text-2xl sm:text-4xl font-bold tracking-tight leading-snug ${
                    isDark ? 'text-white' : 'text-[#0d0d0d]'
                  }`}
                >
                  {section.title}
                </h2>

                <div className="space-y-3 pt-2">
                  {section.description.map((descPara, dIdx) => (
                    <p
                      key={dIdx}
                      className={`text-sm sm:text-base md:text-lg leading-relaxed ${
                        isDark ? 'text-white/70' : 'text-[#555555]'
                      }`}
                    >
                      {descPara}
                    </p>
                  ))}
                </div>
              </div>

              {/* Section Image / Visual Artifact */}
              {section.image && (
                <div
                  onClick={() => onOpenImage(section.image!, section.title)}
                  className={`cursor-zoom-in group relative rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${
                    isDark
                      ? 'border-white/10 bg-[#161616] hover:border-white/20'
                      : 'border-[#ededee] bg-[#f7f7f6] hover:border-[#d9d9d9]'
                  }`}
                >
                  <img
                    src={section.image}
                    alt={section.imageAlt || section.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Expand</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </section>

        {/* Retrospective Section: What I Learned */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`p-8 sm:p-12 md:p-16 rounded-3xl border space-y-6 ${
            isDark
              ? 'bg-[#181818] border-white/10 text-white'
              : 'bg-[#f4f4f3] border-[#e5e5e4] text-[#1c1c1c]'
          }`}
        >
          <span
            className={`text-xs font-mono tracking-widest uppercase ${
              isDark ? 'text-white/50' : 'text-[#737373]'
            }`}
          >
            Reflections
          </span>

          <h3
            className={`text-2xl sm:text-4xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-[#0d0d0d]'
            }`}
          >
            {study.retrospective.title}
          </h3>

          <div className="space-y-4 max-w-4xl">
            {study.retrospective.paragraphs.map((para, rIdx) => (
              <p
                key={rIdx}
                className={`text-sm sm:text-base md:text-lg leading-relaxed ${
                  isDark ? 'text-white/70' : 'text-[#555555]'
                }`}
              >
                {para}
              </p>
            ))}
          </div>
        </motion.section>

        {/* Previous & Next Project Navigation Cards */}
        <section className="pt-8 border-t border-inherit">
          <div className="flex items-center justify-between pb-6">
            <span
              className={`text-xs font-mono tracking-widest uppercase ${
                isDark ? 'text-white/50' : 'text-[#737373]'
              }`}
            >
              Continue Reading
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Prev Project */}
            {study.prevProject ? (
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => {
                  onNavigate(study.prevProject!.slug as PageRoute);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`cursor-pointer p-6 sm:p-8 rounded-3xl border flex flex-col justify-between gap-6 transition-all ${
                  isDark
                    ? 'bg-[#161616] border-white/10 hover:border-white/20'
                    : 'bg-[#fcfcfc] border-[#ededee] hover:border-[#d9d9d9] hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-medium text-[#737373]">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous Project</span>
                </div>
                <div>
                  <span
                    className={`text-xs font-mono uppercase ${
                      isDark ? 'text-white/40' : 'text-[#888888]'
                    }`}
                  >
                    {study.prevProject.client}
                  </span>
                  <h4
                    className={`text-lg sm:text-xl font-bold tracking-tight mt-1 line-clamp-2 ${
                      isDark ? 'text-white' : 'text-[#0d0d0d]'
                    }`}
                  >
                    {study.prevProject.title}
                  </h4>
                </div>
              </motion.div>
            ) : <div />}

            {/* Next Project */}
            {study.nextProject ? (
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => {
                  onNavigate(study.nextProject!.slug as PageRoute);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`cursor-pointer p-6 sm:p-8 rounded-3xl border flex flex-col justify-between gap-6 transition-all ${
                  isDark
                    ? 'bg-[#161616] border-white/10 hover:border-white/20'
                    : 'bg-[#fcfcfc] border-[#ededee] hover:border-[#d9d9d9] hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-end gap-2 text-xs font-medium text-[#737373]">
                  <span>Next Project</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs font-mono uppercase ${
                      isDark ? 'text-white/40' : 'text-[#888888]'
                    }`}
                  >
                    {study.nextProject.client}
                  </span>
                  <h4
                    className={`text-lg sm:text-xl font-bold tracking-tight mt-1 line-clamp-2 ${
                      isDark ? 'text-white' : 'text-[#0d0d0d]'
                    }`}
                  >
                    {study.nextProject.title}
                  </h4>
                </div>
              </motion.div>
            ) : <div />}
          </div>
        </section>
      </div>
    </div>
  );
};
