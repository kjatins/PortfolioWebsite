import React, { useState, useEffect, useCallback } from 'react';
import { PAGES, PageSlug, ROUTE_TO_SLUG } from './data/pages';
import { PageRenderer } from './components/PageRenderer';
import { Toast } from './components/Toast';
import { CustomCursor } from './components/CustomCursor';

function getSlugFromPath(pathname: string, hash: string): PageSlug {
  const cleanPath = pathname.replace(/\/$/, '') || '/';
  if (ROUTE_TO_SLUG[cleanPath]) {
    return ROUTE_TO_SLUG[cleanPath];
  }
  // Check hash fallback
  if (hash) {
    const cleanHash = hash.replace(/^#\/?/, '/');
    if (ROUTE_TO_SLUG[cleanHash]) {
      return ROUTE_TO_SLUG[cleanHash];
    }
  }
  return 'home';
}

export const App: React.FC = () => {
  const [currentSlug, setCurrentSlug] = useState<PageSlug>(() =>
    getSlugFromPath(window.location.pathname, window.location.hash)
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync route on popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const slug = getSlugFromPath(window.location.pathname, window.location.hash);
      setCurrentSlug(slug);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title and meta description when currentSlug changes
  useEffect(() => {
    const page = PAGES[currentSlug] || PAGES.home;
    document.title = page.title || 'Jatin Kumar ツ Product Designer';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && page.description) {
      metaDesc.setAttribute('content', page.description);
    }
  }, [currentSlug]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  }, []);

  const handleNavigate = useCallback((slug: PageSlug, hash?: string) => {
    const targetPage = PAGES[slug] || PAGES.home;
    const targetUrl = targetPage.route + (hash ? `#${hash}` : '');

    // Update history
    window.history.pushState(null, '', targetUrl);
    setCurrentSlug(slug);

    if (hash === 'Work' || hash === 'work') {
      setTimeout(() => {
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
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const currentPage = PAGES[currentSlug] || PAGES.home;

  return (
    <main className="w-full min-h-screen bg-[#fdfdfc] text-[#1c1c1c] overflow-x-hidden relative selection:bg-neutral-800 selection:text-neutral-50">
      <CustomCursor />
      <PageRenderer
        page={currentPage}
        onNavigate={handleNavigate}
        onShowToast={showToast}
      />

      {/* Action Toast Feedback for Copied Items */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </main>
  );
};

export default App;
