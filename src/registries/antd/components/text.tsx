import React from 'react';
import { Typography } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

const { Title, Paragraph, Text: AntText } = Typography;

export const Text = ({ element }: ComponentRenderProps) => {
    const { variant = 'p', children, style } = element.props;

    switch (variant) {
        case 'h1':
            return <Title level={1} style={style as React.CSSProperties}>{children as React.ReactNode}</Title>;
        case 'h2':
            return <Title level={2} style={style as React.CSSProperties}>{children as React.ReactNode}</Title>;
        case 'h3':
            return <Title level={3} style={style as React.CSSProperties}>{children as React.ReactNode}</Title>;
        case 'h4':
            return <Title level={4} style={style as React.CSSProperties}>{children as React.ReactNode}</Title>;
        case 'code':
            return <AntText code style={style as React.CSSProperties}>{children as React.ReactNode}</AntText>;
        case 'blockquote':
            return (
                <blockquote style={{ borderLeft: '4px solid #d9d9d9', paddingLeft: 16, margin: '16px 0', ...style as React.CSSProperties }}>
                    {children as React.ReactNode}
                </blockquote>
            );
        case 'p':
        default:
            return <Paragraph style={style as React.CSSProperties}>{children as React.ReactNode}</Paragraph>;
    }
};
