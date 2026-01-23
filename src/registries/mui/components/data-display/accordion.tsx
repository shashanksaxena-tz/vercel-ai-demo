'use client';

import React from 'react';
import { Accordion as MuiAccordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';

const ExpandMoreIcon = () => (
  <Box component="span" sx={{ fontSize: '1.25rem', lineHeight: 1 }}>▼</Box>
);
import { ComponentRenderProps } from '@json-render/react';

export const Accordion = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items = [],
    defaultExpanded,
    expanded,
    exclusive,
    disabled,
    disableGutters,
    square,
    action,
    sx,
    style
  } = element.props;

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { panel, expanded: isExpanded } } as never);
    }
  };

  if (children) {
    return (
      <MuiAccordion
        defaultExpanded={defaultExpanded as boolean}
        expanded={expanded as boolean}
        disabled={disabled as boolean}
        disableGutters={disableGutters as boolean}
        square={square as boolean}
        sx={sx as any}
        style={style as React.CSSProperties}
      >
        {children}
      </MuiAccordion>
    );
  }

  return (
    <div style={style as React.CSSProperties}>
      {(items as { title: string; content: string; icon?: React.ReactNode; disabled?: boolean; defaultExpanded?: boolean }[]).map((item, index) => (
        <MuiAccordion
          key={index}
          defaultExpanded={item.defaultExpanded}
          expanded={exclusive ? expanded === `panel${index}` : undefined}
          disabled={disabled as boolean || item.disabled}
          disableGutters={disableGutters as boolean}
          square={square as boolean}
          onChange={exclusive ? handleChange(`panel${index}`) : undefined}
          sx={sx as any}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            {item.icon}
            <Typography>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.content}</Typography>
          </AccordionDetails>
        </MuiAccordion>
      ))}
    </div>
  );
};
