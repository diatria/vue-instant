<script lang="ts" setup>
import {
  httpGet,
  httpHandleError,
  httpPost,
  httpPut,
  httpValidation,
  message,
  resolveUrl,
} from '../utils/helpers'
import { Check, Close, Promotion } from '@element-plus/icons-vue'
import type {
  FormInstance,
  FormRules,
  UploadFile,
  UploadInstance,
  UploadRawFile,
} from 'element-plus'
import { genFileId } from 'element-plus'
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import ComSelect from './ComSelect.vue'
import type { Query } from '../types'

type ColumnSelect = {
  options?: Array<unknown>
  url?: string
  field_label?: string | ((row: Record<string, unknown>) => string)
  field_value?: string
  field_search_column?: string
  fetch_on_click?: boolean
  remote?: boolean
}

type ColumnUpload = {
  url: string
}

type ColumnType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'password'
  | 'switch'
  | 'checkbox'
  | 'date'
  | 'date-time'
  | 'time'
  | 'upload'
  | 'slot'
  | 'slot:el-form-item'
  | 'hide'

interface Column {
  name: string
  label?: string
  type: ColumnType
  grid?: number | Record<string, number>
  value?: string | number | UploadInstance
  disabled?: boolean
  select?: ColumnSelect
  options?: {
    value: string
    label: string
  }[]
  upload?: ColumnUpload
  placeholder?: string
}

interface ComFormProps {
  columns: Column[]
  id?: number
  description?: string
  fetchUrl?: string // only for fetch data
  paramsUrl?: string
  queries?: Query
  relations?: string[]
  rules?: FormRules
  storeUrl?: string // for store or update data
  title?: string
  url: string // for all fetch, store or update
}

const props = defineProps<ComFormProps>()
const emits = defineEmits(['back', 'onStored', 'onUpdated', 'delete', 'form', 'onChangeItem'])

const form: Record<string, string | number | UploadInstance | Array<string | number>> = reactive({})
const ruleFormRef = ref<FormInstance>()
const uploadRefs: Record<string, UploadInstance> = {}

function columnGrid(
  column: number | Record<string, number>,
  breakPoint?: 'default' | 'sm' | 'md' | 'lg' | 'xl',
) {
  if (typeof column === 'number') return column
  if (typeof column === 'object' && breakPoint) return column[breakPoint]
  if (typeof column === 'object') return column['default']
}

/**
 * Mengambil data untuk ditampilkan di form
 */

function getData() {
  const url = resolveUrl(props.fetchUrl ?? props.url)
  httpGet<{ data: unknown }>(`${url}/${props.id}`, {
    params: {
      queries: props.queries,
      relations: props.relations,
    },
  })
    .then((result) => {
      Object.assign(form, result.data.data)
      emits('form', result.data.data)
    })
    .catch(httpHandleError)
}

/**
 * Function for upload file
 *
 */
const handleExceed = (files: File[], uploadFiles: UploadFile[], columnName?: string) => {
  const uploadRef = columnName ? uploadRefs[columnName] : Object.values(uploadRefs)[0]
  if (!uploadRef) return

  uploadRef.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.handleStart(file)
}

function initializeForm() {
  props.columns.forEach((column) => {
    if (column.type === 'select') {
      form[column.name] = column.value ?? ''
    } else if (column.type === 'radio') {
      form[column.name] = column.value ?? ''
    } else if (column.type === 'text') {
      form[column.name] = column.value ?? ''
    } else if (column.type === 'textarea') {
      form[column.name] = column.value ?? ''
    } else if (column.type === 'password') {
      form[column.name] = column.value ?? ''
    } else if (column.type === 'switch') {
      form[column.name] = column.value ?? 0
    } else if (column.type === 'checkbox') {
      form[column.name] = column.value ?? []
    } else if (column.type === 'date') {
      form[column.name] = column.value ?? ''
    } else if (column.type === 'date-time') {
      form[column.name] = column.value ?? ''
    } else if (column.type === 'slot') {
      form[column.name] = column.value ?? ''
    } else if (column.type === 'hide') {
      form[column.name] = column.value ?? ''
    }
  })
}

function onChange(columnMetaData: Column, inputValue: unknown) {
  emits('form', form)
  emits('onChangeItem', { ...columnMetaData, value: inputValue })
}

/**
 * Submit all file uploads
 */
async function submitAllUploads() {
  const uploadPromises = Object.values(uploadRefs).map((uploadRef) => {
    return new Promise<void>((resolve) => {
      uploadRef.submit()
      resolve()
    })
  })

  return Promise.all(uploadPromises)
}

/**
 * Submit data untuk disimpan
 */
async function store() {
  // Validation form input
  if (!ruleFormRef.value) return

  let url = resolveUrl(props.storeUrl ?? props.url)
  await ruleFormRef.value.validate(async (valid) => {
    if (props.paramsUrl) url = `${url}?${props.paramsUrl}`
    if (valid) {
      try {
        // Upload all files first
        await submitAllUploads()

        // Then submit the form
        httpPost(url, form)
          .then((result) => {
            if (httpValidation(result)) {
              message(result.data.message, 'success')
              emits('onStored', result.data.data)
            }
          })
          .catch(httpHandleError)
      } catch (error) {
        httpHandleError(error)
      }
    }
  })
}

async function update() {
  if (!ruleFormRef.value) return

  let url = resolveUrl(props.storeUrl ?? props.url)
  url = `${url}/${props.id}`
  if (props.paramsUrl) url = `${url}?${props.paramsUrl}`
  await ruleFormRef.value.validate((valid) => {
    if (valid) {
      httpPut(url, form)
        .then((result) => {
          if (httpValidation(result)) {
            message(result.data.message, 'success')
            emits('onUpdated', result.data.data)
          }
        })
        .catch(httpHandleError)
    }
  })
}

onBeforeMount(() => {
  initializeForm()
})

onMounted(() => {
  if (props.id) getData()
  initializeForm()
})

defineExpose({
  initializeForm,
})
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between p-4 border-b border-[#ebeef5]">
      <!-- Title -->
      <div v-if="!$slots.title">
        <div class="text-xl font-bold">{{ props.title }}</div>
        <div>{{ props.description }}</div>
      </div>
      <slot name="title"></slot>
    </div>
    <el-form
      :model="form"
      :rules="props.rules"
      class="p-4"
      ref="ruleFormRef"
      label-position="top"
      label-width="auto"
      status-icon
    >
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
            <el-form-item
              v-if="!['slot:el-form-item'].includes(column.type)"
              :label="column.label"
              :prop="column.name"
            >
              <!-- Type Text -->
              <el-input
                v-if="column.type === 'text'"
                v-model="form[column.name]"
                :disabled="column.disabled"
                :placeholder="column.placeholder"
                @change="(val: any) => onChange(column, val)"
              />

              <!-- Type Textarea -->
              <el-input
                v-if="column.type === 'textarea'"
                v-model="form[column.name]"
                type="textarea"
                :disabled="column.disabled"
                :placeholder="column.placeholder"
                @change="(val: any) => onChange(column, val)"
              />

              <!-- Type Select -->
              <ComSelect
                v-if="column.type === 'select'"
                v-model="form[column.name]"
                :disabled="column.disabled"
                :fetch-on-click="column.select?.fetch_on_click"
                :field-label="column.select?.field_label ?? 'name'"
                :field-value="column.select?.field_value ?? 'id'"
                :field-search-column="column.select?.field_search_column"
                :options="column.select?.options"
                :placeholder="column.placeholder"
                :remote="column.select?.remote"
                :url="column.select?.url"
                @change="(val: any) => onChange(column, val)"
              />

              <!-- Radio -->
              <el-radio-group
                v-if="column.type === 'radio'"
                v-model="form[column.name]"
                @change="(val: any) => onChange(column, val)"
              >
                <el-radio
                  v-for="(radio, index) in column.options"
                  :value="radio.value"
                  :key="`radio-${index}`"
                  >{{ radio.label }}</el-radio
                >
              </el-radio-group>

              <!-- Checkbox -->
              <el-checkbox-group
                v-if="column.type === 'checkbox' && column.options?.length"
                v-model="form[column.name]"
                @change="(val: any) => onChange(column, val)"
              >
                <el-checkbox
                  v-for="(checkbox, index) in column.options"
                  :label="checkbox.label"
                  :value="checkbox.value"
                  :key="`checkbox-${index}`"
                />
              </el-checkbox-group>

              <!-- Type Password -->
              <el-input
                v-if="column.type === 'password'"
                v-model="form[column.name]"
                :placeholder="column.placeholder"
                @change="(val: any) => onChange(column, val)"
                type="password"
                show-password
              />

              <!-- Type Switch -->
              <el-switch
                v-if="column.type === 'switch'"
                v-model="form[column.name]"
                @change="(val: any) => onChange(column, val)"
                :active-icon="Check"
                :inactive-icon="Close"
              />

              <!-- Type Date -->
              <el-date-picker
                v-if="column.type === 'date'"
                v-model="form[column.name]"
                @change="(val: any) => onChange(column, val)"
                type="date"
                :placeholder="column.placeholder"
              />

              <!-- Type Date Time -->
              <el-date-picker
                v-if="column.type === 'date-time'"
                v-model="form[column.name]"
                @change="(val: any) => onChange(column, val)"
                type="datetime"
                :placeholder="column.placeholder"
                value-format="YYYY-MM-DD HH:mm:ss"
              />

              <!-- Type Time -->
              <el-time-picker
                v-if="column.type === 'time'"
                v-model="form[column.name]"
                :placeholder="column.placeholder"
                @change="(val: any) => onChange(column, val)"
                value-format="HH:mm:ss"
                class="!w-full"
              />

              <!-- Type File Upload -->
              <el-upload
                v-if="column.type === 'upload'"
                :ref="
                  (el: any) => {
                    if (el) uploadRefs[column.name] = el as any
                  }
                "
                :action="column.upload?.url"
                :limit="1"
                :on-exceed="(files: File[]) => handleExceed(files, [], column.name)"
                :auto-upload="false"
                @change="(val: any) => onChange(column, val)"
              >
                <template #trigger>
                  <el-button type="primary">select file</el-button>
                </template>
                <template #tip>
                  <div class="el-upload__tip text-red">
                    limit 1 file, new file will cover the old file
                  </div>
                </template>
              </el-upload>

              <!-- Type Inject Html -->
              <slot v-if="column.type === 'slot'" :name="column.name" :form="form" />
            </el-form-item>

            <!-- Checkbox without label -->
            <el-form-item v-if="column.type === 'checkbox' && !column.options" :prop="column.name">
              <el-checkbox
                v-if="column.type === 'checkbox'"
                v-model="form[column.name]"
                @change="(val: any) => onChange(column, val)"
                :label="column.label"
              />
            </el-form-item>

            <slot v-if="column.type === 'slot:el-form-item'" :name="column.name" :form="form" />
          </el-col>
        </template>
      </el-row>

      <div class="flex justify-end border-t border-slate-200 border-solid pt-4">
        <el-button :icon="Close" @click="emits('back')" type="danger" plain>Batal</el-button>

        <el-button v-if="props.id" @click="update" :icon="Promotion" type="primary" class="ml-4">
          Perbaharui
        </el-button>

        <template v-else>
          <el-button
            v-if="!$slots.buttonStore"
            @click="store"
            :icon="Promotion"
            type="primary"
            class="ml-4"
          >
            Simpan
          </el-button>
          <slot name="buttonStore" />
        </template>
      </div>
    </el-form>
  </div>
</template>
