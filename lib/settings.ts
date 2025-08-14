export interface UserSettings {
  provider: string;
  model: string;
  apiKeys: {
    openrouter: string;
    openai: string;
    anthropic: string;
    bedrock: string;
    mistral: string;
  };
}

export const DEFAULT_SETTINGS: UserSettings = {
  provider: "openrouter",
  model: "qwen/qwen3-coder:free",
  apiKeys: {
    openrouter: "",
    openai: "",
    anthropic: "",
    bedrock: "",
    mistral: "",
  },
};

export const PROVIDER_CONFIGS = {
  openrouter: {
    baseUrl: "https://openrouter.ai/api/v1",
    envKey: "OPENROUTER_API_KEY",
  },
  openai: {
    baseUrl: "https://api.openai.com/v1",
    envKey: "OPENAI_API_KEY",
  },
  anthropic: {
    baseUrl: "https://api.anthropic.com",
    envKey: "ANTHROPIC_API_KEY",
  },
  bedrock: {
    baseUrl: "bedrock",
    envKey: "AWS_ACCESS_KEY_ID",
  },
  mistral: {
    baseUrl: "https://api.mistral.ai/v1",
    envKey: "MISTRAL_API_KEY",
  },
};

export function getUserSettings(): UserSettings {
  if (typeof window === "undefined") {
    return DEFAULT_SETTINGS;
  }
  
  const saved = localStorage.getItem("llamacoder-settings");
  if (saved) {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  }
  
  return DEFAULT_SETTINGS;
}

export function getApiConfig(settings: UserSettings) {
  const provider = settings.provider as keyof typeof PROVIDER_CONFIGS;
  const config = PROVIDER_CONFIGS[provider];
  
  // Use user's API key if available, otherwise fall back to env var
  const apiKey = settings.apiKeys[provider] || process.env[config.envKey];
  
  return {
    apiKey,
    baseUrl: config.baseUrl,
    model: settings.model,
  };
}

/**
 * Returns true if an API key is available for the current provider.
 * Checks both user settings and environment variables.
 */
export function isApiKeyConfigured(settings: UserSettings = getUserSettings()) {
  const provider = settings.provider as keyof typeof PROVIDER_CONFIGS;
  const config = PROVIDER_CONFIGS[provider];
  const apiKey = settings.apiKeys[provider] || process.env[config.envKey];
  return Boolean(apiKey && apiKey.trim().length > 0);
}