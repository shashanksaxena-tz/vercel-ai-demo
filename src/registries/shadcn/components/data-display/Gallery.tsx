'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
}

export const Gallery = ({ element }: ComponentRenderProps) => {
  const {
    images,
    columns = 3,
    gap = 'default',
    aspectRatio = 'square',
    showLightbox = true,
    showCaption = false,
    variant = 'default',
    style,
  } = element.props;

  const imagesArray = images as GalleryImage[];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const columnStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-3 md:grid-cols-6',
  };

  const gapStyles = {
    none: 'gap-0',
    sm: 'gap-1',
    default: 'gap-2',
    lg: 'gap-4',
  };

  const aspectRatioStyles = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[2/1]',
  };

  const openLightbox = (index: number) => {
    if (showLightbox) {
      setCurrentIndex(index);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + imagesArray.length) % imagesArray.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imagesArray.length);
  };

  if (!imagesArray?.length) {
    return (
      <div className="p-8 text-center text-muted-foreground border rounded-lg">
        No images available
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          'grid',
          columnStyles[(columns as keyof typeof columnStyles) || 3],
          gapStyles[(gap as keyof typeof gapStyles) || 'default']
        )}
        style={style as React.CSSProperties}
      >
        {imagesArray.map((image, idx) => (
          <div
            key={idx}
            className={cn(
              'group relative overflow-hidden',
              variant === 'rounded' && 'rounded-lg',
              variant === 'card' && 'rounded-lg border shadow-sm bg-card'
            )}
          >
            <div
              className={cn(
                'overflow-hidden cursor-pointer',
                aspectRatioStyles[(aspectRatio as keyof typeof aspectRatioStyles) || 'square']
              )}
              onClick={() => openLightbox(idx)}
            >
              <img
                src={image.thumbnail || image.src}
                alt={image.alt || image.title || `Image ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {showLightbox && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
            </div>
            {showCaption && (image.title || image.description) && (
              <div className={cn('p-2', variant === 'card' && 'p-3')}>
                {image.title && <p className="text-sm font-medium truncate">{image.title}</p>}
                {image.description && (
                  <p className="text-xs text-muted-foreground truncate">{image.description}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={goToPrev}
            className="absolute left-4 p-2 text-white hover:bg-white/20 rounded-full"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 p-2 text-white hover:bg-white/20 rounded-full"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="max-w-4xl max-h-[80vh] px-16">
            <img
              src={imagesArray[currentIndex].src}
              alt={imagesArray[currentIndex].alt || ''}
              className="max-w-full max-h-[80vh] object-contain"
            />
            {(imagesArray[currentIndex].title || imagesArray[currentIndex].description) && (
              <div className="text-center mt-4 text-white">
                {imagesArray[currentIndex].title && (
                  <p className="text-lg font-medium">{imagesArray[currentIndex].title}</p>
                )}
                {imagesArray[currentIndex].description && (
                  <p className="text-sm text-white/70">{imagesArray[currentIndex].description}</p>
                )}
              </div>
            )}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentIndex + 1} / {imagesArray.length}
          </div>
        </div>
      )}
    </>
  );
};
