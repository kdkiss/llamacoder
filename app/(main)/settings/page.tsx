"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LogoSmall from "@/components/icons/logo-small";

const PROVIDERS = [
  { id: "openrouter", name: "OpenRouter", baseUrl: "https://openrouter.ai/api/v1" },
  { id: "openai", name: "OpenAI", baseUrl: "https://api.openai.com/v1" },
  { id: "anthropic", name: "Anthropic", baseUrl: "https://api.anthropic.com" },
  { id: "bedrock", name: "AWS Bedrock", baseUrl: "bedrock" },
  { id: "mistral", name: "Mistral AI", baseUrl: "https://api.mistral.ai/v1" },
];

const MODELS_BY_PROVIDER = {
  openrouter: [
    "qwen/qwen3-coder:free",
    "moonshotai/kimi-k2:free", 
    "meta-llama/llama-3.1-405b-instruct:free",
    "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    "deepseek-ai/DeepSeek-V3",
  ],
  openai: [
    "gpt-4o",
    "gpt-4o-mini", 
    "gpt-4-turbo",
    "gpt-3.5-turbo",
  ],
  anthropic: [
    "claude-3-5-sonnet-20241022",
    "claude-3-5-haiku-20241022",
    "claude-3-opus-20240229",
  ],
  bedrock: [
    "anthropic.claude-3-5-sonnet-20241022-v2:0",
    "anthropic.claude-3-haiku-20240307-v1:0",
    "meta.llama3-2-90b-instruct-v1:0",
  ],
  mistral: [
    "mistral-large-latest",
    "mistral-medium-latest", 
    "mistral-small-latest",
    "codestral-latest",
  ],
};

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    provider: "openrouter",
    model: "qwen/qwen3-coder:free",
    apiKeys: {
      openrouter: "",
      openai: "",
      anthropic: "",
      bedrock: "",
      mistral: "",
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem("llamacoder-settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem("llamacoder-settings", JSON.stringify(settings));
    alert("Settings saved!");
  };

  const updateApiKey = (provider: string, key: string) => {
    setSettings(prev => ({
      ...prev,
      apiKeys: { ...prev.apiKeys, [provider]: key }
    }));
  };

  const updateProvider = (provider: string) => {
    const firstModel = MODELS_BY_PROVIDER[provider as keyof typeof MODELS_BY_PROVIDER][0];
    setSettings(prev => ({
      ...prev,
      provider,
      model: firstModel
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/">
            <LogoSmall />
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        </div>

        <div className="rounded-lg bg-card p-6 shadow">
          <h2 className="mb-6 text-xl font-semibold text-card-foreground">AI Provider Configuration</h2>
          
          {/* Provider Selection */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              Provider
            </label>
            <select
              value={settings.provider}
              onChange={(e) => updateProvider(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            >
              {PROVIDERS.map(provider => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          {/* Model Selection */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              Model
            </label>
            <select
              value={settings.model}
              onChange={(e) => setSettings(prev => ({ ...prev, model: e.target.value }))}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            >
              {MODELS_BY_PROVIDER[settings.provider as keyof typeof MODELS_BY_PROVIDER]?.map(model => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          {/* API Keys */}
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-medium text-card-foreground">API Keys</h3>
            <div className="space-y-4">
              {PROVIDERS.map(provider => (
                <div key={provider.id}>
                  <label className="mb-1 block text-sm font-medium text-muted-foreground">
                    {provider.name} API Key
                  </label>
                  <input
                    type="password"
                    value={settings.apiKeys[provider.id as keyof typeof settings.apiKeys]}
                    onChange={(e) => updateApiKey(provider.id, e.target.value)}
                    placeholder={`Enter your ${provider.name} API key`}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={saveSettings}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Save Settings
            </button>
            <Link
              href="/"
              className="rounded-md border border-input bg-background px-4 py-2 text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}