import fs from 'fs/promises';
import path from 'path';

export type MCPServersConfig = {
  mcpServers: Record<string, {
    command?: string;
    args?: string[];
    url?: string;
  }>;
};

const dataFile = path.join(process.cwd(), 'data', 'mcp-servers.json');

async function ensureFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    const initial: MCPServersConfig = { mcpServers: {} };
    await fs.writeFile(dataFile, JSON.stringify(initial, null, 2), 'utf8');
  }
}

export async function getConfig(): Promise<MCPServersConfig> {
  await ensureFile();
  const data = await fs.readFile(dataFile, 'utf8');
  return JSON.parse(data) as MCPServersConfig;
}

export async function saveConfig(config: MCPServersConfig): Promise<void> {
  await ensureFile();
  await fs.writeFile(dataFile, JSON.stringify(config, null, 2), 'utf8');
}

export async function getServers(): Promise<MCPServersConfig['mcpServers']> {
  const config = await getConfig();
  return config.mcpServers;
}


