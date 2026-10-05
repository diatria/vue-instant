# ComForm2

`ComForm2` adalah komponen form Vue 3 untuk membuat dan mengubah data melalui API. Komponen ini menginisialisasi nilai form dari `columns`, memuat data saat `id` tersedia, menjalankan validasi Element Plus, serta mengirim `POST` atau `PUT` secara otomatis.

## Penggunaan

### Form create

```vue
<template>
  <ComForm2 url="/api/products" :columns="columns" :rules="rules" @on-stored="handleStored" @back="router.back()" />
</template>

<script setup lang="ts">
import type { FormRules } from 'element-plus';
import { ComForm2 } from 'vue-instant';
import { useRouter } from 'vue-router';

const router = useRouter();
const columns = [
  { name: 'name', label: 'Nama Produk', type: 'text', grid: 12 },
  { name: 'description', label: 'Deskripsi', type: 'textarea', grid: 24 },
];
const rules: FormRules = {
  name: [{ required: true, message: 'Nama wajib diisi', trigger: 'blur' }],
};

function handleStored(data: unknown) {
  router.push({ name: 'products.index' });
}
</script>
```

### Form edit

Tambahkan `id` untuk memuat data melalui `GET` dan mengirim perubahan melalui `PUT`.

```vue
<template>
  <ComForm2 url="/api/products" :id="productId" :columns="columns" @on-updated="handleUpdated" />
</template>

<script setup lang="ts">
import { ComForm2 } from 'vue-instant';

const productId = 10;
const columns = [
  { name: 'name', label: 'Nama Produk', type: 'text' },
  { name: 'category_id', label: 'Kategori', type: 'select', select: { url: '/api/categories' } },
];

function handleUpdated(data: unknown) {
  console.log('Produk diperbarui', data);
}
</script>
```

## Props

Selain props dasar form, `ComForm2` menyediakan prop berikut:

| Prop          | Tipe                      | Wajib | Default | Deskripsi                                    |
| ------------- | ------------------------- | ----: | ------: | -------------------------------------------- |
| `url`         | `string`                  |    Ya |       — | Base URL untuk request API                   |
| `columns`     | `ComFormColumn[]`         |    Ya |       — | Definisi field form                          |
| `id`          | `number \| string`        | Tidak |       — | Mengaktifkan mode edit                       |
| `title`       | `string`                  | Tidak |       — | Judul form                                   |
| `description` | `string`                  | Tidak |       — | Deskripsi form                               |
| `fetchUrl`    | `string`                  | Tidak |   `url` | URL khusus untuk GET mode edit               |
| `storeUrl`    | `string`                  | Tidak |   `url` | URL khusus untuk POST/PUT                    |
| `paramsUrl`   | `string`                  | Tidak |       — | Query string yang ditambahkan ke URL simpan  |
| `queries`     | `Record<string, unknown>` | Tidak |       — | Parameter request saat memuat data           |
| `relations`   | `string[]`                | Tidak |       — | Relasi yang diminta saat memuat data         |
| `rules`       | `FormRules`               | Tidak |       — | Aturan validasi Element Plus                 |
| `showActions` | `boolean`                 | Tidak |  `true` | Tampilkan tombol Batal dan Simpan/Perbaharui |

Tipe kolom yang didukung meliputi `text`, `textarea`, `password`, `select`, `radio`, `checkbox`, `checkbox:label`, `switch`, `date`, `date-time`, `time`, `upload`, `slot`, `slot:el-form-item`, dan `hide`. Definisi lengkap `ComFormColumn` tersedia di [Tipe Data](../types.md).

## Events

| Event          | Payload                   | Deskripsi                              |
| -------------- | ------------------------- | -------------------------------------- |
| `back`         | —                         | Tombol Batal diklik                    |
| `onStored`     | `unknown`                 | POST berhasil                          |
| `onUpdated`    | `unknown`                 | PUT berhasil                           |
| `form`         | `Record<string, unknown>` | State form setelah dimuat atau berubah |
| `onChangeItem` | `{ column, value }`       | Satu field berubah                     |
| `loadError`    | `unknown`                 | Gagal memuat data edit                 |

## Slot dan tombol aksi

Gunakan `showActions="false"` jika tombol dikelola oleh parent. Slot `buttonStore` menerima `loading` dan `submit` sehingga tombol custom tetap dapat menjalankan submit bawaan.

```vue
<ComForm2 url="/api/products" :columns="columns" :show-actions="false">
  <template #buttonStore="{ loading, submit }">
    <el-button type="primary" :loading="loading" @click="submit">Simpan Produk</el-button>
  </template>
</ComForm2>
```

Untuk kolom bertipe `slot`, gunakan slot bernama sesuai `column.name`; slot menerima `{ form }`. Kolom `slot:el-form-item` menggantikan seluruh `el-form-item`.

## Exposed methods

Dengan template ref, parent dapat mengakses `form`, `loading`, `initializeForm()`, dan `submit()`.

```ts
const formRef = ref<InstanceType<typeof ComForm2>>();
formRef.value?.submit();
```
