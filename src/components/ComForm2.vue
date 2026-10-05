<script lang="ts" setup>
import { Close, Promotion } from '@element-plus/icons-vue';
import { genFileId } from 'element-plus';
import type { FormInstance, FormRules, UploadFile, UploadInstance, UploadRawFile } from 'element-plus';
import { get } from 'lodash';
import { onMounted, reactive, ref } from 'vue';
import FormField from './FormField.vue';
import type { ComFormColumn, ComFormProps as BaseFormProps } from '../types';
import { httpHandleError, message, resolveUrl } from '../utils/helpers';
import { HttpBuilder } from '../utils/http';

interface Props extends BaseFormProps {
  /** Set to false when the parent owns the submit buttons. */
  showActions?: boolean;
}

const props = withDefaults(defineProps<Props>(), { showActions: true });
const emit = defineEmits<{
  (event: 'back'): void;
  (event: 'onStored', data: unknown): void;
  (event: 'onUpdated', data: unknown): void;
  (event: 'delete'): void;
  (event: 'form', data: Record<string, unknown>): void;
  (event: 'onChangeItem', data: { column: ComFormColumn; value: unknown }): void;
  (event: 'loadError', error: unknown): void;
}>();

const form = reactive<Record<string, unknown>>({});
const formRef = ref<FormInstance>();
const loading = ref(false);
const uploadRefs: Record<string, UploadInstance> = {};
const http = new HttpBuilder();

function gridSpan(grid: ComFormColumn['grid'], breakpoint?: 'default' | 'sm' | 'md' | 'lg' | 'xl') {
  if (typeof grid === 'number') return grid;
  return grid?.[breakpoint ?? 'default'] ?? 24;
}

function initialValue(column: ComFormColumn): unknown {
  if (column.type === 'checkbox') return column.value ?? [];
  if (column.type === 'switch') return column.value ?? false;
  return column.value ?? '';
}

function initializeForm() {
  for (const column of props.columns) {
    if (!(column.name in form)) form[column.name] = initialValue(column);
  }
}

async function load() {
  if (!props.id) return;
  try {
    const response = await http.get<{ data: Record<string, unknown> }>(
      `${resolveUrl(props.fetchUrl ?? props.url)}/${props.id}`,
      { params: { queries: props.queries, relations: props.relations } },
    );
    const data = response.data.data ?? {};
    Object.assign(form, data);
    for (const column of props.columns) {
      if (typeof column.value === 'function') form[column.name] = get(data, column.value(), '');
    }
    emit('form', { ...form });
  } catch (error) {
    emit('loadError', error);
    httpHandleError(error);
  }
}

function handleChange(column: ComFormColumn, value: unknown) {
  emit('form', { ...form });
  emit('onChangeItem', { column, value });
}

function handleExceed(files: File[], _uploadFiles: UploadFile[], name: string) {
  const upload = uploadRefs[name];
  if (!upload) return;
  upload.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.handleStart(file);
}

function appendParams(url: string) {
  if (!props.paramsUrl) return url;
  return `${url}${url.includes('?') ? '&' : '?'}${props.paramsUrl}`;
}

async function submit() {
  if (loading.value || !formRef.value) return;
  const valid = await formRef.value.validate().catch(() => false);
  if (!valid) return;

  loading.value = true;
  try {
    for (const upload of Object.values(uploadRefs)) upload.submit();
    const baseUrl = appendParams(resolveUrl(props.storeUrl ?? props.url));
    const response = props.id ? await http.put(`${baseUrl}/${props.id}`, form) : await http.post(baseUrl, form);
    const data = response.data as { data?: unknown; message?: string };
    message(data.message ?? 'Data berhasil disimpan', 'success');
    if (props.id) emit('onUpdated', data.data);
    else emit('onStored', data.data);
  } catch (error) {
    httpHandleError(error);
  } finally {
    loading.value = false;
  }
}

function handleUploadError(error: Error, name: string) {
  message(`Upload ${name} gagal: ${error.message || 'Unknown error'}`, 'error');
}

function handleUploadSuccess(_response: unknown, name: string) {
  message(`Upload ${name} berhasil`, 'success');
}

onMounted(async () => {
  initializeForm();
  await load();
});

defineExpose({ form, initializeForm, submit, loading });
</script>

<template>
  <div>
    <div class="flex justify-between border-b border-[#ebeef5] p-4">
      <slot name="title">
        <div>
          <div v-if="props.title" class="text-xl font-bold">{{ props.title }}</div>
          <div v-if="props.description">{{ props.description }}</div>
        </div>
      </slot>
    </div>

    <el-form ref="formRef" :model="form" :rules="props.rules" class="p-4" label-position="top" status-icon>
      <el-row :gutter="20">
        <template v-for="column in props.columns" :key="column.name">
          <el-col
            v-if="column.type !== 'hide'"
            :span="gridSpan(column.grid)"
            :sm="gridSpan(column.grid, 'sm')"
            :md="gridSpan(column.grid, 'md')"
            :lg="gridSpan(column.grid, 'lg')"
            :xl="gridSpan(column.grid, 'xl')"
          >
            <slot v-if="column.type === 'slot:el-form-item'" :name="column.name" :form="form" />
            <el-form-item v-else :label="column.label" :prop="column.name">
              <slot v-if="column.type === 'slot'" :name="column.name" :form="form" />
              <el-upload
                v-else-if="column.type === 'upload'"
                :ref="(instance: any) => instance && (uploadRefs[column.name] = instance)"
                :action="column.upload?.url"
                :auto-upload="false"
                :limit="1"
                @change="(value: UploadFile) => handleChange(column, value)"
                @error="(error: Error) => handleUploadError(error, column.name)"
                @exceed="(files: File[], uploadFiles: UploadFile[]) => handleExceed(files, uploadFiles, column.name)"
                @success="(response: unknown) => handleUploadSuccess(response, column.name)"
              >
                <el-button type="primary">Pilih file</el-button>
                <template #tip><div class="el-upload__tip">Maksimal 1 file.</div></template>
              </el-upload>
              <FormField
                v-else
                :column="column"
                v-model="form[column.name]"
                @change="(value: unknown) => handleChange(column, value)"
              />
            </el-form-item>
          </el-col>
        </template>
      </el-row>

      <div v-if="props.showActions" class="flex justify-end border-t border-slate-200 border-solid pt-4">
        <el-button :icon="Close" type="danger" plain :disabled="loading" @click="emit('back')">Batal</el-button>
        <el-button
          v-if="!props.id && !$slots.buttonStore"
          :icon="Promotion"
          type="primary"
          :loading="loading"
          class="ml-4"
          @click="submit"
        >
          Simpan
        </el-button>
        <el-button
          v-else-if="props.id"
          :icon="Promotion"
          type="primary"
          :loading="loading"
          class="ml-4"
          @click="submit"
        >
          Perbaharui
        </el-button>
        <slot v-else name="buttonStore" :loading="loading" :submit="submit" />
      </div>
    </el-form>
  </div>
</template>
