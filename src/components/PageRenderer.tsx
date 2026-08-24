import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PageData, PageSlug } from '../data/pages';

interface PageRendererProps {
  page: PageData;
  onNavigate: (slug: PageSlug, hash?: string) => void;
  onShowToast: (message: string) => void;
}

export const PageRenderer: React.FC<PageRendererProps> = ({
  page,
  onNavigate,
  onShowToast,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; right: number } | null>(null);
  const [isLightHeader, setIsLightHeader] = useState(true);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Inject or update the scoped styles for the current page
  useEffect(() => {
    let styleEl = document.getElementById('framer-page-styles') as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'framer-page-styles';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = page.styles;
  }, [page.styles]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [page.slug]);

  // Dynamic Header Theme Switching (Light vs Dark mode based on section background luminance)
  useEffect(() => {
    const updateHeaderTheme = () => {
      const headerContainers = document.querySelectorAll<HTMLElement>(
        '.framer-k0tl9o-container, .framer-Qwri2'
      );
      if (!headerContainers.length) return;

      // Sample elements right beneath the fixed header
      const sampleY = 50;
      const sampleX = window.innerWidth / 2;
      const elements = document.elementsFromPoint(sampleX, sampleY);

      // Find the first content element that is NOT the header itself
      let isLightBg = false;
      for (const el of elements) {
        if (
          el.closest('.framer-k0tl9o-container') ||
          el.closest('.framer-Qwri2') ||
          el.closest('.framer-overlay-dropdown')
        ) {
          continue;
        }

        const compStyle = window.getComputedStyle(el);
        const bg = compStyle.backgroundColor;

        // Parse rgb / rgba
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (match) {
          const r = parseInt(match[1], 10);
          const g = parseInt(match[2], 10);
          const b = parseInt(match[3], 10);
          const a = match[4] !== undefined ? parseFloat(match[4]) : 1;

          // Only consider opaque/semi-opaque backgrounds
          if (a > 0.3) {
            // Perceived luminance formula (ITU-R BT.709)
            const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
            isLightBg = luminance > 0.45;
            break;
          }
        }
      }

      // If page is 'home' or 'approach' by default hero is light background
      if (window.scrollY < 80 && (page.slug === 'home' || page.slug === 'approach')) {
        isLightBg = true;
      }

      setIsLightHeader(isLightBg);

      headerContainers.forEach((header) => {
        if (isLightBg) {
          header.classList.add('header-light-mode');
          header.classList.remove('header-dark-mode');
        } else {
          header.classList.remove('header-light-mode');
          header.classList.add('header-dark-mode');
        }
      });
    };

    window.addEventListener('scroll', updateHeaderTheme, { passive: true });
    window.addEventListener('resize', updateHeaderTheme, { passive: true });
    // Initial run after DOM render
    const timer = setTimeout(updateHeaderTheme, 80);

    return () => {
      window.removeEventListener('scroll', updateHeaderTheme);
      window.removeEventListener('resize', updateHeaderTheme);
      clearTimeout(timer);
    };
  }, [page.slug]);

  // Copy helper
  const copyToClipboard = useCallback(
    (text: string, label: string) => {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(
          () => onShowToast(`${label} copied to clipboard`),
          () => onShowToast(`Copied: ${text}`)
        );
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          onShowToast(`${label} copied to clipboard`);
        } catch {
          onShowToast(`Copied: ${text}`);
        }
        document.body.removeChild(textArea);
      }
    },
    [onShowToast]
  );

  // Close menu on click outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.closest('.framer-overlay-dropdown') ||
        target.closest('.framer-1y832nb') ||
        target.closest('[data-framer-name="Menu button"]')
      ) {
        return;
      }
      setMenuOpen(false);
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [menuOpen]);

  // Calculate and update menu fixed position aligning with header's 9-dots button
  const calculateMenuPosition = useCallback((menuBtn: HTMLElement) => {
    const rect = menuBtn.getBoundingClientRect();
    // The menu card has padding: 8px top, 8px right, 16px bottom, 16px left.
    // Total width is 328px.
    // The 9-dots button inside the menu is 40x40px, placed at padding-right: 8px, padding-top: 8px.
    // Thus:
    // top = rect.top - 8
    // left = rect.right + 8 - 328
    const top = rect.top - 8;
    const left = Math.max(12, rect.right + 8 - 328);
    setMenuPosition({ top, left });
  }, []);

  // Keep menu position dynamically synchronized on window scroll / resize
  useEffect(() => {
    if (!menuOpen) return;

    const handleUpdatePos = () => {
      const menuBtn = document.querySelector<HTMLElement>(
        '.framer-1y832nb, [data-framer-name="Menu button"]'
      );
      if (menuBtn) {
        calculateMenuPosition(menuBtn);
      }
    };

    window.addEventListener('resize', handleUpdatePos, { passive: true });
    window.addEventListener('scroll', handleUpdatePos, { passive: true });
    return () => {
      window.removeEventListener('resize', handleUpdatePos);
      window.removeEventListener('scroll', handleUpdatePos);
    };
  }, [menuOpen, calculateMenuPosition]);

  // Attach hover and click delegations to handle 9-dots menu, internal routing, mailto, copy, external links
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Hover handler for 9-dots menu button in header
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const menuBtn = target.closest<HTMLElement>(
        '.framer-1y832nb, [data-framer-name="Menu button"]'
      );
      if (menuBtn && !target.closest('.framer-overlay-dropdown')) {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
        calculateMenuPosition(menuBtn);
        setMenuOpen(true);
      }
    };

    // Hover out handler with small grace delay so user can move mouse into dropdown seamlessly
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const menuBtn = target.closest<HTMLElement>(
        '.framer-1y832nb, [data-framer-name="Menu button"]'
      );
      if (menuBtn) {
        const related = e.relatedTarget as HTMLElement | null;
        if (related && related.closest('.framer-overlay-dropdown')) {
          return;
        }
        closeTimeoutRef.current = setTimeout(() => {
          setMenuOpen(false);
        }, 250);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Check if user clicked the 9-dots Menu button in the header
      const menuBtn = target.closest<HTMLElement>(
        '.framer-1y832nb, [data-framer-name="Menu button"]'
      );
      if (menuBtn && !target.closest('.framer-overlay-dropdown')) {
        e.preventDefault();
        e.stopPropagation();
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
        calculateMenuPosition(menuBtn);
        setMenuOpen((prev) => !prev);
        return;
      }

      // 2. Check if user clicked an anchor or an element inside an anchor
      const anchor = target.closest('a');
      const nestedLink = target.closest('[data-nested-link]') as HTMLElement | null;
      const clickable = anchor || nestedLink;

      if (clickable) {
        const href = clickable.getAttribute('href') || (clickable as HTMLAnchorElement).href || '';

        // Mailto links
        if (href.startsWith('mailto:')) {
          e.preventDefault();
          e.stopPropagation();
          const email = href.replace('mailto:', '').split('?')[0].trim() || 'jkumarsheoran2612@gmail.com';
          copyToClipboard(email, 'Email address');
          return;
        }

        // Tel links
        if (href.startsWith('tel:')) {
          e.preventDefault();
          e.stopPropagation();
          const phone = href.replace('tel:', '').trim() || '+91 7746 845046';
          copyToClipboard(phone, 'Phone number');
          return;
        }

        // Work section hash anchor links (e.g., ./#Work, /#Work, #Work, #work)
        if (
          href === './#Work' ||
          href === '/#Work' ||
          href === '#Work' ||
          href === '#work' ||
          href.endsWith('#Work') ||
          href.endsWith('#work')
        ) {
          e.preventDefault();
          e.stopPropagation();
          setMenuOpen(false);
          if (page.slug === 'home') {
            const workSection =
              document.getElementById('Work') ||
              document.getElementById('work') ||
              document.querySelector('[data-framer-name="Work"]') ||
              document.querySelector('.framer-1vuhmw2') ||
              document.querySelector('.framer-8z334t');
            if (workSection) {
              workSection.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
            }
          } else {
            onNavigate('home', 'Work');
          }
          return;
        }

        // Internal page routing
        const cleanHref = href.replace(/^\.\//, '/').replace(/\.html$/, '');

        if (cleanHref === '/' || cleanHref === '' || cleanHref === './') {
          e.preventDefault();
          e.stopPropagation();
          setMenuOpen(false);
          onNavigate('home');
          return;
        }

        if (cleanHref === '/approach' || cleanHref === 'approach') {
          e.preventDefault();
          e.stopPropagation();
          setMenuOpen(false);
          onNavigate('approach');
          return;
        }

        if (cleanHref === '/aiappbuilder' || cleanHref === 'aiappbuilder') {
          e.preventDefault();
          e.stopPropagation();
          setMenuOpen(false);
          onNavigate('aiappbuilder');
          return;
        }

        if (cleanHref === '/dubaiai' || cleanHref === 'dubaiai') {
          e.preventDefault();
          e.stopPropagation();
          setMenuOpen(false);
          onNavigate('dubaiai');
          return;
        }

        if (cleanHref === '/sony' || cleanHref === 'sony') {
          e.preventDefault();
          e.stopPropagation();
          setMenuOpen(false);
          onNavigate('sony');
          return;
        }

        if (cleanHref === '/thefriedkingroup' || cleanHref === 'thefriedkingroup') {
          e.preventDefault();
          e.stopPropagation();
          setMenuOpen(false);
          onNavigate('thefriedkingroup');
          return;
        }

        if (cleanHref === '/amnhealthcare' || cleanHref === 'amnhealthcare') {
          e.preventDefault();
          e.stopPropagation();
          setMenuOpen(false);
          onNavigate('amnhealthcare');
          return;
        }

        // External links (Google Drive Resume, LinkedIn, Behance, Dribbble, Instagram, external client links)
        if (href.startsWith('http://') || href.startsWith('https://')) {
          clickable.setAttribute('target', '_blank');
          clickable.setAttribute('rel', 'noopener noreferrer');
          return;
        }
      }
    };

    container.addEventListener('mouseover', handleMouseOver);
    container.addEventListener('mouseout', handleMouseOut);
    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('mouseover', handleMouseOver);
      container.removeEventListener('mouseout', handleMouseOut);
      container.removeEventListener('click', handleClick);
    };
  }, [page.slug, onNavigate, copyToClipboard, calculateMenuPosition]);

  // Determine menu variant:
  // If header is in light mode (page background is light), menu is dark (Variant 2).
  // If header is in dark mode (page background is dark), menu is white (Variant 1).
  const isDarkMenu = isLightHeader;

  // Exact Framer Social SVG Data URLs
  const linkedInSvg = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" overflow="visible"><g><path d="M 4 24 C 1.791 24 0 22.209 0 20 L 0 4 C 0 1.791 1.791 0 4 0 L 20 0 C 22.209 0 24 1.791 24 4 L 24 20 C 24 22.209 22.209 24 20 24 Z" fill="${isDarkMenu ? 'rgb(41, 41, 41)' : 'rgb(230, 230, 230)'}"></path><path d="M 5.988 9.62 L 5.988 18 L 8.548 18 L 8.548 9.62 Z" fill="${isDarkMenu ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'}"></path><path d="M 7.248 8.6 C 8.108 8.6 8.648 8.02 8.628 7.3 C 8.628 6.56 8.108 6 7.288 6 C 6.468 6 5.928 6.56 5.928 7.3 C 5.928 8.02 6.448 8.6 7.248 8.6 Z" fill="${isDarkMenu ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'}"></path><path d="M 15.348 13.36 L 15.348 18 L 17.928 18 L 17.928 13.06 C 17.928 10.58 16.648 9.44 14.968 9.44 C 13.588 9.44 12.748 10.24 12.408 10.8 L 12.368 10.8 L 12.248 9.62 L 10.028 9.62 C 10.048 10.38 10.088 11.26 10.088 12.3 L 10.088 18 L 12.648 18 L 12.648 13.18 C 12.648 12.94 12.668 12.7 12.728 12.52 C 12.928 12.04 13.348 11.54 14.048 11.54 C 14.988 11.54 15.348 12.28 15.348 13.36 Z" fill="${isDarkMenu ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'}"></path></g></svg>`
  )}`;

  const behanceSvg = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" overflow="visible"><g><path d="M 4 24 C 1.791 24 0 22.209 0 20 L 0 4 C 0 1.791 1.791 0 4 0 L 20 0 C 22.209 0 24 1.791 24 4 L 24 20 C 24 22.209 22.209 24 20 24 Z" fill="${isDarkMenu ? 'rgb(41, 41, 41)' : 'rgb(230, 230, 230)'}"></path><path d="M 16.224 9.935 C 12.783 9.935 12.778 13.362 12.778 13.381 C 12.778 13.381 12.544 16.812 16.224 16.812 C 16.224 16.812 19.294 16.985 19.294 14.426 L 17.719 14.426 C 17.719 14.426 17.771 15.392 16.28 15.392 C 16.28 15.392 14.705 15.495 14.705 13.835 L 19.35 13.835 C 19.35 13.835 19.861 9.94 16.228 9.94 Z M 14.681 12.631 C 14.681 12.631 14.874 11.252 16.256 11.252 C 17.644 11.252 17.621 12.631 17.621 12.631 L 14.677 12.631 Z M 10.744 11.749 C 10.744 11.749 12.108 11.651 12.108 10.043 C 12.108 8.44 10.992 7.657 9.572 7.657 L 4.903 7.657 L 4.903 16.629 L 9.567 16.629 C 9.567 16.629 12.417 16.718 12.417 13.981 C 12.417 13.981 12.539 11.754 10.739 11.754 Z M 6.966 9.246 L 9.577 9.246 C 9.577 9.246 10.21 9.246 10.21 10.179 C 10.21 11.112 9.839 11.248 9.417 11.248 L 6.971 11.248 L 6.971 9.246 Z M 9.446 15.031 L 6.966 15.031 L 6.966 12.631 L 9.577 12.631 C 9.577 12.631 10.524 12.621 10.519 13.868 C 10.519 14.918 9.816 15.026 9.446 15.035 Z M 14.297 8.182 L 14.297 9.288 L 18 9.288 L 18 8.182 Z" fill="${isDarkMenu ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'}"></path></g></svg>`
  )}`;

  const dribbbleSvg = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" overflow="visible"><g><path d="M 4 24 C 1.791 24 0 22.209 0 20 L 0 4 C 0 1.791 1.791 0 4 0 L 20 0 C 22.209 0 24 1.791 24 4 L 24 20 C 24 22.209 22.209 24 20 24 Z" fill="${isDarkMenu ? 'rgb(41, 41, 41)' : 'rgb(230, 230, 230)'}"></path><path d="M 12.169 18.762 C 8.525 18.762 5.562 15.804 5.562 12.164 C 5.562 8.52 8.525 5.562 12.169 5.562 C 15.814 5.562 18.777 8.52 18.777 12.159 C 18.777 15.798 15.814 18.762 12.169 18.762 Z M 17.739 13.062 C 17.548 13 15.995 12.541 14.224 12.82 C 14.962 14.843 15.262 16.495 15.318 16.836 C 16.588 15.984 17.492 14.632 17.739 13.062 Z M 14.374 17.357 C 14.291 16.862 13.961 15.138 13.171 13.083 C 13.16 13.088 13.145 13.093 13.135 13.093 C 9.95 14.203 8.809 16.408 8.705 16.614 C 9.66 17.357 10.863 17.801 12.169 17.801 C 12.949 17.807 13.697 17.647 14.374 17.357 Z M 7.978 15.938 C 8.107 15.721 9.655 13.16 12.567 12.216 C 12.639 12.19 12.717 12.169 12.789 12.149 C 12.649 11.829 12.495 11.509 12.329 11.194 C 9.511 12.035 6.775 11.999 6.527 11.994 C 6.527 12.051 6.522 12.107 6.522 12.164 C 6.527 13.615 7.074 14.936 7.978 15.938 Z M 6.646 11.013 C 6.899 11.018 9.222 11.028 11.865 10.326 C 10.93 8.664 9.919 7.27 9.774 7.069 C 8.189 7.812 7.012 9.268 6.646 11.013 Z M 10.848 6.687 C 11.003 6.893 12.03 8.287 12.954 9.986 C 14.962 9.232 15.809 8.096 15.912 7.952 C 14.916 7.069 13.604 6.532 12.169 6.532 C 11.715 6.532 11.271 6.589 10.848 6.687 Z M 16.537 8.602 C 16.418 8.762 15.473 9.975 13.388 10.827 C 13.517 11.096 13.646 11.369 13.764 11.643 C 13.806 11.741 13.847 11.839 13.888 11.932 C 15.767 11.694 17.631 12.076 17.817 12.113 C 17.801 10.786 17.326 9.562 16.537 8.602 Z" fill="${isDarkMenu ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'}"></path></g></svg>`
  )}`;

  const instagramSvg = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" overflow="visible"><g><path d="M 4 24 C 1.791 24 0 22.209 0 20 L 0 4 C 0 1.791 1.791 0 4 0 L 20 0 C 22.209 0 24 1.791 24 4 L 24 20 C 24 22.209 22.209 24 20 24 Z" fill="${isDarkMenu ? 'rgb(41, 41, 41)' : 'rgb(230, 230, 230)'}"></path><path d="M 12.001 5.4 C 10.209 5.4 9.984 5.408 9.28 5.44 C 8.577 5.472 8.097 5.584 7.678 5.747 C 7.244 5.915 6.875 6.141 6.509 6.508 C 6.141 6.875 5.916 7.243 5.747 7.677 C 5.583 8.097 5.472 8.577 5.44 9.279 C 5.409 9.983 5.4 10.208 5.4 12 C 5.4 13.793 5.408 14.017 5.44 14.721 C 5.473 15.424 5.584 15.903 5.747 16.323 C 5.916 16.757 6.141 17.125 6.508 17.492 C 6.875 17.859 7.243 18.085 7.677 18.254 C 8.097 18.417 8.577 18.528 9.279 18.561 C 9.983 18.593 10.208 18.6 12 18.6 C 13.793 18.6 14.017 18.593 14.721 18.561 C 15.424 18.528 15.904 18.417 16.324 18.254 C 16.758 18.085 17.125 17.859 17.492 17.492 C 17.859 17.125 18.085 16.757 18.254 16.323 C 18.416 15.903 18.527 15.424 18.56 14.721 C 18.592 14.017 18.6 13.793 18.6 12 C 18.6 10.208 18.592 9.983 18.56 9.279 C 18.527 8.576 18.416 8.097 18.254 7.677 C 18.085 7.243 17.859 6.875 17.492 6.508 C 17.125 6.141 16.758 5.915 16.323 5.747 C 15.903 5.584 15.423 5.472 14.72 5.44 C 14.016 5.408 13.792 5.4 11.999 5.4 Z M 11.409 6.59 C 11.585 6.589 11.781 6.59 12.001 6.59 C 13.763 6.59 13.972 6.596 14.668 6.628 C 15.311 6.657 15.661 6.765 15.893 6.855 C 16.201 6.975 16.421 7.118 16.652 7.349 C 16.883 7.58 17.026 7.8 17.146 8.108 C 17.236 8.34 17.344 8.689 17.373 9.333 C 17.405 10.029 17.411 10.238 17.411 11.999 C 17.411 13.76 17.405 13.969 17.373 14.665 C 17.344 15.309 17.236 15.658 17.146 15.89 C 17.026 16.198 16.883 16.418 16.652 16.648 C 16.421 16.879 16.201 17.022 15.893 17.142 C 15.661 17.233 15.311 17.34 14.668 17.369 C 13.972 17.401 13.763 17.408 12.001 17.408 C 10.239 17.408 10.03 17.401 9.334 17.369 C 8.69 17.34 8.341 17.232 8.108 17.142 C 7.8 17.022 7.58 16.879 7.349 16.648 C 7.118 16.417 6.975 16.198 6.856 15.89 C 6.765 15.657 6.658 15.308 6.628 14.665 C 6.597 13.969 6.59 13.76 6.59 11.997 C 6.59 10.235 6.597 10.027 6.628 9.331 C 6.658 8.688 6.765 8.338 6.856 8.106 C 6.975 7.798 7.118 7.578 7.349 7.347 C 7.58 7.116 7.8 6.973 8.108 6.853 C 8.341 6.762 8.69 6.655 9.334 6.625 C 9.943 6.598 10.179 6.589 11.409 6.588 Z M 15.524 7.686 C 15.087 7.686 14.732 8.04 14.732 8.477 C 14.732 8.915 15.087 9.269 15.524 9.269 C 15.961 9.269 16.316 8.915 16.316 8.477 C 16.316 8.04 15.961 7.686 15.524 7.686 Z M 12.001 8.611 C 10.129 8.611 8.612 10.129 8.612 12 C 8.612 13.872 10.129 15.389 12.001 15.389 C 13.873 15.389 15.39 13.872 15.39 12 C 15.39 10.129 13.873 8.611 12.001 8.611 Z M 12.001 9.8 C 13.216 9.8 14.201 10.785 14.201 12 C 14.201 13.215 13.216 14.2 12.001 14.2 C 10.786 14.2 9.801 13.215 9.801 12 C 9.801 10.785 10.786 9.8 12.001 9.8 Z" fill="${isDarkMenu ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'}"></path></g></svg>`
  )}`;

  return (
    <div className="w-full min-h-screen relative">
      <div
        ref={containerRef}
        id="framer-page-root"
        className="w-full min-h-screen relative"
        dangerouslySetInnerHTML={{ __html: page.html }}
      />

      {/* 9-Dots Dropdown Menu Overlay (Variant 1 for Dark bg, Variant 2 for Light bg) */}
      {menuOpen && menuPosition && (
        <div id="overlay">
          <div
            className="framer-overlay-dropdown"
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              visibility: 'visible',
              position: 'fixed',
              zIndex: 99999,
            }}
            onMouseEnter={() => {
              if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
                closeTimeoutRef.current = null;
              }
            }}
            onMouseLeave={() => {
              closeTimeoutRef.current = setTimeout(() => {
                setMenuOpen(false);
              }, 250);
            }}
          >
            {/* Safe Area polygon prevents premature hover exit */}
            <div
              data-safearea="true"
              style={{
                position: 'absolute',
                height: '180px',
                width: '328px',
                clipPath: 'polygon(298px 14px, 0px 0px, 328px 0px)',
                inset: 'auto auto 0px 0px',
                pointerEvents: 'auto',
              }}
            />

            <div
              role="dialog"
              style={{
                position: 'relative',
                width: '328px',
                maxWidth: 'calc(100vw - 24px)',
                backgroundColor: isDarkMenu ? '#000000' : '#ffffff',
                borderRadius: '12px',
                border: isDarkMenu ? '1px solid rgb(26, 26, 26)' : '1px solid rgb(240, 240, 240)',
                padding: '8px 8px 16px 16px',
                color: isDarkMenu ? '#ffffff' : '#0d0d0d',
                boxShadow: 'none',
                boxSizing: 'border-box',
              }}
            >
              {/* Top Section: 2 Columns of Links (232px) + 9-Dots Close Button (40px) */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  width: '100%',
                }}
              >
                {/* 2-column grid of Navigation Links: 232px wide matching header's framer-1dzw568 */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '112px 112px',
                    columnGap: '8px',
                    rowGap: '8px',
                    width: '232px',
                    paddingTop: '8px',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Row 1, Col 1: Work */}
                  <a
                    href="./#Work"
                    style={{
                      width: '112px',
                      height: '24px',
                      fontFamily: '"Geist", "Geist Placeholder", sans-serif',
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: 400,
                      color: isDarkMenu ? '#ffffff' : '#0d0d0d',
                      textDecoration: 'none',
                      display: 'block',
                      cursor: 'pointer',
                      whiteSpace: 'pre',
                      transition: 'opacity 0.15s ease',
                    }}
                    className="hover:opacity-70"
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      if (page.slug === 'home') {
                        const workSection =
                          document.getElementById('Work') ||
                          document.getElementById('work') ||
                          document.querySelector('[data-framer-name="Work"]') ||
                          document.querySelector('.framer-1vuhmw2') ||
                          document.querySelector('.framer-8z334t');
                        if (workSection) {
                          workSection.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
                        }
                      } else {
                        onNavigate('home', 'Work');
                      }
                    }}
                  >
                    Work
                  </a>

                  {/* Row 1, Col 2: Approach */}
                  <a
                    href="./approach"
                    style={{
                      width: '112px',
                      height: '24px',
                      fontFamily: '"Geist", "Geist Placeholder", sans-serif',
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: 400,
                      color: isDarkMenu ? '#ffffff' : '#0d0d0d',
                      textDecoration: 'none',
                      display: 'block',
                      cursor: 'pointer',
                      whiteSpace: 'pre',
                      transition: 'opacity 0.15s ease',
                    }}
                    className="hover:opacity-70"
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      onNavigate('approach');
                    }}
                  >
                    Approach
                  </a>

                  {/* Row 2, Col 1: Resume */}
                  <a
                    href="https://drive.google.com/file/d/1i2GLOS4cnr8rwk9XR1n9GCvhX-IWXjG2/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '112px',
                      height: '24px',
                      fontFamily: '"Geist", "Geist Placeholder", sans-serif',
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: 400,
                      color: isDarkMenu ? '#ffffff' : '#0d0d0d',
                      textDecoration: 'none',
                      display: 'block',
                      cursor: 'pointer',
                      whiteSpace: 'pre',
                      transition: 'opacity 0.15s ease',
                    }}
                    className="hover:opacity-70"
                    onClick={() => setMenuOpen(false)}
                  >
                    Resume
                  </a>

                  {/* Row 2, Col 2: Let's Connect */}
                  <a
                    href="mailto:jkumarsheoran2612@gmail.com"
                    style={{
                      width: '112px',
                      height: '24px',
                      fontFamily: '"Geist", "Geist Placeholder", sans-serif',
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: 400,
                      color: isDarkMenu ? '#ffffff' : '#0d0d0d',
                      textDecoration: 'none',
                      display: 'block',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'opacity 0.15s ease',
                    }}
                    className="hover:opacity-70"
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      copyToClipboard('jkumarsheoran2612@gmail.com', 'Email address');
                    }}
                  >
                    Let’s Connect
                  </a>
                </div>

                {/* 9-Dots Close Button inside Menu: Exactly 40x40px */}
                <div
                  className="cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    padding: 0,
                  }}
                  title="Close Menu"
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* Row 1 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', height: '5px', width: '100%' }}>
                      <div style={{ width: '5px', height: '5px', backgroundColor: isDarkMenu ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)', borderRadius: '9px' }} />
                      <div style={{ width: '5px', height: '5px', backgroundColor: isDarkMenu ? '#ffffff' : '#000000', borderRadius: '9px' }} />
                      <div style={{ width: '5px', height: '5px', backgroundColor: isDarkMenu ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)', borderRadius: '9px' }} />
                    </div>
                    {/* Row 2 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', height: '5px', width: '100%' }}>
                      <div style={{ width: '5px', height: '5px', backgroundColor: isDarkMenu ? '#ffffff' : '#000000', borderRadius: '9px' }} />
                      <div style={{ width: '5px', height: '5px', backgroundColor: isDarkMenu ? '#ffffff' : '#000000', borderRadius: '9px' }} />
                      <div style={{ width: '5px', height: '5px', backgroundColor: isDarkMenu ? '#ffffff' : '#000000', borderRadius: '9px' }} />
                    </div>
                    {/* Row 3 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', height: '5px', width: '100%' }}>
                      <div style={{ width: '5px', height: '5px', backgroundColor: isDarkMenu ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)', borderRadius: '9px' }} />
                      <div style={{ width: '5px', height: '5px', backgroundColor: isDarkMenu ? '#ffffff' : '#000000', borderRadius: '9px' }} />
                      <div style={{ width: '5px', height: '5px', backgroundColor: isDarkMenu ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)', borderRadius: '9px' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: isDarkMenu ? 'rgb(26, 26, 26)' : 'rgb(240, 240, 240)',
                  marginTop: '16px',
                  marginBottom: '12px',
                }}
              />

              {/* RESOURCES Section */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    fontFamily: '"Geist", "Geist Placeholder", sans-serif',
                    fontSize: '11px',
                    lineHeight: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgb(115, 115, 115)',
                  }}
                >
                  Resources
                </div>

                {/* 4 Social Icon Links */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/jatinkumar05/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer transition-opacity hover:opacity-75"
                    style={{ width: '24px', height: '24px', flexShrink: 0, display: 'inline-block' }}
                    title="LinkedIn"
                  >
                    <img
                      src={linkedInSvg}
                      alt="LinkedIn"
                      style={{ width: '24px', height: '24px', display: 'block', borderRadius: '4px' }}
                    />
                  </a>

                  {/* Behance */}
                  <a
                    href="https://www.behance.net/jatinkumar05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer transition-opacity hover:opacity-75"
                    style={{ width: '24px', height: '24px', flexShrink: 0, display: 'inline-block' }}
                    title="Behance"
                  >
                    <img
                      src={behanceSvg}
                      alt="Behance"
                      style={{ width: '24px', height: '24px', display: 'block', borderRadius: '4px' }}
                    />
                  </a>

                  {/* Dribbble */}
                  <a
                    href="https://dribbble.com/jatinkumar05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer transition-opacity hover:opacity-75"
                    style={{ width: '24px', height: '24px', flexShrink: 0, display: 'inline-block' }}
                    title="Dribbble"
                  >
                    <img
                      src={dribbbleSvg}
                      alt="Dribbble"
                      style={{ width: '24px', height: '24px', display: 'block', borderRadius: '4px' }}
                    />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/_jatinsheoran"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer transition-opacity hover:opacity-75"
                    style={{ width: '24px', height: '24px', flexShrink: 0, display: 'inline-block' }}
                    title="Instagram"
                  >
                    <img
                      src={instagramSvg}
                      alt="Instagram"
                      style={{ width: '24px', height: '24px', display: 'block', borderRadius: '4px' }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
