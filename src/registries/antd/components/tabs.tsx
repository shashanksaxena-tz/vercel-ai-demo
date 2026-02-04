import React from 'react';
import { Tabs as AntTabs } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

interface TabItem {
    label: string;
    value: string;
    content: React.ReactNode;
}

export const Tabs = ({ element }: ComponentRenderProps) => {
    const { items = [], defaultValue, style } = element.props;

    const tabItems = items as TabItem[];

    const antItems = tabItems.map((item) => ({
        key: item.value,
        label: item.label,
        children: item.content,
    }));

    return (
        <AntTabs
            defaultActiveKey={defaultValue as string || tabItems[0]?.value}
            items={antItems}
            style={style as React.CSSProperties}
        />
    );
};
