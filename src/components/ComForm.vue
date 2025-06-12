<script lang="ts" setup>
  import {
    httpGet,
    httpHandleError,
    httpPost,
    httpPut,
    httpValidation,
    message,
  } from '@/utils/helpers';
  import { Check, Close, Promotion } from '@element-plus/icons-vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { onBeforeMount, onMounted, reactive, ref } from 'vue';
  import ComSelect from './ComSelect.vue';
  import { type Query } from '@/types';
  import type { ResponseAxios } from '@/types/response';

  type ColumnSelect = {
    options?: Array<unknown>;
    url?: string;
    field_label?: string;
    field_value?: string;
    fetch_on_click?: boolean;
    remote?: boolean;
  };

  type ColumnType =
    | 'text'
    | 'textarea'
    | 'select'
    | 'password'
    | 'switch'
    | 'checkbox'
    | 'slot'
    | 'slot:el-form-item'
    | 'hide';

  interface Column {
    name: string;
    label?: string;
    type: ColumnType;
    grid?: number | Record<string, number>;
    value?: string | number;
    disabled?: boolean;
    select?: ColumnSelect;
    placeholder?: string;
  }

  interface ComFormProps {
    columns: Column[];
    id?: number;
    fetchUrl?: string;
    paramsUrl?: string;
    queries?: Query;
    rules?: FormRules;
    storeUrl?: string;
    url: string;
  }

  const props = defineProps<ComFormProps>();
  const emits = defineEmits(['back', 'onStored', 'onUpdated', 'delete', 'form']);

  const form: Record<string, string | number> = reactive({});
  const ruleFormRef = ref<FormInstance>();

  function columnGrid(
    column: number | Record<string, number>,
    breakPoint?: 'default' | 'sm' | 'md' | 'lg' | 'xl'
  ) {
    if (typeof column === 'number') return column;
    if (typeof column === 'object' && breakPoint) return column[breakPoint];
    if (typeof column === 'object') return column['default'];
  }

  /**
   * Mengambil data untuk ditampilkan di form
   */

  function getData() {
    const url = props.fetchUrl ?? props.url;
    httpGet(`${url}/${props.id}?${props.paramsUrl}`)
      .then((result: ResponseAxios<unknown>) => {
        Object.assign(form, result.data.data);
        emits('form', result.data.data);
      })
      .catch(httpHandleError);
  }

  function initializeForm() {
    props.columns.forEach(column => {
      if (column.type === 'select') {
        form[column.name] = column.value ?? '';
      } else if (column.type === 'text') {
        form[column.name] = column.value ?? '';
      } else if (column.type === 'textarea') {
        form[column.name] = column.value ?? '';
      } else if (column.type === 'password') {
        form[column.name] = column.value ?? '';
      } else if (column.type === 'switch') {
        form[column.name] = column.value ?? 0;
      } else if (column.type === 'checkbox') {
        form[column.name] = column.value ?? 0;
      } else if (column.type === 'slot') {
        form[column.name] = column.value ?? '';
      } else if (column.type === 'hide') {
        form[column.name] = column.value ?? '';
      }
    });
  }

  function onChange() {
    emits('form', form);
  }

  /**
   * Submit data untuk disimpan
   */
  async function store() {
    // Validation form input
    if (!ruleFormRef.value) return;

    const url = props.storeUrl ?? props.url;
    await ruleFormRef.value.validate(valid => {
      if (valid) {
        httpPost(`${url}?${props.paramsUrl}`, form)
          .then((result: ResponseAxios<unknown>) => {
            if (httpValidation(result)) {
              message(result.data.message, 'success');
              emits('onStored', result.data.data);
            }
          })
          .catch(httpHandleError);
      }
    });
  }

  async function update() {
    if (!ruleFormRef.value) return;

    const url = props.storeUrl ?? props.url;
    await ruleFormRef.value.validate(valid => {
      if (valid) {
        httpPut(`${url}/${props.id}?${props.paramsUrl}`, form)
          .then((result: ResponseAxios<unknown>) => {
            if (httpValidation(result)) {
              message(result.data.message, 'success');
              emits('onUpdated', result.data.data);
            }
          })
          .catch(httpHandleError);
      }
    });
  }

  onBeforeMount(() => {
    initializeForm();
  });

  onMounted(() => {
    if (props.id) getData();
    initializeForm();
  });

  defineExpose({
    initializeForm,
  });
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
              :disabled="column.disabled"
              :fetch-on-click="column.select?.fetch_on_click"
              :field-label="column.select?.field_label ?? 'name'"
              :field-value="column.select?.field_value ?? 'id'"
              :options="column.select?.options"
              :placeholder="column.placeholder"
              :remote="column.select?.remote"
              :url="column.select?.url"
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

      <el-button :icon="Close" @click="emits('back')" type="danger" plain>Batal</el-button>

      <el-button v-if="props.id" @click="update" :icon="Promotion" type="primary" class="ml-4">
         Perbaharui
      </el-button>

      <el-button v-else @click="store" :icon="Promotion" type="primary" class="ml-4">
         Simpan
      </el-button>

    </div>

  </el-form>

</template>

