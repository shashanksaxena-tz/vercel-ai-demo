import React from 'react';
import { Input as AntInput, Form } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Input = ({ element }: ComponentRenderProps) => {
    const { label, placeholder, type = 'text', name, required, style } = element.props;

    const inputElement = type === 'password' ? (
        <AntInput.Password placeholder={placeholder as string} />
    ) : (
        <AntInput type={type as string} placeholder={placeholder as string} />
    );

    if (label) {
        return (
            <Form.Item
                label={label as string}
                name={name as string}
                rules={required ? [{ required: true, message: `${label} is required` }] : undefined}
                style={style as React.CSSProperties}
            >
                {inputElement}
            </Form.Item>
        );
    }

    return inputElement;
};
