'use client';

import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Features = ({ element, children }: ComponentRenderProps) => {
    const {
        title,
        subtitle,
        description,
        columns = 3,
        items = [],
        align = 'center',
        style
    } = element.props;

    const featureItems = items as Array<{
        title?: string;
        description?: string;
        icon?: string;
    }>;

    return (
        <Box sx={{ py: 8, ...(style as Record<string, unknown> || {}) }}>
            <Container maxWidth="lg">
                {(title || subtitle || description) && (
                    <Box sx={{ textAlign: align, mb: 6, maxWidth: 800, mx: 'auto' }}>
                        {subtitle && (
                            <Typography variant="overline" color="primary" sx={{ fontWeight: 600 }}>
                                {subtitle as string}
                            </Typography>
                        )}
                        {title && (
                            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                                {title as string}
                            </Typography>
                        )}
                        {description && (
                            <Typography variant="body1" color="text.secondary">
                                {description as string}
                            </Typography>
                        )}
                    </Box>
                )}

                <Grid container spacing={4}>
                    {featureItems.map((item, index) => (
                        <Grid size={{ xs: 12, md: 12 / Number(columns) }} key={index}>
                            <Box sx={{ textAlign: align, p: 3 }}>
                                {item.icon && (
                                    <Box sx={{ fontSize: 48, mb: 2 }}>{item.icon}</Box>
                                )}
                                {item.title && (
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        {item.title}
                                    </Typography>
                                )}
                                {item.description && (
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                {children}
            </Container>
        </Box>
    );
};
