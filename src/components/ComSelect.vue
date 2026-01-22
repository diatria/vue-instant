<script lang="ts" setup>
import { get } from 'lodash'
import { computed, onMounted, ref } from 'vue'
import { httpHandleError } from '../utils/helpers'
import { HttpBuilder } from '../utils/http'

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
  disabled?: boolean
  fetchOnClick?: boolean
  fieldLabel?: string | ((row: Record<string, unknown>) => string)
  fieldValue?: string
  fieldSearchColumn?: string
  options?: Array<unknown>
  placeholder?: string
  remote?: boolean
  url?: string
}>()

const collections = ref<Array<Record<string, never>>>([])
const fetchLoading = ref<boolean>(false)
const http = new HttpBuilder()
const value = ref('')

const fieldLabel = computed(() => props.fieldLabel ?? 'name')
const fieldValue = computed(() => props.fieldValue ?? 'id')
const fieldSearchColumn = computed(() => props.fieldSearchColumn ?? fieldLabel.value)

// Methods
function changeCollection(values: Record<string, never>[]) {
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
    .get<{ data: Record<string, never>[] }>(props.url, {
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

onMounted(() => {
  if (props.url && (props.fetchOnClick ?? true)) fetchingDataFromServer()
  if (props.options) collections.value = props.options as Array<Record<string, never>>
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
    @change="(val: any) => emit('update:modelValue', val)"
    :placeholder="props.placeholder ?? 'Select'"
    filterable
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
