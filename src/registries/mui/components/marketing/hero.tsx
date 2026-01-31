'use client';

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Hero = ({ element, children, onAction }: ComponentRenderProps) => {
    const {
        title,
        subtitle,
        description,
        primaryAction,
        secondaryAction,
        align = 'center',
        background = 'default',
        padding = 'lg',
        image,
        style
    } = element.props;

    const paddingMap: Record<string, number> = {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
    };

    const getBackgroundStyles = () => {
        switch (background) {
            case 'gradient':
                return { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' };
            case 'dark':
                return { bgcolor: 'grey.900', color: 'common.white' };
            case 'primary':
                return { bgcolor: 'primary.main', color: 'primary.contrastText' };
            case 'muted':
                return { bgcolor: 'grey.100' };
            default:
                return {};
        }
    };

    const py = paddingMap[(padding as string) || 'lg'];

    return (
        <Box
            sx={{
                py,
                width: '100%',
                ...getBackgroundStyles(),
                ...(style as Record<string, unknown> || {}),
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        textAlign: align as 'left' | 'center' | 'right',
                        maxWidth: align === 'center' ? 800 : '100%',
                        mx: align === 'center' ? 'auto' : 0,
                    }}
                >
                    {subtitle && (
                        <Typography
                            variant="overline"
                            color="primary"
                            sx={{ fontWeight: 600, letterSpacing: 1 }}
                        >
                            {subtitle as string}
                        </Typography>
                    )}
                    {title && (
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                fontSize: { xs: '2rem', md: '3rem', lg: '3.5rem' },
                            }}
                        >
                            {title as string}
                        </Typography>
                    )}
                    {description && (
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{ mb: 4, fontWeight: 400 }}
                        >
                            {description as string}
                        </Typography>
                    )}
                    {(primaryAction || secondaryAction) && (
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                justifyContent: align === 'center' ? 'center' : 'flex-start',
                                flexWrap: 'wrap',
                            }}
                        >
                            {primaryAction && (
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => onAction?.({ name: (primaryAction as { action?: string })?.action || 'primary' })}
                                >
                                    {(primaryAction as { label?: string })?.label || 'Get Started'}
                                </Button>
                            )}
                            {secondaryAction && (
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() => onAction?.({ name: (secondaryAction as { action?: string })?.action || 'secondary' })}
                                >
                                    {(secondaryAction as { label?: string })?.label || 'Learn More'}
                                </Button>
                            )}
                        </Box>
                    )}
                    {children}
                </Box>
            </Container>
        </Box>
    );
};
