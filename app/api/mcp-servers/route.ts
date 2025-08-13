import { NextRequest, NextResponse } from 'next/server';
import { getConfig, saveConfig, MCPServersConfig } from '@/lib/mcp-servers';

export async function GET() {
  const config = await getConfig();
  return NextResponse.json(config);
}

export async function PUT(req: NextRequest) {
  try {
    const config = (await req.json()) as MCPServersConfig;
    if (!config || typeof config !== 'object' || typeof config.mcpServers !== 'object') {
      return NextResponse.json({ error: 'Invalid config' }, { status: 400 });
    }
    await saveConfig(config);
    return NextResponse.json(config);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}

