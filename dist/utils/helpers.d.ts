import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
/**
 * Formats a date string into a beautiful, readable format.
 * @param date - The date string to format. If undefined, returns '-'.
 * @param format - Optional custom format string. Defaults to 'DD MMM YYYY'.
 * @returns The formatted date string.
 */
export declare function beautyDate(date: string | undefined, format?: string): string;
/**
 * Formats a date string into a beautiful date and time format.
 * @param date - The date string to format.
 * @returns The formatted date and time string in 'DD MMM YYYY HH:mm' format.
 */
export declare function beautyDateTime(date: string): string;
/**
 * Logs data to the console with an optional label.
 * @param data - The data to log.
 * @param label - Optional label to prefix the log.
 */
export declare function csl(data: unknown, label?: string): void;
/**
 * Converts a string or number to a hex-encoded string with a 'csl:' prefix.
 * @param input - The input string or number to convert.
 * @returns The hex-encoded string.
 */
export declare function convertStringToHex(input: string | number): string;
/**
 * Converts a hex-encoded string back to the original string, removing the 'csl:' prefix.
 * @param input - The hex-encoded string to convert.
 * @returns The decoded string.
 */
export declare function convertHexToString(input: string): string;
/**
 * Returns a default value based on the given type.
 * @param type - The type string ('text', 'date', 'dateTime', 'number').
 * @returns The default value: empty string for text/date types, 0 for number.
 */
export declare function defaultType(type: string): 0 | "" | undefined;
/**
 * Detects the browser type based on the user agent.
 * @returns The name of the browser.
 */
export declare function getBrowserType(): "Opera" | "Microsoft Edge" | "Google Chrome" | "Mozilla Firefox" | "Apple Safari" | "Microsoft Internet Explorer" | "UC Browser" | "Samsung Browser" | "Unknown browser";
/**
 * Mengambil inisial dari nama
 * @example "Dimas Adi Satria" akan menjadi "DAS"
 * @param name
 * @returns string
 */
export declare function getInitials(name: string): string;
/**
 * Untuk mendeteksi apakah text mengandung http atau https
 * @param string url
 * @returns string url
 */
export declare function hasHttpProtocol(url: string): boolean;
export declare function httpHandleError(error?: unknown): void;
export declare function httpStatusCode(status: 'OK' | 'Success' | 'Created' | 'Unauthorized' | 'Forbidden'): 200 | 201 | 401 | 403 | 404;
/**
 * Validates an HTTP response based on status code.
 * @param response - The Axios response object.
 * @returns True if the status is a success code (200, 201), false otherwise.
 */
export declare function httpValidation(response: AxiosResponse): boolean;
/**
 * Creates and returns an Axios instance configured for the application.
 * @returns The configured Axios instance.
 * @deprecated use new HttpBuilder() instead
 */
export declare function http(): AxiosInstance;
/**
 * Performs a GET request using the configured Axios instance.
 * @param url - The URL to request.
 * @param config - Optional Axios request config.
 * @returns A promise resolving to the Axios response.
 * @deprecated use new HttpBuilder() instead
 */
export declare function httpGet<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
/**
 * Performs a POST request using the configured Axios instance.
 * @param url - The URL to request.
 * @param data - The data to send.
 * @param config - Optional Axios request config.
 * @returns A promise resolving to the Axios response.
 * @deprecated use new HttpBuilder() instead
 */
export declare function httpPost(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse>;
/**
 * Performs a DELETE request using the configured Axios instance.
 * @param url - The URL to request.
 * @param config - Optional Axios request config.
 * @returns A promise resolving to the Axios response.
 * @deprecated use new HttpBuilder() instead
 */
export declare function httpDelete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
/**
 * Performs a PUT request using the configured Axios instance.
 * @param url - The URL to request.
 * @param data - The data to send.
 * @param config - Optional Axios request config.
 * @returns A promise resolving to the Axios response.
 * @deprecated use new HttpBuilder() instead
 */
export declare function httpPut(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse>;
/**
 * Converts HTML string to plain text.
 * @param html - The HTML string to convert.
 * @returns The plain text representation.
 */
export declare function htmlToPlainText(html: string): string;
/**
 * Displays a message using Element Plus ElMessage.
 * @param message - The message to display.
 * @param type - The type of message ('success', 'warning', 'info', 'error').
 */
export declare function message(message: string, type: 'success' | 'warning' | 'info' | 'error'): void;
/**
 *
 * @param minute Menit dalam bentuk bilangan bulat
 * @param leadingZero Untuk menampilkan nol didepan nya jika angka kurang dari 10
 * @returns `{Hours}:{Minute}:00`
 */
export declare function minuteToTime(minute: number | string, leadingZero?: boolean): string;
/**
 * Formats a number as currency using Intl.NumberFormat.
 * @param number - The number to format.
 * @param locale - Optional locale string, defaults to 'id-ID'.
 * @param options - Optional formatting options.
 * @returns The formatted currency string.
 */
export declare function numberFormat(number: number, locale?: string, options?: Intl.NumberFormatOptions): string;
/**
 * Converts text to Pascal case (title case).
 * @param text - The text to convert.
 * @returns The Pascal case string.
 */
export declare function pascalCase(text: string): string;
/**
 * Replaces placeholders in a string with values from an object.
 * @param text - The text with placeholders like {key}.
 * @param data - The object containing replacement values.
 * @returns The text with placeholders replaced.
 */
export declare function replaceString(text: string, data: Record<string, unknown>): string;
/**
 * Resolve URL dari input yang diberikan.
 *
 * Function ini akan mendeteksi apakah input merupakan:
 * 1. Absolute URL (mengandung protocol http / https)
 *    → akan dikembalikan apa adanya tanpa modifikasi
 * 2. Relative path / path saja
 *    → akan digabungkan dengan `AppConfig.http.baseUrl`
 *
 * Contoh perilaku:
 * - resolveUrl('https://google.com/abc')
 *   → 'https://google.com/abc'
 *
 * - resolveUrl('/users')
 *   → 'https://api.example.com/users'
 *
 * - resolveUrl('users/123')
 *   → 'https://api.example.com/users/123'
 *
 * Catatan:
 * - `setAppConfig()` HARUS dipanggil terlebih dahulu sebelum function ini digunakan.
 * - Function ini hanya mendukung protocol `http` dan `https`.
 *
 * @param input - Absolute URL atau relative path
 * @returns URL lengkap yang siap digunakan untuk HTTP request
 * @throws Error jika `AppConfig.http.baseUrl` belum diset
 */
export declare function resolveUrl(input: string): string;
/**
 * Gets a route parameter by key.
 * @param key - The parameter key.
 * @returns The parameter value as string or null.
 */
export declare function routeParam(key: string): string | null;
/**
 * Cleans up a URL by replacing double slashes with single slashes.
 * @param text - The URL string to clean.
 * @returns The cleaned URL.
 */
export declare function url(text: string): string;
/**
 * Converts text to kebab-case and prefixes with '/'.
 * @param text - The text to convert.
 * @returns The kebab-case URL path.
 */
export declare function urlToKebab(text: string): string;
/**
 * Converts text to title case.
 * @param text - The text to convert.
 * @returns The title case string.
 */
export declare function titleCase(text: string): string;
/**
 * Delays the execution of a function by a specified amount of time.
 * @param fn - The function to execute after the delay.
 * @param delay - The delay in milliseconds, defaults to 500.
 * @returns A promise that resolves with the function's return value.
 */
export declare function waiting<T>(fn: () => T, delay?: number | null): Promise<T>;
