# MCP Animation Component Tests

This directory contains comprehensive tests for animated components from Magic UI and Aceternity UI.

## Setup

### Install Testing Dependencies

```bash
npm install --save-dev @jest/globals @types/jest jest ts-jest
```

Or for Vitest (recommended for Vite projects):

```bash
npm install --save-dev vitest @vitest/ui
```

### Configure Jest

Create `jest.config.js` in the project root:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'src/lib/mcp/**/*.ts',
    '!src/lib/mcp/**/*.test.ts',
    '!src/lib/mcp/__tests__/**',
  ],
};
```

### Configure Vitest (Alternative)

Create `vitest.config.ts` in the project root:

```typescript
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Update package.json Scripts

Add test scripts to `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

Or for Vitest:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Run with coverage

```bash
npm run test:coverage
```

### Run specific test file

```bash
npm test animation-components.test.ts
```

## Test Structure

### animation-components.test.ts

Comprehensive test suite covering:

1. **Magic UI Discovery**
   - Component search and discovery
   - Animation metadata validation
   - Dependency extraction
   - Text reveal components
   - Widget components

2. **Aceternity UI Discovery**
   - Blur component discovery
   - 3D card components
   - Background effects
   - Animation metadata

3. **Component Dependencies**
   - NPM dependency extraction
   - Animation library identification
   - Dependency structure validation

4. **Export Code Generation**
   - Component export with namespace
   - NPM install commands
   - Import statement generation

5. **Animation Metadata**
   - Complexity classification
   - Animation type identification
   - Metadata validation

6. **Performance Scoring**
   - Simple animation scoring
   - Medium complexity scoring
   - Complex animation warnings
   - Multiple animation analysis
   - Performance recommendations

## Performance Scoring

The test suite includes a comprehensive performance scoring system:

```typescript
import { scoreAnimationPerformance } from '../animation-performance';

const score = scoreAnimationPerformance(components);

// Returns:
// {
//   complexity: 'simple' | 'medium' | 'complex',
//   score: 1-10,
//   warning?: string,
//   recommendations?: string[],
//   breakdown: { simple: number, medium: number, complex: number },
//   totalAnimations: number
// }
```

### Scoring System

- **Simple (1-3)**: CSS animations, fades, basic text effects
- **Medium (4-6)**: Framer Motion transforms, slides, springs
- **Complex (7-10)**: 3D effects, canvas, particles, WebGL

## Test Coverage Goals

- [ ] Component Discovery: 100%
- [ ] Animation Metadata: 100%
- [ ] Dependencies: 100%
- [ ] Export Generation: 100%
- [ ] Performance Scoring: 100%

## Known Issues

### MCP Server Connection

Tests require MCP servers to be available. If tests fail:

1. Ensure MCP servers are configured in `mcp-client.ts`
2. Check that `npx` is available in your PATH
3. Verify internet connectivity for package downloads

### Timeout Issues

Some tests may timeout on slower connections. Increase timeout:

```typescript
it('should discover components', async () => {
  // ...
}, 15000); // 15 second timeout
```

## Continuous Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
```

## Contributing

When adding new animation component tests:

1. Follow the existing test structure
2. Include both positive and negative test cases
3. Test all animation complexity levels
4. Verify dependency extraction
5. Check performance scoring accuracy
6. Update this README with new test cases

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [MCP Server Documentation](../types.ts)
