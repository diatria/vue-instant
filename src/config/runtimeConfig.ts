// Struktur config yang kamu butuhkan
export interface AppConfig {
  token_name: string
  http?: {
    withCredentials: boolean
  }
}

// Tempat menyimpan config yang akan di-set di main.ts
let config: AppConfig;

export function setAppConfig(cfg: AppConfig) {
  config = cfg;
}

export function getAppConfig(): AppConfig {
  return config;
}
