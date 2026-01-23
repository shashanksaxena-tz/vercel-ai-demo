'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Barcode = ({ element }: ComponentRenderProps) => {
  const {
    value,
    format = 'CODE128',
    width = 2,
    height = 100,
    showText = true,
    style
  } = element.props;

  // Note: In a real implementation, you would use a barcode library like 'jsbarcode'
  // This is a placeholder showing how the component would be structured
  return (
    <div
      className={cn('inline-flex flex-col items-center gap-1')}
      style={style as React.CSSProperties}
    >
      <div
        className="bg-white p-2 rounded"
        style={{ minWidth: (value as string)?.length * 10 }}
      >
        <div className="flex items-end justify-center gap-px h-16">
          {(value as string)?.split('').map((char, i) => (
            <div
              key={i}
              className="bg-black"
              style={{
                width: width as number,
                height: `${Math.random() * 30 + 70}%`,
              }}
            />
          ))}
        </div>
      </div>
      {showText && (
        <span className="font-mono text-sm">{value as string}</span>
      )}
    </div>
  );
};
