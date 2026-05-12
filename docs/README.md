# vue-instant

Reusable Vue 3 components dan JS helpers untuk integrasi dengan [laravel-instant](https://github.com/diatria/laravel-instant).

## Daftar Isi

- [Instalasi & Setup](./getting-started.md)
- **Komponen**
  - [ComContainer](./components/ComContainer.md)
  - [ComDialogConfirmation](./components/ComDialogConfirmation.md)
  - [ComFilter](./components/ComFilter.md)
  - [ComForm](./components/ComForm.md)
  - [ComSelect](./components/ComSelect.md)
  - [ComTable](./components/ComTable.md)
- **Utilitas**
  - [Helpers](./utils/helpers.md)
  - [HttpBuilder](./utils/http.md)
- [Tipe Data](./types.md)

## Gambaran Umum

`vue-instant` menyediakan komponen UI siap pakai yang terhubung langsung ke API yang dibangun dengan `laravel-instant`. Komponen seperti `ComTable` dan `ComForm` otomatis melakukan request HTTP, menangani pagination, validasi, dan upload file — tanpa konfigurasi tambahan.

### Peer Dependencies

Package ini membutuhkan dependensi berikut yang harus dipasang sendiri:

| Package | Versi |
|---|---|
| `vue` | `^3.0.0` |
| `element-plus` | `^2.9.11` |
| `axios` | `^1.9.0` |
| `vue-router` | `^4.5.1` |
| `dayjs` | `^1.11.13` |
| `lodash` | `^4.17.21` |

## API Publik

Yang diekspor dari `vue-instant`:

**Komponen:** `ComContainer`, `ComDialogConfirmation`, `ComForm`, `ComSelect`, `ComTable`

**Config:** `setAppConfig`, `getAppConfig`

**Helpers:** Semua fungsi dari `utils/helpers` (lihat [Helpers](./utils/helpers.md))

> **Catatan:** `ComFilter` tidak diekspor dari entri utama. Import langsung jika dibutuhkan:
> ```ts
> import ComFilter from 'vue-instant/src/components/ComFilter.vue'
> ```
