'use client';

import React from 'react';
import { List as MuiList, ListItem, ListItemButton, ListItemIcon, ListItemText, ListItemAvatar, Avatar, Divider, ListSubheader } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const List = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items = [],
    dense,
    disablePadding,
    subheader,
    dividers,
    sx,
    style
  } = element.props;

  const handleItemClick = (action?: string, payload?: any) => {
    if (action && onAction) {
      onAction({ name: action, payload } as never);
    }
  };

  if (children) {
    return (
      <MuiList
        dense={dense as boolean}
        disablePadding={disablePadding as boolean}
        subheader={subheader ? <ListSubheader>{subheader as string}</ListSubheader> : undefined}
        sx={sx as any}
        style={style as React.CSSProperties}
      >
        {children}
      </MuiList>
    );
  }

  return (
    <MuiList
      dense={dense as boolean}
      disablePadding={disablePadding as boolean}
      subheader={subheader ? <ListSubheader>{subheader as string}</ListSubheader> : undefined}
      sx={sx as any}
      style={style as React.CSSProperties}
    >
      {(items as { primary: string; secondary?: string; icon?: React.ReactNode; avatar?: string; action?: string; divider?: boolean }[]).map((item, index) => (
        <React.Fragment key={index}>
          <ListItem disablePadding={!!item.action}>
            {item.action ? (
              <ListItemButton onClick={() => handleItemClick(item.action, { primary: item.primary })}>
                {item.avatar && (
                  <ListItemAvatar>
                    <Avatar src={item.avatar} />
                  </ListItemAvatar>
                )}
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.primary} secondary={item.secondary} />
              </ListItemButton>
            ) : (
              <>
                {item.avatar && (
                  <ListItemAvatar>
                    <Avatar src={item.avatar} />
                  </ListItemAvatar>
                )}
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.primary} secondary={item.secondary} />
              </>
            )}
          </ListItem>
          {(dividers || item.divider) && index < (items as any[]).length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </MuiList>
  );
};
