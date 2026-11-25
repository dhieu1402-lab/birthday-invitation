import React from 'react';
import { Sparkles } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';

export const InvitationSection: React.FC = () => {
  const { club, event, invitation } = eventConfig;

  return (
    <section id="invitation" className="relative w-full py-10 sm:py-14 px-4 overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-[#88cef4]/25 via-[#bae6fd]/20 to-[#f5c542]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto">
        {/* Paper Card Invitation Frame */}
        <div className="relative sn2-paper-card rounded-3xl p-7 sm:p-12 text-center overflow-hidden">
          {/* Sky-Blue Corner Accents */}
          <div className="absolute top-3.5 left-3.5 w-8 h-8 border-t-2 border-l-2 border-[#7dd3fc] rounded-tl-lg pointer-events-none"></div>
          <div className="absolute top-3.5 right-3.5 w-8 h-8 border-t-2 border-r-2 border-[#7dd3fc] rounded-tr-lg pointer-events-none"></div>
          <div className="absolute bottom-3.5 left-3.5 w-8 h-8 border-b-2 border-l-2 border-[#7dd3fc] rounded-bl-lg pointer-events-none"></div>
          <div className="absolute bottom-3.5 right-3.5 w-8 h-8 border-b-2 border-r-2 border-[#7dd3fc] rounded-br-lg pointer-events-none"></div>

          {/* Club Logo */}
          <div className="flex justify-center mb-5">
            <div className="relative group p-3 rounded-2xl bg-[#f0f9ff] border border-[#0284c7]/15 shadow-sm">
              <img
                src={club.logo}
                alt={club.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase sn2-badge font-display mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
            {invitation.badge}
          </div>

          {/* Institution & Club Name */}
          <p className="text-[11px] sm:text-xs tracking-[0.14em] font-semibold text-[#0369a1]/85 uppercase">
            {club.university} • {club.faculty}
          </p>
          <h3 className="text-sm sm:text-base tracking-[0.18em] font-bold text-[#0369a1] uppercase mt-1 mb-3 font-display">
            {club.name} ({club.shortName})
          </h3>

          {/* Edition on 2 balanced lines */}
          <h4 className="text-base sm:text-xl font-bold text-[#0284c7] font-display tracking-wide mb-3 leading-snug">
            <span className="block">{event.editionLine1}</span>
            <span className="block">{event.editionLine2}</span>
          </h4>

          {/* Pure Vietnamese Headline */}
          <h2 className="text-3xl sm:text-5xl font-bold text-[#0c4a6e] tracking-tight font-display mb-6">
            {invitation.headline}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-[#88cef4] via-[#0284c7] to-[#88cef4] rounded-full mx-auto mb-7"></div>

          {/* Invitation Body Text (Inclusive for Anh/Chị/Bạn) */}
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-base sm:text-lg text-[#0369a1] leading-relaxed font-normal">
              {invitation.body}
            </p>
            <p className="text-sm sm:text-base text-[#1f6fac] italic font-light">
              “{invitation.subText}”
            </p>
          </div>

          {/* Signature Box */}
          <div className="mt-9 pt-6 border-t border-[#0284c7]/15 max-w-sm mx-auto flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold font-display">
              {invitation.signatureTitle}
            </span>
            <p className="font-script text-3xl sm:text-4xl text-[#1f6fac] font-bold mt-1">
              {invitation.signatureName}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
