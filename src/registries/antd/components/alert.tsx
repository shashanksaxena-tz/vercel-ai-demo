import React from 'react';
import { Alert as AntAlert } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Alert = ({ element }: ComponentRenderProps) => {
    const { title, description, variant = 'default', style } = element.props;

    // Map variants to Ant Design types
    let type: 'success' | 'info' | 'warning' | 'error' = 'info';

    switch (variant) {
        case 'destructive':
            type = 'error';
            break;
        case 'warning':
            type = 'warning';
            break;
        case 'success':
            type = 'success';
            break;
        case 'default':
        default:
            type = 'info';
            break;
    }

    return (
        <AntAlert
            message={title as string}
            description={description as string}
            type={type}
            showIcon
            style={style as React.CSSProperties}
        />
    );
};
