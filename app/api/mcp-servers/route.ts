import { NextRequest, NextResponse } from 'next/server';
import { getServers, saveServers, MCPServer } from '@/lib/mcp-servers';

export async function GET() {
  const servers = await getServers();
  return NextResponse.json(servers);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const name = String(body.name ?? '').trim();
  const host = String(body.host ?? '').trim();
  const port = body.port;
  const username = body.username ? String(body.username).trim() : undefined;
  const password = body.password ? String(body.password).trim() : undefined;
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
  const id = String(body.id ?? '').trim();
  const name = body.name ? String(body.name).trim() : undefined;
  const host = body.host ? String(body.host).trim() : undefined;
  const port = body.port ? Number(body.port) : undefined;
  const username = body.username ? String(body.username).trim() : undefined;
  const password = body.password ? String(body.password).trim() : undefined;
  if (!id) {
    return NextResponse.json({ error: 'Missing server id' }, { status: 400 });
  }
  const servers = await getServers();
  const index = servers.findIndex((s) => s.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Server not found' }, { status: 404 });
  }
  servers[index] = { ...servers[index], name: name ?? servers[index].name, host: host ?? servers[index].host, port: port ?? servers[index].port, username, password };
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
