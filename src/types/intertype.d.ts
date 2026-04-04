import { FormRules, UploadInstance } from 'element-plus'
import { Query } from './query'

export interface Pagination<T> {
  current_page: number
  data: T[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number | null
  total: number
}

export interface ComSelectProps {
  modelValue?: any
  disabled?: boolean
  fetchOnClick?: boolean
  options?: Array<unknown>
  url?: string
  field_label?: string | ((row: Record<string, unknown>) => string)
  field_value?: string
  field_search_column?: string
  placeholder?: string
  placement?: string
  remote?: boolean
}

export interface ComFormColumnSelect {
  options?: Array<unknown>
  url?: string
  field_label?: string | ((row: Record<string, unknown>) => string)
  field_value?: string
  field_search_column?: string
  fetch_on_click?: boolean
  remote?: boolean
}

export interface ComFormColumnUpload {
  url: string
}

export type ComFormColumnType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'password'
  | 'switch'
  | 'checkbox:label'
  | 'checkbox'
  | 'date'
  | 'date-time'
  | 'time'
  | 'upload'
  | 'slot'
  | 'slot:el-form-item'
  | 'hide'

export interface ComFormColumn {
  name: string
  label?: string
  type: ComFormColumnType
  grid?: number | Record<string, number>
  value?: string | number | UploadInstance | (() => string)
  disabled?: boolean
  select?: ComFormColumnSelect
  options?: {
    value: string | number | boolean
    label: string
  }[]
  upload?: ComFormColumnUpload
  placeholder?: string
}

export interface ComFormProps {
  columns: ComFormColumn[]
  id?: number
  description?: string
  fetchUrl?: string // only for fetch data
  paramsUrl?: string
  queries?: Query
  relations?: string[]
  rules?: FormRules
  storeUrl?: string // for store or update data
  title?: string
  url: string // for all fetch, store or update
}
