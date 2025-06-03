export interface AppConfig {
    apiUrl: string;
    tokenName: string;
}
export declare function setAppConfig(cfg: AppConfig): void;
export declare function getAppConfig(): AppConfig;
