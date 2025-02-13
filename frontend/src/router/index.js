import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateBesoin from '@/components/CreateBesoin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/createbesoin',
      name: 'create-besoin',
      component: CreateBesoin,
    },
  ],
})

export default router
