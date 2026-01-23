import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Button = ({ element, onAction }: ComponentRenderProps) => {
    const { variant = 'default', size = 'default', children, label, action, style, disabled } = element.props;

    // Map variants to Chakra colorScheme and variant
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
        case 'default':
        default:
            chakraVariant = 'solid';
            colorPalette = 'blue';
            break;
    }

    // Map sizes
    let chakraSize: 'xs' | 'sm' | 'md' | 'lg' = 'md';
    switch (size) {
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
            style={style as React.CSSProperties}
        >
            {(label || children) as React.ReactNode}
        </ChakraButton>
    );
};
