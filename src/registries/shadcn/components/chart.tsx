import React from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, XAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ComponentRenderProps } from '@json-render/react';

export const Chart = ({ element }: ComponentRenderProps) => {
  const { type, data, categories, index, colors, style } = element.props;

  // Construct config
  const chartConfig: ChartConfig = {};
  (categories as string[])?.forEach((cat, i) => {
     chartConfig[cat] = {
       label: cat.charAt(0).toUpperCase() + cat.slice(1),
       color: (colors as string[])?.[i] || `var(--color-chart-${(i % 5) + 1})`,
     };
  });

  const renderChart = () => {
    const commonProps = {
      data: data as any[],
      accessibilityLayer: true,
    };

    if (type === 'bar') {
      return (
        <BarChart {...commonProps}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey={index as string} tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          {(categories as string[])?.map((cat) => (
             <Bar key={cat} dataKey={cat} fill={`var(--color-${cat})`} radius={4} />
          ))}
        </BarChart>
      );
    }

    if (type === 'line') {
      return (
        <LineChart {...commonProps}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey={index as string} tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          {(categories as string[])?.map((cat) => (
             <Line key={cat} type="monotone" dataKey={cat} stroke={`var(--color-${cat})`} strokeWidth={2} dot={false} />
          ))}
        </LineChart>
      );
    }

    if (type === 'area') {
      return (
        <AreaChart {...commonProps}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey={index as string} tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          {(categories as string[])?.map((cat) => (
             <Area key={cat} type="monotone" dataKey={cat} fill={`var(--color-${cat})`} stroke={`var(--color-${cat})`} fillOpacity={0.4} />
          ))}
        </AreaChart>
      );
    }

    if (type === 'pie') {
      return (
        <PieChart>
           <ChartTooltip content={<ChartTooltipContent />} />
           <Pie
             data={data as any[]}
             dataKey={(categories as string[])?.[0]}
             nameKey={index as string}
             innerRadius={60}
             outerRadius={80}
             fill="var(--color-pie-1)" // Needs dynamic color handling for pie segments usually
           />
           {/* Pie chart with shadcn/chart is complex because it requires config mapping for each segment if using dataKey per segment,
               OR if using one dataKey, the rows define the segments.
               Shadcn chart usually expects `fill` in the data payload or mapped via config key matching the nameKey value.
           */}
        </PieChart>
      );
    }

    return null;
  };

  const chartElement = renderChart();

  if (!chartElement) {
    return null;
  }

  return (
    <div style={style as React.CSSProperties} className="min-h-[200px] w-full">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        {chartElement}
      </ChartContainer>
    </div>
  );
};
