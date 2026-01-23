'use client';

import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';

const MenuIcon = () => (
  <Box component="span" sx={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '18px' }}>
    <Box sx={{ bgcolor: 'currentColor', height: '2px', width: '100%' }} />
    <Box sx={{ bgcolor: 'currentColor', height: '2px', width: '100%' }} />
    <Box sx={{ bgcolor: 'currentColor', height: '2px', width: '100%' }} />
  </Box>
);
import { ComponentRenderProps } from '@json-render/react';

export const AppBar = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    title,
    position = 'static',
    color = 'primary',
    elevation = 4,
    showMenuButton,
    menuAction,
    actions = [],
    sx,
    style
  } = element.props;

  const handleMenuClick = () => {
    if (menuAction && onAction) {
      onAction({ name: menuAction as string });
    }
  };

  const handleActionClick = (action: string) => {
    if (onAction) {
      onAction({ name: action });
    }
  };

  return (
    <MuiAppBar
      position={position as 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative'}
      color={color as 'default' | 'inherit' | 'primary' | 'secondary' | 'transparent'}
      elevation={elevation as number}
      sx={sx as any}
      style={style as React.CSSProperties}
    >
      <Toolbar>
        {showMenuButton && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title as string}
        </Typography>
        {children}
        {(actions as { label: string; action: string; variant?: string }[]).map((action, index) => (
          <Button
            key={index}
            color="inherit"
            variant={action.variant as 'text' | 'outlined' | 'contained' | undefined}
            onClick={() => handleActionClick(action.action)}
          >
            {action.label}
          </Button>
        ))}
      </Toolbar>
    </MuiAppBar>
  );
};
