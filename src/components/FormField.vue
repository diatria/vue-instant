<script lang="ts" setup>
import { Check, Close } from '@element-plus/icons-vue'
import AppDatePicker from '@/components/AppDatePicker.vue'
import AppFormSelect from '@/components/AppFormSelect.vue'
import AppInput from '@/components/AppInput.vue'
import type { ComFormColumn } from '../types'

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
  <AppInput
    v-if="column.type === 'text'"
    :model-value="modelValue"
    @update:model-value="handleChange"
    :disabled="disabled || column.disabled"
    :placeholder="column.placeholder"
  />

  <!-- Type Textarea -->
  <AppInput
    v-else-if="column.type === 'textarea'"
    :model-value="modelValue"
    @update:model-value="handleChange"
    type="textarea"
    :disabled="disabled || column.disabled"
    :placeholder="column.placeholder"
  />

  <!-- Type Select -->
  <AppFormSelect
    v-else-if="column.type === 'select'"
    :model-value="modelValue"
    @update:model-value="handleChange"
    :disabled="disabled || column.disabled"
    :fetch_on_click="column.select?.fetch_on_click"
    :field_label="column.select?.field_label ?? 'name'"
    :field_value="column.select?.field_value ?? 'id'"
    :field_search_column="column.select?.field_search_column"
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
    v-else-if="column.type === 'checkbox:label' && column.checkbox?.options"
    :model-value="modelValue"
    @update:model-value="handleChange"
  >
    <el-checkbox
      v-if="column.checkbox?.options"
      v-for="(checkbox, index) in column.checkbox?.options"
      :label="checkbox.label"
      :value="checkbox.value"
      :key="`checkbox-${index}`"
    />
  </el-checkbox-group>

  <el-checkbox
    v-else-if="column.type === 'checkbox:label' && column.checkbox?.option"
    :model-value="modelValue"
    :label="column.checkbox?.option.label"
    :value="column.checkbox?.option.value"
  />

  <!-- Type Password -->
  <AppInput
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
  <AppDatePicker
    v-else-if="column.type === 'date'"
    :model-value="modelValue"
    :placeholder="column.placeholder"
    :value-format="column.date?.value_format"
    @update:model-value="handleChange"
    type="date"
    class="w-full!"
  />

  <!-- Type Date Time -->
  <AppDatePicker
    v-else-if="column.type === 'date-time'"
    :model-value="modelValue"
    @update:model-value="handleChange"
    :placeholder="column.placeholder"
    type="datetime"
    value-format="YYYY-MM-DD HH:mm:ss"
    class="w-full!"
  />

  <!-- Type Time -->
  <AppDatePicker
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
