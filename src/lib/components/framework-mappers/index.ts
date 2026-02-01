/**
 * Framework Mappers Index
 * Export all framework component mappers
 *
 * Each mapper translates universal component types to framework-specific implementations.
 * When a UI tree contains `Card`, the mapper for the active framework renders
 * the appropriate framework-specific component.
 */

// Shadcn/UI Mapper
export { shadcnMapper, shadcnTheme } from './shadcn-mapper';

// Chakra UI v3 Mapper
export {
  chakraMapper,
  chakraComponents,
  chakraTheme,
  chakraMapperTheme,
  chakraMapperRegistry,
} from './chakra-mapper';

// Type exports
export type { ComponentRegistry } from '@json-render/react';
export type { RegistryDefinition, RegistryTheme } from '@/lib/registry';

// Framework mapper type
export interface FrameworkMapper {
  name: string;
  displayName: string;
  description: string;
  components: import('@json-render/react').ComponentRegistry;
  theme: import('@/lib/registry').RegistryTheme;
}

// Available mappers registry
export const frameworkMappers: Record<string, FrameworkMapper> = {
  shadcn: {
    name: 'shadcn',
    displayName: 'Shadcn/UI',
    description: 'Beautiful and accessible components built with Radix UI and Tailwind CSS',
    get components() {
      return require('./shadcn-mapper').shadcnMapper;
    },
    get theme() {
      return require('./shadcn-mapper').shadcnTheme;
    },
  },
  chakra: {
    name: 'chakra',
    displayName: 'Chakra UI',
    description: 'Simple, modular and accessible component library',
    get components() {
      return require('./chakra-mapper').chakraMapper;
    },
    get theme() {
      return require('./chakra-mapper').chakraTheme;
    },
  },
};

// Helper function to get a mapper by name
export function getFrameworkMapper(name: string): FrameworkMapper | undefined {
  return frameworkMappers[name];
}

// Helper function to get all available mapper names
export function getAvailableFrameworks(): string[] {
  return Object.keys(frameworkMappers);
}
