import { defineStore } from 'pinia'

export const useAuthStore = defineStore('counter', {
  state: () => ({
    id_user: null,
    role_user: null,
    email_user: null,
  }),
  getters: {
    isCustomerValue() {
      return this.role_user === 'customer'
    },
    isAdmin() {
      return this.role_user === 'administrator'
    },
  },
  actions: {
    setIdUser(id) {
      this.id_user = id
    },
    setRoleUser(role) {
      this.role_user = role
    },
    setEmailUser(email) {
      this.email_user = email
    },
    isCustomer() {
      return this.role_user === 'customer'
    },
  },
})
