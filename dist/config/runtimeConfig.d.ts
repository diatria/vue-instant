export interface AppConfig {
    http?: {
        baseUrl?: string;
        withCredentials?: boolean;
    };
}
export declare function setAppConfig(cfg: AppConfig): void;
export declare function getAppConfig(): AppConfig;
