<script lang="ts" setup>
import { Check, Close } from '@element-plus/icons-vue'
import type { ComFormColumn } from '../types'
import ComSelect from './ComSelect.vue'

const props = defineProps<{
  column: ComFormColumn
  modelValue: any
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue', 'change'])

const handleChange = (val: any) => {
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<template>
  <!-- Type Text -->
  <el-input
    v-if="column.type === 'text'"
    :model-value="modelValue"
    @update:model-value="handleChange"
    :disabled="disabled || column.disabled"
    :placeholder="column.placeholder"
  />

  <!-- Type Textarea -->
  <el-input
    v-else-if="column.type === 'textarea'"
    :model-value="modelValue"
    @update:model-value="handleChange"
    type="textarea"
    :disabled="disabled || column.disabled"
    :placeholder="column.placeholder"
  />

  <!-- Type Select -->
  <ComSelect
    v-else-if="column.type === 'select'"
    :model-value="modelValue"
    @update:model-value="handleChange"
    :disabled="disabled || column.disabled"
    :fetch-on-click="column.select?.fetch_on_click"
    :field-label="column.select?.field_label ?? 'name'"
    :field-value="column.select?.field_value ?? 'id'"
    :field-search-column="column.select?.field_search_column"
    :options="column.select?.options"
    :placeholder="column.placeholder"
    :remote="column.select?.remote"
    :url="column.select?.url"
  />

  <!-- Radio -->
  <el-radio-group
    v-else-if="column.type === 'radio'"
    :model-value="modelValue"
    @update:model-value="handleChange"
  >
    <el-radio
      v-for="(radio, index) in column.options"
      :value="radio.value"
      :key="`radio-${index}`"
      >{{ radio.label }}</el-radio
    >
  </el-radio-group>

  <!-- Checkbox with labels -->
  <el-checkbox-group
    v-else-if="column.type === 'checkbox:label' && column.options?.length"
    :model-value="modelValue"
    @update:model-value="handleChange"
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
    v-else-if="column.type === 'password'"
    :model-value="modelValue"
    @update:model-value="handleChange"
    :placeholder="column.placeholder"
    type="password"
    show-password
  />

  <!-- Type Switch -->
  <el-switch
    v-else-if="column.type === 'switch'"
    :model-value="modelValue"
    @update:model-value="handleChange"
    :active-icon="Check"
    :inactive-icon="Close"
  />

  <!-- Type Date -->
  <el-date-picker
    v-else-if="column.type === 'date'"
    :model-value="modelValue"
    @update:model-value="handleChange"
    type="date"
    :placeholder="column.placeholder"
  />

  <!-- Type Date Time -->
  <el-date-picker
    v-else-if="column.type === 'date-time'"
    :model-value="modelValue"
    @update:model-value="handleChange"
    :placeholder="column.placeholder"
    type="datetime"
    value-format="YYYY-MM-DD HH:mm:ss"
    class="w-full!"
  />

  <!-- Type Time -->
  <el-time-picker
    v-else-if="column.type === 'time'"
    :model-value="modelValue"
    @update:model-value="handleChange"
    :placeholder="column.placeholder"
    value-format="HH:mm:ss"
    class="w-full!"
  />

  <!-- Checkbox without label -->
  <el-checkbox
    v-else-if="column.type === 'checkbox' && !column.options"
    :model-value="modelValue"
    @update:model-value="handleChange"
  />
</template>
