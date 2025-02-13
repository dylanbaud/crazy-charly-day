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
  <div class="liste">
    <div v-for="skill in skills" :key="skill.id" class="skill-info">
        <h3>{{ skill.title }}</h3>
        <p>{{ skill.description }}</p>
        <button @click="delet">Delet </button>

    </div>
  </div>
</template>

<style lang="scss" scoped>

h2 {
  text-align: center;
  color: var(--primary-blue);
  font-size: 2rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--accent-green);
  padding-bottom: 1rem;
}

.error {
  color: red;
  text-align: center;
  font-weight: bold;
  margin-bottom: 1.5rem;
  background-color: #ffe6e6;
  padding: 1rem;
  border: 2px solid red;
  border-radius: 10px;
}

.liste {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.skill-info {
  background-color: var(--neutral-beige);
  border: 2px solid var(--accent-green);
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  word-wrap: break-word;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
  }

  h3 {
    color: var(--primary-blue);
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--accent-green);
    padding-bottom: 0.5rem;
    font-size: 1.5rem;
  }

  p {
    color: #333;
    font-size: 1.1rem;
    margin: 0.5rem 0;
    line-height: 1.5;
  }
}

@media (max-width: 500px) {
  .skill-info {
    padding: 1rem;
    h3 {
      font-size: 1.3rem;
    }

    p {
      font-size: 1rem;
    }
  }
}

</style>
