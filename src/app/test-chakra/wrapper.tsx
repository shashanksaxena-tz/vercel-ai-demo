'use client';

import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

export default function ChakraWrapper({ children }: { children: React.ReactNode }) {
  // Chakra v2 style
  return (
    <ChakraProvider>
        {children}
    </ChakraProvider>
  );
}
