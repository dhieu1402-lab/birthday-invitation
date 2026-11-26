import React from 'react';
import { Sparkles, Star } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

/**
 * Hoa văn vạch ngôi sao ngăn cách giữa các phần,
 * giúp bố cục thoáng đãng, không bị ngộp và không bị trống.
 */
export const SectionDivider: React.FC = () => {
  return (
    <RevealOnScroll variant="scale">
      <div
        aria-hidden="true"
        className="w-full max-w-3xl mx-auto px-6 py-3 sm:py-5 flex items-center justify-center gap-3 sm:gap-4 select-none"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#7dd3fc] to-[#0284c7]/45" />
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#0284c7]/20 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
          <Star className="w-4 h-4 text-[#f5c542] fill-[#f5c542]" />
          <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#7dd3fc] to-[#0284c7]/45" />
      </div>
    </RevealOnScroll>
  );
};
