'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Share2 } from 'lucide-react';

interface LightboxImage {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
}

export const Lightbox = ({ element }: ComponentRenderProps) => {
  const {
    images,
    initialIndex = 0,
    open = false,
    showThumbnails = true,
    showNavigation = true,
    showToolbar = true,
    showCounter = true,
    enableZoom = true,
    enableDownload = false,
    enableShare = false,
    style,
  } = element.props;

  const imagesArray = images as LightboxImage[];
  const [isOpen, setIsOpen] = useState(open as boolean);
  const [currentIndex, setCurrentIndex] = useState(initialIndex as number);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setIsOpen(open as boolean);
  }, [open]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + imagesArray.length) % imagesArray.length);
    setZoom(1);
  }, [imagesArray?.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % imagesArray.length);
    setZoom(1);
  }, [imagesArray?.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape') setIsOpen(false);
    if (e.key === 'ArrowLeft') goToPrev();
    if (e.key === 'ArrowRight') goToNext();
  }, [isOpen, goToPrev, goToNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 0.5));

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imagesArray[currentIndex].src;
    link.download = imagesArray[currentIndex].title || `image-${currentIndex + 1}`;
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: imagesArray[currentIndex].title || 'Image',
          url: imagesArray[currentIndex].src,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    }
  };

  if (!isOpen || !imagesArray?.length) return null;

  const currentImage = imagesArray[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex flex-col"
      style={style as React.CSSProperties}
    >
      {/* Toolbar */}
      {showToolbar && (
        <div className="flex items-center justify-between p-4 bg-black/50">
          <div className="flex items-center gap-2">
            {showCounter && (
              <span className="text-white text-sm">
                {currentIndex + 1} / {imagesArray.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {enableZoom && (
              <>
                <button
                  onClick={handleZoomOut}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded"
                  disabled={zoom <= 0.5}
                >
                  <ZoomOut className="h-5 w-5" />
                </button>
                <span className="text-white text-sm min-w-[3rem] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded"
                  disabled={zoom >= 3}
                >
                  <ZoomIn className="h-5 w-5" />
                </button>
              </>
            )}
            {enableDownload && (
              <button
                onClick={handleDownload}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded"
              >
                <Download className="h-5 w-5" />
              </button>
            )}
            {enableShare && (
              <button
                onClick={handleShare}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded"
              >
                <Share2 className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded ml-4"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Image */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {showNavigation && imagesArray.length > 1 && (
          <button
            onClick={goToPrev}
            className="absolute left-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full z-10"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}

        <div
          className="max-w-full max-h-full overflow-auto"
          style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s' }}
        >
          <img
            src={currentImage.src}
            alt={currentImage.alt || ''}
            className="max-w-[90vw] max-h-[70vh] object-contain"
          />
        </div>

        {showNavigation && imagesArray.length > 1 && (
          <button
            onClick={goToNext}
            className="absolute right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full z-10"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        )}
      </div>

      {/* Caption */}
      {(currentImage.title || currentImage.description) && (
        <div className="text-center py-4 px-8 bg-black/50">
          {currentImage.title && (
            <p className="text-white text-lg font-medium">{currentImage.title}</p>
          )}
          {currentImage.description && (
            <p className="text-white/70 text-sm mt-1">{currentImage.description}</p>
          )}
        </div>
      )}

      {/* Thumbnails */}
      {showThumbnails && imagesArray.length > 1 && (
        <div className="flex justify-center gap-2 p-4 bg-black/50 overflow-x-auto">
          {imagesArray.map((image, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setZoom(1);
              }}
              className={cn(
                'flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all',
                idx === currentIndex ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-75'
              )}
            >
              <img
                src={image.src}
                alt={image.alt || ''}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
