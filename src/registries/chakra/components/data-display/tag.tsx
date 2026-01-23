'use client';

import React from 'react';
import { Tag, HStack, Box, CloseButton } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const TagComponent = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    tags = [],
    colorPalette = 'gray',
    size = 'md',
    variant = 'subtle',
    borderRadius = 'full',
    closable,
    closeAction,
    sx,
    style
  } = element.props;

  const handleClose = (tagLabel: string) => {
    if (closeAction && onAction) {
      onAction({ name: closeAction as string, payload: { label: tagLabel } } as never);
    }
  };

  // Single tag
  if (label) {
    return (
      <Tag.Root
        size={size as 'sm' | 'md' | 'lg'}
        variant={variant as 'subtle' | 'solid' | 'outline'}
        colorPalette={colorPalette as string}
        borderRadius={borderRadius as string}
        style={style as React.CSSProperties}
      >
        <Tag.Label>{label as string}</Tag.Label>
        {closable && (
          <Tag.CloseTrigger onClick={() => handleClose(label as string)} />
        )}
      </Tag.Root>
    );
  }

  // Multiple tags
  return (
    <HStack gap={2} style={style as React.CSSProperties}>
      {(tags as { label: string; colorPalette?: string }[]).map((tag, index) => (
        <Tag.Root
          key={index}
          size={size as 'sm' | 'md' | 'lg'}
          variant={variant as 'subtle' | 'solid' | 'outline'}
          colorPalette={tag.colorPalette || colorPalette as string}
          borderRadius={borderRadius as string}
        >
          <Tag.Label>{tag.label}</Tag.Label>
          {closable && (
            <Tag.CloseTrigger onClick={() => handleClose(tag.label)} />
          )}
        </Tag.Root>
      ))}
    </HStack>
  );
};

export { TagComponent as Tag };
