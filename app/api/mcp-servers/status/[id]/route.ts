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
  const srv = servers.find((s) => s.id === id);
  if (!srv) {
    return NextResponse.json({ online: false }, { status: 404 });
  }

  const online = await checkPort(srv.host, srv.port);
  return NextResponse.json({ online });
}

