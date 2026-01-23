'use client';
import React from 'react';
import { Button as ChakraButton, IconButton as ChakraIconButton } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Button = ({ element, onAction }: ComponentRenderProps) => {
    const { variant = 'default', size = 'default', children, label, action, style, disabled, leftIcon, rightIcon, loading, loadingText } = element.props;

    let colorPalette = 'blue';
    let chakraVariant: 'solid' | 'outline' | 'ghost' | 'plain' = 'solid';

    switch (variant) {
        case 'secondary':
            chakraVariant = 'outline';
            colorPalette = 'gray';
            break;
        case 'destructive':
            chakraVariant = 'solid';
            colorPalette = 'red';
            break;
        case 'ghost':
            chakraVariant = 'ghost';
            break;
        case 'link':
            chakraVariant = 'plain';
            break;
        case 'outline':
            chakraVariant = 'outline';
            break;
        case 'success':
            chakraVariant = 'solid';
            colorPalette = 'green';
            break;
        case 'warning':
            chakraVariant = 'solid';
            colorPalette = 'orange';
            break;
        case 'default':
        default:
            chakraVariant = 'solid';
            colorPalette = 'blue';
            break;
    }

    let chakraSize: 'xs' | 'sm' | 'md' | 'lg' = 'md';
    switch (size) {
        case 'xs':
            chakraSize = 'xs';
            break;
        case 'sm':
            chakraSize = 'sm';
            break;
        case 'lg':
            chakraSize = 'lg';
            break;
        case 'icon':
            chakraSize = 'sm';
            break;
        default:
            chakraSize = 'md';
            break;
    }

    return (
        <ChakraButton
            colorPalette={colorPalette}
            variant={chakraVariant}
            size={chakraSize}
            onClick={() => action && onAction?.({ name: action as string })}
            disabled={disabled as boolean}
            loading={loading as boolean}
            loadingText={loadingText as string}
            style={style as React.CSSProperties}
        >
            {Boolean(leftIcon) && <span>{leftIcon as React.ReactNode}</span>}
            {(label || children) as React.ReactNode}
            {Boolean(rightIcon) && <span>{rightIcon as React.ReactNode}</span>}
        </ChakraButton>
    );
};

export const IconButton = ({ element, onAction }: ComponentRenderProps) => {
    const { variant = 'default', size = 'default', icon, action, style, disabled, ariaLabel } = element.props;

    let colorPalette = 'blue';
    let chakraVariant: 'solid' | 'outline' | 'ghost' | 'plain' = 'solid';

    switch (variant) {
        case 'secondary':
            chakraVariant = 'outline';
            colorPalette = 'gray';
            break;
        case 'destructive':
            chakraVariant = 'solid';
            colorPalette = 'red';
            break;
        case 'ghost':
            chakraVariant = 'ghost';
            break;
        default:
            chakraVariant = 'solid';
            colorPalette = 'blue';
            break;
    }

    let chakraSize: 'xs' | 'sm' | 'md' | 'lg' = 'md';
    switch (size) {
        case 'xs':
            chakraSize = 'xs';
            break;
        case 'sm':
            chakraSize = 'sm';
            break;
        case 'lg':
            chakraSize = 'lg';
            break;
        default:
            chakraSize = 'md';
            break;
    }

    return (
        <ChakraIconButton
            colorPalette={colorPalette}
            variant={chakraVariant}
            size={chakraSize}
            onClick={() => action && onAction?.({ name: action as string })}
            disabled={disabled as boolean}
            aria-label={(ariaLabel || 'icon button') as string}
            style={style as React.CSSProperties}
        >
            {icon as React.ReactNode}
        </ChakraIconButton>
    );
};

export const ButtonGroup = ({ element, children }: ComponentRenderProps) => {
    const { attached = false, style } = element.props;

    return (
        <div
            style={{
                display: 'flex',
                gap: attached ? 0 : '0.5rem',
                ...(style as React.CSSProperties)
            }}
        >
            {children}
        </div>
    );
};
