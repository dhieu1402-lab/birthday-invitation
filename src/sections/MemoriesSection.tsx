import React from 'react';
import { ImageGallery } from '../components/ImageGallery';

export const MemoriesSection: React.FC = () => {
  return (
    <section id="memories" className="relative w-full py-12">
      <ImageGallery />
    </section>
  );
};
