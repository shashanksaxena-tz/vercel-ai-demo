'use client';

import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Section = ({ element, children }: ComponentRenderProps) => {
    const {
        id,
        padding = 'lg',
        background = 'default',
        fullWidth = false,
        maxWidth = '6xl',
        style
    } = element.props;

    const paddingMap: Record<string, number> = {
        none: 0,
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        '2xl': 32,
    };

    const getBackgroundProps = () => {
        switch (background) {
            case 'muted':
                return { bg: 'gray.50' };
            case 'primary':
                return { bg: 'blue.500', color: 'white' };
            case 'secondary':
                return { bg: 'purple.500', color: 'white' };
            case 'dark':
                return { bg: 'gray.900', color: 'white' };
            case 'light':
                return { bg: 'white', color: 'gray.900' };
            case 'gradient':
                return { bgGradient: 'linear(to-br, blue.50, transparent, purple.50)' };
            default:
                return {};
        }
    };

    const py = paddingMap[(padding as string) || 'lg'] || 16;

    return (
        <Box
            as="section"
            id={id as string}
            py={py}
            w="100%"
            {...getBackgroundProps()}
            {...(style as Record<string, unknown> || {})}
        >
            {fullWidth ? (
                <Box px={4}>
                    {children}
                </Box>
            ) : (
                <Container maxW={maxWidth as string}>
                    {children}
                </Container>
            )}
        </Box>
    );
};
