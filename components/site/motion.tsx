'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const REVEAL_SELECTOR = '[data-reveal]:not(.is-in)';
const SCROLLED_OFFSET = 40;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Scroll-driven effects for the whole site: reveal, parallax, zoom, header state and progress bar. */
export function Motion() {
  const path = usePathname();

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (reduced) el.classList.add('is-in');
        else observer.observe(el);
      });
    };
    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const root = document.documentElement;
      root.toggleAttribute('data-scrolled', y > SCROLLED_OFFSET);
      const max = root.scrollHeight - vh;
      root.style.setProperty('--scroll-progress', String(max > 0 ? y / max : 0));
      if (reduced) return;

      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const speed = Number(el.dataset.parallax) || 0.15;
        const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
        el.style.setProperty('--parallax', `${offset.toFixed(1)}px`);
      });

      document.querySelectorAll<HTMLElement>('[data-zoom]').forEach((el) => {
        const rect = el.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
        el.style.setProperty('--zoom', (1.18 - progress * 0.18).toFixed(3));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [path]);

  return <div className="scrollprogress" aria-hidden="true" />;
}
