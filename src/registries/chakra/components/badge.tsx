import React from 'react';
import { Badge as ChakraBadge } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Badge = ({ element }: ComponentRenderProps) => {
    const { variant = 'default', children, style } = element.props;

    // Map variants to Chakra colorScheme
    let colorPalette = 'gray';
    let chakraVariant: 'solid' | 'subtle' | 'outline' = 'subtle';

    switch (variant) {
        case 'secondary':
            colorPalette = 'gray';
            chakraVariant = 'outline';
            break;
        case 'destructive':
            colorPalette = 'red';
            chakraVariant = 'solid';
            break;
        case 'outline':
            chakraVariant = 'outline';
            break;
        case 'default':
        default:
            colorPalette = 'blue';
            chakraVariant = 'subtle';
            break;
    }

    return (
        <ChakraBadge
            colorPalette={colorPalette}
            variant={chakraVariant}
            style={style as React.CSSProperties}
        >
            {children as React.ReactNode}
        </ChakraBadge>
    );
};
