'use client';

import React from 'react';
import { Paper, Box, Typography, Divider } from '@mui/material';
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

    const elevationMap: Record<string, number> = {
        none: 0,
        sm: 1,
        md: 2,
        lg: 4,
        xl: 8,
    };

    const borderRadiusMap: Record<string, number> = {
        none: 0,
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        '2xl': 24,
    };

    const getVariantStyles = () => {
        switch (variant) {
            case 'filled':
                return { bgcolor: 'grey.100' };
            case 'card':
                return { bgcolor: 'background.paper' };
            case 'elevated':
                return { bgcolor: 'background.paper' };
            case 'outline':
                return { bgcolor: 'transparent', border: 1, borderColor: 'divider' };
            default:
                return { bgcolor: 'background.paper' };
        }
    };

    return (
        <Paper
            elevation={elevationMap[shadow as string] ?? (variant === 'elevated' ? 4 : (border ? 0 : 1))}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: `${borderRadiusMap[(borderRadius as string) || 'lg']}px`,
                ...(border && variant !== 'outline' ? { border: 1, borderColor: 'divider' } : {}),
                ...getVariantStyles(),
                ...(style as Record<string, unknown> || {}),
            }}
        >
            {(header as string) && (
                <>
                    <Box sx={{ px: 2, py: 1.5 }}>
                        <Typography variant="subtitle1" fontWeight={500}>
                            {header as string}
                        </Typography>
                    </Box>
                    <Divider />
                </>
            )}
            <Box sx={{ p: paddingNum * 0.5 }}>
                {children}
            </Box>
            {(footer as string) && (
                <>
                    <Divider />
                    <Box sx={{ px: 2, py: 1.5, bgcolor: 'grey.50' }}>
                        <Typography variant="body2" color="text.secondary">
                            {footer as string}
                        </Typography>
                    </Box>
                </>
            )}
        </Paper>
    );
};
