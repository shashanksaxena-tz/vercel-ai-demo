'use client';

import React from 'react';
import { Stat, HStack, Box, Text } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const StatComponent = ({ element, children }: ComponentRenderProps) => {
  const {
    label,
    value,
    helpText,
    trend,
    trendValue,
    stats = [],
    sx,
    style
  } = element.props;

  const TrendIndicator = ({ type, value }: { type?: string; value?: string }) => {
    if (!type) return null;
    const isIncrease = type === 'increase';
    return (
      <Text as="span" color={isIncrease ? 'green.500' : 'red.500'}>
        {isIncrease ? '↑' : '↓'} {value}
      </Text>
    );
  };

  // Single stat
  if (label || value) {
    return (
      <Stat.Root style={style as React.CSSProperties}>
        {Boolean(label) && <Stat.Label>{label as string}</Stat.Label>}
        {Boolean(value) && <Stat.ValueText>{value as string | number}</Stat.ValueText>}
        {(helpText || trend) && (
          <Stat.HelpText>
            {Boolean(trend) && <TrendIndicator type={trend as string} value={trendValue as string} />}
            {!trend && (helpText as React.ReactNode)}
          </Stat.HelpText>
        )}
        {children}
      </Stat.Root>
    );
  }

  // Multiple stats
  if ((stats as any[]).length > 0) {
    return (
      <HStack gap={8} style={style as React.CSSProperties}>
        {(stats as { label: string; value: string | number; helpText?: string; trend?: string; trendValue?: string }[]).map((stat, index) => (
          <Stat.Root key={index}>
            <Stat.Label>{stat.label}</Stat.Label>
            <Stat.ValueText>{stat.value}</Stat.ValueText>
            {(stat.helpText || stat.trend) && (
              <Stat.HelpText>
                {stat.trend && <TrendIndicator type={stat.trend} value={stat.trendValue} />}
                {!stat.trend && stat.helpText}
              </Stat.HelpText>
            )}
          </Stat.Root>
        ))}
      </HStack>
    );
  }

  return children;
};

export { StatComponent as Stat };
