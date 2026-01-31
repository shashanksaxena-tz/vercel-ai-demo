'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Screen = ({ element, children }: ComponentRenderProps) => {
    const {
        height = '100vh',
        width = '100vw',
        overflow = 'hidden',
        background,
        centered = false,
        style
    } = element.props;

    const getBackgroundProps = () => {
        switch (background) {
            case 'muted':
                return { bg: 'gray.100' };
            case 'dark':
                return { bg: 'gray.900', color: 'white' };
            case 'gradient':
                return { bgGradient: 'linear(to-br, blue.50, transparent, purple.50)' };
            default:
                return { bg: 'white' };
        }
    };

    return (
        <Box
            h={height as string}
            w={width as string}
            overflow={overflow as 'hidden' | 'auto' | 'scroll' | 'visible'}
            display={centered ? 'flex' : 'block'}
            alignItems={centered ? 'center' : undefined}
            justifyContent={centered ? 'center' : undefined}
            {...getBackgroundProps()}
            {...(style as Record<string, unknown> || {})}
        >
            {children}
        </Box>
    );
};
