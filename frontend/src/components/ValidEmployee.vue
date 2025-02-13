<script>
import { getEmployees, getUnvalidatedEmployees, validateEmployee } from '@/services/httpClient'
import { useAuthStore } from '@/stores/authStore'
import { mapState } from 'pinia'

export default {
  methods: { validateEmployee },
  data() {
    return {
      employees: {},
      error: '',
    }
  },
  async mounted() {
    try {
      this.employees = await getUnvalidatedEmployees()
    } catch (e) {
      this.error = e.message
    }
  },
  computed: {
    ...mapState(useAuthStore, ['isAdmin', 'id_user', 'email_user']),
  },
}
</script>

<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-for="employee in employees" :key="employee.id_user" class="user-needs">
    <p>{{ employee.email }}</p>
    <p>{{ employee.last_name }}</p>
    <p>{{ employee.first_name }}</p>
    <button @click="validateEmployee(employee.id)">Valider</button>
  </div>
</template>

<style lang="scss" scoped>
.user-needs {
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
}

.need-card {
  border: 1px solid gray;
  margin: 5px 0;
  padding: 5px;
}
</style>
