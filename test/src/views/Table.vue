<script setup lang="ts">
import ComTable from '@/components/ComTable.vue'
import { ref } from 'vue'

const comTableRef = ref()
</script>
<template>
  <ComTable
    :button-edit-url="(row) => ({ name: 'table', params: { id: row.id } })"
    :columns="[{ field: 'title', label: 'Judul' }]"
    url="http://localhost:8006/api/quizzes/table"
    delete-url="http://localhost:8006/api/quizzes"
    ref="comTableRef"
  >
    <!-- <template #buttonDelete>
      <el-button @click="comTableRef.remove()">Haaaapus</el-button>
    </template> -->
  </ComTable>
</template>
