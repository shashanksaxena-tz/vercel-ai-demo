'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

export const HeroWithVideo = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    description,
    videoUrl,
    videoThumbnail,
    videoPosition = 'right',
    autoPlay = false,
    muted = true,
    loop = true,
    backgroundVideo,
    overlay = true,
    className,
    style
  } = element.props;

  const [isPlaying, setIsPlaying] = React.useState(autoPlay as boolean);

  // Background video layout
  if (backgroundVideo) {
    return (
      <section
        className={cn(
          'relative w-full min-h-[600px] flex items-center overflow-hidden',
          className
        )}
        style={style as React.CSSProperties}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundVideo as string}
          autoPlay
          muted
          loop
          playsInline
        />
        {overlay && <div className="absolute inset-0 bg-black/60" />}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="max-w-3xl mx-auto text-white">
            {subtitle && (
              <span className="text-sm md:text-base font-medium uppercase tracking-wider opacity-90">
                {subtitle as string}
              </span>
            )}
            {title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-4">
                {title as string}
              </h1>
            )}
            {description && (
              <p className="text-lg md:text-xl opacity-90 mt-6 max-w-2xl mx-auto">
                {description as string}
              </p>
            )}
            {children && (
              <div className="flex flex-wrap gap-4 mt-8 justify-center">{children}</div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Side-by-side layout with video
  return (
    <section
      className={cn('relative w-full py-16 md:py-24', className)}
      style={style as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:gap-16 items-center lg:grid-cols-2">
          <div className={cn(videoPosition === 'left' && 'lg:order-2')}>
            {subtitle && (
              <span className="text-sm md:text-base font-medium text-primary uppercase tracking-wider">
                {subtitle as string}
              </span>
            )}
            {title && (
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 text-foreground">
                {title as string}
              </h1>
            )}
            {description && (
              <p className="text-lg text-muted-foreground mt-6">
                {description as string}
              </p>
            )}
            {children && (
              <div className="flex flex-wrap gap-4 mt-8">{children}</div>
            )}
          </div>
          <div className={cn('relative', videoPosition === 'left' && 'lg:order-1')}>
            {isPlaying && videoUrl ? (
              <video
                className="w-full rounded-2xl shadow-2xl"
                src={videoUrl as string}
                autoPlay={autoPlay as boolean}
                muted={muted as boolean}
                loop={loop as boolean}
                controls
                playsInline
              />
            ) : (
              <div className="relative cursor-pointer group" onClick={() => {
                setIsPlaying(true);
                onAction?.({ name: 'playVideo' });
              }}>
                {videoThumbnail && (
                  <img
                    src={videoThumbnail as string}
                    alt="Video thumbnail"
                    className="w-full rounded-2xl shadow-2xl"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl group-hover:bg-black/40 transition-colors">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary ml-1" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
