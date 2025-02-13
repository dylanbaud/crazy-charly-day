<script>
import {deleteSkill, getSkills} from '@/services/httpClient';
import { useAuthStore } from '@/stores/authStore';
import { mapState } from 'pinia';

export default {
  methods: {
    async load() {
      try {
        this.skills = await getSkills();
      } catch (e) {
        this.error = e.message;
      }
    },
    async deleteSkillAndUpdate(skillId) {
      await deleteSkill(skillId);
      await this.load();
    },
  },
  data() {
    return {
      skills: [],
      error: '',
    }
  },
  async mounted() {
    await this.load()
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
      <button @click="deleteSkillAndUpdate(skill.id)">Supprimer</button>
  </div>
</template>

<style lang="scss" scoped>
</style>
