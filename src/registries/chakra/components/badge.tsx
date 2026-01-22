import React from 'react';
import { Badge as ChakraBadge } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Badge = ({ element, children }: ComponentRenderProps) => {
  const { variant = 'default', style } = element.props;
  const content = element.props.children || children;

  const getColorScheme = (v: string) => {
    switch (v) {
      case 'default': return 'blue';
      case 'secondary': return 'gray';
      case 'destructive': return 'red';
      case 'outline': return 'purple'; // Just an example
      case 'success': return 'green';
      default: return 'gray';
    }
  };

  return (
    <ChakraBadge colorScheme={getColorScheme(variant as string)} style={style as React.CSSProperties}>
      {content as React.ReactNode}
    </ChakraBadge>
  );
};
