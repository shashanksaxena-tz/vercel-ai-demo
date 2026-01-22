import React from 'react';
import { Checkbox as AntCheckbox } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Checkbox = ({ element }: ComponentRenderProps) => {
    const { label, name, checked, style } = element.props;

    return (
        <AntCheckbox
            defaultChecked={checked as boolean}
            name={name as string}
            style={style as React.CSSProperties}
        >
            {label as string}
        </AntCheckbox>
    );
};
