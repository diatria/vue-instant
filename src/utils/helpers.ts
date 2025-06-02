import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import { kebabCase, snakeCase, startCase } from 'lodash';
import { getAppConfig } from '../config/runtimeConfig';
import { useRoute, useRouter } from 'vue-router';

// # INDEX B
export function beautyDate(date: string | undefined, format?: string) {
  if (date === undefined) return '-';
  if (format) return dayjs(date).format(format);
  return dayjs(date).format('DD MMM YYYY');
}

export function beautyDateTime(date: string) {
  return dayjs(date).format('DD MMM YYYY HH:mm');
}

// # INDEX C
export function csl(data: any, label?: string) {
  if (label) console.log(label, data);
  else console.log(data);
}

export function convertStringToHex(input: string | number) {
  const value = typeof input === 'number' ? input.toString() : input;
  return Array.from(`csl:${value}`)
    .map(char => char.charCodeAt(0).toString(16))
    .join('');
}

export function convertHexToString(input: string) {
  let output = '';
  for (let i = 0; i < input.length; i += 2) {
    output += String.fromCharCode(parseInt(input.substr(i, 2), 16));
  }
  return output.replace('csl:', '');
}

// # Index D
export function defaultType(type: string) {
  if (['text', 'date', 'dateTime'].includes(type)) return '';
  if (type === 'number') return 0;
}

// # Index G

export function getBrowserType() {
  const test = (regexp: RegExp) => {
    return regexp.test(navigator.userAgent);
  };

  if (test(/opr\//i)) {
    return 'Opera';
  } else if (test(/edg/i)) {
    return 'Microsoft Edge';
  } else if (test(/chrome|chromium|crios/i)) {
    return 'Google Chrome';
  } else if (test(/firefox|fxios/i)) {
    return 'Mozilla Firefox';
  } else if (test(/safari/i)) {
    return 'Apple Safari';
  } else if (test(/trident/i)) {
    return 'Microsoft Internet Explorer';
  } else if (test(/ucbrowser/i)) {
    return 'UC Browser';
  } else if (test(/samsungbrowser/i)) {
    return 'Samsung Browser';
  } else {
    return 'Unknown browser';
  }
}

/**
 * Mengambil inisial dari nama
 * @example "Dimas Adi Satria" akan menjadi "DAS"
 * @param name
 * @returns string
 */
export function getInitials(name: string): string {
  return name
    .split(' ') // Pisahkan berdasarkan spasi
    .map(word => word[0]) // Ambil huruf pertama dari setiap kata
    .join('') // Gabungkan menjadi satu string
    .toUpperCase(); // Pastikan inisial dalam huruf besar
}

export function getRefreshToken(): string {
  const tokenName = getAppConfig().tokenName;
  const snakeCaseTokenName = snakeCase(tokenName);
  return localStorage.getItem(`${snakeCaseTokenName}_refresh_token`) ?? '';
}

export function getToken() {
  const tokenName = getAppConfig().tokenName;
  return localStorage.getItem(`access_token_${tokenName}`) ?? '';
}

// # Index H

export function httpHandleError(error: AxiosError<{ message: string; code: string }>) {
  const router = useRouter();
  // Handle 403 forbidden
  if (error.response?.data.code === 'FORBIDDEN') router.push('/403');
  if (error.response) return message(error.response.data.message || '', 'error');
  return message(error.message, 'error');
}

export function httpStatusCode(status: 'OK' | 'Success' | 'Created' | 'Unauthorized') {
  if (status === 'OK') return 200;
  if (status === 'Success') return 200;
  if (status === 'Created') return 201;
  if (status === 'Unauthorized') return 401;
  if (status === 'Unauthorized') return 403;
  return 404;
}

export function httpValidation(response: AxiosResponse): boolean {
  const httpResponse = [
    { code: 200, message: 'OK', type: 'success' },
    { code: 201, message: 'Created', type: 'success' },
    { code: 400, message: 'Bad Request', type: 'error' },
    { code: 401, message: 'Unauthorized', type: 'error' },
    { code: 403, message: 'Forbidden', type: 'error' },
    { code: 404, message: 'Not Found', type: 'error' },
    { code: 405, message: 'Method Not Allowed', type: 'error' },
    { code: 429, message: 'Too Many Request', type: 'error' },
    { code: 500, message: 'Internal Server Error', type: 'error' },
    { code: 502, message: 'Bad Gateway', type: 'error' },
  ];
  const found = httpResponse.find(http => http.code === response.status);
  if (found) return found.type === 'success';
  return false;
}

export function http(baseURL?: string): AxiosInstance {
  const containHttp = baseURL?.includes('http://');
  const containHttps = baseURL?.includes('https://');

  let baseUrl = getAppConfig().apiUrl;
  if (containHttp || containHttps) baseUrl = baseURL as string;
  return axios.create({
    baseURL: baseUrl,
    timeout: 60000,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    withCredentials: true,
  });
}

export function httpGet(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    http(url)
      .get(url, config)
      .then(result => resolve(result))
      .catch(error => {
        reject(error);
        // if ((error?.response?.status || 500) === httpStatusCode('Unauthorized')) {
        //   redirectTo('/')
        // }
      });
  });
}

export function httpPost(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    http(url)
      .post(url, data, config)
      .then(result => resolve(result))
      .catch(error => {
        reject(error);
        // if ((error?.response?.status || 500) === httpStatusCode('Unauthorized')) {
        //   redirectTo('/')
        // }
      });
  });
}

export function httpDelete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    http()
      .delete(url, config)
      .then(result => resolve(result))
      .catch(error => {
        reject(error);
        // if ((error?.response?.status || 500) === httpStatusCode('Unauthorized')) {
        //   redirectTo('/')
        // }
      });
  });
}

export function httpPut(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    http()
      .put(url, data, config)
      .then(result => resolve(result))
      .catch(error => {
        reject(error);
        // if ((error?.response?.status || 500) === httpStatusCode('Unauthorized')) {
        //   redirectTo('/')
        // }
      });
  });
}

export function htmlToPlainText(html: string) {
  // Create a new div element
  const tempDivElement = document.createElement('div');
  // Set the HTML content with the given value
  tempDivElement.innerHTML = html;
  // Retrieve the text property of the element
  return tempDivElement.textContent || tempDivElement.innerText || '';
}

// # Index M
export function message(message: string, type: 'success' | 'warning' | 'info' | 'error') {
  // return message
  if (type === 'success') ElMessage.success({ grouping: true, message });
  if (type === 'warning') ElMessage.warning({ grouping: true, message });
  if (type === 'info') ElMessage.info({ grouping: true, message });
  if (type === 'error') ElMessage.error({ grouping: true, message });
}

/**
 *
 * @param minute Menit dalam bentuk bilangan bulat
 * @param leadingZero Untuk menampilkan nol didepan nya jika angka kurang dari 10
 * @returns `{Hours}:{Minute}:00`
 */
export function minuteToTime(minute: number | string, leadingZero?: boolean): string {
  if (typeof minute === 'string') minute = Number(minute);

  let minutes: number | string = minute % 60;
  let hours: number | string = (minute - minutes) / 60;

  if (leadingZero) {
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;
  }
  return `${hours}:${minutes}:00`;
}

// # Index N
export function numberFormat(number: number, locale?: string, options?: Intl.NumberFormatOptions) {
  const localeDefault = 'id-ID';
  const currencyDefault = 'IDR';
  return new Intl.NumberFormat(locale ?? localeDefault, {
    style: options?.style ?? 'currency',
    currency: options?.currency ?? currencyDefault,
    maximumFractionDigits: 0,
  }).format(number);
}

// # Index P
export function pascalCase(text: string) {
  return startCase(text);
}

// # Index R
export function removeRefreshToken() {
  const tokenName = snakeCase(getAppConfig().tokenName);
  localStorage.removeItem(`${tokenName}_refresh_token`);
}

export function replaceString(text: string, data: any) {
  if (!data) return text;

  // Ekspresi reguler untuk mencari "{params}"
  const regex = /\{(\w+?)\}/g;

  const matches: string[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1]);
  }

  let finalText = text;
  matches.forEach(item => {
    finalText = finalText.replace(`{${item}}`, data[item]);
  });

  return finalText ?? '';
}

/**
 *
 * @param key parameter key, Ex: id
 */
export function routeParam(key: string): string | null {
  const route = useRoute();
  return route.params[key]?.toString() || null;
}

// # S
export function setRefreshToken(token: string) {
  const tokenName = snakeCase(getAppConfig().tokenName);
  localStorage.setItem(`${tokenName}_refresh_token`, token);
}

export function url(text: string) {
  let replaced = text;

  // menggantikan '//' menjadi '/'
  replaced = replaced.replace(/\/\//g, '/');
  return replaced;
}

// # Index U
export function urlToKebab(text: string) {
  return `/${kebabCase(text)}`;
}

// # Index T
export function titleCase(text: string) {
  return startCase(text);
}

// # Index W
export function waiting(fn: Function, delay: number | null = 500) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(fn());
    }, delay || 500);
  });
}
