'use client';

import React from 'react';
import { Form as AntForm } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Form = ({ element, children, onAction }: ComponentRenderProps) => {
    const { action, layout = 'vertical', style } = element.props;

    const handleFinish = () => {
        if (action && onAction) {
            onAction({ name: action as string });
        }
    };

    return (
        <AntForm
            layout={layout as 'horizontal' | 'vertical' | 'inline'}
            onFinish={handleFinish}
            style={style as React.CSSProperties}
        >
            {children}
        </AntForm>
    );
};
