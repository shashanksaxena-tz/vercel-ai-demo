'use client';

import React from 'react';
import { Tooltip as AntTooltip } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Tooltip = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    placement = 'top',
    color,
    arrow = true,
    open,
    defaultOpen,
    trigger = 'hover',
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    overlayStyle,
    style
  } = element.props;

  return (
    <AntTooltip
      title={title as React.ReactNode}
      placement={placement as any}
      color={color as string}
      arrow={arrow as boolean}
      open={open as boolean}
      defaultOpen={defaultOpen as boolean}
      trigger={trigger as 'hover' | 'focus' | 'click' | 'contextMenu'}
      mouseEnterDelay={mouseEnterDelay as number}
      mouseLeaveDelay={mouseLeaveDelay as number}
      overlayStyle={overlayStyle as React.CSSProperties}
    >
      <span style={style as React.CSSProperties}>{children}</span>
    </AntTooltip>
  );
};
