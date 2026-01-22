import React from 'react';
import { Box } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';

export const Chart = ({ element }: ComponentRenderProps) => {
  const { type, data, categories, index, colors = [], style } = element.props;
  const chartData = data as any[];
  const categoryKeys = categories as string[];
  const indexKey = index as string;
  const colorPalette = (colors as string[]).length > 0 ? (colors as string[]) : ['#3182ce', '#38a169', '#d53f8c', '#805ad5'];

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={indexKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {categoryKeys.map((key, i) => (
              <Bar key={key} dataKey={key} fill={colorPalette[i % colorPalette.length]} />
            ))}
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={indexKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {categoryKeys.map((key, i) => (
              <Line key={key} type="monotone" dataKey={key} stroke={colorPalette[i % colorPalette.length]} />
            ))}
          </LineChart>
        );
      case 'area':
         return (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={indexKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {categoryKeys.map((key, i) => (
              <Area key={key} type="monotone" dataKey={key} fill={colorPalette[i % colorPalette.length]} stroke={colorPalette[i % colorPalette.length]} />
            ))}
          </AreaChart>
         );
      case 'pie':
        return (
          <PieChart>
             <Pie
              data={chartData}
              dataKey={categoryKeys[0]} // Pie usually takes one value per slice, here we assume rows are slices? Or one category key implies value? Usually chartData is [{name: 'A', value: 10}].
              // If data structure matches Recharts expectation.
              nameKey={indexKey}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colorPalette[index % colorPalette.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <Box h="300px" w="100%" style={style as React.CSSProperties}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart() as any}
      </ResponsiveContainer>
    </Box>
  );
};
