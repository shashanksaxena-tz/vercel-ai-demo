import React from 'react';
import { Avatar as AntAvatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ComponentRenderProps } from '@json-render/react';

export const Avatar = ({ element }: ComponentRenderProps) => {
    const { src, fallback, alt, style } = element.props;

    return (
        <AntAvatar
            src={src as string}
            alt={alt as string}
            icon={!src && !fallback ? <UserOutlined /> : undefined}
            style={style as React.CSSProperties}
        >
            {fallback as string}
        </AntAvatar>
    );
};
