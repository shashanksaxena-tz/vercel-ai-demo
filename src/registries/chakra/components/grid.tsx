import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Grid = ({ element, children }: ComponentRenderProps) => {
  const { columns = 1, gap, style } = element.props;

  return (
    <SimpleGrid
      columns={columns as number}
      spacing={gap ? `${gap}px` : 4}
      style={style as React.CSSProperties}
    >
      {(element.props.children || children) as React.ReactNode}
    </SimpleGrid>
  );
};
