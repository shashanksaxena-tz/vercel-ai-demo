import React from 'react';
import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Metric = ({ element }: ComponentRenderProps) => {
  const { label, value, trend, trendDirection, style } = element.props;

  return (
    <Stat style={style as React.CSSProperties}>
      <StatLabel>{label as string}</StatLabel>
      <StatNumber>{value as string | number}</StatNumber>
      {(trend !== undefined || !!trendDirection) && (
        <StatHelpText>
          {!!trendDirection && (
            <StatArrow type={trendDirection === 'up' ? 'increase' : trendDirection === 'down' ? 'decrease' : undefined} />
          )}
          {trend !== undefined ? `${trend}%` : ''}
        </StatHelpText>
      )}
    </Stat>
  );
};
