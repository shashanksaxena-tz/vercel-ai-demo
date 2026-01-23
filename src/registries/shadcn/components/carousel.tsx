import React, { useState, useCallback, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Carousel = ({ element, children }: ComponentRenderProps) => {
  const {
    items,
    autoPlay = false,
    interval = 5000,
    showDots = true,
    showArrows = true,
    loop = true,
    style
  } = element.props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsArray = items as Array<{ image?: string; title?: string; description?: string }>;
  const totalItems = itemsArray?.length || React.Children.count(children) || 0;

  const goToNext = useCallback(() => {
    if (loop) {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, totalItems - 1));
    }
  }, [totalItems, loop]);

  const goToPrev = useCallback(() => {
    if (loop) {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [totalItems, loop]);

  useEffect(() => {
    if (autoPlay && totalItems > 1) {
      const timer = setInterval(goToNext, interval as number);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, goToNext, totalItems]);

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={style as React.CSSProperties}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {itemsArray?.length ? (
          itemsArray.map((item, idx) => (
            <div key={idx} className="min-w-full relative">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title || `Slide ${idx + 1}`}
                  className="w-full aspect-video object-cover"
                />
              ) : null}
              {(item.title || item.description) ? (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                  {item.title ? (
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  ) : null}
                  {item.description ? (
                    <p className="text-sm opacity-90">{item.description}</p>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))
        ) : (
          React.Children.map(children, (child, idx) => (
            <div key={idx} className="min-w-full">
              {child}
            </div>
          ))
        )}
      </div>

      {showArrows && totalItems > 1 ? (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={goToPrev}
            disabled={!loop && currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={goToNext}
            disabled={!loop && currentIndex === totalItems - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      ) : null}

      {showDots && totalItems > 1 ? (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: totalItems }).map((_, idx) => (
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
      ) : null}
    </div>
  );
};
