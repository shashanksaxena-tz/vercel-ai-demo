# Context7 MCP Server Setup Guide

## Overview

Context7 is a documentation MCP server that provides up-to-date documentation and code examples for any programming library or framework. It addresses the problem of outdated training data by fetching current documentation directly from official sources.

## Features

- **Up-to-Date Documentation**: Fetches the latest docs from official sources
- **Multi-Library Support**: Works with thousands of popular libraries (React, Next.js, Tailwind, etc.)
- **Version-Specific**: Can query specific library versions
- **Code Examples**: Provides real code snippets and examples
- **Intelligent Matching**: Automatically finds the best matching library

## Setup

### 1. Environment Variables

Context7 works without an API key but with limited rate limits. For production use, get an API key:

1. Visit [context7.com/dashboard](https://context7.com/dashboard)
2. Sign up for a free account
3. Generate an API key
4. Add to your `.env` file:

```bash
# Optional but recommended for higher rate limits
CONTEXT7_API_KEY=your_api_key_here
```

**Rate Limits:**
- Without API key: Limited requests per day (suitable for testing)
- With API key: Significantly higher limits (recommended for production)

### 2. Configuration

The Context7 MCP server is already configured in `src/lib/mcp/types.ts`:

```typescript
'context7': {
  type: 'context7',
  name: 'context7',
  displayName: 'Context7',
  description: 'Fetch up-to-date documentation for any library',
  command: 'npx',
  args: process.env.CONTEXT7_API_KEY
    ? ['-y', '@upstash/context7-mcp', '--api-key', process.env.CONTEXT7_API_KEY]
    : ['-y', '@upstash/context7-mcp'],
  enabled: true,
  tools: ['resolve-library-id', 'query-docs'],
}
```

## Usage

### API Endpoint

**POST** `/api/mcp/docs`

**Request Body:**
```json
{
  "library": "react",
  "query": "How to use useState hook?"
}
```

**Response:**
```json
{
  "library": "react",
  "query": "How to use useState hook?",
  "documentation": "### Basic useState Hook Declaration in React...",
  "timing": 1234
}
```

### Example: Fetching React Documentation

```typescript
const response = await fetch('/api/mcp/docs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    library: 'react',
    query: 'How to use useEffect cleanup?'
  })
});

const { documentation } = await response.json();
console.log(documentation);
```

### Supported Libraries

Context7 supports thousands of libraries including:

- **Frontend**: React, Vue, Angular, Svelte, Next.js, Nuxt
- **CSS**: Tailwind CSS, Bootstrap, Material-UI, Chakra UI
- **Backend**: Express, Fastify, NestJS, Django, Flask
- **Database**: MongoDB, PostgreSQL, Prisma, Supabase
- **And many more...**

## Tools

### 1. `resolve-library-id`

Resolves a package/product name to a Context7-compatible library ID.

**Parameters:**
- `query` (string): The user's original question or task
- `libraryName` (string): Library name to search for

**Returns:**
List of matching libraries with:
- Library ID (format: `/org/project`)
- Description
- Code snippet count
- Source reputation
- Benchmark score
- Available versions

**Example:**
```typescript
const result = await callTool({
  server: 'context7',
  name: 'resolve-library-id',
  arguments: {
    query: 'How to use state in React?',
    libraryName: 'react'
  }
});

// Extract library ID from response
const libraryIdMatch = result.content.match(/Context7-compatible library ID:\s*(\/[^\s\n]+)/);
const libraryId = libraryIdMatch[1]; // e.g., "/websites/react_dev"
```

### 2. `query-docs`

Retrieves up-to-date documentation and code examples.

**Parameters:**
- `libraryId` (string): Exact Context7-compatible library ID from `resolve-library-id`
- `query` (string): Specific question or task

**Returns:**
Formatted documentation with:
- Code examples
- Usage instructions
- Best practices
- Source URLs

**Example:**
```typescript
const result = await callTool({
  server: 'context7',
  name: 'query-docs',
  arguments: {
    libraryId: '/websites/react_dev',
    query: 'How to use useState hook?'
  }
});

const documentation = result.content;
```

## Implementation Details

### Helper Function: `fetchContext7Docs`

Located in `src/lib/mcp/mcp-client.ts`:

```typescript
export async function fetchContext7Docs(
  library: string,
  query: string
): Promise<string | null> {
  // 1. Resolve library ID
  const resolveResult = await callTool({
    server: 'context7',
    name: 'resolve-library-id',
    arguments: { query, libraryName: library }
  });

  // 2. Extract library ID from response
  const libraryIdMatch = resolveResult.content.match(
    /Context7-compatible library ID:\s*(\/[^\s\n]+)/
  );
  const libraryId = libraryIdMatch[1];

  // 3. Query documentation
  const docsResult = await callTool({
    server: 'context7',
    name: 'query-docs',
    arguments: { libraryId, query }
  });

  return docsResult.content;
}
```

## Testing

### Command Line Test

```bash
node test-context7-full.js
```

This will:
1. Connect to Context7 MCP server
2. Resolve library ID for "react"
3. Query documentation
4. Display results

### API Test

Start the dev server and test the endpoint:

```bash
npm run dev

# In another terminal
curl -X POST -H "Content-Type: application/json" \
  -d '{"library":"react","query":"How to use useState hook?"}' \
  http://localhost:3000/api/mcp/docs
```

## Troubleshooting

### No Tools Showing (0 tools)

**Cause**: Server hasn't been initialized yet
**Solution**: MCP servers are lazy-loaded. Make your first API request to initialize.

### Rate Limit Errors

**Cause**: Too many requests without API key
**Solution**: Add `CONTEXT7_API_KEY` to your `.env` file

### Library Not Found

**Cause**: Library name doesn't match Context7's index
**Solution**: Try alternative names (e.g., "nextjs" vs "next.js")

### Connection Errors

**Cause**: Network issues or MCP server problems
**Solution**: Check logs in `/tmp/nextjs.log` for detailed error messages

## Best Practices

1. **Use Specific Queries**: "How to use useState hook?" is better than "hooks"
2. **Include Context**: Mention the framework version if relevant
3. **Cache Results**: Documentation doesn't change frequently
4. **Handle Errors**: Always check for null/error responses
5. **Rate Limiting**: Implement caching to reduce API calls

## Related Documentation

- [MCP Setup Guide](./MCP_SETUP.md) - General MCP server setup
- [Context7 Official Docs](https://context7.com/docs) - Official documentation
- [MCP Protocol](https://modelcontextprotocol.io) - Model Context Protocol specification

## Status

✅ **Working** - Context7 MCP server is fully integrated and functional

**Connection Status:**
- Server: `@upstash/context7-mcp` v2.1.1
- Tools: 2 (resolve-library-id, query-docs)
- API Endpoint: `/api/mcp/docs`
- Environment: Configured in `.env` (API key optional)
