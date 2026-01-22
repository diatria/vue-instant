import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

export type HttpOptions = {
  base_path?: string
  token?: string
  with_credentials?: boolean
}

export class HttpBuilder {
  private base_path = ''
  private token?: string
  private with_credentials = true

  private instance: AxiosInstance | null = null

  // ========================
  // Builder Methods (Chainable)
  // ========================

  basePath(path: string) {
    this.base_path = path
    return this
  }

  setToken(token: string) {
    this.token = token
    return this
  }

  withCredentials(enable: boolean) {
    this.with_credentials = enable
    return this
  }

  // ========================
  // Build Axios Instance
  // ========================

  build(): AxiosInstance {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: this.base_path,
        timeout: 60000,
        withCredentials: this.with_credentials,
        headers: {
          Accept: 'application/json',
          ...(this.token && { Authorization: `Bearer ${this.token}` }),
        },
      })
    }
    return this.instance
  }

  // ========================
  // HTTP Methods
  // ========================

  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.build().get<T>(url, config)
  }

  post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.build().post<T>(url, data, config)
  }

  put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.build().put<T>(url, data, config)
  }

  patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.build().patch<T>(url, data, config)
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.build().delete<T>(url, config)
  }

  head<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.build().head<T>(url, config)
  }

  options<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.build().options<T>(url, config)
  }

  // ========================
  // Optional Interceptor Helper
  // ========================

  addInterceptor(
    onSuccess: (res: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
    onError: (err: unknown) => unknown,
  ) {
    this.build().interceptors.response.use(onSuccess, onError)
    return this
  }
}
