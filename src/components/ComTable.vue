<script lang="ts" setup>
  import type { Query } from '../types';
  import { httpGet, httpHandleError, replaceString, url } from '../utils/helpers';
  import { Edit, MoreFilled, View } from '@element-plus/icons-vue';
  import { onMounted, reactive, ref } from 'vue';

  const emits = defineEmits(['tableSelections']);
  const props = defineProps<{
    apiRelations?: Array<string>;
    apiColumns?: Array<string>;
    apiQuery?: Query['queries'];
    apiOrder?: string;
    editUrl?: string;
    fetchUrl: string;
    removeUrl?: string;
    tableColumns: Array<{
      field: string;
      label: string;
      value?: unknown;
      type?: 'slot';
      width?: string;
      align?: 'left' | 'center' | 'right';
    }>;
    viewUrl?: string;
  }>();

  const data = ref<Array<unknown>>([]);
  const totalData = ref(0);
  const pageSize = ref(10);
  const currentPage = ref(1);
  const loading = ref(true);

  const state = reactive({
    data: {},
    collection: {
      data: [],
    },
  });

  // Methods
  function changePage() {
    fetchingDataFromServer();
  }

  function fetchingDataFromServer() {
    loading.value = true;
    let url = props.fetchUrl;
    if (!/https?:\/\//i.test(props.fetchUrl)) {
      url = `${import.meta.env.VITE_API_URL}/${props.fetchUrl}`;
    }
    httpGet(url, {
      params: {
        relations: props.apiRelations,
        columns: props.apiColumns,
        pagination_length: pageSize.value,
        page: currentPage.value,
        queries: props.apiQuery,
        order: props.apiOrder,
      },
    })
      .then(result => {
        loading.value = false;
        data.value = result.data.data.data;
        totalData.value = result.data.data.total;

        state.collection = result.data.data;
      })
      .catch(error => {
        loading.value = false;
        httpHandleError(error);
      });
  }

  function handleSelectionChange(val: Array<{ id: unknown }>) {
    emits(
      'tableSelections',
      val.map(item => item.id)
    );
  }

  function refresh() {
    fetchingDataFromServer();
  }

  onMounted(() => {
    fetchingDataFromServer();
  });

  defineExpose({ refresh });
</script>

<template>

  <div>
     <el-table
      v-loading="loading"
      :data="data"
      @selection-change="handleSelectionChange"
      style="width: 100%"
      > <el-table-column type="selection" width="55" fixed="left" /> <template
        v-for="(column, index) of props.tableColumns"
        :key="index"
        > <el-table-column
          v-if="!column.value && column.type !== 'slot'"
          :prop="column.field"
          :label="column.label"
          :width="column.width"
          :align="column.align ?? 'left'"
        /> <!-- Custom value --> <el-table-column
          v-if="column.value && column.type !== 'slot'"
          :prop="column.field"
          :label="column.label"
          :width="column.width"
          :align="column.align ?? 'left'"
          > <template #default="scope">{{
            typeof column.value === 'function' ? column.value(scope.row) : ''
          }}</template
          > </el-table-column
        > <!-- Slot --> <el-table-column
          v-if="column.type === 'slot'"
          :prop="column.field"
          :label="column.label"
          :width="column.width"
          :align="column.align ?? 'left'"
          > <template #default="scope"><slot :name="column.field" :row="scope.row" /></template>
          </el-table-column
        > </template
      > <el-table-column width="55" fixed="right"
        > <template #default="scope"
          >
          <div
            class="hover:cursor-pointer hover:bg-slate-200 justify-center rounded flex items-center"
          >
             <el-popover placement="bottom" :width="150" popper-class="!p-0" trigger="click"
              > <template #reference
                > <el-icon><MoreFilled /></el-icon> </template
              >
              <ul>
                 <!-- Action Button View --> <RouterLink
                  v-if="props.viewUrl"
                  :to="url('/' + replaceString(props.viewUrl, scope.row))"
                  target="_blank"
                  >
                  <li class="flex items-center py-2 px-4 hover:cursor-pointer hover:bg-slate-100">
                     <el-icon><View /></el-icon> <span class="ml-2">Lihat</span>
                  </li>
                   </RouterLink
                > <!-- Action Button Edit --> <RouterLink
                  v-if="props.editUrl"
                  :to="url('/' + replaceString(props.editUrl ?? '', scope.row))"
                  >
                  <li class="flex items-center py-2 px-4 hover:cursor-pointer hover:bg-slate-100">
                     <el-icon><Edit /></el-icon> <span class="ml-2">Ubah</span>
                  </li>
                   </RouterLink
                > <slot name="action" :row="scope.row"></slot
                >
              </ul>
               </el-popover
            >
          </div>
           </template
        > </el-table-column
      > </el-table
    >
    <div class="flex justify-end mt-4">
       <el-pagination
        v-model:page-size="pageSize"
        v-model:current-page="currentPage"
        :total="totalData"
        :page-sizes="[10, 25, 50, 75, 100]"
        @change="changePage"
        layout="sizes, total, prev, pager, next"
      />
    </div>

  </div>

</template>

