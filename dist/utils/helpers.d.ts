import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
export declare function beautyDate(date: string | undefined, format?: string): string;
export declare function beautyDateTime(date: string): string;
export declare function csl(data: any, label?: string): void;
export declare function convertStringToHex(input: string | number): string;
export declare function convertHexToString(input: string): string;
export declare function defaultType(type: string): 0 | "" | undefined;
export declare function getBrowserType(): "Opera" | "Microsoft Edge" | "Google Chrome" | "Mozilla Firefox" | "Apple Safari" | "Microsoft Internet Explorer" | "UC Browser" | "Samsung Browser" | "Unknown browser";
/**
 * Mengambil inisial dari nama
 * @example "Dimas Adi Satria" akan menjadi "DAS"
 * @param name
 * @returns string
 */
export declare function getInitials(name: string): string;
export declare function getRefreshToken(): string;
export declare function getToken(): string;
export declare function httpHandleError(error: AxiosError<{
    message: string;
    code: string;
}>): void;
export declare function httpStatusCode(status: 'OK' | 'Success' | 'Created' | 'Unauthorized'): 200 | 201 | 401 | 403 | 404;
export declare function httpValidation(response: AxiosResponse): boolean;
export declare function http(baseURL?: string): AxiosInstance;
export declare function httpGet(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
export declare function httpPost(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse>;
export declare function httpDelete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
export declare function httpPut(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse>;
export declare function htmlToPlainText(html: string): string;
export declare function message(message: string, type: 'success' | 'warning' | 'info' | 'error'): void;
/**
 *
 * @param minute Menit dalam bentuk bilangan bulat
 * @param leadingZero Untuk menampilkan nol didepan nya jika angka kurang dari 10
 * @returns `{Hours}:{Minute}:00`
 */
export declare function minuteToTime(minute: number | string, leadingZero?: boolean): string;
export declare function numberFormat(number: number, locale?: string, options?: Intl.NumberFormatOptions): string;
export declare function pascalCase(text: string): string;
export declare function removeRefreshToken(): void;
export declare function replaceString(text: string, data: any): string;
/**
 *
 * @param key parameter key, Ex: id
 */
export declare function routeParam(key: string): string | null;
export declare function setRefreshToken(token: string): void;
export declare function url(text: string): string;
export declare function urlToKebab(text: string): string;
export declare function titleCase(text: string): string;
export declare function waiting(fn: Function, delay?: number | null): Promise<unknown>;
