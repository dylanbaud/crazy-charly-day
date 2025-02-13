import { defineStore } from 'pinia'

export const useAuthStore = defineStore('counter', {
  state: () => ({
    id_user: null,
    role_user: null,
    email_user: null,
  }),
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
  },
})
