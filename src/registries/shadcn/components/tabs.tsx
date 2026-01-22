'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { Tabs as ShadcnTabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export const Tabs = ({ element, children }: ComponentRenderProps) => {
  const { items = [], defaultValue, style } = element.props;

  const tabItems = items as Array<{ label: string; value: string; content: any }>;
  const firstValue = tabItems[0]?.value || '';

  return (
    <ShadcnTabs
      defaultValue={(defaultValue as string) || firstValue}
      style={style as React.CSSProperties}
      className="w-full"
    >
      <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${tabItems.length}, 1fr)` }}>
        {tabItems.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabItems.map((item) => (
        <TabsContent key={item.value} value={item.value} className="mt-4">
          {typeof item.content === 'string' ? item.content : children}
        </TabsContent>
      ))}
    </ShadcnTabs>
  );
};
