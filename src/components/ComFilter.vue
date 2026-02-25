<script lang="ts" setup>
import { type ComFormColumn } from '../types'
import { type UploadInstance } from 'element-plus'
import { Check, Close, Promotion, RefreshLeft } from '@element-plus/icons-vue'
import { reactive, ref, nextTick } from 'vue'
import ComSelect from './ComSelect.vue'

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
            <el-form-item
              v-if="!['slot:el-form-item'].includes(column.type)"
              :label="column.label"
              :prop="column.name"
            >
              <!-- Type Text -->
              <el-input
                v-if="column.type === 'text'"
                v-model="form[column.name]"
                :disabled="column.disabled"
                :placeholder="column.placeholder"
                @change="(val: any) => onChange(column, val)"
              />

              <!-- Type Textarea -->
              <el-input
                v-if="column.type === 'textarea'"
                v-model="form[column.name]"
                type="textarea"
                :disabled="column.disabled"
                :placeholder="column.placeholder"
                @change="(val: any) => onChange(column, val)"
              />

              <!-- Type Select -->
              <ComSelect
                v-if="column.type === 'select'"
                v-model="form[column.name]"
                :disabled="column.disabled"
                :fetch-on-click="column.select?.fetch_on_click"
                :field-label="column.select?.field_label ?? 'name'"
                :field-value="column.select?.field_value ?? 'id'"
                :field-search-column="column.select?.field_search_column"
                :options="column.select?.options"
                :placeholder="column.placeholder"
                :remote="column.select?.remote"
                :url="column.select?.url"
                @change="(val: any) => onChange(column, val)"
              />

              <!-- Radio -->
              <el-radio-group
                v-if="column.type === 'radio'"
                v-model="form[column.name]"
                @change="(val: any) => onChange(column, val)"
              >
                <el-radio
                  v-for="(radio, index) in column.options"
                  :value="radio.value"
                  :key="`radio-${index}`"
                  >{{ radio.label }}</el-radio
                >
              </el-radio-group>

              <!-- Checkbox -->
              <el-checkbox-group
                v-if="column.type === 'checkbox:label' && column.options?.length"
                v-model="form[column.name]"
                @change="(val: any) => onChange(column, val)"
              >
                <el-checkbox
                  v-for="(checkbox, index) in column.options"
                  :label="checkbox.label"
                  :value="checkbox.value"
                  :key="`checkbox-${index}`"
                />
              </el-checkbox-group>

              <!-- Type Password -->
              <el-input
                v-if="column.type === 'password'"
                v-model="form[column.name]"
                :placeholder="column.placeholder"
                @change="(val: any) => onChange(column, val)"
                type="password"
                show-password
              />

              <!-- Type Switch -->
              <el-switch
                v-if="column.type === 'switch'"
                v-model="form[column.name]"
                @change="(val: any) => onChange(column, val)"
                :active-icon="Check"
                :inactive-icon="Close"
              />

              <!-- Type Date -->
              <el-date-picker
                v-if="column.type === 'date'"
                v-model="form[column.name]"
                @change="(val: any) => onChange(column, val)"
                type="date"
                :placeholder="column.placeholder"
              />

              <!-- Type Date Time -->
              <el-date-picker
                v-if="column.type === 'date-time'"
                v-model="form[column.name]"
                @change="(val: any) => onChange(column, val)"
                :placeholder="column.placeholder"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                class="w-full!"
              />

              <!-- Type Time -->
              <el-time-picker
                v-if="column.type === 'time'"
                v-model="form[column.name]"
                :placeholder="column.placeholder"
                @change="(val: any) => onChange(column, val)"
                value-format="HH:mm:ss"
                class="w-full!"
              />

              <!-- Type Inject Html -->
              <slot v-if="column.type === 'slot'" :name="column.name" :form="form" />
            </el-form-item>

            <!-- Checkbox without label -->
            <el-form-item v-if="column.type === 'checkbox' && !column.options" :prop="column.name">
              <el-checkbox
                v-if="column.type === 'checkbox'"
                v-model="form[column.name]"
                @change="(val: any) => onChange(column, val)"
              />
            </el-form-item>

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
