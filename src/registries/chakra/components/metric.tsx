import React from 'react';
import { Stat, HStack, Icon } from '@chakra-ui/react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ComponentRenderProps } from '@json-render/react';

export const Metric = ({ element }: ComponentRenderProps) => {
    const { label, value, trend, trendDirection, style } = element.props;

    const getTrendIcon = () => {
        if (!trendDirection) return null;
        const IconComponent = trendDirection === 'up' ? TrendingUp : TrendingDown;
        const color = trendDirection === 'up' ? 'green.500' : 'red.500';
        return (
            <Icon asChild color={color}>
                <IconComponent size={16} />
            </Icon>
        );
    };

    return (
        <Stat.Root style={style as React.CSSProperties}>
            <Stat.Label>{label as React.ReactNode}</Stat.Label>
            <HStack>
                <Stat.ValueText>{value as React.ReactNode}</Stat.ValueText>
                {getTrendIcon()}
            </HStack>
            {trend !== undefined && (
                <Stat.HelpText>
                    {trendDirection === 'up' ? '+' : ''}{trend as number}%
                </Stat.HelpText>
            )}
        </Stat.Root>
    );
};
