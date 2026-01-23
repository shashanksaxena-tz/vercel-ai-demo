'use client';

import React from 'react';
import { Menu, IconButton, Button, Box, Text } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

const HamburgerIcon = () => (
  <Box as="span" display="flex" flexDirection="column" gap="1" w="4">
    <Box bg="currentColor" h="0.5" w="full" />
    <Box bg="currentColor" h="0.5" w="full" />
    <Box bg="currentColor" h="0.5" w="full" />
  </Box>
);

export const MenuComponent = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items = [],
    trigger = 'icon',
    triggerText = 'Menu',
    positioning,
    colorPalette,
    sx,
    style
  } = element.props;

  const handleItemClick = (action?: string, payload?: any) => {
    if (action && onAction) {
      onAction({ name: action, payload } as never);
    }
  };

  return (
    <Menu.Root positioning={positioning as any}>
      <Menu.Trigger asChild>
        {trigger === 'icon' ? (
          <IconButton
            aria-label="Options"
            variant="outline"
            style={style as React.CSSProperties}
          >
            <HamburgerIcon />
          </IconButton>
        ) : (
          <Button
            colorPalette={colorPalette as string}
            style={style as React.CSSProperties}
          >
            {triggerText as string}
          </Button>
        )}
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          {(items as { label: string; action?: string; icon?: React.ReactNode; divider?: boolean; disabled?: boolean }[]).map((item, index) => {
            if (item.divider) {
              return <Menu.Separator key={index} />;
            }
            return (
              <Menu.Item
                key={index}
                value={item.label}
                disabled={item.disabled}
                onClick={() => handleItemClick(item.action, { label: item.label })}
              >
                {item.icon}
                <Text>{item.label}</Text>
              </Menu.Item>
            );
          })}
          {children}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export { MenuComponent as Menu };
