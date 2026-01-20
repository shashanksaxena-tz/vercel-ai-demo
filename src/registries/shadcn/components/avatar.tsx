import React from 'react';
import { Avatar as ShadcnAvatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

type AvatarProps = {
  src?: string;
  fallback?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
};

export const Avatar = ({ src, fallback, alt, className, style }: AvatarProps) => {
  return (
    <ShadcnAvatar className={className} style={style}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback || alt?.slice(0, 2).toUpperCase() || 'UI'}</AvatarFallback>
    </ShadcnAvatar>
  );
};
