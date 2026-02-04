import React from 'react';
import { Tag } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Badge = ({ element }: ComponentRenderProps) => {
    const { variant = 'default', children, style } = element.props;

    // Map variants to Ant Design colors
    let color = 'default';

    switch (variant) {
        case 'secondary':
            color = 'default';
            break;
        case 'destructive':
            color = 'error';
            break;
        case 'outline':
            color = 'default';
            break;
        case 'default':
        default:
            color = 'processing';
            break;
    }

    return (
        <Tag color={color} bordered={variant === 'outline'} style={style as React.CSSProperties}>
            {children as React.ReactNode}
        </Tag>
    );
};
