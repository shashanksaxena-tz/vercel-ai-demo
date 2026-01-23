import React from 'react';
import { Switch as AntSwitch, Space, Typography } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

const { Text } = Typography;

export const Switch = ({ element }: ComponentRenderProps) => {
    const { label, name, checked, style } = element.props;
    const labelText = label as string | undefined;

    return (
        <Space style={style as React.CSSProperties}>
            <AntSwitch
                defaultChecked={checked as boolean}
                id={name as string}
            />
            {labelText && <Text>{labelText}</Text>}
        </Space>
    );
};
