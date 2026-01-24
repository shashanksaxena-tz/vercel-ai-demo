import React from 'react';
import { ComponentRenderProps } from '@json-render/react';

export const Grid = ({ element, children }: ComponentRenderProps) => {
  const { columns = 1, gap = 4, style } = element.props;

  const colCount = columns as number;
  const gapCount = gap as number;

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
        gap: `${gapCount * 0.25}rem`,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
