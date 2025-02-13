<script>
import {getNeeds, getSkills} from '@/services/httpClient';
import { useAuthStore } from '@/stores/authStore';
import { mapState } from 'pinia';

export default {
  data() {
    return {
      skills: [],
      error: '',
    }
  },
  async mounted() {
    try {
      this.skills = await getSkills();
    } catch (e) {
      this.error = e.message;
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
  <h2> Liste des compétences</h2>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-for="skill in skills" :key="skill.id" class="skill-info">
      <h3>{{ skill.title }}</h3>
      <p>{{ skill.description }}</p>
  </div>
</template>

<style lang="scss" scoped>
</style>
