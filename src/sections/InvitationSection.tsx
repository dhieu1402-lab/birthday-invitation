import React from 'react';
import { Sparkles } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';

export const InvitationSection: React.FC = () => {
  const { club, event, invitation } = eventConfig;

  return (
    <section id="invitation" className="relative w-full py-12 sm:py-20 px-4 overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-[#88cef4]/25 via-[#bae6fd]/20 to-[#f5c542]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto">
        {/* Paper Card Invitation Frame */}
        <div className="relative sn2-paper-card rounded-3xl p-8 sm:p-14 text-center overflow-hidden">
          {/* Sky-Blue Corner Accents */}
          <div className="absolute top-3.5 left-3.5 w-8 h-8 border-t-2 border-l-2 border-[#7dd3fc] rounded-tl-lg pointer-events-none"></div>
          <div className="absolute top-3.5 right-3.5 w-8 h-8 border-t-2 border-r-2 border-[#7dd3fc] rounded-tr-lg pointer-events-none"></div>
          <div className="absolute bottom-3.5 left-3.5 w-8 h-8 border-b-2 border-l-2 border-[#7dd3fc] rounded-bl-lg pointer-events-none"></div>
          <div className="absolute bottom-3.5 right-3.5 w-8 h-8 border-b-2 border-r-2 border-[#7dd3fc] rounded-br-lg pointer-events-none"></div>

          {/* Club Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative group p-3 rounded-2xl bg-[#f0f9ff] border border-[#0284c7]/15 shadow-sm">
              <img
                src={club.logo}
                alt={club.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase sn2-badge font-alt mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
            {invitation.badge}
          </div>

          {/* Club Name */}
          <h3 className="text-sm sm:text-base tracking-[0.2em] font-bold text-[#0369a1] uppercase mb-2 font-alt">
            {club.name} ({club.shortName})
          </h3>

          {/* You Are Invited */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0c4a6e] tracking-tight font-display mb-3">
            YOU ARE INVITED!
          </h2>

          {/* Event Name */}
          <h4 className="text-base sm:text-xl font-bold text-[#0284c7] font-alt tracking-wide mb-6">
            {event.title} • {event.editionText}
          </h4>

          <div className="w-24 h-1 bg-gradient-to-r from-[#88cef4] via-[#0284c7] to-[#88cef4] rounded-full mx-auto mb-8"></div>

          {/* Invitation Body Text */}
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-base sm:text-lg text-[#0369a1] leading-relaxed font-normal">
              {invitation.body}
            </p>
            <p className="text-sm sm:text-base text-[#1f6fac] italic font-light">
              "{invitation.subText}"
            </p>
          </div>

          {/* Signature Box */}
          <div className="mt-10 pt-6 border-t border-[#0284c7]/15 max-w-sm mx-auto flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold font-alt">
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
