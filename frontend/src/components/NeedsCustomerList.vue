<script>
import { getNeeds, getNeedsCustomer } from '@/services/httpClient';
import { useAuthStore } from '@/stores/authStore';
import { mapState } from 'pinia';

export default {
  data() {
    return {
      needs: [],
      error: '',
    }
  },
  async mounted() {
    try {
      this.needs = await getNeedsCustomer(this.id_user);
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
  <h2> Liste de vos besoins ({{ email_user }})</h2>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-for="need in needs" :key="need.id" class="need-card">
    <h3>{{ need.description }}</h3>

    <div class="skill-info">
      <h4>Compétence requise:</h4>
      <p>{{ need.skill.title }} - {{ need.skill.description }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.need-card {
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
}
</style>
