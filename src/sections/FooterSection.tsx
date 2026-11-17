import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, ArrowUp } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';

export const FooterSection: React.FC = () => {
  const { thanks, club } = eventConfig;
  const footerRef = useRef<HTMLElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            // Gentle celebratory sparkles
            confetti({
              particleCount: 70,
              spread: 80,
              origin: { y: 0.85 },
              colors: ['#f59e0b', '#38bdf8', '#ec4899', '#a855f7'],
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative w-full pt-16 pb-12 px-4 overflow-hidden border-t border-slate-800/80 bg-slate-950">
      {/* Decorative ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-gradient-to-t from-amber-500/10 via-sky-500/5 to-transparent blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Heart Icon */}
        <div className="inline-flex p-3 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 mb-4 animate-float-slow">
          <Heart className="w-6 h-6 fill-rose-500/40" />
        </div>

        {/* Headline */}
        <h3 className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-amber-300 mb-2">
          {thanks.headline}
        </h3>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Playfair_Display'] max-w-2xl mx-auto leading-tight mb-4">
          {thanks.title}
        </h2>

        {/* Message */}
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-3">
          {thanks.message}
        </p>
        <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto font-light italic mb-8">
          "{thanks.subMessage}"
        </p>

        {/* Club Logo and Details */}
        <div className="flex flex-col items-center justify-center pt-8 border-t border-slate-800/80">
          <img
            src={club.logo}
            alt={club.name}
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow mb-3"
          />
          <h4 className="text-base font-bold text-white tracking-wide">
            {club.name} ({club.shortName})
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            {club.subTitle}
          </p>

          <p className="text-slate-500 text-xs mt-6">
            Copyright © {thanks.copyrightYear} {club.name}. All rights reserved.
          </p>
        </div>

        {/* Scroll To Top Button */}
        <div className="mt-8">
          <button
            onClick={scrollToTop}
            aria-label="Cuộn lên đầu trang"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-md group"
          >
            <ArrowUp className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
            <span>Về đầu trang</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
