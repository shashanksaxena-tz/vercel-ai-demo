import React from 'react';
import { Card as AntCard, Typography } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

const { Title, Text } = Typography;

export const Card = ({ element, children }: ComponentRenderProps) => {
    const { title, description, content, footer, style } = element.props;

    const contentNode = (content || children) as React.ReactNode;
    const descriptionText = description as string | undefined;

    return (
        <AntCard
            title={title ? <Title level={5} style={{ margin: 0 }}>{title as string}</Title> : undefined}
            style={style as React.CSSProperties}
            actions={footer ? [footer as React.ReactNode] : undefined}
        >
            {descriptionText && <Text type="secondary">{descriptionText}</Text>}
            {contentNode}
        </AntCard>
    );
};
