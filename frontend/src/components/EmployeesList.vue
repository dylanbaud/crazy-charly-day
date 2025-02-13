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

  <div class="liste">
    <div v-for="employee in employees" :key="employee.id" class="employee-card">
      <p>Email: {{ employee.email }}</p>
      <p>Prénom: {{ employee.first_name }}</p>
      <p>Nom: {{ employee.last_name }}</p>
      <p>Numéro de téléphone: {{ employee.tel }}</p>
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
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.employee-card {
  background-color: var(--neutral-beige);
  border: 2px solid var(--accent-green);
  border-radius: 15px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 100%;
  overflow: hidden;
  word-wrap: break-word;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
  }

  p {
    margin: 0.5rem 0;
    font-size: 1.1rem;

    &:first-of-type {
      font-weight: bold;
      color: var(--primary-blue);
    }
  }
}

@media (max-width: 500px) {
  .employee-card {
    padding: 1rem;
    p {
      font-size: 1rem;
    }
  }
}


@media (max-width: 500px) {
  h2 {
    font-size: 1.5rem;
  }

}

</style>
