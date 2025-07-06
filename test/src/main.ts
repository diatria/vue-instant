import './assets/main.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import { setAppConfig } from '@/config/runtimeConfig'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'

setAppConfig({
  apiUrl: '',
  tokenName: '',
  http: {
    withCredentials: false
  }
})

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app')
