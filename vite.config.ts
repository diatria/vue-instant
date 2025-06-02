import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.json',
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'VueInstant',
      fileName: format => `vue-instant.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue', 'element-plus', 'axios', 'dayjs', 'lodash'],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          axios: 'axios',
          dayjs: 'dayjs',
          'lodash-es': 'lodash',
        },
      },
    },
  },
});
