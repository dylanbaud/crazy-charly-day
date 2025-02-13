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

.need-card {
  background-color: var(--neutral-beige);
  border: 2px solid var(--accent-green);
  border-radius: 15px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  margin: 1.5rem auto;
  padding: 1.5rem 2rem;
  max-width: 700px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 14px rgba(0, 0, 0, 0.25);
  }

  h3 {
    color: var(--primary-blue);
    margin-bottom: 1rem;
    font-size: 1.4rem;
    border-bottom: 1px solid var(--accent-green);
    padding-bottom: 0.5rem;
  }

  .skill-info {
    margin-top: 1rem;

    h4 {
      color: var(--primary-blue);
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }

    p {
      color: #333;
      font-size: 1rem;
      margin: 0;
    }
  }
}

@media (max-width: 500px) {
  h2 {
    font-size: 1.5rem;
  }

  .need-card {
    padding: 1rem 1.5rem;

    h3 {
      font-size: 1.2rem;
    }

    .skill-info h4 {
      font-size: 1rem;
    }

    .skill-info p {
      font-size: 0.95rem;
    }
  }
}

</style>
