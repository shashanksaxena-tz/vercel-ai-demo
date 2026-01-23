'use client';

import React from 'react';
import { Accordion, Box, Text } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const AccordionComponent = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items = [],
    multiple = false,
    collapsible = true,
    defaultValue,
    action,
    sx,
    style
  } = element.props;

  const handleValueChange = (details: { value: string[] }) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { value: details.value } } as never);
    }
  };

  if (children) {
    return (
      <Accordion.Root
        multiple={multiple as boolean}
        collapsible={collapsible as boolean}
        defaultValue={defaultValue as string[]}
        onValueChange={handleValueChange}
        style={style as React.CSSProperties}
      >
        {children}
      </Accordion.Root>
    );
  }

  return (
    <Accordion.Root
      multiple={multiple as boolean}
      collapsible={collapsible as boolean}
      defaultValue={defaultValue as string[]}
      onValueChange={handleValueChange}
      style={style as React.CSSProperties}
    >
      {(items as { title: string; content: string; value?: string; disabled?: boolean }[]).map((item, index) => (
        <Accordion.Item key={index} value={item.value || `item-${index}`} disabled={item.disabled}>
          <Accordion.ItemTrigger>
            <Box flex="1" textAlign="left">
              <Text>{item.title}</Text>
            </Box>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Box pb={4}>
              <Text>{item.content}</Text>
            </Box>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export { AccordionComponent as Accordion };
