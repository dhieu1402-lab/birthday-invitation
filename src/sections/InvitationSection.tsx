import React from 'react';
import { Sparkles } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';

export const InvitationSection: React.FC = () => {
  const { club, event, invitation } = eventConfig;

  return (
    <section id="invitation" className="relative w-full py-16 sm:py-24 px-4 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-sky-500/10 via-amber-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto">
        {/* Luxury Invitation Frame */}
        <div className="relative rounded-3xl p-1 bg-gradient-to-b from-amber-400/50 via-slate-700/40 to-amber-500/30 shadow-2xl">
          <div className="relative rounded-[22px] bg-gradient-to-b from-[#131b2e] via-[#0f172a] to-[#111827] p-8 sm:p-14 text-center overflow-hidden">
            {/* Top Corners Luxury Filigree Accents */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400/60 rounded-tl-lg pointer-events-none"></div>
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/60 rounded-tr-lg pointer-events-none"></div>
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400/60 rounded-bl-lg pointer-events-none"></div>
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/60 rounded-br-lg pointer-events-none"></div>

            {/* Club Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative group p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-sky-500/5">
                <img
                  src={club.logo}
                  alt={club.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow"
                />
              </div>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-amber-500/10 border border-amber-500/40 text-amber-300 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {invitation.badge}
            </div>

            {/* Club Name */}
            <h3 className="text-sm sm:text-base tracking-[0.25em] font-semibold text-slate-300 uppercase mb-2">
              {club.name} ({club.shortName})
            </h3>

            {/* You Are Invited */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 tracking-tight font-['Playfair_Display'] mb-3">
              YOU ARE INVITED!
            </h2>

            {/* Event Name */}
            <h4 className="text-lg sm:text-xl font-bold text-amber-400/90 font-['Cinzel'] tracking-wider mb-6">
              {event.title} • {event.editionText}
            </h4>

            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"></div>

            {/* Invitation Body Text */}
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                {invitation.body}
              </p>
              <p className="text-sm sm:text-base text-slate-400 italic font-light">
                "{invitation.subText}"
              </p>
            </div>

            {/* Signature Box */}
            <div className="mt-10 pt-6 border-t border-slate-800/80 max-w-sm mx-auto flex flex-col items-center">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                {invitation.signatureTitle}
              </span>
              <p className="font-['Dancing_Script'] text-2xl sm:text-3xl text-amber-300 font-bold mt-1">
                {invitation.signatureName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
