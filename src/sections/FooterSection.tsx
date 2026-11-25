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
            confetti({
              particleCount: 70,
              spread: 80,
              origin: { y: 0.85 },
              colors: ['#88cef4', '#0284c7', '#f5c542', '#ffffff'],
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
    <footer
      ref={footerRef}
      className="relative w-full pt-16 pb-20 sm:pb-14 px-4 overflow-hidden bg-[#041f3d] bg-gradient-to-b from-[#041f3d] via-[#0a3d6b] to-[#041f3d] text-white"
    >
      {/* Decorative ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-gradient-to-t from-[#38bdf8]/15 via-[#f5c542]/10 to-transparent blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Heart Icon */}
        <div className="inline-flex p-3 rounded-full bg-white/10 text-[#f5c542] border border-white/25 mb-4 animate-float-slow">
          <Heart className="w-6 h-6 fill-[#f5c542]/40" />
        </div>

        {/* Headline */}
        <h3 className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#7dd3fc] font-display mb-2">
          {thanks.headline}
        </h3>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight font-display max-w-2xl mx-auto leading-tight mb-4">
          {thanks.title}
        </h2>

        {/* Message */}
        <p className="text-[#e0f2fe] text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-3">
          {thanks.message}
        </p>
        <p className="text-[#bae6fd]/85 text-xs sm:text-sm max-w-lg mx-auto font-light italic mb-8">
          “{thanks.subMessage}”
        </p>

        {/* Club Logo, Institution & Optional Slogan on smaller line */}
        <div className="flex flex-col items-center justify-center pt-8 border-t border-white/15">
          <div className="p-2.5 rounded-2xl bg-white shadow-lg mb-3">
            <img
              src={club.logo}
              alt={club.name}
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
            />
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white tracking-wide font-display">
            {club.name} ({club.shortName})
          </h4>
          <p className="text-xs text-[#bae6fd]/85 mt-1">
            {club.faculty} • {club.university}
          </p>
          {club.slogan && club.slogan.trim() !== '' && (
            <p className="text-[11px] text-[#7dd3fc]/80 italic mt-1">
              Khẩu hiệu: “{club.slogan}”
            </p>
          )}

          <p className="text-[#bae6fd]/60 text-xs mt-6">
            © {thanks.copyrightYear} {club.name} ({club.shortName}) • {club.university}
          </p>
        </div>

        {/* Scroll To Top Button */}
        <div className="mt-8">
          <button
            onClick={scrollToTop}
            aria-label="Cuộn lên đầu trang"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold font-display text-[#041f3d] bg-[#88cef4] hover:bg-[#7dd3fc] transition-all shadow-lg group cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#041f3d] group-hover:-translate-y-0.5 transition-transform" />
            <span>Về đầu trang</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
