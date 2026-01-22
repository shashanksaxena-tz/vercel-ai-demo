import React from 'react';
import { Select as AntSelect, Form } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

interface SelectOption {
    label: string;
    value: string;
}

export const Select = ({ element }: ComponentRenderProps) => {
    const { label, options = [], name, placeholder, style } = element.props;

    const selectElement = (
        <AntSelect
            placeholder={placeholder as string}
            options={(options as SelectOption[]).map((opt) => ({
                label: opt.label,
                value: opt.value,
            }))}
            style={{ width: '100%' }}
        />
    );

    if (label) {
        return (
            <Form.Item
                label={label as string}
                name={name as string}
                style={style as React.CSSProperties}
            >
                {selectElement}
            </Form.Item>
        );
    }

    return selectElement;
};
