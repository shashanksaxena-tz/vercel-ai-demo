import React from 'react';
import { Avatar as ChakraAvatar } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Avatar = ({ element }: ComponentRenderProps) => {
  const { src, fallback, alt, style } = element.props;

  return (
    <ChakraAvatar
      src={src as string}
      name={alt as string || fallback as string}
      style={style as React.CSSProperties}
    />
  );
};
