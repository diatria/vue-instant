<script lang="ts" setup>
import ComForm from '@/components/ComForm.vue'
</script>

<template>
  <ComForm
    url="/"
    :columns="[
      { name: 'text', label: 'TEXT', type: 'text' },
      { name: 'textarea', label: 'TEXTAREA', type: 'textarea' },
      {
        name: 'select_static',
        label: 'SELECT STATIC',
        type: 'select',
        select: {
          options: [
            { id: 1, name: 'Apple' },
            { id: 2, name: 'Google' },
          ],
        },
      },
      {
        name: 'select_fetch',
        label: 'SELECT FETCH',
        type: 'select',
        select: {
          url: 'http://localhost:8006/api/courses',
          fetch_on_click: true,
          field_label: 'title',
        },
      },
      {
        name: 'select_remote',
        label: 'SELECT REMOTE',
        type: 'select',
        select: {
          url: 'http://localhost:8006/api/courses',
          fetch_on_click: true,
          field_label: 'title',
          remote: true,
        },
        placeholder: 'Ketik untuk mencari...',
      },
    ]"
  >
  </ComForm>
</template>
