// Struktur config yang kamu butuhkan
export interface AppConfig {
  apiUrl: string;
  tokenName: string;
}

// Tempat menyimpan config yang akan di-set di main.ts
let config: AppConfig;

export function setAppConfig(cfg: AppConfig) {
  config = cfg;
}

export function getAppConfig(): AppConfig {
  if (!config) throw new Error('App config is not initialized');
  return config;
}
