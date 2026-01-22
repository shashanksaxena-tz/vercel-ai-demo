import React from 'react';
import { Tabs as ChakraTabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Tabs = ({ element }: ComponentRenderProps) => {
  const { items, defaultValue, style } = element.props;
  const itemsArray = items as any[] || [];

  // Find index of defaultValue
  const defaultIndex = itemsArray.findIndex((item: any) => item.value === defaultValue);

  return (
    <ChakraTabs defaultIndex={defaultIndex >= 0 ? defaultIndex : 0} style={style as React.CSSProperties}>
      <TabList>
        {itemsArray.map((item: any) => (
          <Tab key={item.value}>{item.label}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {itemsArray.map((item: any) => (
          <TabPanel key={item.value}>
            {item.content}
          </TabPanel>
        ))}
      </TabPanels>
    </ChakraTabs>
  );
};
