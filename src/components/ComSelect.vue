<script lang="ts" setup>
  import { httpGet } from '@/utils/helpers';
  import { get } from 'lodash';
  import { computed, onMounted, ref } from 'vue';
  import { httpHandleError } from '@/utils/helpers';

  const emit = defineEmits(['update:modelValue']);

  const props = defineProps<{
    disabled?: boolean;
    fetchOnClick?: boolean;
    fieldLabel?: string;
    fieldValue?: string;
    options?: Array<unknown>;
    placeholder?: string;
    remote?: boolean;
    url?: string;
  }>();

  const collections = ref<Array<Record<string, never>>>([]);
  const fetchLoading = ref<boolean>(false);
  const value = ref('');

  const fieldLabel = computed(() => props.fieldLabel ?? 'name');
  const fieldValue = computed(() => props.fieldValue ?? 'id');

  // Methods
  function fetchingDataFromServer(search?: string) {
    fetchLoading.value = true;

    if (!props.url) throw new Error('URL belum terdefinisi saat fetch Select');

    // 'Search text tidak boleh kosong jika menggunakan remote method !'
    let params;
    if (!search && props.remote) return;
    if (props.remote && search) {
      params = {
        queries: [{ field: fieldLabel.value, value: search }],
      };
    }

    httpGet(props.url, {
      params,
    })
      .then(result => {
        fetchLoading.value = false;
        collections.value = result.data.data;
      })
      .catch(error => {
        httpHandleError(error);
        fetchLoading.value = false;
      });
  }

  onMounted(() => {
    if (props.url && (props.fetchOnClick ?? true)) fetchingDataFromServer();
    if (props.options) collections.value = props.options as Array<Record<string, never>>;
  });

  defineExpose({
    fetchingDataFromServer,
  });
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

    <el-option
      v-for="item in collections"
      :key="item[fieldValue]"
      :label="get(item, fieldLabel)"
      :value="item[fieldValue] ?? item['id']"
    />

  </el-select>

</template>

