'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';

export const RetroGrid = ({ element, children }: ComponentRenderProps) => {
  const {
    angle = 65,
    cellSize = 60,
    opacity = 0.5,
    lightLineColor = 'gray',
    darkLineColor = 'gray',
    className,
    style
  } = element.props;

  return (
    <div
      className={className as string}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style as React.CSSProperties
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, ${lightLineColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${lightLineColor} 1px, transparent 1px)
          `,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          transform: `perspective(500px) rotateX(${angle}deg)`,
          transformOrigin: 'center center',
          opacity: opacity as number,
          maskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};
