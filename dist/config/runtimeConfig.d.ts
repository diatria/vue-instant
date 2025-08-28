export interface AppConfig {
    token_name: string;
    http?: {
        withCredentials: boolean;
    };
}
export declare function setAppConfig(cfg: AppConfig): void;
export declare function getAppConfig(): AppConfig;
