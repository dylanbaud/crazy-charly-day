import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateBesoin from '@/components/CreateBesoin.vue'
import CreateSkills from '@/components/CreateSkills.vue'
import LoginComp from '@/components/LoginComp.vue'
import { useAuthStore } from '@/stores/authStore'

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
      meta: { requireCustomer: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComp,
    },
    {
      path: '/createskills',
      name: 'create-skill',
      component: CreateSkills,
      meta: { requireCustomer: true },
    },
  ],
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  if (to.meta.requireCustomer && !authStore.isCustomer()) {
    router.push({ name: 'login' })
    return false
  }
  return true
})
export default router
