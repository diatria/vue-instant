# Analisis & Rekomendasi Improvement

## Summary

Setelah menganalisis code di `src/components/`, ditemukan beberapa area untuk improvement dalam hal maintainability, consistency, performance, dan code quality.

---

## 🔴 High Priority Issues

### 1. **Deprecated HTTP Functions** (ComForm.vue)
**File:** `src/components/ComForm.vue`

ComForm masih menggunakan fungsi HTTP yang sudah deprecated:
- `httpGet` (line 111)
- `httpPost` (line 211)
- `httpPut` (line 234)

**Rekomendasi:**
```ts
// Ganti dari:
httpGet(...).then(...).catch(...)

// Menjadi:
new HttpBuilder().get(...).then(...).catch(...)
```

**Dampak:** Bug fix dan maintenance lebih mudah; konsistensi dengan ComTable yang sudah pakai `HttpBuilder`.

---

### 2. **Code Duplication: Form Fields**
**File:** `src/components/ComForm.vue` (lines 295-432) & `src/components/ComFilter.vue` (lines 70-180)

Kedua komponen **render field yang sama** (text, textarea, select, radio, checkbox, date, time, dll) dengan kode yang identik.

**Dampak:**
- Maintenance nightmare — bug fix di satu tempat lupa di tempat lain
- ~150 lines duplikasi
- Sulit menambah tipe field baru

**Rekomendasi:**
Ekstrak ke component terpisah:
```vue
<!-- src/components/FormField.vue -->
<script setup>
defineProps<{
  column: ComFormColumn
  modelValue: any
  // ...
}>()

const emit = defineEmits(['update:modelValue', 'change'])
</script>

<template>
  <!-- semua logic render field di sini -->
</template>
```

Kemudian gunakan di ComForm dan ComFilter:
```vue
<FormField
  :column="column"
  v-model="form[column.name]"
  @change="(val) => onChange(column, val)"
/>
```

---

### 3. **Type Inconsistency & Fragmentation**
**File:** `src/components/ComForm.vue` (lines 25-70) & `src/types/intertype.d.ts`

Tipe-tipe didefinisikan di dua tempat:
- `ColumnType`, `ColumnSelect`, `Column` didefinisikan **local** di ComForm.vue
- Tapi `ComFormColumn` ada di `types/intertype.d.ts`

**Dampak:**
- Inkonsistensi naming (ColumnSelect vs select property)
- Hard to discover types
- Import paths yang confusing

**Rekomendasi:**
Pindahkan semua tipe ke `src/types/intertype.d.ts`:
```ts
// ColumnSelect → ComFormColumnSelect
export interface ComFormColumnSelect {
  options?: Array<unknown>
  url?: string
  field_label?: string | ((row: Record<string, unknown>) => string)
  // ...
}

// Export ColumnType ke public API juga
export type ComFormColumnType = 'text' | 'textarea' | ...
```

---

### 4. **v-model Sync Issues in ComSelect**
**File:** `src/components/ComSelect.vue`

```ts
const value = ref('')  // Line 25 — lokal state

// Emit @ line 86 tapi tidak two-way binding dengan prop modelValue
@change="(val: any) => emit('update:modelValue', val)"
```

**Masalah:**
- Parent component set `v-model="selectedId"` tapi ComSelect internal `value` ref tidak ter-update
- onChange emits ke parent tapi internal state tidak sinkron

**Rekomendasi:**
```ts
// Gunakan computed dengan getter/setter
const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

// Atau watch:
watch(() => props.modelValue, (newVal) => {
  value.value = newVal
})
```

---

### 5. **No Loading State in ComForm Submit**
**File:** `src/components/ComForm.vue`

Saat form di-submit (line 211, 234), tidak ada loading indicator.

**Dampak:** User dapat menekan tombol "Simpan" berkali-kali → multiple requests.

**Rekomendasi:**
```ts
const loading = ref(false)

async function store() {
  if (loading.value) return  // prevent duplicate submissions
  loading.value = true
  try {
    await submitAllUploads()
    await httpPost(...)
  } finally {
    loading.value = false
  }
}
```

```vue
<el-button @click="store" :loading="loading" type="primary">
  Simpan
</el-button>
```

---

### 6. **Hardcoded UI Text (No i18n)**
**File:** Semua komponen

UI text seperti "Batal", "Simpan", "Perbaharui", "Filter", dll adalah hardcoded dalam Bahasa Indonesia.

**Dampak:** Tidak flexible untuk multi-language; sulit untuk customization.

**Rekomendasi:**
Buat composable atau constants untuk i18n:
```ts
// src/composables/useI18n.ts
export const formLabels = {
  save: 'Simpan',
  update: 'Perbaharui',
  cancel: 'Batal',
  // ...
}

// atau gunakan vue-i18n
import { $t } from 'vue-i18n'
```

---

## 🟡 Medium Priority Issues

### 7. **Commented Code**
**File:** `src/components/ComTable.vue` (lines 72-73)

```ts
// dataSelected.value = values
// emits('tableSelections', values)
```

**Rekomendasi:** Hapus atau jelaskan alasan commented code.

---

### 8. **Missing Prop Validation**
**File:** `src/components/ComForm.vue` & `ComTable.vue`

Props seperti `url` tidak divalidasi saat development.

**Rekomendasi:**
```ts
const props = defineProps<ComFormProps>()

// Add validation:
if (process.env.NODE_ENV === 'development') {
  if (!props.url) {
    console.warn('[ComForm] props.url is required')
  }
}
```

---

### 9. **Missing Error States for Upload**
**File:** `src/components/ComForm.vue` (lines 407-429)

Upload element tidak handle upload errors properly.

**Rekomendasi:**
```vue
<!-- Add error feedback -->
<el-upload
  @error="(err) => handleUploadError(err, column)"
  @success="(res) => handleUploadSuccess(res, column)"
/>
```

---

### 10. **No Pagination Memory**
**File:** `src/components/ComTable.vue`

Saat refresh atau filter applied, pagination reset ke page 1 tapi tidak ada state management. User experience kurang seamless.

**Rekomendasi:** Pertahankan current page state atau provide prop untuk custom pagination behavior.

---

### 11. **Type Misalignment in ComSelect**
**File:** `src/components/ComSelect.vue`

Collections ref typed as:
```ts
const collections = ref<Array<Record<string, never>>>([])
```

Tapi seharusnya `Record<string, any>` atau lebih specific type.

---

### 12. **No Reactive Props Change Handling**
**File:** `src/components/ComSelect.vue`

Jika `props.options` berubah dari parent, komponen tidak re-fetch atau update collections.

**Rekomendasi:**
```ts
watch(() => props.options, (newOptions) => {
  if (newOptions) {
    collections.value = newOptions
  }
})
```

---

### 13. **FormField Ref Handling Issue**
**File:** `src/components/ComForm.vue` (lines 410-413)

```ts
:ref="(el: any) => {
  if (el) uploadRefs[column.name] = el as any
}"
```

Overuse of `any` type. Bisa lebih type-safe.

---

### 14. **Missing Upload Error Validation**
**File:** `src/components/ComForm.vue`

submitAllUploads() tidak handle actual upload errors dari server.

---

## 🟢 Low Priority / Nice to Have

### 15. **Extractable Logic: Grid Calculation**

Function `columnGrid()` duplikasi di ComForm & ComFilter. Bisa diganti dengan utility function di helpers.

```ts
// src/utils/helpers.ts
export function resolveColumnGrid(
  grid: number | Record<string, number>,
  breakpoint?: 'default' | 'sm' | 'md' | 'lg' | 'xl'
): number
```

---

### 16. **Missing JSDoc Comments**

Komponen-komponen tidak punya JSDoc yang menjelaskan props, emits, behavior.

---

### 17. **Performance: Large Table Datasets**

ComTable tidak optimize untuk 1000+ rows (no virtual scrolling). Tapi mungkin tidak priority sekarang.

---

### 18. **Better Error Messages**

httpHandleError saat ini hanya redirect ke `/403`. Bisa lebih granular error handling.

---

## 📋 Rekomendasi Action Items (Priority Order)

| # | Issue | Priority | Effort | Impact |
|---|---|---|---|---|
| 1 | Migrate ComForm ke HttpBuilder | 🔴 High | Low | Medium |
| 2 | Extract FormField component | 🔴 High | Medium | High |
| 3 | Centralize types di intertype.d.ts | 🔴 High | Low | High |
| 4 | Fix v-model sync in ComSelect | 🔴 High | Low | Medium |
| 5 | Add loading state to ComForm submit | 🔴 High | Low | High |
| 6 | Remove/explain commented code | 🟡 Medium | Very Low | Low |
| 7 | Watch props.options in ComSelect | 🟡 Medium | Low | Medium |
| 8 | Better upload error handling | 🟡 Medium | Low | Medium |
| 9 | Internationalize UI text | 🟡 Medium | Medium | Medium |
| 10 | Extract columnGrid utility | 🟢 Low | Low | Low |

---

## Implementation Strategy

**Phase 1 (Quick wins — 2-3 jam):**
1. Migrate ComForm ke HttpBuilder
2. Centralize types
3. Fix v-model sync in ComSelect
4. Add loading state to ComForm

**Phase 2 (Code refactoring — 4-5 jam):**
5. Extract FormField component
6. Remove commented code
7. Watch props.options

**Phase 3 (Enhancements — 3-4 jam):**
8. Upload error handling
9. i18n setup
10. Extract utilities
