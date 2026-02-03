import React from 'react';
import { ComponentRenderProps } from '@json-render/react';

export const Grid = ({ element, children }: ComponentRenderProps) => {
  const columns = (element.props.columns as number) || 1;
  const gap = (element.props.gap as number) || 4;
  const style = element.props.style as React.CSSProperties;

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${gap * 0.25}rem`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
