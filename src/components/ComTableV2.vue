<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { Pagination, Query } from '../types'
import { Delete, Edit, MoreFilled, Plus, View } from '@element-plus/icons-vue'
import { httpHandleError, resolveUrl } from '../utils/helpers'
import { HttpBuilder } from '../utils/http'

type Row = Record<string, unknown>
type RowWithId = Row & { id: number | string }
type Column = {
  field: string
  label: string
  value?: string | ((row: Row) => unknown)
  type?: 'slot'
  width?: string
  align?: 'left' | 'center' | 'right'
}

const props = withDefaults(
  defineProps<{
    url: string
    columns: Column[]
    title?: string
    description?: string
    header?: boolean
    toolbarShow?: boolean
    paginationShow?: boolean
    selectionShow?: boolean
    buttonCreateUrl?: () => RouteLocationRaw
    buttonEditUrl?: (row: RowWithId) => RouteLocationRaw
    buttonViewUrl?: (row: RowWithId) => RouteLocationRaw
    buttonMoreFieldShow?: boolean
    buttonDeleteShow?: boolean
    deleteUrl?: string
    permission?: { buttonCreate?: string; buttonDelete?: string; buttonEdit?: string }
    setRelations?: string[]
    setRelationsCount?: string[]
    setColumns?: string[]
    setQueries?: Query['queries']
    setOrder?: string
    settings?: { disableOnMount?: boolean }
    style?: { popOverWidth?: number }
  }>(),
  {
    header: true,
    toolbarShow: true,
    paginationShow: true,
    selectionShow: true,
    buttonMoreFieldShow: true,
    buttonDeleteShow: true,
  },
)

const emit = defineEmits<{
  onReady: [rows: Row[]]
  tableSelections: [ids: Array<number | string>]
  tableSelectionRaw: [rows: RowWithId[]]
}>()

const http = new HttpBuilder()
const tableRef = ref()
const rows = ref<Row[]>([])
const selectedRows = ref<RowWithId[]>([])
const loading = ref(false)
const deleteConfirmationVisible = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const pageSizes = [10, 25, 50, 75, 100]
const hasSelection = computed(() => selectedRows.value.length > 0)

function columnValue(column: Column, row: Row) {
  if (typeof column.value === 'function') return column.value(row)

  const path = typeof column.value === 'string' ? column.value : column.field
  return path.split('.').reduce<unknown>((value, key) => {
    if (value === null || value === undefined || typeof value !== 'object') return undefined
    return (value as Record<string, unknown>)[key]
  }, row)
}

async function fetchRows() {
  loading.value = true
  try {
    const response = await http.get<{ data: Pagination<Row> }>(resolveUrl(props.url), {
      params: {
        relations: props.setRelations,
        relations_count: props.setRelationsCount,
        columns: props.setColumns,
        pagination_length: pageSize.value,
        page: currentPage.value,
        queries: props.setQueries,
        order: props.setOrder,
      },
    })

    rows.value = response.data.data.data
    total.value = response.data.data.total
    emit('onReady', rows.value)
  } catch (error) {
    httpHandleError(error)
  } finally {
    loading.value = false
  }
}

function handleSelectionChange(value: RowWithId[]) {
  selectedRows.value = value
  emit('tableSelections', value.map(({ id }) => id))
  emit('tableSelectionRaw', value)
}

function changeSelection(ids: Array<number | string>) {
  ids.forEach((id) => tableRef.value?.toggleRowSelection({ id }))
}

function requestDelete() {
  if (!props.deleteUrl) throw new Error("Props 'delete-url' belum diinisialisasi")
  deleteConfirmationVisible.value = true
}

async function remove() {
  if (!props.deleteUrl || !hasSelection.value) return
  try {
    await http.delete(resolveUrl(props.deleteUrl), {
      data: { id: selectedRows.value.map(({ id }) => id) },
    })
    deleteConfirmationVisible.value = false
    selectedRows.value = []
    await fetchRows()
  } catch (error) {
    httpHandleError(error)
  }
}

function changePage() {
  fetchRows()
}

onMounted(() => {
  if (props.settings?.disableOnMount) loading.value = false
  else fetchRows()
})

defineExpose({ changeSelection, refresh: fetchRows, remove })
</script>

<template>
  <section>
    <header v-if="props.header" class="flex justify-between border-b border-[#ebeef5] p-4">
      <slot name="title">
        <div>
          <h2 class="text-xl font-bold">{{ props.title }}</h2>
          <p class="text-sm text-gray-400">{{ props.description }}</p>
        </div>
      </slot>

      <div v-if="props.toolbarShow" class="flex justify-end gap-4">
        <slot name="toolbar-1" />
        <RouterLink v-if="props.buttonCreateUrl" v-can="props.permission?.buttonCreate" :to="props.buttonCreateUrl()">
          <el-button :icon="Plus" type="primary">Tambah</el-button>
        </RouterLink>
        <slot name="toolbar-2" />
        <el-button
          v-if="!$slots.buttonDelete && hasSelection && props.buttonDeleteShow"
          v-can="props.permission?.buttonDelete"
          :icon="Delete"
          class="m-0!"
          type="danger"
          @click="requestDelete"
        >Hapus</el-button>
        <slot name="buttonDelete" />
        <slot name="toolbar-3" />
        <slot name="toolbar-4" />
      </div>
    </header>

    <el-table ref="tableRef" v-loading="loading" :data="rows" row-key="id" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column v-if="props.selectionShow" fixed="left" type="selection" width="55" />
      <el-table-column
        v-for="column in props.columns"
        :key="column.field"
        :align="column.align ?? 'left'"
        :label="column.label"
        :prop="column.field"
        :width="column.width"
      >
        <template #default="scope">
          <slot v-if="column.type === 'slot'" :name="column.field" :row="scope.row" />
          <template v-else>{{ columnValue(column, scope.row) }}</template>
        </template>
      </el-table-column>

      <el-table-column v-if="props.buttonMoreFieldShow" fixed="right" width="55">
        <template #default="scope">
          <el-popover placement="bottom" :width="props.style?.popOverWidth ?? 150" popper-class="!p-0" trigger="click">
            <template #reference><el-button :icon="MoreFilled" link /></template>
            <ul>
              <RouterLink v-if="props.buttonViewUrl" :to="props.buttonViewUrl(scope.row)" target="_blank"><li class="flex items-center px-4 py-2 hover:bg-slate-100"><el-icon><View /></el-icon><span class="ml-2">Lihat</span></li></RouterLink>
              <RouterLink v-if="props.buttonEditUrl" v-can="props.permission?.buttonEdit" :to="props.buttonEditUrl(scope.row)"><li class="flex items-center px-4 py-2 hover:bg-slate-100"><el-icon><Edit /></el-icon><span class="ml-2">Ubah</span></li></RouterLink>
              <slot name="action" :row="scope.row" />
            </ul>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <footer class="flex justify-end gap-4 p-4">
      <slot name="footer-1" />
      <el-pagination v-if="props.paginationShow" v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="pageSizes" :total="total" layout="sizes, total, prev, pager, next" @change="changePage" />
      <slot name="footer-2" />
    </footer>

    <el-dialog v-model="deleteConfirmationVisible" title="Konfirmasi" width="500">
      <span>Anda yakin ingin menghapus data yang Anda pilih?</span>
      <template #footer><div class="dialog-footer"><el-button @click="deleteConfirmationVisible = false">Batal</el-button><el-button type="primary" @click="remove">Konfirmasi</el-button></div></template>
    </el-dialog>
  </section>
</template>
