import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import HomeIndex from '@/views/HomeIndex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(),
  // history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'app',
      component: HomeIndex,
      children: [
        {
          path: 'feature',
          name: 'feature',
          component: () => import('@/views/ComponentIndex.vue'),
          redirect: { name: 'pdf-demo' },
          meta: {
            title: '功能组件'
          },
          children: [
            {
              path: 'pdf-demo',
              name: 'pdf-demo',
              component: () => import('@/views/feature/PDFDemo.vue'),
              meta: {
                title: 'PDF导出'
              }
            },
            {
              path: 'img-cropper',
              name: 'img-cropper',
              component: () => import('@/views/feature/ImgCropper.vue'),
              meta: {
                title: '图片裁剪'
              }
            },
          ]
        },
        {
          path: 'others',
          name: 'others',
          component: () => import('@/views/ComponentIndex.vue'),
          meta: {
            title: '其他'
          },
          children: [
            {
              path: 'layout',
              name: 'layout',
              component: () => import('@/views/others/LayoutIndex.vue'),
              meta: {
                title: '排版'
              }
            },
          ]
        },
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        title: '主页'
      }
    }
  ]
})

export default router
