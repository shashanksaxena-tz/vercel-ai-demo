# Props Transformation Demo

This document demonstrates the complete transformation from hardcoded data to production-ready component props.

## Example: CRM Dashboard

### Input: UITree with Hardcoded Data

```json
{
  "root": "container",
  "elements": {
    "container": {
      "key": "container",
      "type": "Container",
      "props": { "maxWidth": "xl" },
      "children": ["card1", "card2", "card3"]
    },
    "card1": {
      "key": "card1",
      "type": "Card",
      "props": {},
      "children": ["avatar1", "heading1", "text1", "email1"]
    },
    "avatar1": {
      "key": "avatar1",
      "type": "Avatar",
      "props": { "src": "https://picsum.photos/seed/alice/40/40" }
    },
    "heading1": {
      "key": "heading1",
      "type": "Heading",
      "props": { "text": "Alice Johnson", "level": "3" }
    },
    "text1": {
      "key": "text1",
      "type": "Text",
      "props": { "content": "Head of Sales at InnovateCorp" }
    },
    "email1": {
      "key": "email1",
      "type": "Link",
      "props": { "href": "mailto:alice@innovatecorp.com", "text": "alice@innovatecorp.com" }
    },
    "card2": {
      "key": "card2",
      "type": "Card",
      "props": {},
      "children": ["avatar2", "heading2", "text2", "email2"]
    },
    "avatar2": {
      "key": "avatar2",
      "type": "Avatar",
      "props": { "src": "https://picsum.photos/seed/bob/40/40" }
    },
    "heading2": {
      "key": "heading2",
      "type": "Heading",
      "props": { "text": "Bob Smith", "level": "3" }
    },
    "text2": {
      "key": "text2",
      "type": "Text",
      "props": { "content": "Engineering Manager at TechCorp" }
    },
    "email2": {
      "key": "email2",
      "type": "Link",
      "props": { "href": "mailto:bob@techcorp.com", "text": "bob@techcorp.com" }
    },
    "card3": {
      "key": "card3",
      "type": "Card",
      "props": {},
      "children": ["avatar3", "heading3", "text3", "email3"]
    },
    "avatar3": {
      "key": "avatar3",
      "type": "Avatar",
      "props": { "src": "https://picsum.photos/seed/charlie/40/40" }
    },
    "heading3": {
      "key": "heading3",
      "type": "Heading",
      "props": { "text": "Charlie Brown", "level": "3" }
    },
    "text3": {
      "key": "text3",
      "type": "Text",
      "props": { "content": "Product Designer at DesignCo" }
    },
    "email3": {
      "key": "email3",
      "type": "Link",
      "props": { "href": "mailto:charlie@designco.com", "text": "charlie@designco.com" }
    }
  }
}
```

## Step 1: Data Extraction

The `extractDataStructures()` function analyzes the tree and identifies:

1. **Repeated Pattern**: 3 Card elements with similar structure
2. **Common Fields**: name, role, company, avatar, email
3. **Data Structure**: Person interface

### Extracted Data Structure

```typescript
interface Person {
  id: string;
  name: string;          // e.g., "Alice Johnson"
  role: string;          // e.g., "Head of Sales"
  company: string;       // e.g., "InnovateCorp"
  avatar: string;        // e.g., "https://picsum.photos/seed/alice/40/40"
  email: string;         // e.g., "alice@innovatecorp.com"
}
```

## Step 2: Generated TypeScript Interface

```typescript
interface Person {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  email: string;
}

interface CRMDashboardProps {
  className?: string;
  people?: Person[];
}
```

## Step 3: Transformed JSX Output

### Before (Hardcoded):

```tsx
export function CRMDashboard({ className }: CRMDashboardProps) {
  return (
    <Container maxWidth="xl">
      <Card>
        <Avatar src="https://picsum.photos/seed/alice/40/40" />
        <Heading level="3">Alice Johnson</Heading>
        <Text>Head of Sales at InnovateCorp</Text>
        <Link href="mailto:alice@innovatecorp.com">alice@innovatecorp.com</Link>
      </Card>
      <Card>
        <Avatar src="https://picsum.photos/seed/bob/40/40" />
        <Heading level="3">Bob Smith</Heading>
        <Text>Engineering Manager at TechCorp</Text>
        <Link href="mailto:bob@techcorp.com">bob@techcorp.com</Link>
      </Card>
      <Card>
        <Avatar src="https://picsum.photos/seed/charlie/40/40" />
        <Heading level="3">Charlie Brown</Heading>
        <Text>Product Designer at DesignCo</Text>
        <Link href="mailto:charlie@designco.com">charlie@designco.com</Link>
      </Card>
    </Container>
  );
}
```

### After (Props-Based):

```tsx
export function CRMDashboard({ className, people = [] }: CRMDashboardProps) {
  return (
    <Container maxWidth="xl">
      {people.map((person, index) => (
        <Card key={person.id}>
          <Avatar src={person.avatar} />
          <Heading level="3">{person.name}</Heading>
          <Text>{person.role} at {person.company}</Text>
          <Link href={`mailto:${person.email}`}>{person.email}</Link>
        </Card>
      ))}
    </Container>
  );
}
```

## Step 4: Generated Test Data

```typescript
const mockPerson: Person[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    role: 'Head of Sales',
    company: 'InnovateCorp',
    avatar: 'https://api.example.com/avatars/1.jpg',
    email: 'alice@innovatecorp.com'
  },
  {
    id: '2',
    name: 'Bob Smith',
    role: 'Engineering Manager',
    company: 'TechCorp',
    avatar: 'https://api.example.com/avatars/2.jpg',
    email: 'bob@techcorp.com'
  },
  {
    id: '3',
    name: 'Charlie Brown',
    role: 'Product Designer',
    company: 'DesignCo',
    avatar: 'https://api.example.com/avatars/3.jpg',
    email: 'charlie@designco.com'
  }
];
```

## Step 5: Integration Guide (INTEGRATION.md)

The system generates a comprehensive integration guide:

### Data Structures

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

### Expected API Response

```json
{
  "data": [
    {
      "id": "1",
      "name": "Alice Johnson",
      "role": "Head of Sales",
      "company": "InnovateCorp",
      "avatar": "https://api.example.com/avatars/1.jpg",
      "email": "alice@innovatecorp.com"
    }
  ],
  "total": 10,
  "page": 1,
  "limit": 10
}
```

### React Query Integration

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { CRMDashboard } from './crm-dashboard';

function usePerson() {
  return useQuery({
    queryKey: ['people'],
    queryFn: async () => {
      const response = await fetch('/api/person');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      return data.data;
    },
  });
}

export default function Page() {
  const { data, isLoading, error } = usePerson();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <CRMDashboard people={data || []} />;
}
```

### Next.js Server Components

```tsx
import { CRMDashboard } from '@/components/crm-dashboard';

async function fetchPerson() {
  const response = await fetch('https://api.example.com/person', {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch people`);
  }

  const data = await response.json();
  return data.data;
}

export default async function Page() {
  const people = await fetchPerson();

  return <CRMDashboard people={people} />;
}
```

## Extraction Algorithm Summary

The data extraction works through these steps:

1. **Identify Repeated Structures**
   - Scans for Card, ListItem, TableRow, AccordionItem elements
   - Groups elements of the same type
   - Requires at least 2 instances to extract

2. **Extract Field Values**
   - Analyzes props: text, content, label, src, href
   - Collects all unique values from repeated elements
   - Classifies content types (name, email, phone, image, etc.)

3. **Generate Field Definitions**
   - Maps prop values to semantic field names
   - Determines TypeScript types from content
   - Marks optional fields (not present in all instances)

4. **Name Data Structures**
   - Infers semantic names from field combinations
   - Person (name + role/company)
   - Product (name + price)
   - Task (title + description)
   - Falls back to element type (CardData, etc.)

5. **Transform JSX**
   - Replaces hardcoded values with prop references
   - Wraps repeated elements in `.map()`
   - Adds proper keys using id field
   - Preserves non-data props (styling, etc.)

## Benefits

### Before (Hardcoded)
- ❌ Not reusable with different data
- ❌ Requires code changes to update content
- ❌ No API integration
- ❌ Not production-ready

### After (Props-Based)
- ✅ Fully reusable with any data
- ✅ Content managed via API
- ✅ TypeScript type safety
- ✅ Production-ready
- ✅ Easy to integrate with React Query, SWR, etc.
- ✅ Includes comprehensive integration guide

## Files Modified

1. **`src/lib/export/data-extractor.ts`** - Core extraction logic
2. **`src/lib/export/jsx-transformer.ts`** - JSX transformation
3. **`src/lib/export/integration-readme-generator.ts`** - Integration guide
4. **`src/lib/export/code-generator.ts`** - Updated to use extraction
5. **`src/lib/export/index.ts`** - Export new functions

## Usage

```typescript
import { extractDataStructures } from './data-extractor';
import { transformToPropsBasedJSX } from './jsx-transformer';
import { generateIntegrationReadme } from './integration-readme-generator';

// 1. Extract data structures from tree
const structures = extractDataStructures(tree);

// 2. Transform JSX to use props
const { jsx, propsInterface, dataInterfaces } = transformToPropsBasedJSX(
  tree,
  structures,
  'shadcn',
  'CRMDashboard'
);

// 3. Generate integration guide
const readme = generateIntegrationReadme({
  componentName: 'CRMDashboard',
  framework: 'shadcn',
  structures,
  includeReactQuery: true,
  includeNextJS: true,
});
```
