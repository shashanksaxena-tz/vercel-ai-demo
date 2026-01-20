import React from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';

type ButtonProps = {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children?: React.ReactNode;
  onClick?: string;
  style?: React.CSSProperties;
};

export const Button = ({ variant, size, children, onClick, style }: ButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      console.log('Action triggered:', onClick);
    }
  };

  return (
    <ShadcnButton
      variant={variant}
      size={size}
      onClick={handleClick}
      style={style}
    >
      {children}
    </ShadcnButton>
  );
};
