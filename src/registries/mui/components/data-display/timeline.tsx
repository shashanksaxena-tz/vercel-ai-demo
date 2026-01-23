'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Timeline = ({ element, children }: ComponentRenderProps) => {
  const {
    items = [],
    position = 'right',
    showOppositeContent = true,
    sx,
    style
  } = element.props;

  const getColorValue = (color?: string) => {
    const colorMap: Record<string, string> = {
      primary: '#1976d2',
      secondary: '#9c27b0',
      success: '#2e7d32',
      warning: '#ed6c02',
      error: '#d32f2f',
      info: '#0288d1',
      grey: '#9e9e9e',
    };
    return colorMap[color || 'grey'] || colorMap.grey;
  };

  if (children) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', ...sx as any }} style={style as React.CSSProperties}>
        {children}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', ...sx as any }} style={style as React.CSSProperties}>
      {(items as { title: string; content?: string; time?: string; icon?: React.ReactNode; color?: string; variant?: string }[]).map((item, index) => (
        <Box key={index} sx={{ display: 'flex', minHeight: 70, position: 'relative' }}>
          {/* Opposite content / time */}
          {showOppositeContent && position !== 'left' && (
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pr: 2, pt: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                {item.time}
              </Typography>
            </Box>
          )}

          {/* Timeline separator */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: item.variant === 'outlined' ? 'transparent' : getColorValue(item.color),
                border: item.variant === 'outlined' ? `2px solid ${getColorValue(item.color)}` : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                mt: 0.5,
              }}
            >
              {item.icon}
            </Box>
            {index < (items as any[]).length - 1 && (
              <Box
                sx={{
                  width: 2,
                  flex: 1,
                  bgcolor: 'grey.300',
                  minHeight: 40,
                }}
              />
            )}
          </Box>

          {/* Main content */}
          <Box sx={{ flex: 1, pl: 2, pb: 2 }}>
            <Paper elevation={0} sx={{ p: 1 }}>
              <Typography variant="subtitle1" component="h3">
                {item.title}
              </Typography>
              {item.content && (
                <Typography variant="body2" color="text.secondary">
                  {item.content}
                </Typography>
              )}
            </Paper>
          </Box>

          {/* Opposite content for left position */}
          {showOppositeContent && position === 'left' && (
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start', pl: 2, pt: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                {item.time}
              </Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
