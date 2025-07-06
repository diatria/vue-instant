import type { AxiosResponse } from 'axios'
export interface Response<T> {
  code: string
  internal_code: number
  message: string
  data: T
  data_count?: number
  memory_usage: string
  request: unknown
  trace: string
}
export type ResponseAxios<T> = AxiosResponse<Response<T>>
export type ResponsePromise<T> = Promise<AxiosResponse<Response<T>>>
