import React from 'react';
import { Envelope } from '../components/Envelope';
import { Sparkles, Clock, MapPin, ChevronDown } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';

interface HeroSectionProps {
  isOpened: boolean;
  onOpen: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isOpened, onOpen }) => {
  const { club, event } = eventConfig;

  if (!isOpened) {
    return <Envelope onOpen={onOpen} />;
  }

  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-20 overflow-hidden sn2-hero-bg">
      {/* Ambient sky-blue glow with subtle scroll parallax */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] sm:w-[650px] h-[360px] sm:h-[650px] bg-gradient-to-tr from-[#38bdf8]/25 via-[#88cef4]/15 to-[#f5c542]/10 rounded-full blur-3xl pointer-events-none"
        style={{ transform: 'translate3d(0, calc(var(--scroll-y, 0px) * 0.22), 0)' }}
      ></div>

      {/* Floating Sparkles */}
      <div className="absolute top-16 left-8 animate-float-slow text-[#f5c542] opacity-80">
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="absolute top-32 right-10 animate-float-slow text-[#88cef4] opacity-80" style={{ animationDelay: '1.5s' }}>
        <Sparkles className="w-7 h-7" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center animate-fade-in">
        {/* Club Logo */}
        <div className="relative mb-5 p-3.5 rounded-3xl bg-white border border-white/70 shadow-[0_16px_40px_rgba(4,31,61,0.35)]">
          <img
            src={club.logo}
            alt={club.name}
            className="w-20 h-20 sm:w-28 sm:h-28 object-contain"
          />
        </div>

        {/* University & Faculty Hierarchy (for external clubs & guests) */}
        <div className="mb-3 space-y-0.5">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] text-[#bae6fd] uppercase">
            {club.university}
          </p>
          <p className="text-[11px] sm:text-xs font-medium tracking-[0.14em] text-[#e0f2fe]/85 uppercase">
            {club.faculty}
          </p>
        </div>

        {/* Club Name */}
        <h2 className="text-base sm:text-xl tracking-[0.18em] font-bold text-[#7dd3fc] uppercase mb-3 font-display">
          {club.name} ({club.shortName})
        </h2>

        {/* Main Event Title with 2 balanced lines for edition */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight font-display mb-4 leading-tight drop-shadow-[3px_4px_0_rgba(1,54,98,0.45)]">
          <span className="block">{event.editionLine1}</span>
          <span className="block text-[#e0f7ff] mt-1">{event.editionLine2}</span>
        </h1>

        {/* Theme */}
        <p className="text-xl sm:text-2xl font-bold text-[#7dd3fc] font-script mb-8 drop-shadow-sm">
          “{event.theme}”
        </p>

        {/* Quick Start-Time Reminder & Venue Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-white mb-10 font-display">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#041f3d]/55 border border-white/25 backdrop-blur-md shadow">
            <Clock className="w-4 h-4 text-[#f5c542]" />
            Bắt đầu: {event.startTime} • {event.dateDisplay}
          </span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#041f3d]/55 border border-white/25 backdrop-blur-md shadow">
            <MapPin className="w-4 h-4 text-[#7dd3fc]" />
            {event.venue}
          </span>
        </div>

        {/* Scroll indicator */}
        <a
          href="#invitation"
          className="group inline-flex flex-col items-center gap-2 text-xs font-semibold font-display text-white/95 hover:text-white transition-colors"
        >
          <span className="drop-shadow-sm">Xem thiệp mời chi tiết</span>
          <div className="p-2.5 rounded-full bg-white text-[#0284c7] shadow-lg group-hover:scale-105 transition-all animate-bounce">
            <ChevronDown className="w-4 h-4" />
          </div>
        </a>
      </div>
    </section>
  );
};
