import React from 'react';
import { Avatar as ShadcnAvatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ComponentRenderProps } from '@json-render/react';

export const Avatar = ({ element }: ComponentRenderProps) => {
  const { src, alt, name, fallback, style } = element.props;

  const altText = (alt || name || 'Avatar') as string;
  const fallbackText = (fallback as string) || altText.charAt(0).toUpperCase();

  return (
    <ShadcnAvatar style={style as React.CSSProperties}>
      <AvatarImage src={src as string} alt={altText} />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </ShadcnAvatar>
  );
};
