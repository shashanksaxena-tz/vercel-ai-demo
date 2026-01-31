'use client';

import React from 'react';
import { Box } from '@mui/material';
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

    const getBackgroundStyles = () => {
        switch (background) {
            case 'muted':
                return { bgcolor: 'grey.100' };
            case 'dark':
                return { bgcolor: 'grey.900', color: 'common.white' };
            case 'gradient':
                return { background: 'linear-gradient(135deg, rgba(25,118,210,0.1) 0%, transparent 50%, rgba(156,39,176,0.1) 100%)' };
            default:
                return { bgcolor: 'background.paper' };
        }
    };

    return (
        <Box
            sx={{
                height: height as string,
                width: width as string,
                overflow: overflow as 'hidden' | 'auto' | 'scroll' | 'visible',
                display: centered ? 'flex' : 'block',
                alignItems: centered ? 'center' : undefined,
                justifyContent: centered ? 'center' : undefined,
                ...getBackgroundStyles(),
                ...(style as Record<string, unknown> || {}),
            }}
        >
            {children}
        </Box>
    );
};
