import React, { useState } from 'react';
import { Tabs as MuiTabs, Tab, Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

interface TabItem {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export const Tabs = ({ element }: ComponentRenderProps) => {
  const { items, defaultValue, style } = element.props;
  const safeItems = (items as TabItem[]) || [];
  const [value, setValue] = useState(defaultValue || safeItems[0]?.value);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} style={style as React.CSSProperties}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs value={value} onChange={handleChange} aria-label="tabs">
          {safeItems.map((item) => (
            <Tab key={item.value} label={item.label} value={item.value} />
          ))}
        </MuiTabs>
      </Box>
      {safeItems.map((item) => (
        <CustomTabPanel key={item.value} value={value as string} index={item.value}>
          {item.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
};
