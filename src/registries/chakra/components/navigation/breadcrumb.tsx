'use client';

import React from 'react';
import { Breadcrumb } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const BreadcrumbNav = ({ element, onAction }: ComponentRenderProps) => {
  const {
    items = [],
    separator = '/',
    style
  } = element.props;

  const handleClick = (href: string, action?: string) => (e: React.MouseEvent) => {
    if (action && onAction) {
      e.preventDefault();
      onAction({ name: action, payload: { href } } as never);
    }
  };

  const itemsList = items as { label: string; href?: string; action?: string; isCurrentPage?: boolean }[];

  return (
    <Breadcrumb.Root style={style as React.CSSProperties}>
      <Breadcrumb.List>
        {itemsList.map((item, index) => (
          <React.Fragment key={index}>
            <Breadcrumb.Item>
              <Breadcrumb.Link
                href={item.href || '#'}
                onClick={handleClick(item.href || '', item.action)}
              >
                {item.label}
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            {index < itemsList.length - 1 && (
              <Breadcrumb.Separator>{separator as React.ReactNode}</Breadcrumb.Separator>
            )}
          </React.Fragment>
        ))}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
};

export { BreadcrumbNav as Breadcrumb };
