'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Carousel = ({ element, children }: ComponentRenderProps) => {
  const {
    items,
    autoPlay = false,
    interval = 5000,
    showDots = true,
    showArrows = true,
    loop = true,
    slidesToShow = 1,
    gap = 'default',
    style,
  } = element.props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsArray = items as Array<{ image?: string; title?: string; description?: string }>;
  const totalItems = itemsArray?.length || React.Children.count(children) || 0;
  const slidesPerView = slidesToShow as number;

  const maxIndex = Math.max(0, totalItems - slidesPerView);

  const goToNext = useCallback(() => {
    if (loop) {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    }
  }, [maxIndex, loop]);

  const goToPrev = useCallback(() => {
    if (loop) {
      setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [maxIndex, loop]);

  useEffect(() => {
    if (autoPlay && totalItems > slidesPerView) {
      const timer = setInterval(goToNext, interval as number);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, goToNext, totalItems, slidesPerView]);

  const gapStyles = {
    none: 0,
    sm: 8,
    default: 16,
    lg: 24,
  };

  const gapValue = gapStyles[(gap as keyof typeof gapStyles) || 'default'];
  const slideWidth = `calc((100% - ${gapValue * (slidesPerView - 1)}px) / ${slidesPerView})`;

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={style as React.CSSProperties}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(calc(-${currentIndex} * (${slideWidth} + ${gapValue}px)))`,
          gap: gapValue,
        }}
      >
        {itemsArray?.length ? (
          itemsArray.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 relative"
              style={{ width: slideWidth }}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title || `Slide ${idx + 1}`}
                  className="w-full aspect-video object-cover rounded-lg"
                />
              )}
              {(item.title || item.description) && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-lg">
                  {item.title && (
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  )}
                  {item.description && (
                    <p className="text-sm opacity-90">{item.description}</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          React.Children.map(children, (child, idx) => (
            <div
              key={idx}
              className="flex-shrink-0"
              style={{ width: slideWidth }}
            >
              {child}
            </div>
          ))
        )}
      </div>

      {showArrows && totalItems > slidesPerView && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-background transition-colors disabled:opacity-50"
            onClick={goToPrev}
            disabled={!loop && currentIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-background transition-colors disabled:opacity-50"
            onClick={goToNext}
            disabled={!loop && currentIndex === maxIndex}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {showDots && totalItems > slidesPerView && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                idx === currentIndex
                  ? 'bg-white w-6'
                  : 'bg-white/50 hover:bg-white/75'
              )}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
