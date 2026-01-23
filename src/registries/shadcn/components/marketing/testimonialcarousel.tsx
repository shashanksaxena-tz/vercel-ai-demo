'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TestimonialCarousel = ({ element, onAction }: ComponentRenderProps) => {
  const {
    testimonials,
    autoPlay = false,
    interval = 5000,
    showDots = true,
    showArrows = true,
    variant = 'default',
    className,
    style
  } = element.props;

  const testimonialsArray = testimonials as Array<{
    quote: string;
    author: string;
    role?: string;
    company?: string;
    avatar?: string;
    rating?: number;
  }>;

  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (autoPlay && testimonialsArray?.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonialsArray.length);
      }, interval as number);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, testimonialsArray?.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    onAction?.({ name: 'slideChange', payload: { index } } as never);
  };

  const goToPrev = () => {
    const newIndex = currentIndex === 0 ? testimonialsArray.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % testimonialsArray.length;
    goToSlide(newIndex);
  };

  if (!testimonialsArray || testimonialsArray.length === 0) {
    return null;
  }

  const currentTestimonial = testimonialsArray[currentIndex];

  const variantStyles = {
    default: 'bg-background',
    card: 'bg-muted rounded-2xl p-8',
    featured: 'bg-primary/5 rounded-2xl p-8 md:p-12',
  };

  return (
    <div
      className={cn(
        'relative',
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        className
      )}
      style={style as React.CSSProperties}
    >
      <div className="max-w-4xl mx-auto text-center">
        <Quote className="h-12 w-12 text-primary/20 mx-auto mb-6" />

        {currentTestimonial.rating && (
          <div className="flex gap-1 justify-center mb-6">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className={cn(
                  'h-5 w-5',
                  idx < currentTestimonial.rating!
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-muted-foreground'
                )}
              />
            ))}
          </div>
        )}

        <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8">
          "{currentTestimonial.quote}"
        </blockquote>

        <div className="flex items-center justify-center gap-4">
          {currentTestimonial.avatar && (
            <img
              src={currentTestimonial.avatar}
              alt={currentTestimonial.author}
              className="h-14 w-14 rounded-full object-cover"
            />
          )}
          <div className="text-left">
            <p className="font-semibold text-foreground">{currentTestimonial.author}</p>
            {(currentTestimonial.role || currentTestimonial.company) && (
              <p className="text-sm text-muted-foreground">
                {currentTestimonial.role}
                {currentTestimonial.role && currentTestimonial.company && ' at '}
                {currentTestimonial.company}
              </p>
            )}
          </div>
        </div>
      </div>

      {showArrows && testimonialsArray.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full"
            onClick={goToPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
            onClick={goToNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {showDots && testimonialsArray.length > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {testimonialsArray.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all',
                idx === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
