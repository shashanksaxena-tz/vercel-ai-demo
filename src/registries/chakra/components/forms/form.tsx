'use client';

import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Form = ({ element, children, onAction }: ComponentRenderProps) => {
    const { action, style } = element.props;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (action && onAction) {
            onAction({ name: action as string });
        }
    };

    return (
        <Box
            as="form"
            onSubmit={handleSubmit}
            {...(style as Record<string, unknown> || {})}
        >
            <Stack gap={4}>
                {children}
            </Stack>
        </Box>
    );
};
