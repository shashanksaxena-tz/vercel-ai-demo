'use client';

import React from 'react';
import { Box, FormControl, FormLabel, FormHelperText } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const FormField = ({ element, children }: ComponentRenderProps) => {
    const {
        label,
        name,
        required = false,
        error,
        helperText,
        layout = 'vertical',
        labelWidth,
        style
    } = element.props;

    if (layout === 'horizontal') {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    ...(style as Record<string, unknown> || {}),
                }}
            >
                {label && (
                    <FormLabel
                        htmlFor={name as string}
                        required={required as boolean}
                        sx={{
                            pt: 1,
                            flexShrink: 0,
                            width: labelWidth || '25%',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                        }}
                    >
                        {label as string}
                    </FormLabel>
                )}
                <FormControl fullWidth error={Boolean(error)}>
                    {children}
                    {(error || helperText) && (
                        <FormHelperText error={Boolean(error)}>
                            {(error || helperText) as string}
                        </FormHelperText>
                    )}
                </FormControl>
            </Box>
        );
    }

    return (
        <FormControl fullWidth error={Boolean(error)} sx={style}>
            {label && (
                <FormLabel
                    htmlFor={name as string}
                    required={required as boolean}
                    sx={{ mb: 1, fontSize: '0.875rem', fontWeight: 500 }}
                >
                    {label as string}
                </FormLabel>
            )}
            {children}
            {(error || helperText) && (
                <FormHelperText error={Boolean(error)}>
                    {(error || helperText) as string}
                </FormHelperText>
            )}
        </FormControl>
    );
};
