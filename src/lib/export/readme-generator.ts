/**
 * README Generator for Generative UI Builder
 *
 * This module generates comprehensive README documentation for exported
 * component bundles with framework-specific setup instructions.
 */

import type { UIFramework } from '@/types';

/**
 * Options for generating README documentation
 */
export interface ReadmeOptions {
  /** Name of the component (PascalCase) */
  componentName: string;
  /** UI framework used */
  framework: UIFramework;
  /** List of files included in the bundle */
  files?: string[];
  /** Whether the API client is included */
  includeApiClient?: boolean;
  /** Whether the query hook is included */
  includeQueryHook?: boolean;
  /** Whether TypeScript types are included */
  includeTypes?: boolean;
  /** Optional description of the component */
  description?: string;
  /** Optional project name */
  projectName?: string;
}

/**
 * Framework-specific installation instructions
 */
const FRAMEWORK_INSTALL_INSTRUCTIONS: Record<UIFramework, string> = {
  shadcn: `### shadcn/ui Setup

1. Initialize shadcn/ui in your project:
   \`\`\`bash
   npx shadcn@latest init
   \`\`\`

2. Install the required components:
   \`\`\`bash
   npx shadcn@latest add button card input tabs badge alert progress avatar
   \`\`\`

3. The components will be installed to \`@/components/ui\`.`,

  mui: `### Material UI Setup

1. Install Material UI packages:
   \`\`\`bash
   npm install @mui/material @emotion/react @emotion/styled
   \`\`\`

2. Install icons (optional):
   \`\`\`bash
   npm install @mui/icons-material
   \`\`\`

3. Wrap your app with \`ThemeProvider\`:
   \`\`\`tsx
   import { ThemeProvider, createTheme } from '@mui/material';

   const theme = createTheme();

   function App({ children }) {
     return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
   }
   \`\`\``,

  chakra: `### Chakra UI Setup

1. Install Chakra UI packages:
   \`\`\`bash
   npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
   \`\`\`

2. Wrap your app with \`ChakraProvider\`:
   \`\`\`tsx
   import { ChakraProvider } from '@chakra-ui/react';

   function App({ children }) {
     return <ChakraProvider>{children}</ChakraProvider>;
   }
   \`\`\``,

  tailwind: `### Tailwind CSS Setup

1. Install Tailwind CSS:
   \`\`\`bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   \`\`\`

2. Configure \`tailwind.config.js\`:
   \`\`\`js
   module.exports = {
     content: [
       './pages/**/*.{js,ts,jsx,tsx}',
       './components/**/*.{js,ts,jsx,tsx}',
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   \`\`\`

3. Add Tailwind directives to your CSS:
   \`\`\`css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   \`\`\``,

  flowbite: `### Flowbite React Setup

1. Install Flowbite React:
   \`\`\`bash
   npm install flowbite flowbite-react
   \`\`\`

2. Configure \`tailwind.config.js\`:
   \`\`\`js
   module.exports = {
     content: [
       './node_modules/flowbite-react/**/*.js',
       // ...your content paths
     ],
     plugins: [require('flowbite/plugin')],
   }
   \`\`\`

3. Import Flowbite CSS in your app:
   \`\`\`tsx
   import 'flowbite';
   \`\`\``,

  antd: `### Ant Design Setup

1. Install Ant Design:
   \`\`\`bash
   npm install antd @ant-design/icons
   \`\`\`

2. Import styles in your app:
   \`\`\`tsx
   import 'antd/dist/reset.css';
   \`\`\`

3. (Optional) Wrap with ConfigProvider for theming:
   \`\`\`tsx
   import { ConfigProvider } from 'antd';

   function App({ children }) {
     return <ConfigProvider>{children}</ConfigProvider>;
   }
   \`\`\``,

  'magic-ui': `### Magic UI Setup

1. Initialize Magic UI (similar to shadcn):
   \`\`\`bash
   npx magicui-cli@latest init
   \`\`\`

2. Install required components:
   \`\`\`bash
   npx magicui-cli@latest add shimmer-button magic-card
   \`\`\`

3. Ensure you have Framer Motion installed:
   \`\`\`bash
   npm install framer-motion
   \`\`\``,

  aceternity: `### Aceternity UI Setup

1. Install dependencies:
   \`\`\`bash
   npm install framer-motion clsx tailwind-merge
   \`\`\`

2. Copy components from [Aceternity UI](https://ui.aceternity.com) to your project.

3. Components are typically placed in \`@/components/ui/aceternity\`.

4. Configure your \`tailwind.config.js\` with the required plugins and utilities.`,
};

/**
 * Framework-specific usage notes
 */
const FRAMEWORK_USAGE_NOTES: Record<UIFramework, string> = {
  shadcn: 'This component uses shadcn/ui primitives. Ensure all required shadcn components are installed.',
  mui: 'This component uses Material UI. Make sure ThemeProvider wraps your app.',
  chakra: 'This component uses Chakra UI. Make sure ChakraProvider wraps your app.',
  tailwind: 'This component uses Tailwind CSS classes. Ensure Tailwind is configured properly.',
  flowbite: 'This component uses Flowbite React. Make sure Flowbite plugin is added to Tailwind.',
  antd: 'This component uses Ant Design. Import the CSS reset in your app entry point.',
  'magic-ui': 'This component uses Magic UI with animations. Framer Motion is required.',
  aceternity: 'This component uses Aceternity UI. Copy required components to your project.',
};

/**
 * Convert PascalCase to kebab-case
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Generate file structure documentation
 */
function generateFileStructure(files: string[]): string {
  if (!files || files.length === 0) {
    return '';
  }

  const sortedFiles = [...files].sort();
  const lines = sortedFiles.map((file) => `├── ${file}`);
  lines[lines.length - 1] = lines[lines.length - 1].replace('├──', '└──');

  return `## File Structure

\`\`\`
${lines.join('\n')}
\`\`\``;
}

/**
 * Generate usage examples based on options
 */
function generateUsageExamples(options: ReadmeOptions): string {
  const { componentName, includeQueryHook, includeApiClient } = options;
  const kebabName = toKebabCase(componentName);

  let examples = `## Usage

### Basic Usage

\`\`\`tsx
import { ${componentName} } from './${kebabName}';

export default function Page() {
  return (
    <main>
      <${componentName} className="my-component" />
    </main>
  );
}
\`\`\``;

  if (includeQueryHook) {
    examples += `

### With Data Fetching

\`\`\`tsx
'use client';

import { ${componentName} } from './${kebabName}';
import { use${componentName} } from './hooks/use-query';

export default function Page() {
  const { data, isLoading, error } = use${componentName}();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <${componentName} data={data} />;
}
\`\`\`

### Fetching a List

\`\`\`tsx
'use client';

import { use${componentName}List } from './hooks/use-query';

export default function ListPage() {
  const { data, isLoading } = use${componentName}List({
    page: 1,
    limit: 10,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
\`\`\``;
  }

  if (includeApiClient) {
    examples += `

### Using the API Client Directly

\`\`\`tsx
import { apiClient } from './lib/api-client';

// GET request
const data = await apiClient.get('/${kebabName}');

// POST request
const newItem = await apiClient.post('/${kebabName}', {
  name: 'New Item',
});

// PUT request
const updated = await apiClient.put('/${kebabName}/123', {
  name: 'Updated Item',
});

// DELETE request
await apiClient.delete('/${kebabName}/123');
\`\`\``;
  }

  return examples;
}

/**
 * Generate the complete README content
 *
 * @param options - README generation options
 * @returns Complete README markdown string
 *
 * @example
 * const readme = generateReadme({
 *   componentName: 'UserDashboard',
 *   framework: 'shadcn',
 *   files: ['components/user-dashboard.tsx', 'hooks/use-query.ts'],
 *   includeApiClient: true,
 *   includeQueryHook: true,
 * });
 */
export function generateReadme(options: ReadmeOptions): string {
  const {
    componentName,
    framework,
    files = [],
    includeApiClient = false,
    includeQueryHook = false,
    includeTypes = true,
    description,
    projectName,
  } = options;

  const title = projectName || componentName;
  const desc = description || `A React component generated by Generative UI Builder using ${framework}.`;

  const sections: string[] = [];

  // Title and description
  sections.push(`# ${title}

${desc}

> Generated with [Generative UI Builder](https://github.com/vercel/generative-ui-builder)
`);

  // Features
  const features: string[] = [
    `Built with ${getFrameworkDisplayName(framework)}`,
  ];
  if (includeTypes) features.push('TypeScript support');
  if (includeQueryHook) features.push('Data fetching hooks (TanStack Query)');
  if (includeApiClient) features.push('API client with error handling');

  sections.push(`## Features

${features.map((f) => `- ${f}`).join('\n')}
`);

  // Prerequisites
  sections.push(`## Prerequisites

- Node.js 18+
- React 18+
- Next.js 14+ (recommended)
${includeQueryHook ? '- @tanstack/react-query 5+' : ''}
`);

  // Installation
  sections.push(`## Installation

1. Copy the generated files to your project.

2. Install required dependencies:

   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:

   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. Configure your UI framework (see below).
`);

  // Framework-specific setup
  sections.push(FRAMEWORK_INSTALL_INSTRUCTIONS[framework]);

  // Data Fetching Setup (if included)
  if (includeQueryHook) {
    sections.push(`

### TanStack Query Setup

1. Install TanStack Query:
   \`\`\`bash
   npm install @tanstack/react-query
   \`\`\`

2. Set up the QueryClientProvider in your app:
   \`\`\`tsx
   import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

   const queryClient = new QueryClient();

   function App({ children }) {
     return (
       <QueryClientProvider client={queryClient}>
         {children}
       </QueryClientProvider>
     );
   }
   \`\`\`
`);
  }

  // File structure
  if (files.length > 0) {
    sections.push(generateFileStructure(files));
  }

  // Usage examples
  sections.push(generateUsageExamples(options));

  // API Integration
  if (includeApiClient || includeQueryHook) {
    sections.push(`

## API Integration

### Environment Variables

Set up your API endpoint in \`.env.local\`:

\`\`\`env
NEXT_PUBLIC_API_URL=https://api.example.com
\`\`\`

### Error Handling

The API client includes built-in error handling:

\`\`\`tsx
import { apiClient, ApiClientError } from './lib/api-client';

try {
  const data = await apiClient.get('/endpoint');
} catch (error) {
  if (error instanceof ApiClientError) {
    console.error(\`Error \${error.status}: \${error.message}\`);
  }
}
\`\`\`
`);
  }

  // Customization
  sections.push(`
## Customization

### Styling

${getCustomizationGuide(framework)}

### Props

The component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`className\` | \`string\` | - | Additional CSS classes |

> Add your custom props to the component as needed.
`);

  // Notes
  sections.push(`
## Notes

${FRAMEWORK_USAGE_NOTES[framework]}

### TypeScript

${includeTypes
    ? 'This project includes TypeScript types. Type definitions are in the `types/` directory.'
    : 'This project does not include TypeScript. Add types manually if needed.'}
`);

  // License
  sections.push(`
## License

This code was generated by Generative UI Builder. Feel free to modify and use it in your projects.

---

Made with Generative UI Builder
`);

  return sections.join('\n');
}

/**
 * Get display name for a framework
 */
function getFrameworkDisplayName(framework: UIFramework): string {
  const names: Record<UIFramework, string> = {
    shadcn: 'shadcn/ui',
    mui: 'Material UI',
    chakra: 'Chakra UI',
    tailwind: 'Tailwind CSS',
    flowbite: 'Flowbite React',
    antd: 'Ant Design',
    'magic-ui': 'Magic UI',
    aceternity: 'Aceternity UI',
  };
  return names[framework];
}

/**
 * Get customization guide for a framework
 */
function getCustomizationGuide(framework: UIFramework): string {
  const guides: Record<UIFramework, string> = {
    shadcn: `You can customize the component by:
- Modifying the Tailwind classes directly
- Updating the shadcn/ui theme in \`tailwind.config.js\`
- Adjusting CSS variables in \`globals.css\``,

    mui: `You can customize the component by:
- Using the \`sx\` prop for inline styles
- Modifying the MUI theme
- Using \`styled()\` for component-level customization`,

    chakra: `You can customize the component by:
- Using Chakra's style props
- Extending the Chakra theme
- Using the \`sx\` prop for custom styles`,

    tailwind: `You can customize the component by:
- Modifying the Tailwind classes directly
- Extending the theme in \`tailwind.config.js\`
- Adding custom CSS utilities`,

    flowbite: `You can customize the component by:
- Using Flowbite's theme customization
- Modifying Tailwind classes
- Extending the Flowbite React theme`,

    antd: `You can customize the component by:
- Using the \`style\` prop
- Configuring the Ant Design theme via ConfigProvider
- Using CSS overrides`,

    'magic-ui': `You can customize the component by:
- Modifying the Tailwind classes
- Adjusting animation parameters
- Extending the Magic UI components`,

    aceternity: `You can customize the component by:
- Modifying the Tailwind classes
- Adjusting Framer Motion animations
- Extending the Aceternity components`,
  };
  return guides[framework];
}

/**
 * Generate a minimal README
 */
export function generateMinimalReadme(
  componentName: string,
  framework: UIFramework
): string {
  return generateReadme({
    componentName,
    framework,
    includeApiClient: false,
    includeQueryHook: false,
    includeTypes: true,
  });
}

/**
 * Generate a comprehensive README with all features documented
 */
export function generateComprehensiveReadme(
  componentName: string,
  framework: UIFramework,
  files: string[]
): string {
  return generateReadme({
    componentName,
    framework,
    files,
    includeApiClient: true,
    includeQueryHook: true,
    includeTypes: true,
  });
}

export default generateReadme;
