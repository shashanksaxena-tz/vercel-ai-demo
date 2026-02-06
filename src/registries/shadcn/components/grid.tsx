import React from 'react';
import { ComponentRenderProps } from '@json-render/react';

export const Grid = ({ element, children }: ComponentRenderProps) => {
  const { columns = 1, gap = 4, style } = element.props;

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${(gap as number) * 0.25}rem`,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
