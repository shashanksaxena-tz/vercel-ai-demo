'use client';

import React from 'react';
import { Form as AntForm } from 'antd';
import type { ValidateStatus } from 'antd/es/form/FormItem';
import { ComponentRenderProps } from '@json-render/react';

export const FormField = ({ element, children }: ComponentRenderProps) => {
    const {
        label,
        name,
        required = false,
        error,
        helperText,
        layout = 'vertical',
        labelWidth,
        style
    } = element.props;

    const getValidateStatus = (): ValidateStatus | undefined => {
        if (error) return 'error';
        return undefined;
    };

    return (
        <AntForm.Item
            label={label as string}
            name={name as string}
            required={required as boolean}
            validateStatus={getValidateStatus()}
            help={(error || helperText) as React.ReactNode}
            labelCol={layout === 'horizontal' ? { flex: (labelWidth as string) || '25%' } : undefined}
            wrapperCol={layout === 'horizontal' ? { flex: 'auto' } : undefined}
            style={style as React.CSSProperties}
        >
            {children}
        </AntForm.Item>
    );
};
