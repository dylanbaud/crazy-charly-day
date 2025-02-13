import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateBesoin from '@/components/CreateBesoin.vue'
import CreateSkills from '@/components/CreateSkills.vue'
import LoginComp from '@/components/LoginComp.vue'
import { useAuthStore } from '@/stores/authStore'
import NeedsCustomerList from '@/components/NeedsCustomerList.vue'
import EmployeesList from '@/components/EmployeesList.vue'
import AffectTask from '@/components/AffectTask.vue'
import SkillsList from '@/components/SkillsList.vue'
import NeedsList from '@/components/NeedsList.vue'

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
    {
      path: '/needscustomerlist',
      name: 'needs-customer-list',
      component: NeedsCustomerList,
      meta: { requireCustomer: true },
    },
    {
      path: '/employeeslist',
      name: 'employees-list',
      component: EmployeesList,
      meta: { requireAdmin: true },
    },
    {
      path: '/skillsList',
      name: 'skills-list',
      component: SkillsList,
      meta: { requireAdmin: true },
    },
    {
      path: '/affecttask',
      name: 'affect-task',
      component: AffectTask,
      meta: { requireAdmin: true },
    },
    {
      path: '/needslist',
      name: 'needs-list',
      component: NeedsList,
      meta: { requireAdmin: true },
    },
  ],
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  if (to.meta.requireCustomer && !authStore.isCustomer()) {
    router.push({ name: 'login' })
    return false
  }
  if (to.meta.requireAdmin && !authStore.isAdmin) {
    router.push({ name: 'login' })
    return false
  }
  return true
})
export default router
