"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LogoSmall from "@/components/icons/logo-small";

interface ServerForm {
  id?: string;
  name: string;
  host: string;
  port: string;
  username?: string;
  password?: string;
  online?: boolean;
}

export default function MCPServersPage() {
  const [servers, setServers] = useState<ServerForm[]>([]);
  const [form, setForm] = useState<ServerForm>({ name: "", host: "", port: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadServers() {
      const res = await fetch("/api/mcp-servers");
      const data: ServerForm[] = await res.json();
      const withStatus = await Promise.all(
        data.map(async (srv) => {
          try {
            const statusRes = await fetch(`/api/mcp-servers/status/${srv.id}`);
            const statusData = await statusRes.json();
            return { ...srv, online: statusData.online };
          } catch {
            return { ...srv, online: false };
          }
        })
      );
      setServers(withStatus);
    }
    loadServers();
  }, []);

  const resetForm = () => {
    setForm({ name: "", host: "", port: "" });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.host || !form.port) {
      setError("Name, host, and port are required");
      return;
    }
    const method = form.id ? "PUT" : "POST";
    const payload = {
      ...form,
      name: form.name.trim(),
      host: form.host.trim(),
      port: form.port.trim(),
      username: form.username?.trim(),
      password: form.password?.trim(),
    };
    const res = await fetch("/api/mcp-servers", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Request failed");
      return;
    }
    const data = await res.json();
    const statusRes = await fetch(`/api/mcp-servers/status/${data.id}`);
    const { online } = await statusRes.json();
    const newData = { ...data, online };
    if (method === "POST") {
      setServers((prev) => [...prev, newData]);
    } else {
      setServers((prev) => prev.map((s) => (s.id === newData.id ? newData : s)));
    }
    resetForm();
  };

  const handleEdit = (srv: ServerForm) => {
    setForm({ ...srv, port: String(srv.port) });
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await fetch("/api/mcp-servers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setServers((prev) => prev.filter((s) => s.id !== id));
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

        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">{form.id ? "Edit Server" : "Add Server"}</h2>
          {error && <p className="mb-4 text-red-600">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Host</label>
              <input
                type="text"
                value={form.host}
                onChange={(e) => setForm({ ...form, host: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Port</label>
              <input
                type="number"
                value={form.port}
                onChange={(e) => setForm({ ...form, port: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={form.username || ""}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={form.password || ""}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {form.id ? "Update" : "Add"}
              </button>
              {form.id && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Configured Servers</h2>
          {servers.length === 0 ? (
            <p className="text-gray-500">No servers configured.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {servers.map((srv) => (
                <li key={srv.id} className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium">{srv.name}</p>
                    <p className="text-sm text-gray-500">
                      {srv.host}:{srv.port}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-sm font-medium ${srv.online ? "text-green-600" : "text-gray-500"}`}
                    >
                      {srv.online ? "Online" : "Offline"}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(srv)}
                        className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(srv.id)}
                        className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
