'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis, Legend, Pie, PieChart, Cell } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';

export const ReportChart = ({ element }: ComponentRenderProps) => {
  const {
    title,
    description,
    type = 'bar',
    data,
    categories,
    index = 'name',
    colors,
    height = 350,
    showLegend = true,
    showGrid = true,
    stacked = false,
    orientation = 'vertical',
    style,
  } = element.props;

  const chartConfig: ChartConfig = {};
  const cats = categories as string[] || [];

  cats?.forEach((cat, i) => {
    chartConfig[cat] = {
      label: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/([A-Z])/g, ' $1'),
      color: (colors as string[])?.[i] || `hsl(var(--chart-${(i % 5) + 1}))`,
    };
  });

  const defaultColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ];

  const renderChart = () => {
    const commonProps = {
      data: data as any[],
      accessibilityLayer: true,
    };

    if (type === 'pie') {
      return (
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie
            data={data as any[]}
            dataKey={cats[0]}
            nameKey={index as string}
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
          >
            {(data as any[])?.map((_, idx) => (
              <Cell key={idx} fill={defaultColors[idx % defaultColors.length]} />
            ))}
          </Pie>
          {showLegend && <Legend />}
        </PieChart>
      );
    }

    if (type === 'area') {
      return (
        <AreaChart {...commonProps} layout={orientation === 'horizontal' ? 'vertical' : 'horizontal'}>
          {showGrid && <CartesianGrid vertical={false} strokeDasharray="3 3" />}
          <XAxis dataKey={index as string} tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => v.toLocaleString()} />
          <ChartTooltip content={<ChartTooltipContent />} />
          {showLegend && <ChartLegend content={<ChartLegendContent />} />}
          {cats?.map((cat, idx) => (
            <Area
              key={cat}
              type="monotone"
              dataKey={cat}
              fill={`var(--color-${cat})`}
              stroke={`var(--color-${cat})`}
              fillOpacity={0.4}
              strokeWidth={2}
              stackId={stacked ? 'stack' : undefined}
            />
          ))}
        </AreaChart>
      );
    }

    if (type === 'line') {
      return (
        <LineChart {...commonProps}>
          {showGrid && <CartesianGrid vertical={false} strokeDasharray="3 3" />}
          <XAxis dataKey={index as string} tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => v.toLocaleString()} />
          <ChartTooltip content={<ChartTooltipContent />} />
          {showLegend && <ChartLegend content={<ChartLegendContent />} />}
          {cats?.map((cat) => (
            <Line
              key={cat}
              type="monotone"
              dataKey={cat}
              stroke={`var(--color-${cat})`}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      );
    }

    // Default: bar chart
    return (
      <BarChart {...commonProps} layout={orientation === 'horizontal' ? 'vertical' : 'horizontal'}>
        {showGrid && <CartesianGrid vertical={false} strokeDasharray="3 3" />}
        {orientation === 'horizontal' ? (
          <>
            <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(v) => v.toLocaleString()} />
            <YAxis dataKey={index as string} type="category" tickLine={false} tickMargin={10} axisLine={false} />
          </>
        ) : (
          <>
            <XAxis dataKey={index as string} tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => v.toLocaleString()} />
          </>
        )}
        <ChartTooltip content={<ChartTooltipContent />} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {cats?.map((cat) => (
          <Bar
            key={cat}
            dataKey={cat}
            fill={`var(--color-${cat})`}
            radius={stacked ? 0 : [4, 4, 0, 0]}
            stackId={stacked ? 'stack' : undefined}
          />
        ))}
      </BarChart>
    );
  };

  return (
    <Card className="overflow-hidden" style={style as React.CSSProperties}>
      {(!!title || !!description) && (
        <CardHeader>
          {!!title && <CardTitle>{title as React.ReactNode}</CardTitle>}
          {!!description && <CardDescription>{description as React.ReactNode}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <ChartContainer config={chartConfig} style={{ height: `${height}px`, width: '100%' }}>
          {renderChart()}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
