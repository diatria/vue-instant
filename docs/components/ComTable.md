# ComTable

Tabel data dengan pagination, seleksi baris, dialog konfirmasi hapus, dan menu aksi per baris.

## Penggunaan

### Dasar

```vue
<template>
  <ComTable
    url="/api/users"
    title="Pengguna"
    description="Daftar seluruh pengguna"
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
  { field: 'created_at', label: 'Dibuat Pada', width: '160px' },
]
</script>
```

### Dengan Action Kustom di Popover

```vue
<template>
  <ComTable
    url="/api/orders"
    title="Pesanan"
    :columns="columns"
    :button-edit-url="(row) => ({ name: 'orders.edit', params: { id: row.id } })"
    :style="{ popOverWidth: 180 }"
  >
    <template #action="{ row }">
      <el-button link type="primary" @click="viewDetail(row)">
        Lihat Detail
      </el-button>
    </template>
  </ComTable>
</template>
```

### Dengan Filter Queries Statis

```vue
<template>
  <ComTable
    url="/api/products"
    title="Produk Aktif"
    :columns="columns"
    :set-queries="[{ field: 'status', value: 'active', strict: true }]"
    :set-relations="['category']"
    :set-order="'created_at:desc'"
  />
</template>
```

### Kolom dengan Slot Kustom

```vue
<template>
  <ComTable url="/api/users" :columns="columns">
    <template #status="{ row }">
      <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
        {{ row.status }}
      </el-tag>
    </template>
  </ComTable>
</template>

<script setup lang="ts">
import { ComTable } from 'vue-instant'

const columns = [
  { field: 'name', label: 'Nama' },
  { field: 'status', label: 'Status', type: 'slot' }, // gunakan slot #status
]
</script>
```

## Props

| Prop | Tipe | Default | Deskripsi |
|---|---|---|---|
| `url` | `string` | — | URL API untuk mengambil data (paginated) |
| `columns` | `Column[]` | — | Definisi kolom tabel |
| `title` | `string` | — | Judul header tabel |
| `description` | `string` | — | Subjudul header tabel |
| `deleteUrl` | `string` | — | URL untuk bulk delete (mengirim `DELETE` dengan `{ id: [] }`) |
| `buttonCreateUrl` | `() => RouteLocationRaw` | — | Router link untuk tombol "Tambah" |
| `buttonEditUrl` | `(row) => RouteLocationRaw` | — | Router link untuk aksi "Edit" per baris |
| `buttonViewUrl` | `(row) => RouteLocationRaw` | — | Router link untuk aksi "Lihat" per baris (buka di tab baru) |
| `buttonMoreFieldShow` | `boolean` | `true` | Tampilkan/sembunyikan popover aksi per baris |
| `buttonFilterShow` | `boolean` | `true` | Tampilkan/sembunyikan tombol filter |
| `buttonDeleteShow` | `boolean` | `true` | Tampilkan/sembunyikan tombol hapus massal |
| `paginationShow` | `boolean` | `true` | Tampilkan/sembunyikan pagination |
| `toolbarShow` | `boolean` | `true` | Tampilkan/sembunyikan area toolbar |
| `setRelations` | `string[]` | — | Relasi yang di-eager-load dari API |
| `setColumns` | `string[]` | — | Kolom yang dipilih dari API |
| `setQueries` | `Query['queries']` | — | Filter query statis yang selalu dikirim |
| `setOrder` | `string` | — | String pengurutan, contoh: `'created_at:desc'` |
| `style.popOverWidth` | `number` | `150` | Lebar popover aksi per baris |

## Definisi Kolom (`Column`)

| Field | Tipe | Deskripsi |
|---|---|---|
| `field` | `string` | Key data (nama properti dari row) |
| `label` | `string` | Header kolom yang ditampilkan |
| `value` | `(row) => string` | Fungsi render kustom untuk sel |
| `type` | `'slot'` | Gunakan named slot untuk konten sel |
| `width` | `string` | Lebar kolom, contoh: `'120px'` |
| `align` | `'left' \| 'center' \| 'right'` | Perataan teks kolom |

## Emits

| Event | Payload | Deskripsi |
|---|---|---|
| `onReady` | `data[]` | Dipancarkan setelah data pertama berhasil dimuat |
| `tableSelections` | `number[]` | Dipancarkan saat seleksi baris berubah, berisi array ID |

## Exposed Methods

| Method | Signature | Deskripsi |
|---|---|---|
| `changeSelection` | `(values: number[]) => void` | Set seleksi baris secara programatik |
| `refresh` | `() => void` | Re-fetch data dari server |
| `remove` | `() => void` | Tampilkan dialog konfirmasi hapus / lakukan penghapusan |

## Slots

| Slot | Scoped | Deskripsi |
|---|---|---|
| `#title` | — | Custom area judul |
| `#toolbar-1` | — | Titik injeksi toolbar kiri pertama |
| `#toolbar-2` | — | Titik injeksi toolbar kiri kedua |
| `#toolbar-3` | — | Titik injeksi toolbar kanan pertama |
| `#toolbar-4` | — | Titik injeksi toolbar kanan kedua |
| `#buttonDelete` | — | Tombol hapus kustom |
| `#action` | `{ row }` | Item aksi di dalam popover per baris |
| `#[column.field]` | `{ row }` | Untuk kolom `type: 'slot'` |

## Parameter API yang Dikirim

Setiap request ke `url` akan menyertakan parameter berikut:

```
relations, columns, pagination_length, page, queries, order
```

Format ini kompatibel dengan [laravel-instant](https://github.com/diatria/laravel-instant).

## Contoh `refresh` Programatik

```vue
<template>
  <el-button @click="tableRef.refresh()">Refresh</el-button>
  <ComTable ref="tableRef" url="/api/data" :columns="columns" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ComTable } from 'vue-instant'

const tableRef = ref()
const columns = [{ field: 'name', label: 'Nama' }]
</script>
```
