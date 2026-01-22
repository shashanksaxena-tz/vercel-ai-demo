import React from 'react';
import { Space } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Stack = ({ element, children }: ComponentRenderProps) => {
    const { direction = 'column', gap = 16, style } = element.props;

    return (
        <Space
            direction={direction === 'row' ? 'horizontal' : 'vertical'}
            size={gap as number}
            style={{ width: '100%', ...style as React.CSSProperties }}
            wrap
        >
            {children}
        </Space>
    );
};
