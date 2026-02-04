import React from 'react';
import { Statistic, Card } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { ComponentRenderProps } from '@json-render/react';

export const Metric = ({ element }: ComponentRenderProps) => {
    const { label, value, trend, trendDirection, style } = element.props;

    const getTrendSuffix = () => {
        if (!trendDirection || trend === undefined) return null;

        const color = trendDirection === 'up' ? '#3f8600' : '#cf1322';
        const Icon = trendDirection === 'up' ? ArrowUpOutlined : ArrowDownOutlined;

        return (
            <span style={{ color, fontSize: 14 }}>
                <Icon /> {trend as number}%
            </span>
        );
    };

    return (
        <Card style={style as React.CSSProperties} size="small">
            <Statistic
                title={label as string}
                value={value as string | number}
                suffix={getTrendSuffix()}
            />
        </Card>
    );
};
