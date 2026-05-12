# HttpBuilder

Klien HTTP berbasis builder pattern menggunakan Axios. Ini adalah cara yang direkomendasikan untuk melakukan request HTTP.

> Fungsi-fungsi lama `http()`, `httpGet()`, `httpPost()`, `httpDelete()`, `httpPut()` sudah **deprecated** dan sebaiknya diganti dengan `HttpBuilder`.

## Import

```ts
import { HttpBuilder } from 'vue-instant'
// atau langsung dari file
import { HttpBuilder } from 'vue-instant/src/utils/http'
```

## Penggunaan Dasar

```ts
import { HttpBuilder } from 'vue-instant'

// GET
const response = await new HttpBuilder().get('/api/users')

// POST
const response = await new HttpBuilder().post('/api/users', { name: 'Dimas' })

// PUT
const response = await new HttpBuilder().put('/api/users/1', { name: 'Dimas Updated' })

// DELETE
const response = await new HttpBuilder().delete('/api/users/1')
```

## Builder Methods (Chainable)

| Method | Signature | Deskripsi |
|---|---|---|
| `.basePath(path)` | `(path: string) => this` | Override base URL (default dari `AppConfig.http.baseUrl`) |
| `.setToken(token)` | `(token: string) => this` | Set Bearer token pada header Authorization |
| `.withCredentials(enable)` | `(enable: boolean) => this` | Aktifkan/nonaktifkan credentials (default: `true`) |
| `.addInterceptor(onSuccess, onError)` | `(fn, fn) => this` | Tambahkan response interceptor |
| `.build()` | `() => AxiosInstance` | Kembalikan `AxiosInstance` internal |

## HTTP Methods

| Method | Signature |
|---|---|
| `.get(url, config?)` | `Promise<AxiosResponse>` |
| `.post(url, data?, config?)` | `Promise<AxiosResponse>` |
| `.put(url, data?, config?)` | `Promise<AxiosResponse>` |
| `.patch(url, data?, config?)` | `Promise<AxiosResponse>` |
| `.delete(url, config?)` | `Promise<AxiosResponse>` |
| `.head(url, config?)` | `Promise<AxiosResponse>` |
| `.options(url, config?)` | `Promise<AxiosResponse>` |

## Contoh Lanjutan

### Custom Base URL

```ts
const response = await new HttpBuilder()
  .basePath('https://api.external-service.com')
  .get('/endpoint')
```

### Dengan Bearer Token

```ts
const token = localStorage.getItem('token')
const response = await new HttpBuilder()
  .setToken(token)
  .post('/api/secure-endpoint', data)
```

### Dengan Interceptor

```ts
const http = new HttpBuilder()
  .addInterceptor(
    (response) => {
      console.log('Success:', response.status)
      return response
    },
    (error) => {
      console.error('Error:', error.message)
      return Promise.reject(error)
    }
  )

const response = await http.get('/api/data')
```

### Akses Axios Instance Langsung

```ts
const axiosInstance = new HttpBuilder()
  .setToken(myToken)
  .build()

// Gunakan seperti axios biasa
axiosInstance.defaults.headers['X-Custom'] = 'value'
const response = await axiosInstance.get('/api/data')
```

### Penanganan Error

```ts
import { HttpBuilder, httpHandleError } from 'vue-instant'

try {
  const response = await new HttpBuilder().get('/api/data')
  // proses response
} catch (error) {
  httpHandleError(error) // redirect ke /403 jika Forbidden
}
```
