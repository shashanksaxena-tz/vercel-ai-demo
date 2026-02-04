import React from 'react';
import { Button as AntButton } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Button = ({ element, onAction }: ComponentRenderProps) => {
    const { variant = 'default', size = 'default', children, label, action, style, disabled } = element.props;

    // Map variants to Ant Design types
    let type: 'primary' | 'default' | 'dashed' | 'link' | 'text' = 'primary';
    let danger = false;

    switch (variant) {
        case 'secondary':
            type = 'default';
            break;
        case 'destructive':
            type = 'primary';
            danger = true;
            break;
        case 'ghost':
            type = 'text';
            break;
        case 'link':
            type = 'link';
            break;
        case 'outline':
            type = 'dashed';
            break;
        case 'default':
        default:
            type = 'primary';
            break;
    }

    // Map sizes
    let antSize: 'small' | 'middle' | 'large' = 'middle';
    switch (size) {
        case 'sm':
            antSize = 'small';
            break;
        case 'lg':
            antSize = 'large';
            break;
        default:
            antSize = 'middle';
            break;
    }

    return (
        <AntButton
            type={type}
            danger={danger}
            size={antSize}
            onClick={() => action && onAction?.({ name: action as string })}
            disabled={disabled as boolean}
            style={style as React.CSSProperties}
        >
            {(label || children) as React.ReactNode}
        </AntButton>
    );
};
