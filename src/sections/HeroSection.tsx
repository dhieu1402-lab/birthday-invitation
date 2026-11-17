import React from 'react';
import { Envelope } from '../components/Envelope';
import { Sparkles, Calendar, MapPin, ChevronDown } from 'lucide-react';
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
    <section className="relative min-h-[85vh] sm:min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden">
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-gradient-to-tr from-sky-500/15 via-amber-500/15 to-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Floating Sparkles */}
      <div className="absolute top-16 left-8 animate-float-slow text-amber-300 opacity-60">
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="absolute top-32 right-10 animate-float-slow text-sky-300 opacity-60" style={{ animationDelay: '1.5s' }}>
        <Sparkles className="w-7 h-7" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center animate-fade-in">
        {/* Club Logo */}
        <div className="relative mb-6 p-4 rounded-3xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-xl shadow-2xl">
          <img
            src={club.logo}
            alt={club.name}
            className="w-20 h-20 sm:w-28 sm:h-28 object-contain"
          />
        </div>

        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-amber-500/10 border border-amber-500/30 text-amber-300 mb-4 shadow-lg shadow-amber-500/5">
          <Sparkles className="w-3.5 h-3.5" />
          {event.editionText}
        </div>

        {/* Club Name */}
        <h2 className="text-sm sm:text-base tracking-[0.25em] font-bold text-slate-300 uppercase mb-2">
          {club.name}
        </h2>

        {/* Main Event Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-300 tracking-tight font-['Playfair_Display'] mb-4 leading-tight">
          {event.title}
        </h1>

        {/* Theme */}
        <p className="text-base sm:text-xl font-medium text-amber-300/90 italic font-['Dancing_Script'] mb-8">
          "{event.theme}"
        </p>

        {/* Quick Date and Venue badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-300 mb-10">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <Calendar className="w-4 h-4 text-amber-400" />
            {event.dateDisplay}
          </span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <MapPin className="w-4 h-4 text-sky-400" />
            {event.venue}
          </span>
        </div>

        {/* Scroll indicator */}
        <a
          href="#invitation"
          className="group inline-flex flex-col items-center gap-2 text-xs text-slate-400 hover:text-amber-300 transition-colors"
        >
          <span>Khám phá thiệp mời</span>
          <div className="p-2 rounded-full bg-slate-900 border border-slate-800 group-hover:border-amber-400/50 group-hover:bg-slate-800 transition-all animate-bounce">
            <ChevronDown className="w-4 h-4 text-amber-400" />
          </div>
        </a>
      </div>
    </section>
  );
};
