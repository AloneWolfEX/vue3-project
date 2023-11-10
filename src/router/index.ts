import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(),
  // history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/feature',
      name: 'feature',
      component: () => import('@/views/HomeIndex.vue'),
      redirect: { name: 'pdf-demo' },
      children: [
        {
          path: 'pdf-demo',
          name: 'pdf-demo',
          component: () => import('@/views/feature/PDFDemo.vue'),
        }
      ]
    }
  ]
})

export default router
