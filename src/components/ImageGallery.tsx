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
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase sn2-badge font-display mb-3">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          HÀNH TRÌNH ĐÁNG NHỚ
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0c4a6e] tracking-tight font-display">
          KHOẢNH KHẮC KỶ NIỆM
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#88cef4] via-[#0284c7] to-[#1f6fac] mx-auto mt-4 rounded-full"></div>
        <p className="text-[#0369a1] text-sm sm:text-base max-w-xl mx-auto mt-3">
          Những dấu mốc thanh xuân, nụ cười rạng rỡ và tình cảm gắn bó qua các thế hệ thành viên {eventConfig.club.shortName}
        </p>
      </div>

      {/* Responsive Modern Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {memories.map((mem, index) => (
          <div
            key={mem.id}
            onClick={() => handleOpenModal(index)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white border border-[#0284c7]/18 shadow-[8px_8px_0_rgba(14,165,233,0.10)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[10px_10px_0_rgba(2,132,199,0.22)] hover:border-[#38bdf8]"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-[#e0f2fe]">
              <img
                src={mem.url}
                alt={mem.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041f3d]/90 via-[#041f3d]/25 to-transparent opacity-70 group-hover:opacity-85 transition-opacity"></div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-[#0284c7] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Year Tag */}
              {mem.year && (
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#f5c542] text-[#5c3a06] font-display shadow-sm">
                  {mem.year}
                </div>
              )}

              {/* Title & Caption */}
              <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-0.5 group-hover:translate-y-0 transition-transform">
                <h4 className="text-white font-semibold text-sm sm:text-base leading-snug line-clamp-1 font-display group-hover:text-[#7dd3fc] transition-colors">
                  {mem.title}
                </h4>
                <p className="text-[#e0f2fe]/90 text-xs mt-1 line-clamp-2 opacity-85 group-hover:opacity-100 transition-opacity">
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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#041f3d]/92 backdrop-blur-xl animate-fade-in"
        >
          <button
            onClick={handleCloseModal}
            aria-label="Đóng ảnh"
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/15 text-white hover:bg-[#0284c7] transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            aria-label="Ảnh trước"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/15 text-white hover:bg-[#0284c7] transition-all duration-200 backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Ảnh sau"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/15 text-white hover:bg-[#0284c7] transition-all duration-200 backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#7dd3fc]/40 bg-[#041f3d] max-h-[75vh]">
              <img
                src={memories[selectedImageIndex].url}
                alt={memories[selectedImageIndex].title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="mt-4 text-center px-4 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-[#7dd3fc] font-bold font-display">
                Khoảnh khắc {selectedImageIndex + 1} / {memories.length}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1 font-display">
                {memories[selectedImageIndex].title}
              </h3>
              <p className="text-[#bae6fd] text-sm mt-1">
                {memories[selectedImageIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
