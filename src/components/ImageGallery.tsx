import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Heart } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';

export const ImageGallery: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const memories = eventConfig.memories;

  const handleOpenModal = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto';
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % memories.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + memories.length) % memories.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowRight') setSelectedImageIndex((prev) => (prev! + 1) % memories.length);
      if (e.key === 'ArrowLeft') setSelectedImageIndex((prev) => (prev! - 1 + memories.length) % memories.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, memories.length]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-amber-300 bg-amber-500/10 border border-amber-500/30 mb-3">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          HÀNH TRÌNH ĐÁNG NHỚ
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Playfair_Display']">
          OUR MEMORIES
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-sky-400 mx-auto mt-4 rounded-full"></div>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-3">
          Những dấu mốc thanh xuân, nụ cười rạng rỡ và tình bạn gắn bó của các thế hệ thành viên {eventConfig.club.shortName}
        </p>
      </div>

      {/* Responsive Masonry / Modern Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {memories.map((mem, index) => (
          <div
            key={mem.id}
            onClick={() => handleOpenModal(index)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl glass-card border border-slate-700/60 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-400/50"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-slate-900">
              <img
                src={mem.url}
                alt={mem.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                onError={(e) => {
                  // Fallback for placeholder image if path not found
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/70 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                <ZoomIn className="w-4 h-4 text-amber-300" />
              </div>

              {/* Year Tag if available */}
              {mem.year && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/80 text-slate-950 backdrop-blur-md shadow-sm">
                  {mem.year}
                </div>
              )}

              {/* Title & Caption */}
              <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <h4 className="text-white font-semibold text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-amber-200 transition-colors">
                  {mem.title}
                </h4>
                <p className="text-slate-300 text-xs mt-1 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  {mem.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-xl animate-fade-in"
        >
          {/* Close button */}
          <button
            onClick={handleCloseModal}
            aria-label="Đóng ảnh"
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            onClick={handlePrev}
            aria-label="Ảnh trước"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-800/70 text-white hover:bg-amber-500/80 hover:text-slate-950 transition-all duration-200 backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            aria-label="Ảnh sau"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-800/70 text-white hover:bg-amber-500/80 hover:text-slate-950 transition-all duration-200 backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-900 max-h-[75vh]">
              <img
                src={memories[selectedImageIndex].url}
                alt={memories[selectedImageIndex].title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Modal Caption */}
            <div className="mt-4 text-center px-4 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Khoảnh khắc {selectedImageIndex + 1} / {memories.length}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                {memories[selectedImageIndex].title}
              </h3>
              <p className="text-slate-300 text-sm mt-1">
                {memories[selectedImageIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
