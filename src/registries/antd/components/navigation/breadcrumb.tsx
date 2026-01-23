'use client';

import React from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Breadcrumb = ({ element, onAction }: ComponentRenderProps) => {
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

  const breadcrumbItems = (items as { title: string; href?: string; action?: string; menu?: any }[]).map((item, index) => ({
    title: item.href ? (
      <a href={item.href} onClick={handleClick(item.href, item.action)}>
        {item.title}
      </a>
    ) : (
      item.title
    ),
    menu: item.menu,
  }));

  return (
    <AntBreadcrumb
      items={breadcrumbItems}
      separator={separator as React.ReactNode}
      style={style as React.CSSProperties}
    />
  );
};
