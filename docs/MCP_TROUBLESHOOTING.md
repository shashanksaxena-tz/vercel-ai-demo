# MCP Troubleshooting Guide

Common issues and solutions for MCP (Model Context Protocol) server integration.

## Table of Contents

- [Quick Diagnostics](#quick-diagnostics)
- [Common Issues](#common-issues)
- [Server-Specific Issues](#server-specific-issues)
- [Debugging Tools](#debugging-tools)
- [Advanced Troubleshooting](#advanced-troubleshooting)

## Quick Diagnostics

### Run the Verification Script

```bash
# Test all MCP servers
./scripts/verify-mcp.sh

# Test specific server
./scripts/verify-mcp.sh shadcn-ui
```

### Check MCP Server Status

1. Visit http://localhost:3000
2. Navigate to "MCP Status" section
3. Check which servers show:
   - **Connected** (green): Working properly
   - **Disconnected** (yellow): Not started yet (will connect on first use)
   - **Error** (red): Configuration or package issue

### Test via API

```bash
# Get server status
curl http://localhost:3000/api/mcp/status | jq

# Test component search
curl -X POST http://localhost:3000/api/mcp/discover \
  -H "Content-Type: application/json" \
  -d '{"query": "button", "sources": ["shadcn-ui"], "limit": 5}' | jq
```

## Common Issues

### Issue: Server Shows "0 Tools"

**Symptoms**:
- Server status shows "connected"
- Tool count is 0
- Components cannot be discovered

**Causes**:
1. MCP package not installed or cached incorrectly
2. Package version mismatch
3. Server failed to initialize properly

**Solutions**:

**Solution 1: Clear npx cache and retry**
```bash
# Clear npx cache
rm -rf ~/.npm/_npx

# Restart the dev server
npm run dev
```

**Solution 2: Test package manually**
```bash
# Test if package runs correctly
npx -y @ui-layouts/mcp

# You should see MCP server initialization
# Press Ctrl+C to exit
```

**Solution 3: Check package version**
```bash
# Some packages require @latest tag
npx -y @mui/mcp@latest
npx -y @magicuidesign/mcp@latest
```

**Solution 4: Verify package exists**

Visit npm to confirm package name:
- https://www.npmjs.com/package/@ui-layouts/mcp
- https://www.npmjs.com/package/@jpisnice/shadcn-ui-mcp-server

### Issue: "Module not found" or "Cannot find package"

**Symptoms**:
- Error: `Cannot find module '@ui-layouts/mcp'`
- Server fails to start
- Connection error in logs

**Causes**:
1. Package name incorrect in configuration
2. Package not published to npm
3. Network issues preventing download

**Solutions**:

**Solution 1: Verify package name**

Check `src/lib/mcp/types.ts` and ensure package names are correct:
```typescript
'ui-layouts': {
  command: 'npx',
  args: ['-y', '@ui-layouts/mcp'], // Correct package name
  // ...
}
```

**Solution 2: Test package installation**
```bash
# Try installing manually to test
npm install -g @ui-layouts/mcp

# Or test with npx
npx @ui-layouts/mcp --help
```

**Solution 3: Check npm registry**
```bash
# Verify package exists
npm view @ui-layouts/mcp

# Check latest version
npm view @ui-layouts/mcp version
```

### Issue: API Keys Not Working

**Symptoms**:
- Unsplash/Pexels returns empty results
- Error: "API key not configured"
- 401 Unauthorized errors

**Causes**:
1. Environment variables not loaded
2. API key invalid or expired
3. `.env.local` file in wrong location

**Solutions**:

**Solution 1: Verify .env.local location**
```bash
# .env.local should be in project root
ls -la .env.local

# If missing, create from example
cp .env.example .env.local
```

**Solution 2: Check environment variable syntax**

Ensure no extra spaces or quotes:
```bash
# CORRECT ✅
UNSPLASH_ACCESS_KEY=abc123xyz

# INCORRECT ❌
UNSPLASH_ACCESS_KEY = abc123xyz
UNSPLASH_ACCESS_KEY="abc123xyz"
```

**Solution 3: Restart development server**
```bash
# Environment variables are loaded at startup
# Kill the server (Ctrl+C) and restart
npm run dev
```

**Solution 4: Verify API key validity**
```bash
# Test Unsplash API key
curl -H "Authorization: Client-ID YOUR_ACCESS_KEY" \
  "https://api.unsplash.com/photos/random"

# Test Pexels API key
curl -H "Authorization: YOUR_API_KEY" \
  "https://api.pexels.com/v1/curated?per_page=1"
```

**Solution 5: Check rate limits**

API keys may be rate-limited:
- **Unsplash**: 50 requests/hour (demo), 5000/hour (production)
- **Pexels**: 200 requests/hour

Wait an hour or upgrade your API plan.

### Issue: Server Connection Timeout

**Symptoms**:
- Server takes forever to connect
- Request timeout errors
- No response from MCP server

**Causes**:
1. Server process hanging
2. Network issues
3. npx downloading large packages

**Solutions**:

**Solution 1: Increase timeout**

Edit `src/lib/mcp/mcp-client.ts`:
```typescript
// Add timeout to transport config
const transport = new StdioClientTransport({
  command: config.command,
  args: config.args,
  env: config.env,
  timeout: 30000, // 30 seconds
});
```

**Solution 2: Pre-cache packages**
```bash
# Download all MCP packages ahead of time
npx -y @ui-layouts/mcp &
npx -y @jpisnice/shadcn-ui-mcp-server &
npx -y tailwindcss-mcp-server &
npx -y flowbite-mcp &
npx -y @chakra-ui/react-mcp@latest &
npx -y @magicuidesign/mcp@latest &
npx -y aceternityui-mcp &
npx -y @mui/mcp@latest &
npx -y lucide-icons-mcp &
npx -y heroicons-mcp &
npx -y @drumnation/unsplash-smart-mcp-server &

# Wait for all to complete
wait
```

**Solution 3: Check system resources**
```bash
# Check if system is low on memory
free -h  # Linux
vm_stat  # macOS

# Close unnecessary applications
# Restart the development server
```

### Issue: Components Not Rendering

**Symptoms**:
- Components discovered but don't render
- Blank screen or placeholder shown
- Error: "Component not found in registry"

**Causes**:
1. Dynamic registry not built correctly
2. Component source code unavailable
3. Missing dependencies

**Solutions**:

**Solution 1: Check dynamic registry**

Open browser console and check:
```javascript
// Check if registry is populated
console.log(window.__REGISTRY__);
```

**Solution 2: Verify component source fetching**
```bash
# Test source code fetching
curl -X POST http://localhost:3000/api/mcp/fetch \
  -H "Content-Type: application/json" \
  -d '{"componentId": "shadcn:button", "source": "shadcn-ui"}' | jq
```

**Solution 3: Check browser console for errors**

Common errors:
- `Cannot read property 'type' of undefined` → Component metadata missing
- `Module not found` → Missing npm dependency
- `Invalid component` → Component not in registry

**Solution 4: Fallback to static registry**

If dynamic registry fails, switch to static:
```typescript
// In src/components/builder/ui-renderer.tsx
import { shadcnRegistry } from '@/components/registries/shadcn/registry';

// Use static registry instead of dynamic
<Renderer tree={tree} registry={shadcnRegistry} />
```

### Issue: Server Process Crashes

**Symptoms**:
- Server status changes from "connected" to "error"
- Error: "EPIPE" or "Process exited"
- Must restart dev server frequently

**Causes**:
1. MCP server bug or crash
2. Memory leak
3. Invalid tool arguments

**Solutions**:

**Solution 1: Add error handling**

Edit `src/lib/mcp/mcp-client.ts`:
```typescript
transport.onerror = (error) => {
  console.error(`MCP transport error for ${serverType}:`, error);
};

transport.onclose = () => {
  console.warn(`MCP transport closed for ${serverType}`);
  // Optionally auto-reconnect
  setTimeout(() => connectToServer(serverType, config), 5000);
};
```

**Solution 2: Check server logs**

Enable verbose logging:
```bash
# Set environment variable for debug logs
DEBUG=mcp:* npm run dev
```

**Solution 3: Restart server connection**
```bash
# Disconnect and reconnect via API
curl -X POST http://localhost:3000/api/mcp/reconnect \
  -H "Content-Type: application/json" \
  -d '{"server": "shadcn-ui"}'
```

**Solution 4: Report to package maintainer**

If a specific MCP package consistently crashes:
1. Note the package name and version
2. Capture error logs
3. Report issue on package's GitHub repository

## Server-Specific Issues

### Shadcn UI

**Issue**: `get_component_source` returns undefined

**Solution**: Use `get_component` instead:
```typescript
const result = await callTool({
  server: 'shadcn-ui',
  name: 'get_component', // Not get_component_source
  arguments: { name: 'button' }
});
```

### Tailwind CSS

**Issue**: Templates don't include Tailwind config

**Solution**: Use `generate_component_template` with framework:
```typescript
const result = await callTool({
  server: 'tailwindcss',
  name: 'generate_component_template',
  arguments: {
    component: 'navbar',
    framework: 'react' // Add framework
  }
});
```

### Flowbite

**Issue**: Components return raw HTML instead of React

**Solution**: Flowbite is HTML-based. Convert to React:
```typescript
import { createElement } from 'react';
import { parse } from 'html-react-parser';

const ReactComponent = parse(flowbiteHTML);
```

### Magic UI

**Issue**: Category tools return empty results

**Solution**: Check tool names (camelCase):
```typescript
// CORRECT ✅
callTool({ server: 'magic-ui', name: 'getUIComponents', ... })

// INCORRECT ❌
callTool({ server: 'magic-ui', name: 'get_ui_components', ... })
```

### Unsplash

**Issue**: Rate limit exceeded (429 error)

**Solution**:
1. Wait an hour before retrying
2. Implement caching:
```typescript
const cache = new Map();

async function searchUnsplashCached(query) {
  if (cache.has(query)) return cache.get(query);
  const result = await searchUnsplashImages(query);
  cache.set(query, result);
  return result;
}
```

### Context7

**Issue**: "Library not found"

**Solution**: Use exact library names:
```typescript
// Use package names, not display names
fetchContext7Docs('react', 'hooks');        // ✅
fetchContext7Docs('React', 'hooks');        // ❌
fetchContext7Docs('react-dom', 'hydrate');  // ✅
```

## Debugging Tools

### Enable MCP Debug Logs

```bash
# Set DEBUG environment variable
DEBUG=mcp:* npm run dev

# Or more specific
DEBUG=mcp:client npm run dev
DEBUG=mcp:transport npm run dev
```

### Inspect MCP Communication

```bash
# Log all MCP tool calls
# Add to src/lib/mcp/mcp-client.ts

export async function callTool(call: MCPToolCall): Promise<MCPToolResult> {
  console.log('MCP Tool Call:', JSON.stringify(call, null, 2));

  const result = await connection.client.callTool({
    name: call.name,
    arguments: call.arguments,
  });

  console.log('MCP Tool Result:', JSON.stringify(result, null, 2));
  return result;
}
```

### Test Individual Server

```bash
# Create test script: test-mcp.js
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');

async function test() {
  const transport = new StdioClientTransport({
    command: 'npx',
    args: ['-y', '@ui-layouts/mcp'],
  });

  const client = new Client({ name: 'test', version: '1.0.0' });
  await client.connect(transport);

  const tools = await client.listTools();
  console.log('Tools:', JSON.stringify(tools, null, 2));

  await client.close();
}

test().catch(console.error);
```

```bash
# Run test
node test-mcp.js
```

### Monitor Server Processes

```bash
# List all node processes (MCP servers)
ps aux | grep npx

# Check resource usage
top -p $(pgrep -d',' -f 'npx.*mcp')
```

### Verify Package Integrity

```bash
# Check if npx cache is corrupted
ls -la ~/.npm/_npx

# Remove and re-download
rm -rf ~/.npm/_npx/*/node_modules/@ui-layouts/mcp
npx -y @ui-layouts/mcp
```

## Advanced Troubleshooting

### Rebuild Node Modules

```bash
# Remove and reinstall all dependencies
rm -rf node_modules package-lock.json
npm install
```

### Check Node Version

```bash
# MCP SDK requires Node.js 18+
node --version

# Upgrade if needed
nvm install 20
nvm use 20
```

### Verify TypeScript Configuration

```typescript
// tsconfig.json should include:
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    // ...
  }
}
```

### Test in Isolation

Create minimal test project:
```bash
mkdir mcp-test
cd mcp-test
npm init -y
npm install @modelcontextprotocol/sdk

# Create test script
node test-server.js
```

### Report Issues

If problems persist:

1. **Collect information**:
   - Node version: `node --version`
   - OS: `uname -a` (Linux/macOS) or `ver` (Windows)
   - Package versions: `npm list`
   - Error logs and stack traces

2. **Create minimal reproduction**:
   - Isolate the failing MCP server
   - Create small test case
   - Document steps to reproduce

3. **Report to maintainers**:
   - Project issues: [GitHub Issues](https://github.com/yourusername/vercel-ai-demo/issues)
   - MCP SDK issues: [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk/issues)
   - Server-specific issues: Report to respective package repository

## Getting Help

- **Documentation**: [MCP Setup Guide](./MCP_SETUP.md)
- **API Reference**: [README.md](../README.md#api-routes)
- **MCP Protocol**: [modelcontextprotocol.io](https://modelcontextprotocol.io/)
- **Community**: Search GitHub issues for similar problems

## Prevention Tips

1. **Keep packages updated**:
   ```bash
   npx -y @ui-layouts/mcp@latest
   ```

2. **Cache MCP packages**:
   - Run verification script regularly
   - Pre-load packages in CI/CD

3. **Monitor rate limits**:
   - Track API usage
   - Implement caching
   - Use fallbacks

4. **Add error boundaries**:
   - Wrap MCP calls in try-catch
   - Provide fallback components
   - Log errors for debugging

5. **Test before deployment**:
   - Run `./scripts/verify-mcp.sh`
   - Check all API keys
   - Verify production environment variables
