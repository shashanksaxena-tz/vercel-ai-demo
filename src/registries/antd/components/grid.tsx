import React from 'react';
import { Row, Col } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Grid = ({ element, children }: ComponentRenderProps) => {
    const { columns = 2, gap = 16, style } = element.props;

    const span = Math.floor(24 / (columns as number));

    return (
        <Row gutter={[gap as number, gap as number]} style={style as React.CSSProperties}>
            {React.Children.map(children, (child) => (
                <Col span={span}>{child}</Col>
            ))}
        </Row>
    );
};
