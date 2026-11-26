import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, ArrowUp, Phone, Mail } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';
import { RevealOnScroll } from '../components/RevealOnScroll';

export const FooterSection: React.FC = () => {
  const { thanks, club, rsvp } = eventConfig;
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

      <RevealOnScroll variant="up" className="max-w-4xl mx-auto text-center relative z-10">
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

          {/* Contact Info Links */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {rsvp.contactHotline && (
              <a
                href={`https://zalo.me/${rsvp.contactHotline.replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-[#e0f2fe] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#7dd3fc]" />
                <span>Zalo / Hotline: {rsvp.contactHotline}</span>
              </a>
            )}
            {rsvp.contactEmail && (
              <a
                href={`mailto:${rsvp.contactEmail}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-[#e0f2fe] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#7dd3fc]" />
                <span>{rsvp.contactEmail}</span>
              </a>
            )}
            {rsvp.facebookUrl && (
              <a
                href={rsvp.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-[#e0f2fe] transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-[#7dd3fc] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                <span>Facebook CLB</span>
              </a>
            )}
          </div>

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
      </RevealOnScroll>
    </footer>
  );
};
