<script lang="ts" setup>
  import { httpGet } from '../utils/helpers';
  import { get } from 'lodash';
  import { computed, onMounted, ref } from 'vue';

  const emit = defineEmits(['update:modelValue']);
  const props = defineProps({
    url: { type: String, required: false },
    fieldLabel: { type: String, required: false },
    fieldValue: { type: String, required: false },
    options: { type: Array<unknown>, required: false },
    autoFetch: { type: Boolean, required: false, default: true },
    disabled: { type: Boolean, required: false, default: false },
  });

  const collections = ref<Array<Record<string, never>>>([]);
  const value = ref('');

  const fieldLabel = computed(() => props.fieldLabel ?? 'name');
  const fieldValue = computed(() => props.fieldValue ?? 'id');

  // Methods
  function fetchingDataFromServer() {
    httpGet(`${import.meta.env.VITE_API_URL}/${props.url}`).then(result => {
      collections.value = result.data.data;
    });
  }

  onMounted(() => {
    if (props.url && props.autoFetch) fetchingDataFromServer();
    if (props.options) collections.value = props.options as Array<Record<string, never>>;
  });

  defineExpose({
    fetchingDataFromServer,
  });
</script>

<template>
   <!-- Type select untuk fetch data ke API --> <el-select
    v-model="value"
    :disabled="props.disabled"
    @change="(val: any) => emit('update:modelValue', val)"
    placeholder="Select"
    filterable
    > <el-option
      v-for="item in collections"
      :key="item[fieldValue]"
      :label="get(item, fieldLabel)"
      :value="item[fieldValue] ?? item['id']"
    /> </el-select
  >
</template>

