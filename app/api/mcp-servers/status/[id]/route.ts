import { NextRequest, NextResponse } from 'next/server';
import net from 'net';
import { getServers } from '@/lib/mcp-servers';

async function checkPort(host: string, port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(3000);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('error', () => resolve(false));
    socket.on('timeout', () => resolve(false));
    socket.connect(port, host);
  });
}

export async function GET(
  _req: NextRequest,
  context: any
) {
  const { id } = context.params as { id: string };
  const servers = await getServers();
  const srv = servers[id];
  if (!srv) {
    return NextResponse.json({ online: false }, { status: 404 });
  }

  // Extract host and port from URL if it exists
  if (srv.url) {
    try {
      const url = new URL(srv.url);
      const host = url.hostname;
      const port = parseInt(url.port) || (url.protocol === 'https:' ? 443 : 80);
      const online = await checkPort(host, port);
      return NextResponse.json({ online });
    } catch {
      return NextResponse.json({ online: false });
    }
  }

  return NextResponse.json({ online: false });
}

