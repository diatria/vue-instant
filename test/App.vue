<template>

  <ComForm
    fetch-url=""
    store-url=""
    :columns="[
      { name: 'Pilih', type: 'select', select: { options: [{ name: 'Nanda Putri W', id: 1 }] } },
    ]"
  >

  </ComForm>

</template>

<script lang="ts" setup>
  import ComForm from '../src/components/ComForm.vue';
</script>

