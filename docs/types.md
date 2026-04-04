# Tipe Data

Semua tipe yang digunakan di `vue-instant`.

## Query

Digunakan untuk mengirim filter ke API.

```ts
interface Query {
  queries?: Array<{
    field: string
    value: string | number | boolean | undefined
    strict?: boolean
    op?: string | undefined
  }>
  relations?: Array<string>
}
```

**Contoh:**

```ts
const query: Query = {
  queries: [
    { field: 'status', value: 'active', strict: true },
    { field: 'name', value: 'dimas', op: 'like' },
  ],
  relations: ['category', 'tags'],
}
```

---

## Response

Shape response standar dari Laravel Instant.

```ts
interface Response<T> {
  code: string
  internal_code: number
  message: string
  data: T
  data_count?: number
  memory_usage: string
  request: unknown
  trace: string
}

type ResponseAxios<T> = AxiosResponse<Response<T>>
type ResponsePromise<T> = Promise<AxiosResponse<Response<T>>>
```

**Contoh:**

```ts
import type { ResponsePromise } from 'vue-instant'

async function fetchUser(id: number): ResponsePromise<User> {
  return new HttpBuilder().get(`/api/users/${id}`)
}

const response = await fetchUser(1)
const user = response.data.data // tipe User
```

---

## Pagination

Shape response paginator dari Laravel.

```ts
interface Pagination<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}
```

---

## ComFormColumn

Definisi field yang digunakan oleh `ComForm` dan `ComFilter`.

```ts
interface ComFormColumn {
  name: string
  label: string
  type: ComFormColumnType
  grid?: number | Record<string, number>
  value?: string | number | UploadInstance | (() => string)
  disabled?: boolean
  select?: ComSelectProps
  options?: Array<{ value: unknown; label: string }>
  upload?: { url: string }
  placeholder?: string
}
```

---

## ComFormColumnType

Union type dari semua tipe field yang didukung.

```ts
type ComFormColumnType =
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
```

---

## ComSelectProps

Props konfigurasi untuk komponen select (digunakan dalam definisi kolom `ComForm`).

```ts
interface ComSelectProps {
  url?: string
  options?: unknown[]
  fieldLabel?: string | ((row: unknown) => string)
  fieldValue?: string
  fieldSearchColumn?: string
  placeholder?: string
  placement?: string
  remote?: boolean
  fetchOnClick?: boolean
  disabled?: boolean
}
```

---

## AppConfig

Konfigurasi runtime aplikasi. Ditetapkan via `setAppConfig()`.

```ts
interface AppConfig {
  http?: {
    baseUrl?: string
    withCredentials?: boolean
  }
}
```

---

## Config (HTTP)

Konfigurasi internal untuk `HttpBuilder`.

```ts
interface Config {
  base_url?: string
  with_credentials?: boolean
}
```
