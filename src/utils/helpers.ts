import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { kebabCase, startCase } from 'lodash'
import { getAppConfig } from '../config/runtimeConfig'
import { useRoute, useRouter } from 'vue-router'

// # INDEX B
export function beautyDate(date: string | undefined, format?: string) {
  if (date === undefined) return '-'
  if (format) return dayjs(date).format(format)
  return dayjs(date).format('DD MMM YYYY')
}

export function beautyDateTime(date: string) {
  return dayjs(date).format('DD MMM YYYY HH:mm')
}

// # INDEX C
export function csl(data: unknown, label?: string) {
  if (label) console.log(label, data)
  else console.log(data)
}

export function convertStringToHex(input: string | number) {
  const value = typeof input === 'number' ? input.toString() : input
  return Array.from(`csl:${value}`)
    .map((char) => char.charCodeAt(0).toString(16))
    .join('')
}

export function convertHexToString(input: string) {
  let output = ''
  for (let i = 0; i < input.length; i += 2) {
    output += String.fromCharCode(parseInt(input.substr(i, 2), 16))
  }
  return output.replace('csl:', '')
}

// # Index D
export function defaultType(type: string) {
  if (['text', 'date', 'dateTime'].includes(type)) return ''
  if (type === 'number') return 0
}

// # Index G

export function getBrowserType() {
  const test = (regexp: RegExp) => {
    return regexp.test(navigator.userAgent)
  }

  if (test(/opr\//i)) {
    return 'Opera'
  } else if (test(/edg/i)) {
    return 'Microsoft Edge'
  } else if (test(/chrome|chromium|crios/i)) {
    return 'Google Chrome'
  } else if (test(/firefox|fxios/i)) {
    return 'Mozilla Firefox'
  } else if (test(/safari/i)) {
    return 'Apple Safari'
  } else if (test(/trident/i)) {
    return 'Microsoft Internet Explorer'
  } else if (test(/ucbrowser/i)) {
    return 'UC Browser'
  } else if (test(/samsungbrowser/i)) {
    return 'Samsung Browser'
  } else {
    return 'Unknown browser'
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
    .map((word) => word[0]) // Ambil huruf pertama dari setiap kata
    .join('') // Gabungkan menjadi satu string
    .toUpperCase() // Pastikan inisial dalam huruf besar
}

// # Index H

/**
 * Untuk mendeteksi apakah text mengandung http atau https
 * @param string url
 * @returns string url
 */
export function hasHttpProtocol(url: string) {
  return /^https?:\/\//i.test(url)
}

export function httpHandleError(error?: unknown) {
  const router = useRouter()

  // Jika tidak ada error, beri pesan generic
  if (!error) return message('Unknown error', 'error')

  // Jika error berasal dari Axios
  if (axios.isAxiosError(error)) {
    const data =
      (error.response?.data as { message?: string; code?: string } | undefined) || undefined
    // Handle 403 forbidden
    if (data?.code === 'FORBIDDEN') router.push('/403')
    if (data?.message) return message(data.message, 'error')
    if (error.response?.statusText) return message(error.response.statusText, 'error')
    return message(error.message || 'Unknown error', 'error')
  }

  // Error bukan Axios — bisa berupa Error, string, dll.
  if (error instanceof Error) return message(error.message, 'error')
  if (typeof error === 'string') return message(error, 'error')

  // Fallback
  return message('Unknown error', 'error')
}

export function httpStatusCode(status: 'OK' | 'Success' | 'Created' | 'Unauthorized') {
  if (status === 'OK') return 200
  if (status === 'Success') return 200
  if (status === 'Created') return 201
  if (status === 'Unauthorized') return 401
  if (status === 'Unauthorized') return 403
  return 404
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
  ]
  const found = httpResponse.find((http) => http.code === response.status)
  if (found) return found.type === 'success'
  return false
}

export function http(): AxiosInstance {
  let withCredentials = import.meta.env.VITE_DS_VUE_INSTANT_HTTP_WITH_TOKEN
  if (!withCredentials && getAppConfig()) {
    withCredentials = getAppConfig().http?.withCredentials
  }

  return axios.create({
    timeout: 60000,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer `,
    },
    baseURL: import.meta.env.VITE_DS_VUE_INSTANT_BASE_URL,
    withCredentials: withCredentials ?? true,
  })
}

export function httpGet<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return new Promise((resolve, reject) => {
    http()
      .get(url, config)
      .then((result) => resolve(result))
      .catch((error) => {
        reject(error)
        // if ((error?.response?.status || 500) === httpStatusCode('Unauthorized')) {
        //   redirectTo('/')
        // }
      })
  })
}

export function httpPost(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    http()
      .post(url, data, config)
      .then((result) => resolve(result))
      .catch((error) => {
        reject(error)
        // if ((error?.response?.status || 500) === httpStatusCode('Unauthorized')) {
        //   redirectTo('/')
        // }
      })
  })
}

export function httpDelete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    http()
      .delete(url, config)
      .then((result) => resolve(result))
      .catch((error) => {
        reject(error)
        // if ((error?.response?.status || 500) === httpStatusCode('Unauthorized')) {
        //   redirectTo('/')
        // }
      })
  })
}

export function httpPut(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    http()
      .put(url, data, config)
      .then((result) => resolve(result))
      .catch((error) => {
        reject(error)
        // if ((error?.response?.status || 500) === httpStatusCode('Unauthorized')) {
        //   redirectTo('/')
        // }
      })
  })
}

export function htmlToPlainText(html: string) {
  // Create a new div element
  const tempDivElement = document.createElement('div')
  // Set the HTML content with the given value
  tempDivElement.innerHTML = html
  // Retrieve the text property of the element
  return tempDivElement.textContent || tempDivElement.innerText || ''
}

// # Index M
export function message(message: string, type: 'success' | 'warning' | 'info' | 'error') {
  // return message
  if (type === 'success') ElMessage.success({ grouping: true, message })
  if (type === 'warning') ElMessage.warning({ grouping: true, message })
  if (type === 'info') ElMessage.info({ grouping: true, message })
  if (type === 'error') ElMessage.error({ grouping: true, message })
}

/**
 *
 * @param minute Menit dalam bentuk bilangan bulat
 * @param leadingZero Untuk menampilkan nol didepan nya jika angka kurang dari 10
 * @returns `{Hours}:{Minute}:00`
 */
export function minuteToTime(minute: number | string, leadingZero?: boolean): string {
  if (typeof minute === 'string') minute = Number(minute)

  let minutes: number | string = minute % 60
  let hours: number | string = (minute - minutes) / 60

  if (leadingZero) {
    minutes = minutes < 10 ? `0${minutes}` : minutes
    hours = hours < 10 ? `0${hours}` : hours
  }
  return `${hours}:${minutes}:00`
}

// # Index N
export function numberFormat(number: number, locale?: string, options?: Intl.NumberFormatOptions) {
  const localeDefault = 'id-ID'
  const currencyDefault = 'IDR'
  return new Intl.NumberFormat(locale ?? localeDefault, {
    style: options?.style ?? 'currency',
    currency: options?.currency ?? currencyDefault,
    maximumFractionDigits: 0,
  }).format(number)
}

// # Index P
export function pascalCase(text: string) {
  return startCase(text)
}

export function replaceString(text: string, data: Record<string, unknown>) {
  if (!data) return text

  // Ekspresi reguler untuk mencari "{params}"
  const regex = /\{(\w+?)\}/g

  const matches: string[] = []
  let match
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1])
  }

  let finalText = text
  matches.forEach((item) => {
    finalText = finalText.replace(`{${item}}`, String((data as Record<string, unknown>)[item]))
  })

  return finalText ?? ''
}

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
export function resolveUrl(input: string): string {
  try {
    const u = new URL(input)
    if (u.protocol === 'http:' || u.protocol === 'https:') {
      return input
    }
  } catch {}

  const { http } = getAppConfig()
  if (!http?.baseUrl) {
    throw new Error('RuntimeConfig.http.baseUrl belum diset')
  }

  return new URL(input.replace(/^\/+/, ''), http.baseUrl).toString()
}

/**
 *
 * @param key parameter key, Ex: id
 */
export function routeParam(key: string): string | null {
  const route = useRoute()
  return route.params[key]?.toString() || null
}

// # S

export function url(text: string) {
  let replaced = text

  // menggantikan '//' menjadi '/'
  replaced = replaced.replace(/\/\//g, '/')
  return replaced
}

// # Index U
export function urlToKebab(text: string) {
  return `/${kebabCase(text)}`
}

// # Index T
export function titleCase(text: string) {
  return startCase(text)
}

// # Index W
export function waiting<T>(fn: () => T, delay: number | null = 500): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn())
    }, delay || 500)
  })
}
