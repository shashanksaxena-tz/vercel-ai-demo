'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Sparkline = ({ element }: ComponentRenderProps) => {
  const {
    data,
    type = 'line',
    color = '#3b82f6',
    showEndDot = true,
    showMinMax = false,
    fillOpacity = 0.1,
    width = 120,
    height = 32,
    style,
  } = element.props;

  const sparklineData = data as number[];

  if (!sparklineData?.length) {
    return null;
  }

  const minValue = Math.min(...sparklineData);
  const maxValue = Math.max(...sparklineData);
  const range = maxValue - minValue || 1;

  const getY = (value: number) => {
    return (height as number) - 4 - ((value - minValue) / range) * ((height as number) - 8);
  };

  const points = sparklineData.map((value, idx) => {
    const x = 4 + (idx / (sparklineData.length - 1)) * ((width as number) - 8);
    const y = getY(value);
    return { x, y, value };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${(height as number)} L ${points[0].x} ${(height as number)} Z`;

  const lastPoint = points[points.length - 1];
  const minPoint = points.find((p) => p.value === minValue);
  const maxPoint = points.find((p) => p.value === maxValue);

  if (type === 'bar') {
    const barWidth = ((width as number) - 8) / sparklineData.length - 2;
    return (
      <svg
        width={width as number}
        height={height as number}
        className="inline-block"
        style={style as React.CSSProperties}
      >
        {sparklineData.map((value, idx) => {
          const barHeight = ((value - minValue) / range) * ((height as number) - 8);
          const x = 4 + idx * (barWidth + 2);
          const y = (height as number) - 4 - barHeight;
          return (
            <rect
              key={idx}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={color as string}
              rx="1"
            />
          );
        })}
      </svg>
    );
  }

  return (
    <svg
      width={width as number}
      height={height as number}
      className="inline-block"
      style={style as React.CSSProperties}
    >
      {/* Area fill */}
      {type === 'area' && (
        <path
          d={areaPath}
          fill={color as string}
          fillOpacity={fillOpacity as number}
        />
      )}
      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke={color as string}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Min/Max dots */}
      {showMinMax && minPoint && maxPoint && (
        <>
          <circle cx={minPoint.x} cy={minPoint.y} r="2" fill="#ef4444" />
          <circle cx={maxPoint.x} cy={maxPoint.y} r="2" fill="#22c55e" />
        </>
      )}
      {/* End dot */}
      {showEndDot && (
        <circle
          cx={lastPoint.x}
          cy={lastPoint.y}
          r="3"
          fill={color as string}
        />
      )}
    </svg>
  );
};
