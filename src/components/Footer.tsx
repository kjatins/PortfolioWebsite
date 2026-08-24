import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { PageRoute } from '../types';
import { ArrowUpRight, Copy, Mail, Phone, ExternalLink } from 'lucide-react';

interface FooterProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenResources: () => void;
  onCopyText: (text: string, label: string) => void;
  isDarkTheme?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  currentPage,
  onNavigate,
  onOpenResources,
  onCopyText,
  isDarkTheme = false
}) => {
  const handleWorkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage === 'home') {
      const workEl = document.getElementById('work');
      if (workEl) workEl.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate('home');
      setTimeout(() => {
        const workEl = document.getElementById('work');
        if (workEl) workEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleApproachClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('approach');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      className={`relative pt-20 pb-16 px-4 sm:px-6 md:px-8 border-t transition-colors duration-300 overflow-hidden ${
        isDarkTheme
          ? 'bg-[#0f0f0f] text-white border-white/10'
          : 'bg-[#fdfdfc] text-[#1c1c1c] border-[#ededee]'
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Main CTA Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-inherit">
          <div className="max-w-2xl space-y-3">
            <span
              className={`text-xs font-mono tracking-widest uppercase ${
                isDarkTheme ? 'text-white/60' : 'text-[#737373]'
              }`}
            >
              Get In Touch
            </span>
            <h2
              className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] ${
                isDarkTheme ? 'text-white' : 'text-[#0d0d0d]'
              }`}
            >
              If you’re building something that matters,{' '}
              <span className="italic font-serif font-normal">Let’s talk.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0d0d0d] text-white hover:bg-black text-sm font-medium transition-all shadow-md hover:shadow-lg"
            >
              <Mail className="w-4 h-4" />
              <span>Send an Email</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => onCopyText(PERSONAL_INFO.email, 'Email address')}
              className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-medium border transition-colors ${
                isDarkTheme
                  ? 'bg-white/5 border-white/15 text-white hover:bg-white/10'
                  : 'bg-[#f5f5f4] border-[#e0e0e0] text-[#1c1c1c] hover:bg-[#ebebeb]'
              }`}
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Email</span>
            </button>
          </div>
        </div>

        {/* Links & Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Column 1: Navigation */}
          <div className="space-y-4">
            <h3
              className={`text-xs font-mono uppercase tracking-wider ${
                isDarkTheme ? 'text-white/50' : 'text-[#737373]'
              }`}
            >
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <button
                  onClick={handleWorkClick}
                  className={`transition-colors ${
                    isDarkTheme ? 'text-white/80 hover:text-white' : 'text-[#555555] hover:text-[#0d0d0d]'
                  }`}
                >
                  Selected Work
                </button>
              </li>
              <li>
                <button
                  onClick={handleApproachClick}
                  className={`transition-colors ${
                    isDarkTheme ? 'text-white/80 hover:text-white' : 'text-[#555555] hover:text-[#0d0d0d]'
                  }`}
                >
                  Approach & Principles
                </button>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1 transition-colors ${
                    isDarkTheme ? 'text-white/80 hover:text-white' : 'text-[#555555] hover:text-[#0d0d0d]'
                  }`}
                >
                  <span>Resume</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenResources}
                  className={`transition-colors ${
                    isDarkTheme ? 'text-white/80 hover:text-white' : 'text-[#555555] hover:text-[#0d0d0d]'
                  }`}
                >
                  Resources & Notes
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Contact Info */}
          <div className="space-y-4">
            <h3
              className={`text-xs font-mono uppercase tracking-wider ${
                isDarkTheme ? 'text-white/50' : 'text-[#737373]'
              }`}
            >
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className={`font-medium transition-colors ${
                      isDarkTheme ? 'text-white hover:text-white/80' : 'text-[#0d0d0d] hover:text-black'
                    }`}
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </li>
              <li>
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                  className={`font-medium transition-colors ${
                    isDarkTheme ? 'text-white/80 hover:text-white' : 'text-[#555555] hover:text-[#0d0d0d]'
                  }`}
                >
                  {PERSONAL_INFO.phone}
                </a>
              </li>
              <li
                className={`text-xs ${
                  isDarkTheme ? 'text-white/40' : 'text-[#8c8c8c]'
                }`}
              >
                Based in India • Working Worldwide
              </li>
            </ul>
          </div>

          {/* Column 3: Social Network */}
          <div className="space-y-4">
            <h3
              className={`text-xs font-mono uppercase tracking-wider ${
                isDarkTheme ? 'text-white/50' : 'text-[#737373]'
              }`}
            >
              Connect
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {PERSONAL_INFO.socialLinks.map((social, sIdx) => (
                <li key={sIdx}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 transition-colors ${
                      isDarkTheme ? 'text-white/80 hover:text-white' : 'text-[#555555] hover:text-[#0d0d0d]'
                    }`}
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Profile / Copyright */}
          <div className="space-y-4">
            <h3
              className={`text-xs font-mono uppercase tracking-wider ${
                isDarkTheme ? 'text-white/50' : 'text-[#737373]'
              }`}
            >
              Craftsmanship
            </h3>
            <p
              className={`text-xs leading-relaxed ${
                isDarkTheme ? 'text-white/60' : 'text-[#737373]'
              }`}
            >
              Focused on clarity, predictability, and thoughtful system design for AI & enterprise applications.
            </p>
            <div
              className={`pt-2 text-xs font-mono ${
                isDarkTheme ? 'text-white/40' : 'text-[#8c8c8c]'
              }`}
            >
              {PERSONAL_INFO.copyright}
            </div>
          </div>
        </div>

        {/* Footer Graphic Artwork */}
        <div className="relative rounded-3xl overflow-hidden border border-inherit mt-4 bg-black/5 aspect-[16/5] max-h-48 flex items-center justify-center">
          <img
            src={PERSONAL_INFO.footerGraphic}
            alt="Footer wave artwork"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none pointer-events-none opacity-90"
            loading="lazy"
          />
        </div>
      </div>
    </footer>
  );
};
