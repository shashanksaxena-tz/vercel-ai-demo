'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Chart = ({ element }: ComponentRenderProps) => {
  const {
    type = 'bar',
    data,
    title,
    xAxisLabel,
    yAxisLabel,
    showLegend = true,
    colors = ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#8b5cf6'],
    height = 300,
    style,
  } = element.props;

  const chartData = data as Array<{ label: string; value: number; category?: string }>;
  const colorArray = colors as string[];

  if (!chartData?.length) {
    return (
      <div className="p-8 text-center text-muted-foreground border rounded-lg">
        No data available
      </div>
    );
  }

  const maxValue = Math.max(...chartData.map((d) => d.value));
  const categories = [...new Set(chartData.map((d) => d.category || 'default'))];

  const getColor = (index: number) => colorArray[index % colorArray.length];

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {title && <h3 className="text-lg font-semibold mb-4">{title as string}</h3>}

      <div
        className="relative border rounded-lg p-4 bg-card"
        style={{ height: height as number }}
      >
        {type === 'bar' && (
          <div className="flex items-end justify-around h-full gap-2 pt-4 pb-8">
            {chartData.map((item, idx) => {
              const heightPercent = (item.value / maxValue) * 100;
              const categoryIdx = categories.indexOf(item.category || 'default');
              return (
                <div key={idx} className="flex flex-col items-center flex-1 h-full">
                  <div className="flex-1 w-full flex items-end justify-center">
                    <div
                      className="w-full max-w-12 rounded-t transition-all duration-300 hover:opacity-80"
                      style={{
                        height: `${heightPercent}%`,
                        backgroundColor: getColor(categoryIdx),
                      }}
                      title={`${item.label}: ${item.value}`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground mt-2 truncate max-w-full">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {type === 'line' && (
          <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke={getColor(0)}
              strokeWidth="2"
              points={chartData
                .map((item, idx) => {
                  const x = (idx / (chartData.length - 1)) * 380 + 10;
                  const y = 190 - (item.value / maxValue) * 180;
                  return `${x},${y}`;
                })
                .join(' ')}
            />
            {chartData.map((item, idx) => {
              const x = (idx / (chartData.length - 1)) * 380 + 10;
              const y = 190 - (item.value / maxValue) * 180;
              return (
                <circle
                  key={idx}
                  cx={x}
                  cy={y}
                  r="4"
                  fill={getColor(0)}
                  className="hover:r-6 transition-all"
                >
                  <title>{`${item.label}: ${item.value}`}</title>
                </circle>
              );
            })}
          </svg>
        )}

        {type === 'pie' && (
          <div className="flex items-center justify-center h-full">
            <div className="relative w-48 h-48">
              {(() => {
                const total = chartData.reduce((sum, d) => sum + d.value, 0);
                let currentAngle = 0;
                return chartData.map((item, idx) => {
                  const angle = (item.value / total) * 360;
                  const startAngle = currentAngle;
                  currentAngle += angle;
                  const x1 = 50 + 40 * Math.cos((Math.PI * startAngle) / 180);
                  const y1 = 50 + 40 * Math.sin((Math.PI * startAngle) / 180);
                  const x2 = 50 + 40 * Math.cos((Math.PI * (startAngle + angle)) / 180);
                  const y2 = 50 + 40 * Math.sin((Math.PI * (startAngle + angle)) / 180);
                  const largeArcFlag = angle > 180 ? 1 : 0;
                  return (
                    <svg key={idx} className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <path
                        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={getColor(idx)}
                        className="hover:opacity-80 transition-opacity"
                      >
                        <title>{`${item.label}: ${item.value} (${((item.value / total) * 100).toFixed(1)}%)`}</title>
                      </path>
                    </svg>
                  );
                });
              })()}
            </div>
          </div>
        )}
      </div>

      {showLegend && categories.length > 1 && (
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {categories.map((cat, idx) => (
            <div key={cat} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: getColor(idx) }}
              />
              <span className="text-sm text-muted-foreground">{cat}</span>
            </div>
          ))}
        </div>
      )}

      {(xAxisLabel || yAxisLabel) && (
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          {xAxisLabel && <span>{xAxisLabel as string}</span>}
          {yAxisLabel && <span>{yAxisLabel as string}</span>}
        </div>
      )}
    </div>
  );
};
