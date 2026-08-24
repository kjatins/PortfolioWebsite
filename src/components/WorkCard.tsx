import React from 'react';
import { motion } from 'motion/react';
import { CaseStudy } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface WorkCardProps {
  study: CaseStudy;
  index: number;
  onSelect: (slug: string) => void;
}

export const WorkCard: React.FC<WorkCardProps> = ({ study, index, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(study.slug)}
      className="group cursor-pointer flex flex-col rounded-3xl bg-[#fdfdfc] border border-[#ededee] hover:border-[#d9d9d9] overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.03]"
    >
      {/* Visual Image Preview Container */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-[#f7f7f6] border-b border-[#ededee]">
        <img
          src={study.coverImage}
          alt={study.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Floating Number Pill */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1c1c1c] text-xs font-mono font-medium shadow-sm border border-white/40">
          {study.number}
        </div>

        {/* Floating Client Pill */}
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#1c1c1c]/80 backdrop-blur-md text-white text-xs font-medium shadow-sm flex items-center gap-1">
          <span>{study.client}</span>
        </div>

        {/* Subtle hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Card Info Section */}
      <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow gap-6">
        <div>
          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] group-hover:text-black transition-colors leading-snug">
            {study.title}
          </h3>

          {/* Subtitle / Description */}
          <p className="mt-2.5 text-sm sm:text-base text-[#737373] leading-relaxed line-clamp-2">
            {study.heroSubtitle}
          </p>
        </div>

        {/* Tags and Action row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#ededee]">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {study.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-xs px-3 py-1 rounded-full bg-[#f4f4f3] text-[#555555] font-medium border border-[#e5e5e4] transition-colors group-hover:bg-[#ebebea]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-[#1c1c1c] group-hover:translate-x-0.5 transition-transform">
            <span>Read Case Study</span>
            <div className="w-6 h-6 rounded-full bg-[#1c1c1c] text-white flex items-center justify-center group-hover:bg-black transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
