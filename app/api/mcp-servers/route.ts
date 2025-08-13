import { NextRequest, NextResponse } from 'next/server';
import { getServers, saveServers, MCPServer } from '@/lib/mcp-servers';

export async function GET() {
  const servers = await getServers();
  return NextResponse.json(servers);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, host, port, username, password } = body;
  if (!name || !host || !port) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const servers = await getServers();
  const newServer: MCPServer = {
    id: crypto.randomUUID(),
    name,
    host,
    port: Number(port),
    username,
    password,
  };
  servers.push(newServer);
  await saveServers(servers);
  return NextResponse.json(newServer, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, name, host, port, username, password } = body;
  if (!id) {
    return NextResponse.json({ error: 'Missing server id' }, { status: 400 });
  }
  const servers = await getServers();
  const index = servers.findIndex((s) => s.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Server not found' }, { status: 404 });
  }
  servers[index] = { ...servers[index], name, host, port: Number(port), username, password };
  await saveServers(servers);
  return NextResponse.json(servers[index]);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Missing server id' }, { status: 400 });
  }
  const servers = await getServers();
  const updated = servers.filter((s) => s.id !== id);
  await saveServers(updated);
  return NextResponse.json({ success: true });
}
