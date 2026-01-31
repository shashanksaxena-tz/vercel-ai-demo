'use client';

import React from 'react';
import { Card as AntCard, Typography } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

const { Title, Text } = Typography;

export const Panel = ({ element, children }: ComponentRenderProps) => {
    const {
        padding = 4,
        variant = 'default',
        border = true,
        borderRadius,
        shadow,
        header,
        footer,
        style
    } = element.props;

    const paddingNum = typeof padding === 'number' ? padding : Number(padding) || 4;

    const getBordered = () => {
        if (variant === 'outline' || border) return true;
        return false;
    };

    const getCardStyle = (): React.CSSProperties => {
        const baseStyle: React.CSSProperties = {
            ...(style as React.CSSProperties || {}),
        };

        switch (variant) {
            case 'filled':
                return { ...baseStyle, background: '#fafafa' };
            case 'elevated':
                return { ...baseStyle, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' };
            case 'outline':
                return { ...baseStyle, background: 'transparent' };
            default:
                return baseStyle;
        }
    };

    return (
        <AntCard
            bordered={getBordered()}
            style={getCardStyle()}
            title={header as string}
            bodyStyle={{ padding: paddingNum * 8 }}
        >
            {children}
            {(footer as string) && (
                <div style={{ paddingTop: 12, marginTop: 12, borderTop: '1px solid #f0f0f0' }}>
                    <Text type="secondary">{footer as string}</Text>
                </div>
            )}
        </AntCard>
    );
};
