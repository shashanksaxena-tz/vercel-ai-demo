import React from 'react';
import { Card as MuiCard, CardContent, Typography, Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const Metric = ({ element }: ComponentRenderProps) => {
  const { label, value, trend, trendDirection, style } = element.props;

  let TrendIcon = Minus;
  let trendColor = 'text.secondary';

  if (trendDirection === 'up') {
    TrendIcon = TrendingUp;
    trendColor = 'success.main';
  } else if (trendDirection === 'down') {
    TrendIcon = TrendingDown;
    trendColor = 'error.main';
  }

  return (
    <MuiCard style={style as React.CSSProperties}>
      <CardContent>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          {label as React.ReactNode}
        </Typography>
        <Typography variant="h4" component="div">
          {value as React.ReactNode}
        </Typography>
        {trend !== undefined && (
           <Box display="flex" alignItems="center" mt={1}>
             <TrendIcon size={16} />
             <Typography variant="body2" sx={{ color: trendColor, ml: 0.5 }}>
               {trend as React.ReactNode}%
             </Typography>
           </Box>
        )}
      </CardContent>
    </MuiCard>
  );
};
