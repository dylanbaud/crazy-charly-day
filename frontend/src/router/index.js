import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateBesoin from '@/components/CreateNeed.vue'
import CreateSkills from '@/components/CreateSkills.vue'
import LoginComp from '@/components/LoginComp.vue'
import { useAuthStore } from '@/stores/authStore'
import CreateEmployee from '@/components/CreateEmployee.vue'
import NeedsCustomerList from '@/components/NeedsCustomerList.vue'
import EmployeesList from '@/components/EmployeesList.vue'
import SkillsList from '@/components/SkillsList.vue'
import NeedsList from '@/components/NeedsList.vue'
import AffectTask from '@/components/AffectTask.vue'
import ValidEmployee from '@/components/ValidEmployee.vue'

const router = createRouter({
<<<<<<< HEAD
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/createNeed',
            name: 'create-need',
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
=======
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
      path: '/createemployee',
      name: 'create-employee',
      component: CreateEmployee,
      meta: { requireAdmin: true },
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
    {
      path: '/validemployee',
      name: 'valid-employee',
      component: ValidEmployee,
      meta: { requireAdmin: true },
    },
  ],
>>>>>>> e4ea3781a5594eee98ca51c36831a86514ff5d93
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