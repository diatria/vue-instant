# ComContainer

Wrapper layout sederhana yang membatasi lebar konten secara responsif.

## Penggunaan

```vue
<template>
  <ComContainer>
    <p>Konten di sini akan dibatasi lebarnya secara responsif.</p>
  </ComContainer>
</template>

<script setup lang="ts">
import { ComContainer } from 'vue-instant'
</script>
```

## Perilaku

Komponen ini merender elemen `<div>` dengan kelas Tailwind:
- `mx-auto` — horizontal center
- `h-full` — tinggi penuh
- `xl:w-3/4` — lebar 75% pada layar XL
- `lg:w-1/2` — lebar 50% pada layar LG

## Props

Tidak ada props. Hanya menggunakan `<slot>` default.

## Slots

| Slot | Deskripsi |
|---|---|
| `default` | Konten yang akan dibungkus |
