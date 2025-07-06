<script lang="ts" setup>
  const model = defineModel<boolean>();
  const props = defineProps<{
    message: string;
  }>();
  const emit = defineEmits(['update:modelValue', 'onConfirm']);
</script>

<template>
   <el-dialog v-model="model" title="Penting!" width="500"
    > <span>{{ props.message }}</span
    > <template #footer
      >
      <div class="dialog-footer">
         <el-button @click="emit('update:modelValue', false)">Cancel</el-button> <el-button
          type="primary"
          @click="emit('onConfirm', true)"
          >Confirm</el-button
        >
      </div>
       </template
    > </el-dialog
  >
</template>

