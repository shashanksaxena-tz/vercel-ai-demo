import React from 'react';
import { Card as MuiCard, CardHeader, CardContent, CardActions, Typography } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Card = ({ element, children }: ComponentRenderProps) => {
  const { title, description, content, footer, style } = element.props;

  const titleNode = title as React.ReactNode;
  const descriptionNode = description as React.ReactNode;
  const contentNode = (content || children) as React.ReactNode;
  const footerNode = footer as React.ReactNode;

  return (
    <MuiCard style={style as React.CSSProperties}>
      {(titleNode || descriptionNode) && (
        <CardHeader
          title={titleNode}
          subheader={descriptionNode}
        />
      )}
      <CardContent>
        {contentNode}
      </CardContent>
      {footerNode && (
        <CardActions>
          {footerNode}
        </CardActions>
      )}
    </MuiCard>
  );
};
