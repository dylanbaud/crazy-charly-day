<script>
import { getEmployees } from '@/services/httpClient'
import { useAuthStore } from '@/stores/authStore'
import { mapState } from 'pinia'

export default {
  data() {
    return {
      employees: [],
      error: '',
      currentPage: 1,
      itemsPerPage: 6,
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
    ...mapState(useAuthStore, ['isAdmin', 'id_user', 'email_user']),

    // Calcule les employés visibles sur la page actuelle
    paginatedEmployees() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.employees.slice(start, end);
    },

    // Nombre total de pages
    totalPages() {
      return Math.ceil(this.employees.length / this.itemsPerPage);
    }
  },
  methods: {
    // Navigation vers la page suivante
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    // Navigation vers la page précédente
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
}
</script>

<template>
  <h2>Liste des employés</h2>
  <div class="error" v-if="error">{{ error }}</div>

  <!-- Liste paginée des employés -->
  <div class="liste">
    <div v-for="employee in paginatedEmployees" :key="employee.id" class="employee-card">
      <p>Email: {{ employee.email }}</p>
      <p>Prénom: {{ employee.first_name }}</p>
      <p>Nom: {{ employee.last_name }}</p>
      <p>Numéro de téléphone: {{ employee.tel }}</p>
    </div>
  </div>

  <!-- Pagination -->
  <div class="pagination">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="page-btn"
    >
      Précédent
    </button>

    <span class="page-info">
      Page {{ currentPage }} / {{ totalPages }}
    </span>

    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="page-btn"
    >
      Suivant
    </button>
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1.5rem;

  .page-btn {
    padding: 0.6rem 1.5rem;
    border: none;
    border-radius: 10px;
    background-color: var(--primary-blue);
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover:enabled {
      background-color: var(--accent-green);
      transform: translateY(-3px);
    }

    &:disabled {
      background-color: var(--neutral-grey);
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  .page-info {
    font-size: 1.2rem;
    color: var(--primary-blue);
  }
}


@media (max-width: 500px) {
  .employee-card {
    padding: 1rem;
    p {
      font-size: 1rem;
    }
  }

  .pagination {
    flex-direction: column;
    gap: 1rem;

    .page-btn {
      width: 100%;
    }
  }
}

@media (max-width: 500px) {
  h2 {
    font-size: 1.5rem;
  }
}
</style>
