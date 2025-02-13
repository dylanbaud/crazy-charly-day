<script>
import { getNeeds } from '@/services/httpClient'
import { useAuthStore } from '@/stores/authStore'
import { mapState } from 'pinia'

export default {
  data() {
    return {
      groupedNeeds: {},
      error: '',
    }
  },
  async mounted() {
    try {
      const needs = await getNeeds()
      this.groupedNeeds = this.groupNeedsByUser(needs)
    } catch (e) {
      this.error = e.message
    }
  },
  computed: {
    ...mapState(useAuthStore, ['isAdmin', 'id_user', 'email_user']),
  },
  methods: {
    groupNeedsByUser(needs) {
      const grouped = needs.reduce((acc, need) => {
        const userId = need.account.id
        if (!acc[userId]) {
          acc[userId] = {
            name: `${need.account.last_name} ${need.account.first_name}`,
            needs: [],
          }
        }
        acc[userId].needs.push(need)
        return acc
      }, {})

      // Trier les utilisateurs par leur ID
      return Object.keys(grouped)
        .sort((a, b) => a - b)
        .reduce((sortedAcc, key) => {
          sortedAcc[key] = grouped[key]
          return sortedAcc
        }, {})
    },
  },
}
</script>

<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-for="(user, userId) in groupedNeeds" :key="userId" class="user-needs">
    <h2>Liste des besoins de {{ user.name }}</h2>
    <div v-for="need in user.needs" :key="need.id" class="need-card">
      <h3>{{ need.description }}</h3>
      <div class="skill-info">
        <h4>Compétence requise:</h4>
        <p>{{ need.skill.title }} - {{ need.skill.description }}</p>
      </div>
    </div>
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
