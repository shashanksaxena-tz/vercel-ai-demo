/**
 * MCP Status API
 *
 * GET /api/mcp/status
 *
 * Returns the connection status of all MCP servers.
 */

import { NextResponse } from 'next/server';
import {
  getConnectionStatus,
  MCP_SERVERS,
  type MCPServerType,
} from '@/lib/mcp';

export async function GET() {
  const status = getConnectionStatus();

  // Add server info to status
  const serversWithInfo = Object.entries(status).map(([key, connection]) => {
    const serverType = key as MCPServerType;
    const config = MCP_SERVERS[serverType];

    return {
      ...connection,
      displayName: config?.displayName || key,
      description: config?.description || '',
      enabled: config?.enabled ?? false,
      toolCount: connection.tools.length,
    };
  });

  // Calculate summary
  const summary = {
    total: serversWithInfo.length,
    connected: serversWithInfo.filter((s) => s.status === 'connected').length,
    enabled: serversWithInfo.filter((s) => s.enabled).length,
    totalTools: serversWithInfo.reduce((acc, s) => acc + s.toolCount, 0),
  };

  return NextResponse.json({
    servers: serversWithInfo,
    summary,
    timestamp: new Date().toISOString(),
  });
}
