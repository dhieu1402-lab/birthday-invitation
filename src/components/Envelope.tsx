import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, PartyPopper } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';

interface EnvelopeProps {
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpenAnimation, setIsOpenAnimation] = useState(false);
  const { club, event } = eventConfig;

  const handleOpenClick = () => {
    if (isOpenAnimation) return;
    setIsOpenAnimation(true);

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
      colors: ['#88cef4', '#0284c7', '#f5c542'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#7dd3fc', '#ffffff', '#f5c542'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#88cef4', '#0ea5e9', '#ffffff'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#f5c542', '#38bdf8'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#88cef4', '#ffffff'],
    });

    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 overflow-hidden sn2-cover-bg">
      {/* Ambient background lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] sm:w-[540px] h-[360px] sm:h-[540px] bg-gradient-to-tr from-[#38bdf8]/25 via-[#88cef4]/15 to-[#f5c542]/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-6 sm:left-20 animate-float-slow opacity-70 text-[#f5c542]">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="absolute bottom-12 right-6 sm:right-20 animate-float-slow opacity-70 text-[#88cef4]" style={{ animationDelay: '2s' }}>
        <PartyPopper className="w-8 h-8" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg flex flex-col items-center">
        {/* Top Tagline & Institution Hierarchy */}
        <div className="text-center mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/15 border border-white/30 text-[#e0f7ff] mb-3 shadow-lg font-display backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#f5c542]" />
            THIỆP MỜI ĐIỆN TỬ CHÍNH THỨC
          </div>
          <p className="text-[11px] sm:text-xs font-medium tracking-wider text-[#bae6fd]/90 uppercase">
            {club.university}
          </p>
          <p className="text-[11px] sm:text-xs font-medium tracking-wider text-[#bae6fd]/80 uppercase mt-0.5">
            {club.faculty}
          </p>
          <h2 className="text-sm sm:text-base font-bold tracking-widest text-[#e0f7ff] uppercase font-display mt-1.5">
            {club.name} ({club.shortName})
          </h2>
          {/* 2 dòng cân đối */}
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display mt-2 leading-tight drop-shadow-[0_3px_0_rgba(4,31,61,0.5)]">
            <span className="block">{event.editionLine1}</span>
            <span className="block text-[#7dd3fc]">{event.editionLine2}</span>
          </h1>
        </div>

        {/* 3D Envelope Card Structure */}
        <div className="relative w-full aspect-[16/11] max-w-[420px] mx-auto perspective-1000">
          {/* Card Sliding Out Animation */}
          <div
            className={`absolute inset-x-4 top-2 bottom-6 bg-white rounded-2xl p-5 shadow-2xl border border-[#7dd3fc]/50 transition-all duration-1000 ease-out flex flex-col items-center justify-between text-[#0c4a6e] ${
              isOpenAnimation ? '-translate-y-28 opacity-100 scale-102 shadow-[#0284c7]/30' : 'translate-y-2 opacity-90'
            }`}
          >
            <div className="w-full flex items-center justify-between border-b border-[#0284c7]/15 pb-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#0284c7] font-display">
                {club.shortName}
              </span>
              <span className="text-[10px] font-semibold text-[#0369a1]">
                Bắt đầu: {event.startTime} • {event.dateDisplay}
              </span>
            </div>

            <div className="text-center my-auto">
              <p className="font-script text-3xl sm:text-4xl text-[#0c4a6e] font-bold">
                Trân Trọng Kính Mời!
              </p>
              <p className="text-xs text-[#0369a1] mt-1 font-medium">
                Kính mời Anh/Chị/Bạn tham dự tiệc sinh nhật CLB
              </p>
            </div>

            <div className="w-12 h-1 bg-gradient-to-r from-[#88cef4] to-[#0284c7] rounded-full mx-auto"></div>
          </div>

          {/* Envelope Pocket Base */}
          <div className="absolute inset-0 rounded-2xl bg-white/12 backdrop-blur-xl border border-white/30 shadow-[0_24px_60px_rgba(4,31,61,0.45)] overflow-hidden flex flex-col justify-end p-6">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#041f3d]/70 to-transparent"></div>
              <div className="absolute bottom-0 inset-x-0 h-1/2 border-t border-white/25 bg-gradient-to-b from-[#0a3d6b]/60 to-[#041f3d]/85"></div>
            </div>

            {/* Envelope Flap Fold */}
            <div
              className={`absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-[#0d6b9e]/90 to-[#0a3d6b]/95 border-b border-white/30 origin-top transition-transform duration-700 ease-in-out ${
                isOpenAnimation ? '-rotate-x-180 z-0' : 'rotate-x-0 z-20'
              }`}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            ></div>

            {/* Golden Wax Seal */}
            {!isOpenAnimation && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center">
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full sn2-gold-seal p-1 pulse-glow cursor-pointer">
                  <div className="w-full h-full rounded-full border border-[#fff]/55 flex flex-col items-center justify-center font-display">
                    <span className="text-[10px] font-bold text-[#6b4708] tracking-wider">EEC</span>
                    <span className="text-xs font-bold text-[#5c3a06]">15 năm</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-10 flex flex-col items-center">
          <button
            onClick={handleOpenClick}
            disabled={isOpenAnimation}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full font-bold text-sm sm:text-base tracking-wider uppercase sn2-btn-primary font-display active:scale-95 cursor-pointer"
          >
            <Mail className="w-5 h-5 text-white transition-transform group-hover:rotate-12" />
            <span>MỞ THIỆP MỜI</span>
            <Sparkles className="w-5 h-5 text-[#f5c542] transition-transform group-hover:scale-125" />
          </button>

          <p className="text-xs text-[#bae6fd]/90 mt-3.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#88cef4] animate-ping"></span>
            Nhấn mở thiệp để bật âm thanh và xem toàn bộ lời mời
          </p>
        </div>
      </div>
    </div>
  );
};
