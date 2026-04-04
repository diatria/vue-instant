# Getting Started

## Instalasi

```bash
# npm
npm install vue-instant

# pnpm
pnpm add vue-instant

# yarn
yarn add vue-instant
```

Pastikan peer dependencies sudah terpasang:

```bash
pnpm add vue element-plus axios vue-router dayjs lodash
```

## Konfigurasi

Panggil `setAppConfig` **satu kali** di `main.ts` sebelum mounting aplikasi. Ini **wajib** dilakukan sebelum menggunakan komponen atau helper apapun.

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { setAppConfig } from 'vue-instant'
import App from './App.vue'
import router from './router'

const app = createApp(App)

setAppConfig({
  http: {
    baseUrl: 'https://api.example.com',
    withCredentials: true,
  }
})

app.use(ElementPlus)
app.use(router)
app.mount('#app')
```

### Opsi Konfigurasi

| Opsi | Tipe | Default | Deskripsi |
|---|---|---|---|
| `http.baseUrl` | `string` | — | Base URL untuk semua request HTTP |
| `http.withCredentials` | `boolean` | `true` | Kirim cookie/credentials pada setiap request |

## Import Komponen

```vue
<script setup lang="ts">
import { ComTable, ComForm, ComSelect, ComContainer, ComDialogConfirmation } from 'vue-instant'
</script>
```

## Contoh Penggunaan Cepat

### Tabel data dari API

```vue
<template>
  <ComTable
    url="/api/users"
    title="Users"
    :columns="columns"
    :button-create-url="() => ({ name: 'users.create' })"
    :button-edit-url="(row) => ({ name: 'users.edit', params: { id: row.id } })"
    delete-url="/api/users"
  />
</template>

<script setup lang="ts">
import { ComTable } from 'vue-instant'

const columns = [
  { field: 'name', label: 'Nama' },
  { field: 'email', label: 'Email' },
  { field: 'created_at', label: 'Dibuat' },
]
</script>
```

### Form create/edit

```vue
<template>
  <ComForm
    url="/api/users"
    title="User"
    :columns="columns"
    :id="userId"
    @on-stored="handleStored"
    @back="router.back()"
  />
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ComForm } from 'vue-instant'

const router = useRouter()
const route = useRoute()
const userId = route.params.id ? Number(route.params.id) : undefined

const columns = [
  { name: 'name', label: 'Nama', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'password', label: 'Password', type: 'password' },
]

function handleStored(data) {
  router.push({ name: 'users.index' })
}
</script>
```
