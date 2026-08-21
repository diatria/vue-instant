<script lang="ts" setup>
import type { Query, ComFormColumn } from '../types'
import { Close, Filter, Promotion, RefreshLeft } from '@element-plus/icons-vue'
import { reactive, ref, nextTick, onMounted } from 'vue'
import FormField from './FormField.vue'
import { get } from 'lodash'
import type { UploadInstance } from 'element-plus'

export interface ComFormProps {
  buttonFilterLoading?: boolean
  columns: ComFormColumn[]
}

interface ChangeItemPayload extends Omit<ComFormColumn, 'value'> {
  value: unknown
}

type FormRecord = Record<string, string | number | boolean | undefined | string | number | UploadInstance | (() => string) | any[]>
type BreakPoint = 'default' | 'sm' | 'md' | 'lg' | 'xl'

const props = defineProps<ComFormProps>()
const popoverFilter = ref<boolean>(false)

const emits = defineEmits<{
  cancel: []
  onSubmit: [queries: Query['queries']]
  onReset: []
  form: [payload: FormRecord]
  onChangeItem: [payload: ChangeItemPayload]
}>()

defineExpose({
  reEmitForm,
})

const form: FormRecord = reactive({})

function columnGrid(
  column: number | Record<string, number>,
  breakPoint?: BreakPoint,
): number | undefined {
  if (typeof column === 'number') return column
  if (typeof column === 'object' && breakPoint) return column[breakPoint]
  if (typeof column === 'object') return column['default']
}

function initializeForm() {
  props.columns.forEach((column) => {
    if (column.type === 'select') {
      form[column.name] = column.value ?? ''
    } else if (column.type === 'checkbox' || column.type === 'checkbox:label') {
      form[column.name] = column.value ?? []
    } else if (column.type === 'switch') {
      form[column.name] = column.value ?? 0
    } else {
      // text, textarea, password, radio, date, date-time, time, slot, hide
      form[column.name] = column.value ?? ''
    }
  })
}

function onChange(columnMetaData: ComFormColumn, inputValue: unknown): void {
  emits('form', form)
  emits('onChangeItem', { ...columnMetaData, value: inputValue })
}

function onSubmit(): void {
  emits('onSubmit', toQuery())
}

function reEmitForm(): void {
  emits('form', form)
}

async function resetForm(): Promise<void> {
  Object.keys(form).forEach((key) => {
    delete form[key]
  })

  await nextTick()

  emits('form', form)
  emits('onReset')
}

function toQuery(): Query['queries'] {
  const queries: Query['queries'] = []
  Object.keys(form).forEach((key) => {
    queries.push({
      field: key,
      value: form[key] as string | number | boolean | undefined,
    })
  })

  return queries
}

onMounted(() => initializeForm())
</script>
<template>
  <el-button :icon="Filter" @click="popoverFilter = !popoverFilter" class="m-0!">Filter</el-button>
  <el-drawer
    v-model="popoverFilter"
    :show-close="false"
    header-class="!mb-0"
    title="Filter"
    direction="rtl"
    class="w-87!"
  >
    <el-form :model="form" ref="ruleFormRef" label-position="top" label-width="auto" status-icon>
      <el-row :gutter="20">
        <template v-for="(column, index) in props.columns" :key="index">
          <el-col
            v-if="!['hide'].includes(column.type)"
            :span="columnGrid(column.grid ?? 24)"
            :sm="columnGrid(column.grid ?? 24, 'sm')"
            :md="columnGrid(column.grid ?? 24, 'md')"
            :lg="columnGrid(column.grid ?? 24, 'lg')"
            :xl="columnGrid(column.grid ?? 24, 'xl')"
          >
            <!-- Standard form item with label -->
            <el-form-item
              v-if="!['slot:el-form-item', 'checkbox'].includes(column.type)"
              :label="column.label"
              :prop="column.name"
            >
              <FormField
                :column="column"
                v-model="form[column.name]"
                @change="(val: any) => onChange(column, val)"
              >
              </FormField>
              <!-- Slot -->
              <slot v-if="column.type === 'slot'" :name="column.name" :form="form" />
            </el-form-item>

            <!-- Checkbox without label -->
            <el-form-item v-if="column.type === 'checkbox' && !column.options" :prop="column.name">
              <FormField
                :column="column"
                v-model="form[column.name]"
                @change="(val: any) => onChange(column, val)"
              />
            </el-form-item>

            <!-- Custom slot form item -->
            <slot v-if="column.type === 'slot:el-form-item'" :name="column.name" :form="form" />
          </el-col>
        </template>
      </el-row>

      <div class="flex justify-end border-t border-slate-200 border-solid pt-4">
        <el-button :icon="Close" @click="() => (popoverFilter = false)" type="danger" plain
          >Batal</el-button
        >
        <el-button :icon="RefreshLeft" @click="resetForm" type="primary" plain>Reset</el-button>
        <el-button
          @click="onSubmit"
          :loading="buttonFilterLoading"
          :icon="Promotion"
          type="primary"
          class="ml-4"
        >
          Filter
        </el-button>
      </div>
    </el-form>
  </el-drawer>
</template>
