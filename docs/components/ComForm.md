# ComForm

Komponen form lengkap yang menangani alur create dan update, termasuk upload file, validasi, dan pengiriman ke API.

## Penggunaan

### Form Create

```vue
<template>
  <ComForm
    url="/api/products"
    title="Produk"
    description="Tambah produk baru"
    :columns="columns"
    @on-stored="handleStored"
    @back="router.back()"
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ComForm } from 'vue-instant'

const router = useRouter()

const columns = [
  { name: 'name', label: 'Nama Produk', type: 'text', grid: 24 },
  { name: 'price', label: 'Harga', type: 'text', grid: 12 },
  { name: 'category_id', label: 'Kategori', type: 'select', grid: 12, select: { url: '/api/categories' } },
  { name: 'description', label: 'Deskripsi', type: 'textarea', grid: 24 },
]

function handleStored(data) {
  router.push({ name: 'products.index' })
}
</script>
```

### Form Edit

Cukup tambahkan prop `id`. Komponen akan otomatis fetch data dan mengirim `PUT` saat disimpan.

```vue
<template>
  <ComForm
    url="/api/products"
    title="Edit Produk"
    :columns="columns"
    :id="productId"
    @on-updated="handleUpdated"
    @back="router.back()"
  />
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ComForm } from 'vue-instant'

const router = useRouter()
const route = useRoute()
const productId = Number(route.params.id)

const columns = [
  { name: 'name', label: 'Nama Produk', type: 'text' },
  { name: 'price', label: 'Harga', type: 'text' },
]

function handleUpdated(data) {
  router.push({ name: 'products.index' })
}
</script>
```

## Props

| Prop | Tipe | Wajib | Default | Deskripsi |
|---|---|---|---|---|
| `url` | `string` | Ya | — | Base URL untuk fetch, store, dan update |
| `columns` | `Column[]` | Ya | — | Definisi field form |
| `id` | `number` | Tidak | — | Jika diisi, komponen masuk mode edit — fetch data dan gunakan PUT |
| `title` | `string` | Tidak | — | Judul header form |
| `description` | `string` | Tidak | — | Subjudul header form |
| `fetchUrl` | `string` | Tidak | — | Override URL untuk GET (terpisah dari URL store) |
| `storeUrl` | `string` | Tidak | — | Override URL untuk POST/PUT |
| `paramsUrl` | `string` | Tidak | — | Query string yang ditambahkan ke store URL |
| `queries` | `Query` | Tidak | — | Query params untuk request fetch |
| `relations` | `string[]` | Tidak | — | Relasi yang di-eager-load saat fetch |
| `rules` | `FormRules` | Tidak | — | Aturan validasi Element Plus |

## Definisi Kolom (`Column`)

| Field | Tipe | Deskripsi |
|---|---|---|
| `name` | `string` | Key field form |
| `label` | `string` | Label tampilan |
| `type` | `ColumnType` | Tipe input (lihat di bawah) |
| `grid` | `number \| Record<string, number>` | Span kolom pada grid 24. Mendukung `default`, `sm`, `md`, `lg`, `xl` |
| `value` | `string \| number \| (() => string)` | Nilai default, atau fungsi yang mengembalikan path ke data fetch |
| `disabled` | `boolean` | Nonaktifkan input |
| `select` | `ColumnSelect` | Konfigurasi untuk tipe `select` |
| `options` | `{value, label}[]` | Opsi untuk tipe `radio` / `checkbox:label` |
| `upload` | `{url: string}` | Konfigurasi untuk tipe `upload` |
| `placeholder` | `string` | Teks placeholder |

## Tipe Field (`ColumnType`)

| Tipe | Deskripsi |
|---|---|
| `text` | Input teks biasa |
| `textarea` | Textarea multi-baris |
| `password` | Input password (tersembunyi) |
| `select` | Dropdown select (dengan dukungan API fetch dan remote search) |
| `radio` | Grup radio button |
| `checkbox` | Checkbox tunggal |
| `checkbox:label` | Grup checkbox dengan label |
| `switch` | Toggle switch |
| `date` | Date picker |
| `date-time` | Date & time picker |
| `time` | Time picker |
| `upload` | Upload file |
| `slot` | Konten custom via named slot, scoped dengan `{ form }` |
| `slot:el-form-item` | Seluruh `el-form-item` custom via named slot |
| `hide` | Field tersembunyi (tetap ada di data form) |

## Emits

| Event | Payload | Deskripsi |
|---|---|---|
| `back` | — | Tombol batal diklik |
| `onStored` | `data` | POST berhasil, menerima `data` dari response |
| `onUpdated` | `data` | PUT berhasil, menerima `data` dari response |
| `delete` | — | Event delete |
| `form` | `Record<string, unknown>` | State form lengkap, dipancarkan setiap perubahan field |
| `onChangeItem` | `{ column, value }` | Kolom dan nilai yang baru saja berubah |

## Exposed Methods

| Method | Deskripsi |
|---|---|
| `initializeForm()` | Re-inisialisasi nilai form dari definisi kolom |

## Slots

| Slot | Scoped | Deskripsi |
|---|---|---|
| `#title` | — | Ganti header judul/deskripsi default |
| `#buttonStore` | — | Ganti tombol "Simpan" default |
| `#[column.name]` | `{ form }` | Untuk kolom bertipe `slot` atau `slot:el-form-item` |

## Contoh Lanjutan

### Grid Responsif

```ts
const columns = [
  {
    name: 'name',
    label: 'Nama',
    type: 'text',
    grid: { default: 24, md: 12, xl: 8 }, // 100% mobile, 50% medium, 33% xl
  },
]
```

### Value dari Data yang Di-fetch (Mode Edit)

```ts
const columns = [
  {
    name: 'category_id',
    label: 'Kategori',
    type: 'select',
    // Saat edit, baca id dari relasi nested
    value: () => 'category.id',
    select: { url: '/api/categories' },
  },
]
```

### Field dengan Upload

```ts
const columns = [
  {
    name: 'avatar',
    label: 'Foto',
    type: 'upload',
    upload: { url: '/api/upload/avatar' },
  },
]
```

### Validasi

```vue
<template>
  <ComForm url="/api/users" :columns="columns" :rules="rules" />
</template>

<script setup lang="ts">
import type { FormRules } from 'element-plus'
import { ComForm } from 'vue-instant'

const rules: FormRules = {
  name: [{ required: true, message: 'Nama wajib diisi', trigger: 'blur' }],
  email: [
    { required: true, message: 'Email wajib diisi', trigger: 'blur' },
    { type: 'email', message: 'Format email tidak valid', trigger: 'blur' },
  ],
}
</script>
```

### Slot Custom

```vue
<template>
  <ComForm url="/api/items" :columns="columns">
    <!-- override tombol submit -->
    <template #buttonStore>
      <el-button type="primary" native-type="submit">Kirim Data</el-button>
    </template>

    <!-- slot untuk kolom bertipe 'slot' -->
    <template #custom_field="{ form }">
      <el-input v-model="form.custom_field" placeholder="Custom input" />
    </template>
  </ComForm>
</template>
```
