'use client';

/**
 * Main Page - Unified Visual UI Builder
 *
 * Three-panel IDE-style layout with AI always available:
 * - Left: Tree Outline / Component Palette / AI Chat (tabbed)
 * - Center: Live preview canvas or Welcome screen
 * - Right: Props Editor for selected element
 */

import { RegistryProvider } from '@/lib/registry';
import { DesignProvider } from '@/lib/design';
import { BuilderWorkspace } from '@/components/builder/builder-workspace';

export default function Home() {
  return (
    <DesignProvider>
      <RegistryProvider defaultFramework="shadcn">
        <BuilderWorkspace />
      </RegistryProvider>
    </DesignProvider>
  );
}
