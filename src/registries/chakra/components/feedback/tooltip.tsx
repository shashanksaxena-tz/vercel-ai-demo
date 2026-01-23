'use client';

import React from 'react';
import { Tooltip, Box } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const TooltipComponent = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    placement = 'top',
    showArrow = true,
    openDelay = 0,
    closeDelay = 0,
    sx,
    style
  } = element.props;

  return (
    <Tooltip.Root openDelay={openDelay as number} closeDelay={closeDelay as number}>
      <Tooltip.Trigger asChild>
        <Box as="span" style={style as React.CSSProperties}>
          {children}
        </Box>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>
          {Boolean(showArrow) && <Tooltip.Arrow />}
          {content as string}
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  );
};

export { TooltipComponent as Tooltip };
