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
/***** SECTION PRINCIPALE *****/
.user-needs {
  background-color: var(--neutral-beige);
  border: 2px solid var(--accent-green);
  border-left: 5px solid var(--primary-blue);
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  margin: 1rem auto;
  padding: 1.5rem;
  max-width: 500px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
  }

  p {
    margin: 0.5rem 0;
    color: #333;
    font-size: 1.2rem;

    &:first-child {
      font-weight: bold;
      color: var(--primary-blue);
    }
  }

  button {
    margin-top: 1rem;
    padding: 0.7rem 1.5rem;
    font-size: 1.1rem;
    color: #fff;
    background: linear-gradient(135deg, var(--primary-blue), var(--accent-green));
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: var(--accent-green);
      transform: translateY(-5px);
    }

    &:active {
      transform: translateY(3px);
    }
  }
}

/***** SECTION ERREUR *****/
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

/***** ADAPTATION RESPONSIVE *****/
@media (max-width: 500px) {
  .user-needs {
    padding: 1rem;

    p {
      font-size: 1rem;
    }

    button {
      font-size: 1rem;
      width: 100%;
    }
  }
}

</style>
