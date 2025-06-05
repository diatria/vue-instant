<script lang="ts" setup>
  import {
    httpGet,
    httpHandleError,
    httpPost,
    httpPut,
    httpValidation,
    message,
    url,
  } from '../utils/helpers'
  import { Check, Close, Promotion } from '@element-plus/icons-vue'
  import type { FormInstance } from 'element-plus'
  import { onBeforeMount, onMounted, reactive, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import ComSelect from './ComSelect.vue'

  type columnType =
    | 'text'
    | 'textarea'
    | 'select'
    | 'password'
    | 'switch'
    | 'checkbox'
    | 'slot'
    | 'slot:el-form-item'
    | 'hide'
  const emits = defineEmits(['store', 'update', 'delete', 'form'])
  const props = defineProps({
    fetchUrl: { type: String, required: true }, // Untuk mengambil data saat dalam keadaan edit
    storeUrl: { type: String, required: true }, // Untuk menyimpan data
    backUrl: { type: String, required: false }, // Untuk kembali kehalaman sebelumnnya
    paramsUrl: { type: String, required: false, default: '' }, // Untuk menambah parameter pada url
    redirectAfterStoreUrl: { type: Function, required: false },
    columns: {
      type: Array<{
        name: string
        label?: string
        type: columnType
        url?: string // url digunakan untuk type "select"
        options?: Array<unknown> // options digunakan untuk type "select"
        field_label?: string // digunakan untuk type "select"
        field_value?: string // digunakan untuk type "select"
        grid?: number | Record<string, number>
        value?: string | number
        disabled?: boolean
        selectOptions?: {
          remoteSearchField?: string
          remoteSearchStrict?: boolean
          remote?: boolean
        }
      }>,
      required: true,
    },
    rules: { type: Object, required: false },
  })

  const form: Record<string, string | number> = reactive({})
  const ruleFormRef = ref<FormInstance>()
  const route = useRoute()
  const router = useRouter()

  function columnGrid(
    column: number | Record<string, number>,
    breakPoint?: 'default' | 'sm' | 'md' | 'lg' | 'xl'
  ) {
    if (typeof column === 'number') return column
    if (typeof column === 'object' && breakPoint) return column[breakPoint]
    if (typeof column === 'object') return column['default']
  }

  /**
   * Mengambil data untuk ditampilkan di form
   */

  function getData() {
    httpGet(
      `${import.meta.env.VITE_API_URL}/${props.fetchUrl}/${route.params.id}${props.paramsUrl}`
    )
      .then(result => Object.assign(form, result.data.data))
      .catch(httpHandleError)
  }

  function initializeForm() {
    props.columns.forEach(column => {
      if (column.type === 'select') {
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
        form[column.name] = column.value ?? 0
      } else if (column.type === 'slot') {
        form[column.name] = column.value ?? ''
      } else if (column.type === 'hide') {
        form[column.name] = column.value ?? ''
      }
    })
    console.log('initializeForm', form, props.columns)
  }

  function onChange() {
    emits('form', form)
  }

  /**
   * Submit data untuk disimpan
   */
  async function store() {
    // Validation form input
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate(valid => {
      console.log('valid', valid)
      if (valid) {
        httpPost(`${import.meta.env.VITE_API_URL}/${props.storeUrl}${props.paramsUrl}`, form)
          .then(result => {
            if (httpValidation(result)) {
              message(result.data.message, 'success')
              emits('store', result.data.data)

              if (props.redirectAfterStoreUrl) {
                return router.push(props.redirectAfterStoreUrl(result.data.data))
              }

              if (props.backUrl) router.push(`/${props.backUrl}`)
            }
          })
          .catch(httpHandleError)
      }
    })
  }

  async function update() {
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate(valid => {
      console.log('valid', valid)
      if (valid) {
        httpPut(
          `${import.meta.env.VITE_API_URL}/${props.storeUrl}/${route.params.id}/${props.paramsUrl}`,
          form
        )
          .then(result => {
            if (httpValidation(result)) {
              message(result.data.message, 'success')
              emits('store', result.data.data)
              if (props.backUrl) router.push(`/${props.backUrl}`)
            }
          })
          .catch(httpHandleError)
      }
    })
  }

  onBeforeMount(() => {
    console.log('onBeforeMount')
    initializeForm()
  })

  onMounted(() => {
    if (route.params.id) getData()
    initializeForm()
  })

  defineExpose({
    initializeForm,
  })
</script>

<template>

  <el-form
    :model="form"
    :rules="props.rules"
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
            v-if="!['checkbox', 'slot:el-form-item'].includes(column.type)"
            :label="column.label"
            :prop="column.name"
          >

            <!-- Type Text -->

            <el-input
              v-if="column.type === 'text'"
              v-model="form[column.name]"
              :disabled="column.disabled"
              @change="onChange"
            />

            <!-- Type Textarea -->

            <el-input
              v-if="column.type === 'textarea'"
              v-model="form[column.name]"
              type="textarea"
              :disabled="column.disabled"
              @change="onChange"
            />

            <!-- Type Select -->

            <ComSelect
              v-if="column.type === 'select'"
              v-model="form[column.name]"
              :url="column.url"
              :field-label="column.field_label ?? 'name'"
              :field-value="column.field_value ?? 'id'"
              :options="column.options"
              :disabled="column.disabled"
              :remote="column.selectOptions?.remote"
              :remote-search="{
                field: column.selectOptions?.remoteSearchField,
                strict: column.selectOptions?.remoteSearchStrict,
              }"
              @change="onChange"
            />

            <!-- Type Password -->

            <el-input
              v-if="column.type === 'password'"
              v-model="form[column.name]"
              @change="onChange"
              type="password"
              show-password
            />

            <!-- Type Switch -->

            <el-switch
              v-if="column.type === 'switch'"
              v-model="form[column.name]"
              @change="onChange"
              :active-icon="Check"
              :inactive-icon="Close"
            />

            <!-- Type Inject Html -->

            <slot v-if="column.type === 'slot'" :name="column.name" :form="form" />

          </el-form-item>

          <el-form-item v-if="['checkbox'].includes(column.type)" :prop="column.name">

            <el-checkbox
              v-if="column.type === 'checkbox'"
              v-model="form[column.name]"
              @change="onChange"
              :label="column.label"
            />

          </el-form-item>

          <slot v-if="column.type === 'slot:el-form-item'" :name="column.name" :form="form" />

        </el-col>

      </template>

    </el-row>

    <div class="flex justify-end border-t border-slate-200 border-solid pt-4">

      <RouterLink :to="url('/' + props.backUrl)">

        <el-button :icon="Close" type="danger" plain>Batal</el-button>

      </RouterLink>

      <el-button
        v-if="route.params.id"
        @click="update"
        :icon="Promotion"
        type="primary"
        class="ml-4"
      >
         Perbaharui
      </el-button>

      <el-button v-else @click="store" :icon="Promotion" type="primary" class="ml-4">
         Simpan
      </el-button>

    </div>

  </el-form>

</template>

