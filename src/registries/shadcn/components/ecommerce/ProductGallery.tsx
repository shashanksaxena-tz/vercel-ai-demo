'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export const ProductGallery = ({ element, onAction }: ComponentRenderProps) => {
  const {
    images,
    thumbnailPosition = 'bottom',
    showZoom = true,
    style,
  } = element.props;

  const imageList = (images as Array<{ src: string; alt?: string }>) || [];
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0));
  };

  const handleZoom = () => {
    if (onAction) {
      onAction({ name: 'zoomImage', payload: { image: imageList[activeIndex] } } as never);
    }
  };

  const thumbnailClasses = {
    bottom: 'flex-col',
    left: 'flex-row-reverse',
    right: 'flex-row',
  };

  const thumbnailListClasses = {
    bottom: 'flex flex-row gap-2 overflow-x-auto',
    left: 'flex flex-col gap-2 overflow-y-auto max-h-[500px]',
    right: 'flex flex-col gap-2 overflow-y-auto max-h-[500px]',
  };

  if (imageList.length === 0) {
    return (
      <div
        className="aspect-square bg-muted rounded-lg flex items-center justify-center"
        style={style as React.CSSProperties}
      >
        <span className="text-muted-foreground">No images available</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex gap-4',
        thumbnailClasses[thumbnailPosition as keyof typeof thumbnailClasses] || thumbnailClasses.bottom
      )}
      style={style as React.CSSProperties}
    >
      <div className="relative flex-1 aspect-square bg-muted rounded-lg overflow-hidden group">
        <img
          src={imageList[activeIndex]?.src}
          alt={imageList[activeIndex]?.alt || 'Product image'}
          className="h-full w-full object-cover"
        />
        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
        {showZoom && (
          <button
            onClick={handleZoom}
            className="absolute bottom-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors opacity-0 group-hover:opacity-100"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
        )}
      </div>

      {imageList.length > 1 && (
        <div
          className={cn(
            thumbnailListClasses[thumbnailPosition as keyof typeof thumbnailListClasses] || thumbnailListClasses.bottom
          )}
        >
          {imageList.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors',
                index === activeIndex ? 'border-primary' : 'border-transparent hover:border-muted-foreground/50'
              )}
            >
              <img
                src={image.src}
                alt={image.alt || `Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
