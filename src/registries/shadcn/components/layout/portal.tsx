'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ComponentRenderProps } from '@json-render/react';

export const Portal = ({ element, children }: ComponentRenderProps) => {
  const {
    container,
    disabled = false,
  } = element.props;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (disabled || !mounted) {
    return <>{children}</>;
  }

  const targetContainer = container
    ? (typeof container === 'string' ? document.querySelector(container) : container)
    : document.body;

  if (!targetContainer) {
    return <>{children}</>;
  }

  return createPortal(
    <>{children}</>,
    targetContainer as Element
  );
};
