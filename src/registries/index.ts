import { shadcnRegistry } from './shadcn';

export const registries = {
  shadcn: {
    name: 'shadcn/ui',
    registry: shadcnRegistry,
  },
};

export type RegistryKey = keyof typeof registries;
