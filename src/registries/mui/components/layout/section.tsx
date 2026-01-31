'use client';

import React from 'react';
import { Box, Container } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Section = ({ element, children }: ComponentRenderProps) => {
    const {
        id,
        padding = 'lg',
        background = 'default',
        fullWidth = false,
        maxWidth = 'lg',
        style
    } = element.props;

    const paddingMap: Record<string, number> = {
        none: 0,
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 12,
        '2xl': 16,
    };

    const getBackgroundStyles = () => {
        switch (background) {
            case 'muted':
                return { bgcolor: 'grey.100' };
            case 'primary':
                return { bgcolor: 'primary.main', color: 'primary.contrastText' };
            case 'secondary':
                return { bgcolor: 'secondary.main', color: 'secondary.contrastText' };
            case 'accent':
                return { bgcolor: 'info.light' };
            case 'dark':
                return { bgcolor: 'grey.900', color: 'common.white' };
            case 'light':
                return { bgcolor: 'common.white', color: 'grey.900' };
            case 'gradient':
                return { background: 'linear-gradient(135deg, rgba(25,118,210,0.1) 0%, transparent 50%, rgba(156,39,176,0.1) 100%)' };
            default:
                return {};
        }
    };

    const paddingY = paddingMap[(padding as string) || 'lg'] || 8;

    return (
        <Box
            component="section"
            id={id as string}
            sx={{
                width: '100%',
                py: paddingY,
                ...getBackgroundStyles(),
                ...(style as Record<string, unknown> || {}),
            }}
        >
            {fullWidth ? (
                <Box sx={{ px: 2 }}>
                    {children}
                </Box>
            ) : (
                <Container maxWidth={maxWidth as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false}>
                    {children}
                </Container>
            )}
        </Box>
    );
};
