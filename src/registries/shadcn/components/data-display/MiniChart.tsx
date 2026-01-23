'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const MiniChart = ({ element }: ComponentRenderProps) => {
  const {
    data,
    label,
    value,
    trend,
    trendLabel,
    type = 'sparkline',
    color = '#3b82f6',
    height = 40,
    style,
  } = element.props;

  const chartData = data as number[];

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-3 w-3 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="h-3 w-3 text-red-500" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-500';
    if (trend === 'down') return 'text-red-500';
    return 'text-muted-foreground';
  };

  const renderMiniChart = () => {
    if (!chartData?.length) return null;

    const minValue = Math.min(...chartData);
    const maxValue = Math.max(...chartData);
    const range = maxValue - minValue || 1;
    const chartHeight = height as number;
    const chartWidth = 80;

    if (type === 'bar') {
      const barWidth = (chartWidth - chartData.length + 1) / chartData.length;
      return (
        <svg width={chartWidth} height={chartHeight}>
          {chartData.map((val, idx) => {
            const barHeight = ((val - minValue) / range) * (chartHeight - 4);
            return (
              <rect
                key={idx}
                x={idx * (barWidth + 1)}
                y={chartHeight - barHeight - 2}
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

    const points = chartData.map((val, idx) => {
      const x = (idx / (chartData.length - 1)) * chartWidth;
      const y = chartHeight - 2 - ((val - minValue) / range) * (chartHeight - 4);
      return { x, y };
    });

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

    return (
      <svg width={chartWidth} height={chartHeight}>
        <path d={areaPath} fill={color as string} fillOpacity="0.1" />
        <path
          d={linePath}
          fill="none"
          stroke={color as string}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r="2"
          fill={color as string}
        />
      </svg>
    );
  };

  return (
    <div
      className="flex items-center gap-4 p-3 bg-card rounded-lg border"
      style={style as React.CSSProperties}
    >
      <div className="flex-1 min-w-0">
        {label && (
          <p className="text-sm text-muted-foreground truncate">{label as string}</p>
        )}
        {value !== undefined && (
          <p className="text-lg font-semibold">{value as React.ReactNode}</p>
        )}
        {(trend || trendLabel) && (
          <div className={cn('flex items-center gap-1 text-xs', getTrendColor())}>
            {getTrendIcon()}
            {trendLabel && <span>{trendLabel as string}</span>}
          </div>
        )}
      </div>
      <div className="flex-shrink-0">{renderMiniChart()}</div>
    </div>
  );
};
