'use client';

import React from 'react';
import { Box, Text, Field } from '@chakra-ui/react';
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
            <Field.Root
                invalid={Boolean(error)}
                required={required as boolean}
                {...(style as Record<string, unknown> || {})}
            >
                <Box display="flex" alignItems="flex-start" gap={4}>
                    {label && (
                        <Field.Label
                            htmlFor={name as string}
                            pt={2}
                            flexShrink={0}
                            w={labelWidth as string || '25%'}
                            fontSize="sm"
                            fontWeight="medium"
                        >
                            {label as string}
                        </Field.Label>
                    )}
                    <Box flex={1}>
                        {children}
                        {error ? (
                            <Field.ErrorText>{error as string}</Field.ErrorText>
                        ) : helperText ? (
                            <Field.HelperText>{helperText as string}</Field.HelperText>
                        ) : null}
                    </Box>
                </Box>
            </Field.Root>
        );
    }

    return (
        <Field.Root
            invalid={Boolean(error)}
            required={required as boolean}
            {...(style as Record<string, unknown> || {})}
        >
            {label && (
                <Field.Label htmlFor={name as string} fontSize="sm" fontWeight="medium">
                    {label as string}
                </Field.Label>
            )}
            {children}
            {error ? (
                <Field.ErrorText>{error as string}</Field.ErrorText>
            ) : helperText ? (
                <Field.HelperText>{helperText as string}</Field.HelperText>
            ) : null}
        </Field.Root>
    );
};
