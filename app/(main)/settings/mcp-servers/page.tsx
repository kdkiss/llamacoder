"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LogoSmall from "@/components/icons/logo-small";

export default function MCPServersPage() {
  const [configText, setConfigText] = useState("{}");
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadConfig() {
      const res = await fetch("/api/mcp-servers");
      const data = await res.json();
      setConfigText(JSON.stringify(data, null, 2));
    }
    loadConfig();
  }, []);

  const addUrl = () => {
    setError(null);
    setMessage(null);
    try {
      const parsed = JSON.parse(configText || '{"mcpServers":{}}');
      const u = new URL(urlInput.trim());
      const parts = u.pathname.split("/");
      const name = parts[2] || `server${Object.keys(parsed.mcpServers || {}).length + 1}`;
      parsed.mcpServers = parsed.mcpServers || {};
      parsed.mcpServers[name] = { url: urlInput.trim() };
      setConfigText(JSON.stringify(parsed, null, 2));
      setUrlInput("");
    } catch {
      setError("Invalid URL or JSON");
    }
  };

  const saveConfig = async () => {
    setError(null);
    setMessage(null);
    try {
      const parsed = JSON.parse(configText);
      const res = await fetch("/api/mcp-servers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save");
        return;
      }
      setMessage("Configuration saved");
    } catch {
      setError("Invalid JSON");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/">
            <LogoSmall />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">MCP Servers</h1>
        </div>

        {error && <p className="mb-4 text-red-600">{error}</p>}
        {message && <p className="mb-4 text-green-600">{message}</p>}

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Add Smithery URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={addUrl}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            MCP Config (JSON)
          </label>
          <textarea
            value={configText}
            onChange={(e) => setConfigText(e.target.value)}
            className="h-80 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={saveConfig}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
          <Link
            href="/settings"
            className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Back to Settings
          </Link>
        </div>
      </div>
    </div>
  );
}

