'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Gauge = ({ element }: ComponentRenderProps) => {
  const {
    value = 0,
    min = 0,
    max = 100,
    title,
    label,
    showValue = true,
    size = 200,
    thickness = 20,
    colors = ['#ef4444', '#eab308', '#22c55e'],
    thresholds = [33, 66, 100],
    style,
  } = element.props;

  const currentValue = value as number;
  const minValue = min as number;
  const maxValue = max as number;
  const normalizedValue = Math.min(Math.max((currentValue - minValue) / (maxValue - minValue), 0), 1);
  const angle = normalizedValue * 180;

  const colorArray = colors as string[];
  const thresholdArray = thresholds as number[];

  const getColor = () => {
    const percentage = normalizedValue * 100;
    for (let i = 0; i < thresholdArray.length; i++) {
      if (percentage <= thresholdArray[i]) {
        return colorArray[i] || colorArray[colorArray.length - 1];
      }
    }
    return colorArray[colorArray.length - 1];
  };

  const radius = ((size as number) - (thickness as number)) / 2;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedValue * circumference);

  return (
    <div className="flex flex-col items-center" style={style as React.CSSProperties}>
      {title && <h3 className="text-lg font-semibold mb-4">{title as string}</h3>}
      <div className="relative" style={{ width: size as number, height: (size as number) / 2 + 20 }}>
        <svg
          width={size as number}
          height={(size as number) / 2 + 20}
          viewBox={`0 0 ${size} ${(size as number) / 2 + 20}`}
        >
          {/* Background arc */}
          <path
            d={`M ${(thickness as number) / 2} ${(size as number) / 2} A ${radius} ${radius} 0 0 1 ${(size as number) - (thickness as number) / 2} ${(size as number) / 2}`}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={thickness as number}
            strokeLinecap="round"
          />
          {/* Value arc */}
          <path
            d={`M ${(thickness as number) / 2} ${(size as number) / 2} A ${radius} ${radius} 0 0 1 ${(size as number) - (thickness as number) / 2} ${(size as number) / 2}`}
            fill="none"
            stroke={getColor()}
            strokeWidth={thickness as number}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500"
          />
          {/* Needle */}
          <g transform={`rotate(${angle - 90}, ${(size as number) / 2}, ${(size as number) / 2})`}>
            <line
              x1={(size as number) / 2}
              y1={(size as number) / 2}
              x2={(size as number) / 2}
              y2={(thickness as number) + 10}
              stroke="#1f2937"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
          {/* Center circle */}
          <circle
            cx={(size as number) / 2}
            cy={(size as number) / 2}
            r="8"
            fill="#1f2937"
          />
        </svg>
        {/* Min/Max labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-muted-foreground">
          <span>{minValue}</span>
          <span>{maxValue}</span>
        </div>
      </div>
      {showValue && (
        <div className="text-center -mt-2">
          <p className="text-3xl font-bold">{currentValue}</p>
          {label && <p className="text-sm text-muted-foreground">{label as string}</p>}
        </div>
      )}
    </div>
  );
};
