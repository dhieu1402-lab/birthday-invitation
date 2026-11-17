import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, PartyPopper } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';

interface EnvelopeProps {
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpenAnimation, setIsOpenAnimation] = useState(false);

  const handleOpenClick = () => {
    if (isOpenAnimation) return;
    setIsOpenAnimation(true);

    // Confetti celebration burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#f59e0b', '#38bdf8', '#a855f7'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#fbbf24', '#ffffff', '#ec4899'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#ffd700', '#00f5d4'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // Notify parent to unlock site and start audio
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 overflow-hidden bg-gradient-to-b from-[#0b0f19] via-[#111827] to-[#0b0f19]">
      {/* Ambient background particles and glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-gradient-to-tr from-indigo-500/15 via-amber-500/15 to-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-6 sm:left-20 animate-float-slow opacity-60 text-amber-300">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="absolute bottom-12 right-6 sm:right-20 animate-float-slow opacity-60 text-sky-300" style={{ animationDelay: '2s' }}>
        <PartyPopper className="w-8 h-8" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg flex flex-col items-center">
        {/* Top Tagline */}
        <div className="text-center mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-amber-500/10 border border-amber-500/30 text-amber-300 mb-3 shadow-lg shadow-amber-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            OFFICIAL DIGITAL INVITATION
          </div>
          <h2 className="text-sm sm:text-base font-medium tracking-widest text-slate-300 uppercase">
            {eventConfig.club.name}
          </h2>
          <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-300 tracking-tight font-['Playfair_Display'] mt-1">
            {eventConfig.event.editionText}
          </h1>
        </div>

        {/* 3D Envelope Card Structure */}
        <div className="relative w-full aspect-[16/11] max-w-[420px] mx-auto perspective-1000">
          {/* Card Sliding Out Animation */}
          <div
            className={`absolute inset-x-4 top-2 bottom-6 bg-gradient-to-b from-amber-50 to-amber-100/90 rounded-2xl p-5 shadow-2xl transition-all duration-1000 ease-out flex flex-col items-center justify-between text-slate-800 ${
              isOpenAnimation ? '-translate-y-28 opacity-100 scale-102 shadow-amber-500/20' : 'translate-y-2 opacity-70'
            }`}
          >
            <div className="w-full flex items-center justify-between border-b border-amber-900/10 pb-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-amber-800">
                {eventConfig.club.shortName}
              </span>
              <span className="text-[10px] font-semibold text-amber-700">
                {eventConfig.event.dateDisplay}
              </span>
            </div>

            <div className="text-center my-auto">
              <p className="font-['Dancing_Script'] text-2xl sm:text-3xl text-amber-900 font-bold">
                You're Invited!
              </p>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Kính mời tham dự tiệc sinh nhật
              </p>
            </div>

            <div className="w-12 h-0.5 bg-amber-400 rounded-full mx-auto"></div>
          </div>

          {/* Envelope Pocket Base */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e1e38] border border-amber-500/40 shadow-2xl overflow-hidden flex flex-col justify-end p-6">
            {/* Triangular decorative side flaps */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-slate-950/80 to-transparent"></div>
              {/* Bottom fold line */}
              <div className="absolute bottom-0 inset-x-0 h-1/2 border-t border-slate-700/40 bg-gradient-to-b from-slate-900/90 to-slate-950"></div>
            </div>

            {/* Envelope Flap Fold (Top Triangle) */}
            <div
              className={`absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-slate-800 to-slate-900 border-b border-amber-500/30 origin-top transition-transform duration-700 ease-in-out ${
                isOpenAnimation ? '-rotate-x-180 z-0' : 'rotate-x-0 z-20'
              }`}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            ></div>

            {/* Golden Wax Seal */}
            {!isOpenAnimation && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center">
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-0.5 shadow-2xl pulse-glow cursor-pointer">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-700 to-amber-900 flex flex-col items-center justify-center border border-amber-300/60 shadow-inner">
                    <span className="text-[10px] font-bold text-amber-200 tracking-wider">EEC</span>
                    <span className="text-xs font-black text-amber-100">15th</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Button: OPEN INVITATION */}
        <div className="mt-10 flex flex-col items-center">
          <button
            onClick={handleOpenClick}
            disabled={isOpenAnimation}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full font-extrabold text-sm sm:text-base tracking-wider uppercase text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 shadow-xl shadow-amber-500/25 hover:shadow-amber-400/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Mail className="w-5 h-5 text-slate-900 transition-transform group-hover:rotate-12" />
            <span>MỞ THIỆP MỜI</span>
            <Sparkles className="w-5 h-5 text-slate-900 transition-transform group-hover:scale-125" />
          </button>

          <p className="text-xs text-slate-400 mt-3.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Nhấn mở thiệp để bật âm thanh và xem toàn bộ lời mời
          </p>
        </div>
      </div>
    </div>
  );
};
