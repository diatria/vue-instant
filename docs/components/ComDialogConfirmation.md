# ComDialogConfirmation

Dialog konfirmasi yang dapat digunakan kembali menggunakan `el-dialog` dari Element Plus.

## Penggunaan

```vue
<template>
  <el-button @click="showDialog = true">Hapus</el-button>

  <ComDialogConfirmation
    v-model="showDialog"
    message="Apakah Anda yakin ingin menghapus data ini?"
    @on-confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ComDialogConfirmation } from 'vue-instant'

const showDialog = ref(false)

function handleConfirm() {
  // lakukan aksi setelah konfirmasi
  showDialog.value = false
}
</script>
```

## Props

| Prop | Tipe | Wajib | Deskripsi |
|---|---|---|---|
| `message` | `string` | Ya | Teks pesan yang ditampilkan di dalam dialog |
| `modelValue` | `boolean` | Ya | Kontrol visibilitas dialog (gunakan `v-model`) |

## Emits

| Event | Payload | Deskripsi |
|---|---|---|
| `update:modelValue` | `boolean` | Dipancarkan saat dialog ditutup (tombol Batal) |
| `onConfirm` | — | Dipancarkan saat pengguna menekan tombol Konfirmasi |
