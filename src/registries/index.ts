import { shadcnRegistry } from './shadcn';
import { muiRegistry } from './mui';
import { chakraRegistry } from './chakra';
import { antdRegistry } from './antd';
import { magicuiRegistry } from './magicui';
import { aceternityRegistry } from './aceternity';

export const registries = {
  shadcn: {
    name: 'shadcn/ui',
    registry: shadcnRegistry,
  },
  mui: {
    name: 'Material UI',
    registry: muiRegistry,
  },
  chakra: {
    name: 'Chakra UI',
    registry: chakraRegistry,
  },
  antd: {
    name: 'Ant Design',
    registry: antdRegistry,
  },
  magicui: {
    name: 'Magic UI',
    registry: magicuiRegistry,
  },
  aceternity: {
    name: 'Aceternity UI',
    registry: aceternityRegistry,
  },
};

export type RegistryKey = keyof typeof registries;

export function getRegistry(key: RegistryKey) {
  return registries[key];
}

export function getComponentList(key: RegistryKey): string[] {
  return Object.keys(registries[key].registry);
}
