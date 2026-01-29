import React from 'react';
import { ComponentRenderProps } from '@json-render/react';

export const Grid = ({ element, children }: ComponentRenderProps) => {
  const { columns = 1, gap = 4, style } = element.props;
  const gapValue = typeof gap === 'number' ? `${gap * 0.25}rem` : (gap as string | undefined);

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: gapValue,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
