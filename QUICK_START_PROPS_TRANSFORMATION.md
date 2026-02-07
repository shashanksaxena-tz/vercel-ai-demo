# Quick Start: Props Transformation

## What Problem Does This Solve?

**Before**: Generated components have hardcoded sample data like "Alice Johnson", "Bob Smith", etc.

**After**: Components accept data via props and include integration guides for your API.

## Quick Example

### Input (UITree with hardcoded data)

```json
{
  "root": "container",
  "elements": {
    "card1": { "type": "Card", "children": ["heading1", "text1"] },
    "heading1": { "type": "Heading", "props": { "text": "Alice Johnson" } },
    "text1": { "type": "Text", "props": { "content": "Head of Sales" } },
    "card2": { "type": "Card", "children": ["heading2", "text2"] },
    "heading2": { "type": "Heading", "props": { "text": "Bob Smith" } },
    "text2": { "type": "Text", "props": { "content": "Engineer" } }
  }
}
```

### Output (Production-ready component)

```tsx
interface Person {
  id: string;
  name: string;
  role: string;
}

interface ComponentProps {
  people?: Person[];
}

export function Component({ people = [] }: ComponentProps) {
  return (
    <Container>
      {people.map((person) => (
        <Card key={person.id}>
          <Heading>{person.name}</Heading>
          <Text>{person.role}</Text>
        </Card>
      ))}
    </Container>
  );
}
```

## How to Use

### 1. Extract Data Structures

```typescript
import { extractDataStructures } from '@/lib/export';

const structures = extractDataStructures(tree);

// Returns:
// [
//   {
//     name: 'Person',
//     propName: 'people',
//     fields: [
//       { name: 'id', type: 'string' },
//       { name: 'name', type: 'string' },
//       { name: 'role', type: 'string' }
//     ],
//     isArray: true,
//     elementKeys: ['card1', 'card2']
//   }
// ]
```

### 2. Transform to Props-Based JSX

```typescript
import { transformToPropsBasedJSX } from '@/lib/export';

const result = transformToPropsBasedJSX(
  tree,
  structures,
  'shadcn',
  'MyComponent'
);

console.log(result.dataInterfaces);  // interface Person { ... }
console.log(result.propsInterface);  // interface MyComponentProps { ... }
console.log(result.jsx);             // {people.map((person) => ...)}
```

### 3. Generate Integration Guide

```typescript
import { generateIntegrationReadme } from '@/lib/export';

const readme = generateIntegrationReadme({
  componentName: 'MyComponent',
  framework: 'shadcn',
  structures,
  includeReactQuery: true,
  includeNextJS: true,
});

// Generates complete markdown guide with:
// - TypeScript interfaces
// - Expected API format
// - React Query example
// - Next.js example
// - Test data
```

## What Gets Extracted?

### Automatically Detects:

✅ **Repeated Patterns**: Cards, ListItems, TableRows with similar data
✅ **Field Types**: name, email, phone, image, date, role, company
✅ **Data Structures**: Person, Product, Task (inferred from content)
✅ **Relationships**: "X at Y" → `{role} at {company}`

### Example Detections:

| Input | Detected Field | TypeScript Type |
|-------|----------------|-----------------|
| `alice@example.com` | email | string |
| `+1-555-1234` | phone | string |
| `https://picsum.photos/...` | avatar | string |
| `Alice Johnson` | name | string |
| `CEO at CompanyX` | role + company | string + string |
| `2024-01-15` | date | Date \| string |

## What Gets Generated?

### 1. TypeScript Interfaces

```typescript
interface Person {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  email: string;
}
```

### 2. Component Props

```typescript
interface MyComponentProps {
  className?: string;
  people?: Person[];
}
```

### 3. Transformed JSX

```tsx
{people.map((person, index) => (
  <Card key={person.id}>
    <Avatar src={person.avatar} />
    <Heading>{person.name}</Heading>
    <Text>{person.role} at {person.company}</Text>
  </Card>
))}
```

### 4. Test Data

```typescript
const mockPerson: Person[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    role: 'Head of Sales',
    company: 'InnovateCorp',
    avatar: 'https://api.example.com/avatars/1.jpg',
    email: 'alice@innovatecorp.com'
  }
];
```

### 5. Integration Guide (INTEGRATION.md)

Complete markdown file with:
- Data structure definitions
- Expected API response format
- React Query integration example
- Next.js Server Components example
- Simple fetch example
- Environment variable setup
- Best practices

## Check If Data is Extractable

```typescript
import { hasExtractableData, getDataSummary } from '@/lib/export';

if (hasExtractableData(tree)) {
  console.log(getDataSummary(tree));
  // "Found 1 data structure(s):
  //  - Person: 6 fields, 3 instances"
}
```

## API Reference

### extractDataStructures()

```typescript
function extractDataStructures(tree: UITree): DataStructure[]
```

Analyzes UITree and returns extracted data structures. Requires at least 2 repeated elements.

### transformToPropsBasedJSX()

```typescript
function transformToPropsBasedJSX(
  tree: UITree,
  structures: DataStructure[],
  framework: UIFramework,
  componentName: string
): TransformResult
```

Transforms hardcoded JSX to props-based JSX with `.map()` for arrays.

### generateIntegrationReadme()

```typescript
function generateIntegrationReadme(
  options: IntegrationReadmeOptions
): string
```

Generates comprehensive API integration guide in markdown format.

### generateInterface()

```typescript
function generateInterface(structure: DataStructure): string
```

Generates TypeScript interface code for a data structure.

### generateSampleData()

```typescript
function generateSampleData(structure: DataStructure): string
```

Generates sample data for testing (2-3 items with real values).

## When Data Extraction Runs

The system automatically extracts data when:

1. ✅ Tree contains 2+ elements of same type (Card, ListItem, etc.)
2. ✅ Elements have similar structure
3. ✅ Elements contain extractable props (text, content, src, etc.)

If no patterns found, falls back to original behavior (no breaking changes).

## Files Location

```
src/lib/export/
├── data-extractor.ts              # Core extraction logic
├── jsx-transformer.ts             # JSX transformation
├── integration-readme-generator.ts # Integration guide
├── __tests__/
│   └── data-extractor.test.ts     # Tests
└── __examples__/
    └── transformation-example.ts   # Usage examples
```

## Run Examples

```bash
# View the comprehensive demo
cat PROPS_TRANSFORMATION_DEMO.md

# View the implementation details
cat PROPS_TRANSFORMATION_IMPLEMENTATION.md

# Run the examples
npx tsx src/lib/export/__examples__/transformation-example.ts

# Run the tests
npm test src/lib/export/__tests__/data-extractor.test.ts
```

## Next Steps

1. ✅ Data extraction implemented
2. ✅ JSX transformation implemented
3. ✅ Integration guide generator implemented
4. ⏳ Integrate with code generator
5. ⏳ Update export UI
6. ⏳ Add to bundle exports

## Support

For questions or issues:
- See `PROPS_TRANSFORMATION_DEMO.md` for detailed examples
- See `PROPS_TRANSFORMATION_IMPLEMENTATION.md` for technical details
- Check `src/lib/export/__examples__/transformation-example.ts` for code examples
