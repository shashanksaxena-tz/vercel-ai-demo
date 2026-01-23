'use client';

import React, { useState } from 'react';
import { Menu as MuiMenu, MenuItem, ListItemIcon, ListItemText, Divider, IconButton, Button, Box } from '@mui/material';

const MoreVertIcon = () => (
  <Box component="span" sx={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'center' }}>
    <Box sx={{ bgcolor: 'currentColor', height: '4px', width: '4px', borderRadius: '50%' }} />
    <Box sx={{ bgcolor: 'currentColor', height: '4px', width: '4px', borderRadius: '50%' }} />
    <Box sx={{ bgcolor: 'currentColor', height: '4px', width: '4px', borderRadius: '50%' }} />
  </Box>
);
import { ComponentRenderProps } from '@json-render/react';

export const Menu = ({ element, children, onAction }: ComponentRenderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const {
    items = [],
    trigger = 'icon',
    triggerText = 'Menu',
    placement,
    sx,
    style
  } = element.props;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (action?: string, payload?: any) => {
    if (action && onAction) {
      onAction({ name: action, payload } as never);
    }
    handleClose();
  };

  return (
    <>
      {trigger === 'icon' ? (
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      ) : (
        <Button onClick={handleClick} sx={sx as any} style={style as React.CSSProperties}>
          {triggerText as string}
        </Button>
      )}
      {children && React.cloneElement(children as React.ReactElement, { onClick: handleClick } as any)}
      <MuiMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: placement === 'left' ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: placement === 'left' ? 'left' : 'right',
        }}
      >
        {(items as { label: string; icon?: React.ReactNode; action?: string; divider?: boolean; disabled?: boolean }[]).map((item, index) => {
          if (item.divider) {
            return <Divider key={index} />;
          }
          return (
            <MenuItem
              key={index}
              onClick={() => handleItemClick(item.action, { label: item.label })}
              disabled={item.disabled}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText>{item.label}</ListItemText>
            </MenuItem>
          );
        })}
      </MuiMenu>
    </>
  );
};
