import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Icon as ChakraIcon } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Icon = ({ element }: ComponentRenderProps) => {
  const { name, size = 24, color, style } = element.props;

  const normalizeName = (str: string) => {
    if (!str) return 'HelpCircle';
    return str
      .split(/[-_]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join('');
  };

  const getIcon = (str: string) => {
      const pascal = normalizeName(str);
      // @ts-expect-error - Dynamic access
      if (LucideIcons[pascal]) return LucideIcons[pascal];
      // @ts-expect-error - Dynamic access
      if (LucideIcons[str]) return LucideIcons[str];

      const keys = Object.keys(LucideIcons);
      const match = keys.find(k => k.toLowerCase() === str.toLowerCase().replace(/[-_]/g, ''));
      // @ts-expect-error - Dynamic access
      if (match) return LucideIcons[match];

      return LucideIcons.HelpCircle;
  };

  const LucideIcon = getIcon(name as string);

  return (
    <ChakraIcon
      as={LucideIcon}
      boxSize={`${size}px`}
      color={color as string}
      style={style as React.CSSProperties}
    />
  );
};
