import fs from 'fs/promises';
import path from 'path';

export type MCPServer = {
  id: string;
  name: string;
  host: string;
  port: number;
  username?: string;
  password?: string;
};

const dataFile = path.join(process.cwd(), 'data', 'mcp-servers.json');

async function ensureFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, '[]', 'utf8');
  }
}

export async function getServers(): Promise<MCPServer[]> {
  await ensureFile();
  const data = await fs.readFile(dataFile, 'utf8');
  return JSON.parse(data) as MCPServer[];
}

export async function saveServers(servers: MCPServer[]): Promise<void> {
  await ensureFile();
  await fs.writeFile(dataFile, JSON.stringify(servers, null, 2), 'utf8');
}
