'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Cell,
} from 'recharts';
import { ComponentRenderProps } from '@json-render/react';

const COLORS = ['#3182ce', '#805ad5', '#38a169', '#dd6b20', '#e53e3e', '#319795'];

export const Chart = ({ element }: ComponentRenderProps) => {
    const { type, data = [], categories = [], index, colors = COLORS, style } = element.props;

    const chartData = data as Record<string, unknown>[];
    const chartCategories = categories as string[];
    const chartColors = colors as string[];

    const renderChart = () => {
        switch (type) {
            case 'bar':
                return (
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={index as string} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {chartCategories.map((category, idx) => (
                            <Bar
                                key={category}
                                dataKey={category}
                                fill={chartColors[idx % chartColors.length]}
                            />
                        ))}
                    </BarChart>
                );
            case 'line':
                return (
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={index as string} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {chartCategories.map((category, idx) => (
                            <Line
                                key={category}
                                type="monotone"
                                dataKey={category}
                                stroke={chartColors[idx % chartColors.length]}
                                strokeWidth={2}
                            />
                        ))}
                    </LineChart>
                );
            case 'area':
                return (
                    <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={index as string} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {chartCategories.map((category, idx) => (
                            <Area
                                key={category}
                                type="monotone"
                                dataKey={category}
                                fill={chartColors[idx % chartColors.length]}
                                stroke={chartColors[idx % chartColors.length]}
                                fillOpacity={0.3}
                            />
                        ))}
                    </AreaChart>
                );
            case 'pie':
                return (
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey={chartCategories[0] || 'value'}
                            nameKey={index as string}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                        >
                            {chartData.map((_, idx) => (
                                <Cell key={`cell-${idx}`} fill={chartColors[idx % chartColors.length]} />
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
        <Box w="100%" h="300px" style={style as React.CSSProperties}>
            <ResponsiveContainer width="100%" height="100%">
                {renderChart() || <div>Unsupported chart type</div>}
            </ResponsiveContainer>
        </Box>
    );
};
