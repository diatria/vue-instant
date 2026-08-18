<script lang="ts" setup>
import { httpHandleError, message, resolveUrl } from '../utils/helpers'
import { Close, Promotion, Upload } from '@element-plus/icons-vue'
import type {
  FormInstance,
  FormRules,
  UploadFile,
  UploadInstance,
  UploadRawFile,
} from 'element-plus'
import { genFileId } from 'element-plus'
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import FormField from './FormField.vue'
import type { ComFormColumn, ComFormProps as ComFormPropsType } from '../types'
import { HttpBuilder } from '../utils/http'
import { get } from 'lodash'

interface ComFormProps {
  columns: ComFormColumn[]
  id?: number
  description?: string
  fetchUrl?: string // only for fetch data
  paramsUrl?: string
  queries?: ComFormPropsType['queries']
  relations?: string[]
  rules?: FormRules
  storeUrl?: string // for store or update data
  title?: string
  url: string // for all fetch, store or update
}

const props = defineProps<ComFormProps>()
const emits = defineEmits(['back', 'onStored', 'onUpdated', 'delete', 'form', 'onChangeItem'])

const form: Record<
  string,
  ComFormColumn['value']
> = reactive({})
const ruleFormRef = ref<FormInstance>()
const uploadRefs: Record<string, UploadInstance> = {}
const loading = ref(false)
const http = new HttpBuilder()

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
  http
    .get<{ data: unknown }>(`${url}/${props.id}`, {
      params: {
        queries: props.queries,
        relations: props.relations,
      },
    })
    .then((result) => {
      Object.assign(form, result.data.data)

      props.columns.forEach((column) => {
        if (typeof column.value === 'function') {
          form[column.name] = get(result.data.data, column.value(), '')
        }
      })
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

const handleUploadError = (error: any, columnName: string) => {
  const errorMsg = error.message || 'Unknown error'
  message(`Upload ${columnName} gagal: ${errorMsg}`, 'error')
}

const handleUploadSuccess = (response: any, columnName: string) => {
  message(`Upload ${columnName} berhasil`, 'success')
}

function initializeForm() {
  props.columns.forEach((column) => {
    if (column.type === 'select') {
      if (typeof column.value === 'function') {
        form[column.name] = get(form, column.value(), '')
      } else form[column.name] = column.value ?? ''
    } else if (column.type === 'upload') {
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

function onChange(columnMetaData: ComFormColumn, inputValue: unknown) {
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
  if (loading.value) return // prevent duplicate submission

  let url = resolveUrl(props.storeUrl ?? props.url)
  await ruleFormRef.value.validate(async (valid) => {
    if (props.paramsUrl) url = `${url}?${props.paramsUrl}`
    if (valid) {
      loading.value = true
      try {
        // Then submit the form
        await http
          .post(url, form)
          .then((result) => {
            if (result.status >= 200 && result.status < 300) {
              // Upload all file
              submitAllUploads()

              const data = result.data as any
              message(data.message, 'success')
              emits('onStored', data.data)
            }
          })
          .catch(httpHandleError)
      } catch (error) {
        httpHandleError(error)
      } finally {
        loading.value = false
      }
    }
  })
}

async function update() {
  if (!ruleFormRef.value) return
  if (loading.value) return // prevent duplicate submission

  let url = resolveUrl(props.storeUrl ?? props.url)
  url = `${url}/${props.id}`
  if (props.paramsUrl) url = `${url}?${props.paramsUrl}`
  loading.value = true
  await ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      http
        .put(url, form)
        .then((result) => {
          if (result.status >= 200 && result.status < 300) {
            // Upload all file
            submitAllUploads()

            const data = result.data as any
            message(data.message, 'success')
            emits('onUpdated', data.data)
          }
        })
        .catch(httpHandleError)
        .finally(() => {
          loading.value = false
        })
    } else {
      loading.value = false
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
            <!-- Standard form item with label -->
            <el-form-item
              v-if="!['slot:el-form-item', 'upload', 'checkbox'].includes(column.type)"
              :label="column.label"
              :prop="column.name"
            >
              <FormField
                :column="column"
                v-model="form[column.name]"
                @change="(val: any) => onChange(column, val)"
              ></FormField>

              <!-- Slot -->
              <slot v-if="column.type === 'slot'" :name="column.name" :form="form" />
            </el-form-item>

            <!-- Checkbox without label (special case) -->
            <el-form-item v-if="column.type === 'checkbox' && !column.options" :prop="column.name">
              <FormField
                :column="column"
                v-model="form[column.name]"
                @change="(val: any) => onChange(column, val)"
              />
            </el-form-item>

            <!-- Upload with manual submit (special handling) -->
            <el-form-item v-if="column.type === 'upload'" :label="column.label" :prop="column.name">
              <el-upload
                :ref="
                  (el: any) => {
                    if (el) uploadRefs[column.name] = el
                  }
                "
                :action="column.upload?.url"
                :limit="1"
                :on-exceed="(files: File[]) => handleExceed(files, [], column.name)"
                :auto-upload="false"
                :accept="column.upload?.accept"
                :name="column.name"
                @change="(val: any) => onChange(column, val)"
                @error="(err: any) => handleUploadError(err, column.name)"
                @success="(res: any) => handleUploadSuccess(res, column.name)"
                class="w-full"
              >
                <template #trigger>
                  <el-button :icon="Upload" type="primary">{{
                    column?.upload?.buttonText ?? 'Select File'
                  }}</el-button>
                </template>
                <template #tip>
                  <div class="el-upload__tip text-red">
                    {{ column.placeholder }}
                  </div>
                </template>
              </el-upload>
            </el-form-item>

            <!-- Custom slot form item (full control) -->
            <slot v-if="column.type === 'slot:el-form-item'" :name="column.name" :form="form" />
          </el-col>
        </template>
      </el-row>

      <div class="flex justify-end border-t border-slate-200 border-solid pt-4">
        <el-button :icon="Close" @click="emits('back')" type="danger" plain :disabled="loading"
          >Batal</el-button
        >

        <el-button
          v-if="props.id"
          @click="update"
          :icon="Promotion"
          type="primary"
          class="ml-4"
          :loading="loading"
        >
          Perbaharui
        </el-button>

        <template v-else>
          <el-button
            v-if="!$slots.buttonStore"
            @click="store"
            :icon="Promotion"
            type="primary"
            class="ml-4"
            :loading="loading"
          >
            Simpan
          </el-button>
          <slot name="buttonStore" />
        </template>
      </div>
    </el-form>
  </div>
</template>
