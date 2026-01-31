'use client';

import React from 'react';
import { Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Form = ({ element, children, onAction }: ComponentRenderProps) => {
    const { action, method = 'post', style } = element.props;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (action && onAction) {
            onAction({ name: action as string });
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                ...(style as Record<string, unknown> || {}),
            }}
        >
            {children}
        </Box>
    );
};
