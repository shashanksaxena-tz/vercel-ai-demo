import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

export const Video = ({ element }: ComponentRenderProps) => {
  const {
    src,
    poster,
    title,
    autoPlay = false,
    loop = false,
    muted = false,
    controls = true,
    aspectRatio = 'video',
    rounded = 'default',
    youtube,
    vimeo,
    style
  } = element.props;

  const roundedStyles = {
    none: 'rounded-none',
    default: 'rounded-lg',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };

  const aspectRatioMap: Record<string, string> = {
    square: '1/1',
    video: '16/9',
    portrait: '9/16',
    wide: '21/9',
  };

  // YouTube embed
  if (youtube) {
    const videoId = (youtube as string).match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/)?.[1] || youtube;
    return (
      <div
        className={cn(
          'relative overflow-hidden bg-black',
          roundedStyles[(rounded as keyof typeof roundedStyles) || 'default']
        )}
        style={{
          aspectRatio: aspectRatioMap[aspectRatio as string] || '16/9',
          ...(style as React.CSSProperties),
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}${autoPlay ? '?autoplay=1' : ''}`}
          title={title as string || 'YouTube video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  // Vimeo embed
  if (vimeo) {
    const videoId = (vimeo as string).match(/vimeo\.com\/(\d+)/)?.[1] || vimeo;
    return (
      <div
        className={cn(
          'relative overflow-hidden bg-black',
          roundedStyles[(rounded as keyof typeof roundedStyles) || 'default']
        )}
        style={{
          aspectRatio: aspectRatioMap[aspectRatio as string] || '16/9',
          ...(style as React.CSSProperties),
        }}
      >
        <iframe
          src={`https://player.vimeo.com/video/${videoId}${autoPlay ? '?autoplay=1' : ''}`}
          title={title as string || 'Vimeo video'}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  // Native video
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-black',
        roundedStyles[(rounded as keyof typeof roundedStyles) || 'default']
      )}
      style={{
        aspectRatio: aspectRatioMap[aspectRatio as string] || '16/9',
        ...(style as React.CSSProperties),
      }}
    >
      <video
        src={src as string}
        poster={poster as string}
        autoPlay={autoPlay as boolean}
        loop={loop as boolean}
        muted={muted as boolean}
        controls={controls as boolean}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
