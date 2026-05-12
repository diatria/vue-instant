# ComFilter

Panel filter berupa drawer yang muncul dari kanan. Menggunakan definisi kolom yang sama dengan `ComForm`.

> **Catatan:** `ComFilter` tidak diekspor dari entri utama `vue-instant`. Import langsung dari file komponennya jika dibutuhkan.

## Penggunaan

```vue
<template>
  <ComFilter
    :columns="filterColumns"
    @on-submit="handleFilter"
    @on-reset="handleReset"
  />
</template>

<script setup lang="ts">
import ComFilter from 'vue-instant/src/components/ComFilter.vue'

const filterColumns = [
  { name: 'name', label: 'Nama', type: 'text' },
  { name: 'status', label: 'Status', type: 'select', select: { url: '/api/statuses' } },
  { name: 'created_at', label: 'Tanggal', type: 'date' },
]

function handleFilter(form) {
  console.log('Filter diterapkan:', form)
}

function handleReset() {
  console.log('Filter direset')
}
</script>
```

## Props

| Prop | Tipe | Wajib | Deskripsi |
|---|---|---|---|
| `columns` | `ComFormColumn[]` | Ya | Definisi field filter yang akan ditampilkan |

Lihat [tipe `ComFormColumn`](../types.md#comformcolumn) untuk detail definisi kolom.

## Emits

| Event | Payload | Deskripsi |
|---|---|---|
| `cancel` | — | Pengguna menutup drawer tanpa submit |
| `onSubmit` | — | Pengguna menekan tombol "Filter" |
| `onReset` | — | Pengguna menekan tombol "Reset" |
| `form` | `Record<string, unknown>` | State form terkini, dipancarkan setiap ada perubahan |
| `onChangeItem` | `{ column, value }` | Kolom dan nilai yang baru saja berubah |

## Exposed Methods

| Method | Deskripsi |
|---|---|
| `reEmitForm()` | Paksa re-emit state form saat ini via event `form` |

## Tipe Field yang Didukung

Sama dengan `ComForm`, kecuali `upload`:

`text`, `textarea`, `select`, `radio`, `password`, `switch`, `checkbox:label`, `checkbox`, `date`, `date-time`, `time`, `slot`, `slot:el-form-item`, `hide`
