# ComSelect

Dropdown select cerdas yang dapat mengambil opsi dari API atau menggunakan daftar statis, dengan dukungan remote search.

## Penggunaan

### Dari API

```vue
<template>
  <ComSelect
    v-model="selectedId"
    url="/api/categories"
    field-label="name"
    field-value="id"
    placeholder="Pilih Kategori"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ComSelect } from 'vue-instant'

const selectedId = ref(null)
</script>
```

### Dari Daftar Statis

```vue
<template>
  <ComSelect
    v-model="selectedStatus"
    :options="statusOptions"
    field-label="label"
    field-value="value"
    placeholder="Pilih Status"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ComSelect } from 'vue-instant'

const selectedStatus = ref(null)
const statusOptions = [
  { value: 'active', label: 'Aktif' },
  { value: 'inactive', label: 'Tidak Aktif' },
]
</script>
```

### Remote Search

```vue
<template>
  <ComSelect
    v-model="selectedUser"
    url="/api/users"
    field-label="name"
    field-value="id"
    field-search-column="name"
    :remote="true"
    :fetch-on-click="false"
    placeholder="Cari pengguna..."
  />
</template>
```

### Label Dinamis

Gunakan fungsi untuk `fieldLabel` ketika label perlu dibangun dari beberapa kolom:

```vue
<ComSelect
  v-model="selectedItem"
  url="/api/items"
  :field-label="(row) => `${row.code} - ${row.name}`"
  field-value="id"
/>
```

## Props

| Prop | Tipe | Default | Deskripsi |
|---|---|---|---|
| `modelValue` | `any` | — | Nilai yang dipilih (gunakan `v-model`) |
| `url` | `string` | — | URL API untuk mengambil opsi |
| `options` | `Array<unknown>` | — | Daftar opsi statis (alternatif dari `url`) |
| `fieldLabel` | `string \| ((row) => string)` | `'name'` | Key atau fungsi untuk mendapatkan label opsi |
| `fieldValue` | `string` | `'id'` | Key untuk mendapatkan nilai opsi |
| `fieldSearchColumn` | `string` | sama dengan `fieldLabel` | Kolom yang digunakan untuk pencarian remote |
| `placeholder` | `string` | `'Select'` | Teks placeholder |
| `placement` | `string` | `'bottom'` | Posisi dropdown |
| `disabled` | `boolean` | — | Nonaktifkan select |
| `fetchOnClick` | `boolean` | `true` | Auto-fetch saat komponen dimount |
| `remote` | `boolean` | — | Aktifkan pencarian server-side |

## Emits

| Event | Payload | Deskripsi |
|---|---|---|
| `update:modelValue` | `any` | Dipancarkan saat pilihan berubah |

## Exposed Methods

| Method | Signature | Deskripsi |
|---|---|---|
| `changeCollection` | `(values: unknown[]) => void` | Set daftar opsi secara programatik |
| `fetchingDataFromServer` | `(search?: string) => void` | Trigger fetch data (dengan opsi filter pencarian) |
