import React from 'react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Paper, Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Chart = ({ element }: ComponentRenderProps) => {
  const { type, data, categories, index, colors, style } = element.props;

  const chartData = data as Record<string, unknown>[];
  const chartCategories = categories as string[];
  const chartIndex = index as string;
  const chartColors = colors as string[];

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={chartIndex} />
            <YAxis />
            <Tooltip />
            <Legend />
            {chartCategories?.map((cat, i) => (
              <Bar key={cat} dataKey={cat} fill={chartColors?.[i] || '#8884d8'} />
            ))}
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={chartIndex} />
            <YAxis />
            <Tooltip />
            <Legend />
            {chartCategories?.map((cat, i) => (
              <Line key={cat} type="monotone" dataKey={cat} stroke={chartColors?.[i] || '#8884d8'} />
            ))}
          </LineChart>
        );
      case 'area':
         return (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={chartIndex} />
            <YAxis />
            <Tooltip />
            <Legend />
            {chartCategories?.map((cat, i) => (
              <Area key={cat} type="monotone" dataKey={cat} stroke={chartColors?.[i] || '#8884d8'} fill={chartColors?.[i] || '#8884d8'} />
            ))}
          </AreaChart>
        );
      case 'pie':
          return (
             <PieChart>
                 <Pie data={chartData} dataKey={chartCategories?.[0]} nameKey={chartIndex} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
                 <Tooltip />
                 <Legend />
             </PieChart>
          );
      default:
        return null;
    }
  };

  return (
    <Box component={Paper} p={2} height={350} style={style as React.CSSProperties}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart() || <div>Chart type not supported</div>}
      </ResponsiveContainer>
    </Box>
  );
};
