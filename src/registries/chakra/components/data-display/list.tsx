'use client';

import React from 'react';
import { List, Box, Text } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const ListComponent = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items = [],
    variant = 'unordered',
    gap = 2,
    showIcon,
    iconColor = 'green.500',
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
      <List.Root
        as={variant === 'ordered' ? 'ol' : 'ul'}
        gap={gap as number}
        style={style as React.CSSProperties}
      >
        {children}
      </List.Root>
    );
  }

  return (
    <List.Root
      as={variant === 'ordered' ? 'ol' : 'ul'}
      gap={gap as number}
      style={style as React.CSSProperties}
    >
      {(items as { text: string; icon?: boolean; action?: string }[]).map((item, index) => (
        <List.Item
          key={index}
          cursor={item.action ? 'pointer' : 'default'}
          onClick={() => handleItemClick(item.action, { text: item.text, index })}
          display="flex"
          alignItems="center"
        >
          {showIcon && (
            <Box as="span" color={iconColor as string} mr={2}>✓</Box>
          )}
          <Text>{item.text}</Text>
        </List.Item>
      ))}
    </List.Root>
  );
};

export { ListComponent as List };
