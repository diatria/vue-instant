<script lang="ts" setup>
import { get } from 'lodash'
import { computed, onMounted, ref, watch } from 'vue'
import { httpHandleError, resolveUrl } from '../utils/helpers'
import { HttpBuilder } from '../utils/http'
import type { ComSelectProps } from '../types'

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(
  defineProps<ComSelectProps & { modelValue?: any }>(),
  {
    fetchOnClick: true,
  }
)

const collections = ref<Array<Record<string, any>>>([])
const fetchLoading = ref<boolean>(false)
const http = new HttpBuilder()

const fieldLabel = computed(() => props.field_label ?? 'name')
const fieldValue = computed(() => props.field_value ?? 'id')
const fieldSearchColumn = computed(() => props.field_search_column ?? fieldLabel.value)

// Sync internal value with parent modelValue
const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

// Methods
function changeCollection(values: Record<string, any>[]) {
  collections.value = values
}

function fetchingDataFromServer(search?: string) {
  fetchLoading.value = true

  if (!props.url) throw new Error('URL belum terdefinisi saat fetch Select')

  // 'Search text tidak boleh kosong jika menggunakan remote method !'
  let params
  if (!search && props.remote) return
  if (props.remote && search) {
    params = {
      queries: [{ field: fieldSearchColumn.value, value: search }],
    }
  }

  http
    .get<{ data: Record<string, any>[] }>(resolveUrl(props.url), {
      params,
    })
    .then((result) => {
      fetchLoading.value = false
      collections.value = result.data.data
    })
    .catch((error) => {
      httpHandleError(error)
      fetchLoading.value = false
    })
}

// Watch for options prop changes
watch(
  () => props.options,
  (newOptions) => {
    if (newOptions) {
      collections.value = newOptions as Array<Record<string, any>>
    }
  }
)

onMounted(() => {
  if (props.url && (props.fetchOnClick ?? true)) fetchingDataFromServer()
  if (props.options) collections.value = props.options as Array<Record<string, any>>
})

defineExpose({
  changeCollection,
  fetchingDataFromServer,
})
</script>

<template>
  <!-- Type select untuk fetch data ke API -->

  <el-select
    v-model="value"
    :disabled="props.disabled"
    :remote="props.remote"
    :remote-method="fetchingDataFromServer"
    :loading="fetchLoading"
    :placeholder="props.placeholder ?? 'Select'"
    :placement="props.placement ?? 'bottom'"
    filterable
    clearable
  >
    <template v-if="typeof fieldLabel === 'string'">
      <el-option
        v-for="item in collections"
        :key="item[fieldValue]"
        :label="get(item, fieldLabel ?? 'name')"
        :value="get(item, fieldValue ?? 'id')"
      />
    </template>

    <template v-if="typeof fieldLabel === 'function'">
      <el-option
        v-for="item in collections"
        :key="item[fieldValue]"
        :label="fieldLabel(item)"
        :value="get(item, fieldValue ?? 'id')"
      />
    </template>
  </el-select>
</template>
