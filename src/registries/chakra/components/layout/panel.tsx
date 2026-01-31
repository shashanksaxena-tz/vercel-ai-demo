'use client';

import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Panel = ({ element, children }: ComponentRenderProps) => {
    const {
        padding = 4,
        variant = 'default',
        border = true,
        borderRadius = 'lg',
        shadow,
        header,
        footer,
        style
    } = element.props;

    const paddingNum = typeof padding === 'number' ? padding : Number(padding) || 4;

    const variantStyles: Record<string, object> = {
        default: { bg: 'white' },
        filled: { bg: 'gray.50' },
        card: { bg: 'white' },
        elevated: { bg: 'white', boxShadow: 'lg' },
        outline: { bg: 'transparent', borderWidth: 1, borderColor: 'gray.200' },
    };

    const shadowMap: Record<string, string> = {
        none: 'none',
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
    };

    return (
        <Box
            borderRadius={borderRadius as string}
            borderWidth={(border && variant !== 'outline') ? 1 : 0}
            borderColor="gray.200"
            boxShadow={shadow ? shadowMap[shadow as string] : undefined}
            {...variantStyles[variant as string] || variantStyles.default}
            {...(style as Record<string, unknown> || {})}
        >
            {(header as string) && (
                <Box px={4} py={3} borderBottomWidth={1} borderColor="gray.200">
                    <Text fontWeight="medium">{header as string}</Text>
                </Box>
            )}
            <Box p={paddingNum}>
                {children}
            </Box>
            {(footer as string) && (
                <Box px={4} py={3} borderTopWidth={1} borderColor="gray.200" bg="gray.50">
                    <Text fontSize="sm" color="gray.600">{footer as string}</Text>
                </Box>
            )}
        </Box>
    );
};
