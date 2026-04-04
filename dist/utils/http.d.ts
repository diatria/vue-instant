import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
export type HttpOptions = {
    base_path?: string;
    token?: string;
    with_credentials?: boolean;
};
export declare class HttpBuilder {
    private base_path;
    private token?;
    private with_credentials;
    private instance;
    basePath(path: string): this;
    setToken(token: string): this;
    withCredentials(enable: boolean): this;
    build(): AxiosInstance;
    get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    patch<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    head<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    options<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    addInterceptor(onSuccess: (res: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>, onError: (err: unknown) => unknown): this;
}
