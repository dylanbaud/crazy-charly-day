<script>
import { useAuthStore } from '@/stores/authStore'
import { mapState } from 'pinia'
import { getBacktracking, getGaleEtShapley, getGlouton } from '@/services/httpClient.js'

export default {
  data() {
    return {
      algorithms: {},
      result: {},
    }
  },
  computed: {
    ...mapState(useAuthStore, ['isAdmin']),
    ...mapState(useAuthStore, ['id_user']),
    ...mapState(useAuthStore, ['email_user']),
  },
  async mounted() {
    this.algorithms = {
      backtracking: {
        name: 'Backtracking',
        action: await getBacktracking(),
      },
      galeEtShapley: {
        name: 'Gale et Shapley',
        action: await getGaleEtShapley(),
      },
      glouton: {
        name: 'Glouton',
        action: await getGlouton(),
      },
    }
  },
}
</script>

<template>
  <h2>Affecter les tâches</h2>
  <div v-for="(algorithm, key) in algorithms" :key="key">
    <button @click="result = algorithm.action">
      {{ algorithm.name }}
    </button>
  </div>
  <div v-if="result">
    <h3>Résultat</h3>
    <p>Score total : {{ result.totalScore }}</p>
    <div v-for="(assignment, key) in result.assignments" :key="key">
      <p>
        {{ assignment.employee.last_name }} {{ assignment.employee.first_name }} a été affecté à la
        tache {{ assignment.need.description }} de {{ assignment.need.account.last_name }}
        {{ assignment.need.account.first_name }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
