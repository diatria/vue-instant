import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Form from '../views/Form.vue'
import Table from '../views/Table.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/form',
      name: 'form',
      component: Form
    },
    {
      path: '/table/:id?',
      name: 'table',
      component: Table
    }
  ],
})

export default router
