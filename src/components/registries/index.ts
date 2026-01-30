/**
 * Registries Index
 * Export all available UI registries
 */

export { shadcnRegistry, shadcnComponents, shadcnTheme } from './shadcn';
export { tailwindRegistry, tailwindComponents, tailwindTheme } from './tailwind';
export { flowbiteRegistry, flowbiteComponents, flowbiteTheme } from './flowbite';

// Import all registries
import { shadcnRegistry } from './shadcn';
import { tailwindRegistry } from './tailwind';
import { flowbiteRegistry } from './flowbite';
import type { RegistryDefinition } from '@/lib/registry';

// All available registries
export const allRegistries: RegistryDefinition[] = [
  shadcnRegistry,
  tailwindRegistry,
  flowbiteRegistry,
];

// Get registry by name
export function getRegistryByName(name: string): RegistryDefinition | undefined {
  return allRegistries.find(r => r.name === name);
}

// Get registry by framework
export function getRegistryByFramework(framework: string): RegistryDefinition | undefined {
  return allRegistries.find(r => r.framework === framework);
}
