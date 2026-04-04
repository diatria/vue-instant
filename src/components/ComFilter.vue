<script lang="ts" setup>
import { type ComFormColumn } from '../types'
import { type UploadInstance } from 'element-plus'
import { Close, Promotion, RefreshLeft } from '@element-plus/icons-vue'
import { reactive, ref, nextTick } from 'vue'
import FormField from './FormField.vue'

export interface ComFormProps {
  columns: ComFormColumn[]
}

const props = defineProps<ComFormProps>()
const popoverFilter = ref()

const emits = defineEmits(['cancel', 'onSubmit', 'onReset', 'form', 'onChangeItem'])
defineExpose({
  reEmitForm,
})

const form: Record<string, string | number | UploadInstance | Array<string | number>> = reactive({})

function columnGrid(
  column: number | Record<string, number>,
  breakPoint?: 'default' | 'sm' | 'md' | 'lg' | 'xl',
) {
  if (typeof column === 'number') return column
  if (typeof column === 'object' && breakPoint) return column[breakPoint]
  if (typeof column === 'object') return column['default']
}

function onChange(columnMetaData: ComFormColumn, inputValue: unknown) {
  emits('form', form)
  emits('onChangeItem', { ...columnMetaData, value: inputValue })
}

function reEmitForm() {
  emits('form', form)
}

async function resetForm() {
  Object.keys(form).forEach((key) => {
    delete form[key]
  })

  await nextTick()

  emits('form', form)
  emits('onReset')
}
</script>
<template>
  <el-button @click="popoverFilter = !popoverFilter" class="m-0!">Filter</el-button>
  <el-drawer v-model="popoverFilter" title="Filter" direction="rtl" size="20%">
    <el-form :model="form" ref="ruleFormRef" label-position="top" label-width="auto" status-icon>
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
              v-if="!['slot:el-form-item', 'checkbox'].includes(column.type)"
              :label="column.label"
              :prop="column.name"
            >
              <FormField
                :column="column"
                v-model="form[column.name]"
                @change="(val: any) => onChange(column, val)"
              >
                <template #slot="slotProps">
                  <slot :name="column.name" :form="form" />
                </template>
              </FormField>
            </el-form-item>

            <!-- Checkbox without label -->
            <el-form-item v-if="column.type === 'checkbox' && !column.options" :prop="column.name">
              <FormField
                :column="column"
                v-model="form[column.name]"
                @change="(val: any) => onChange(column, val)"
              />
            </el-form-item>

            <!-- Custom slot form item -->
            <slot v-if="column.type === 'slot:el-form-item'" :name="column.name" :form="form" />
          </el-col>
        </template>
      </el-row>

      <div class="flex justify-end border-t border-slate-200 border-solid pt-4">
        <el-button :icon="Close" @click="() => (popoverFilter = false)" type="danger" plain
          >Batal</el-button
        >
        <el-button :icon="RefreshLeft" @click="resetForm" type="primary" plain>Reset</el-button>
        <el-button @click="emits('onSubmit')" :icon="Promotion" type="primary" class="ml-4">
          Filter
        </el-button>
      </div>
    </el-form>
  </el-drawer>
</template>
