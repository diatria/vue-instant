<script lang="ts" setup>
import type { Pagination, Query } from '../types'
import type { RouteLocationRaw } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { httpHandleError, resolveUrl } from '../utils/helpers'
import { Delete, Edit, MoreFilled, Plus, View } from '@element-plus/icons-vue'
import { HttpBuilder } from '../utils/http'

const emits = defineEmits(['onReady', 'tableSelections'])
const props = withDefaults(
  defineProps<{
    buttonCreateUrl?: () => RouteLocationRaw
    buttonEditUrl?: (row: { id: number | string }) => RouteLocationRaw
    buttonViewUrl?: (row: { id: number | string }) => RouteLocationRaw
    buttonMoreFieldShow?: boolean
    buttonFilterShow?: boolean
    buttonDeleteShow?: boolean
    columns: Array<{
      field: string
      label: string
      value?: unknown
      type?: 'slot'
      width?: string
      align?: 'left' | 'center' | 'right'
    }>
    deleteUrl?: string
    description?: string
    paginationShow?: boolean
    setRelations?: Array<string>
    setColumns?: Array<string>
    setQueries?: Query['queries']
    setOrder?: string
    style?: {
      popOverWidth: number
    }
    toolbarShow?: boolean
    title?: string
    url: string
  }>(),
  {
    buttonMoreFieldShow: true,
    buttonFilterShow: true,
    buttonDeleteShow: true,
    paginationShow: true,
    toolbarShow: true,
  },
)

const data = ref<Array<Record<string, unknown>>>([])
const dataSelected = ref<Array<unknown>>([])
const dialogDeleteConfirmation = ref<boolean>()
const currentPage = ref(1)
const http = new HttpBuilder()
const loading = ref(true)
const pageSize = ref(10)
const tableRef = ref()
const totalData = ref(0)

const state = reactive<{ data: unknown; collection: { data: Record<string, unknown>[] } }>({
  data: {},
  collection: {
    data: [],
  },
})

// Methods
function changePage() {
  fetchingDataFromServer()
}

function changeSelection(values: number[]) {
  values.map((id) => {
    tableRef.value!.toggleRowSelection({ id })
  })
}

function fetchingDataFromServer() {
  loading.value = true
  http
    .get<{ data: Pagination<Record<string, unknown>> }>(resolveUrl(props.url), {
      params: {
        relations: props.setRelations,
        columns: props.setColumns,
        pagination_length: pageSize.value,
        page: currentPage.value,
        queries: props.setQueries,
        order: props.setOrder,
      },
    })
    .then((result) => {
      loading.value = false
      data.value = result.data.data.data
      totalData.value = result.data.data.total

      state.collection = result.data.data

      emits('onReady', data.value)
    })
    .catch((error) => {
      loading.value = false
      httpHandleError(error)
    })
}

function handleSelectionChange(val: Array<{ id: number | string }>) {
  dataSelected.value = val
  emits(
    'tableSelections',
    val.map((item) => item.id),
  )
}

function refresh() {
  fetchingDataFromServer()
}

function remove() {
  if (!props.deleteUrl) {
    throw new Error(`Props 'delete-url' belum di inisialisasi`)
  }

  if (!dialogDeleteConfirmation.value) {
    dialogDeleteConfirmation.value = true
    return
  }

  const ids = dataSelected.value.map((item) => {
    return (item as { id: number | string }).id
  })

  http
    .delete(resolveUrl(props.deleteUrl), {
      data: {
        id: ids,
      },
    })
    .then(() => {
      refresh()
      dialogDeleteConfirmation.value = false
    })
    .catch(httpHandleError)
}

onMounted(() => {
  fetchingDataFromServer()
})

defineExpose({ changeSelection, refresh, remove })
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between p-4 border-b border-[#ebeef5]">
      <!-- Title -->
      <div v-if="!$slots.title">
        <div class="text-xl font-bold">{{ props.title }}</div>
        <div class="text-sm text-gray-400">{{ props.description }}</div>
      </div>
      <slot name="title"></slot>

      <!-- Toolbar -->
      <div v-if="props.toolbarShow" class="flex justify-end gap-4">
        <slot name="toolbar-1"></slot>
        <RouterLink v-if="props.buttonCreateUrl" :to="props.buttonCreateUrl()">
          <el-button :icon="Plus" type="primary">Tambah</el-button>
        </RouterLink>
        <slot name="toolbar-2"></slot>
        <el-button
          v-if="!$slots.buttonDelete && dataSelected.length && props.buttonDeleteShow"
          @click="dialogDeleteConfirmation = true"
          :icon="Delete"
          type="danger"
          class="m-0!"
          >Hapus</el-button
        >
        <slot name="buttonDelete"></slot>
        <slot name="toolbar-3"></slot>
        <slot name="toolbar-4"></slot>
      </div>
    </div>

    <!-- Table -->
    <el-table
      v-loading="loading"
      :data="data"
      @selection-change="handleSelectionChange"
      ref="tableRef"
      row-key="id"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" fixed="left" />
      <template v-for="(column, index) of props.columns" :key="index">
        <el-table-column
          v-if="!column.value && column.type !== 'slot'"
          :prop="column.field"
          :label="column.label"
          :width="column.width"
          :align="column.align ?? 'left'"
        />
        <!-- Custom value -->
        <el-table-column
          v-if="column.value && column.type !== 'slot'"
          :prop="column.field"
          :label="column.label"
          :width="column.width"
          :align="column.align ?? 'left'"
        >
          <template #default="scope">{{
            typeof column.value === 'function' ? column.value(scope.row) : ''
          }}</template>
        </el-table-column>
        <!-- Slot -->
        <el-table-column
          v-if="column.type === 'slot'"
          :prop="column.field"
          :label="column.label"
          :width="column.width"
          :align="column.align ?? 'left'"
        >
          <template #default="scope">
            <slot :name="column.field" :row="scope.row" />
          </template>
        </el-table-column>
      </template>
      <el-table-column width="55" fixed="right">
        <template #default="scope">
          <div
            v-if="props.buttonMoreFieldShow"
            class="hover:cursor-pointer hover:bg-slate-200 justify-center rounded flex items-center"
          >
            <el-popover
              placement="bottom"
              :width="props.style?.popOverWidth ?? 150"
              popper-class="!p-0"
              trigger="click"
            >
              <template #reference>
                <el-icon>
                  <MoreFilled />
                </el-icon>
              </template>
              <ul>
                <!-- Action Button View -->
                <RouterLink
                  v-if="typeof buttonViewUrl === 'function'"
                  :to="buttonViewUrl(scope.row)"
                  target="_blank"
                >
                  <li class="flex items-center py-2 px-4 hover:cursor-pointer hover:bg-slate-100">
                    <el-icon>
                      <View />
                    </el-icon>
                    <span class="ml-2">Lihat</span>
                  </li>
                </RouterLink>
                <!-- Action Button Edit -->
                <RouterLink
                  v-if="typeof buttonEditUrl === 'function'"
                  :to="buttonEditUrl(scope.row)"
                >
                  <li class="flex items-center py-2 px-4 hover:cursor-pointer hover:bg-slate-100">
                    <el-icon>
                      <Edit />
                    </el-icon>
                    <span class="ml-2">Ubah</span>
                  </li>
                </RouterLink>
                <slot name="action" :row="scope.row"></slot>
              </ul>
            </el-popover>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <div v-if="props.paginationShow" class="flex justify-end p-4">
      <el-pagination
        v-model:page-size="pageSize"
        v-model:current-page="currentPage"
        :total="totalData"
        :page-sizes="[10, 25, 50, 75, 100]"
        @change="changePage"
        layout="sizes, total, prev, pager, next"
      />
    </div>

    <!-- Dialog delete confirmation -->
    <el-dialog v-model="dialogDeleteConfirmation" title="Konfirmasi" width="500">
      <span>Anda yakin ingin menghapus data yang Anda pilih ?</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogDeleteConfirmation = false">Cancel</el-button>
          <el-button type="primary" @click="remove"> Confirm </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
