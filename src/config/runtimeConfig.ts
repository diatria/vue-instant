// Struktur config yang kamu butuhkan
export interface AppConfig {
  http?: {
    baseUrl?: string
    withCredentials?: boolean
  }
}

// Tempat menyimpan config yang akan di-set di main.ts
let config: AppConfig

export function setAppConfig(cfg: AppConfig) {
  config = cfg
}

export function getAppConfig(): AppConfig {
  if (!config) {
    throw new Error('RuntimeConfig belum di-set. Pastikan setAppConfig dipanggil di main.ts')
  }
  return config
}
