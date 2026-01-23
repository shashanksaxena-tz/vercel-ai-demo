'use client';
import React from 'react';
import { Icon as ChakraIcon, Box } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';
import * as LucideIcons from 'lucide-react';

export const Icon = ({ element }: ComponentRenderProps) => {
    const { name, size = 'md', color, style } = element.props;

    const sizeMap: Record<string, number> = {
        xs: 12,
        sm: 16,
        md: 20,
        lg: 24,
        xl: 32,
        '2xl': 40,
    };

    const iconSize = typeof size === 'number' ? size : (sizeMap[size as string] || 20);
    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; color?: string }>>)[name as string];

    if (!IconComponent) {
        return (
            <Box
                as="span"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                width={`${iconSize}px`}
                height={`${iconSize}px`}
                color={color as string}
                style={style as React.CSSProperties}
            >
                ?
            </Box>
        );
    }

    return (
        <Box
            as="span"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            color={color as string}
            style={style as React.CSSProperties}
        >
            <IconComponent size={iconSize} />
        </Box>
    );
};

export const IconBox = ({ element }: ComponentRenderProps) => {
    const { name, size = 'md', color, bg, rounded = 'md', style } = element.props;

    const sizeMap: Record<string, { icon: number; box: string }> = {
        xs: { icon: 12, box: '1.5rem' },
        sm: { icon: 14, box: '2rem' },
        md: { icon: 18, box: '2.5rem' },
        lg: { icon: 22, box: '3rem' },
        xl: { icon: 28, box: '3.5rem' },
    };

    const sizes = sizeMap[size as string] || sizeMap.md;
    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[name as string];

    return (
        <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            width={sizes.box}
            height={sizes.box}
            borderRadius={rounded as string}
            bg={bg as string}
            color={color as string}
            style={style as React.CSSProperties}
        >
            {IconComponent ? <IconComponent size={sizes.icon} /> : <span>?</span>}
        </Box>
    );
};

export const CircleIcon = ({ element }: ComponentRenderProps) => {
    const { name, size = 'md', color = 'white', bg = 'blue.500', style } = element.props;

    const sizeMap: Record<string, { icon: number; box: string }> = {
        xs: { icon: 10, box: '1.25rem' },
        sm: { icon: 12, box: '1.5rem' },
        md: { icon: 16, box: '2rem' },
        lg: { icon: 20, box: '2.5rem' },
        xl: { icon: 24, box: '3rem' },
    };

    const sizes = sizeMap[size as string] || sizeMap.md;
    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[name as string];

    return (
        <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            width={sizes.box}
            height={sizes.box}
            borderRadius="full"
            bg={bg as string}
            color={color as string}
            style={style as React.CSSProperties}
        >
            {IconComponent ? <IconComponent size={sizes.icon} /> : <span>?</span>}
        </Box>
    );
};
