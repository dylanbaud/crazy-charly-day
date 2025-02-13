<script>
import { getEmployees } from '@/services/httpClient'
import { useAuthStore } from '@/stores/authStore'
import { mapState } from 'pinia'

export default {
  data() {
    return {
      employees: [],
      error: '',
    }
  },
  async mounted() {
    try {
      this.employees = await getEmployees(this.id_user)
    } catch (e) {
      this.error = e.message
    }
  },
  computed: {
    ...mapState(useAuthStore, ['isAdmin']),
    ...mapState(useAuthStore, ['id_user']),
    ...mapState(useAuthStore, ['email_user']),
  },
}
</script>

<template>
  <h2>Liste des employés</h2>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-for="employee in employees" :key="employee.id">
    <p>Email: {{ employee.email }}</p>
    <p>Prénom: {{ employee.first_name }}</p>
    <p>Nom: {{ employee.last_name }}</p>
    <p>Numéro de téléphone: {{ employee.tel }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
