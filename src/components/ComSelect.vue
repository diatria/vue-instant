<script lang="ts" setup>
  import { httpGet } from '../utils/helpers'
  import { get } from 'lodash'
  import { computed, onMounted, ref } from 'vue'

  interface RemoteSearch {
    field?: string
    strict?: boolean
  }

  const emit = defineEmits(['update:modelValue'])
  const props = defineProps<{
    url?: string
    remoteSearch?: RemoteSearch
    fieldLabel?: string
    fieldValue?: string
    options?: unknown[]
    autoFetch?: boolean
    disabled?: boolean
    remote?: boolean
  }>()

  const collections = ref<Array<Record<string, never>>>([])
  const value = ref('')

  const fieldLabel = computed(() => props.fieldLabel ?? 'name')
  const fieldValue = computed(() => props.fieldValue ?? 'id')

  // Methods
  function fetchingDataFromServer() {
    httpGet(`${import.meta.env.VITE_API_URL}/${props.url}`).then(result => {
      collections.value = result.data.data
    })
  }

  function fetchingDataFromServerWithFilter(searchText: string) {
    httpGet(`${import.meta.env.VITE_API_URL}/${props.url}`, {
      params: {
        queries: [
          {
            field: props.remoteSearch?.field,
            value: searchText,
            strict: props.remoteSearch?.strict ?? false,
          },
        ],
        limit: 10,
      },
    }).then(result => {
      collections.value = result.data.data
    })
  }

  onMounted(() => {
    if (props.url && props.autoFetch) fetchingDataFromServer()
    if (props.options) collections.value = props.options as Array<Record<string, never>>
  })

  defineExpose({
    fetchingDataFromServer,
  })
</script>

<template>

  <!-- Remote search -->

  <el-select
    v-model="value"
    v-if="props.remote"
    :disabled="props.disabled"
    :remote-method="fetchingDataFromServerWithFilter"
    @change="(val: any) => emit('update:modelValue', val)"
    placeholder="Select"
    remote
    filterable
    remote-show-suffix
  >

    <el-option
      v-for="item in collections"
      :key="item[fieldValue]"
      :label="get(item, fieldLabel)"
      :value="item[fieldValue] ?? item['id']"
    />

  </el-select>

  <!-- Type select untuk fetch data ke API -->

  <el-select
    v-else
    v-model="value"
    :disabled="props.disabled"
    @change="(val: any) => emit('update:modelValue', val)"
    placeholder="Select"
    filterable
  >

    <el-option
      v-for="item in collections"
      :key="item[fieldValue]"
      :label="get(item, fieldLabel)"
      :value="item[fieldValue] ?? item['id']"
    />

  </el-select>

</template>

