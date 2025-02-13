<script>
import { getNeedsCustomer } from '@/services/httpClient';
import { useAuthStore } from '@/stores/authStore';
import { mapState } from 'pinia';

export default {
  data() {
    return {
      needs: [],
      error: '',
      currentPage: 1,
      itemsPerPage: 5,
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
    ...mapState(useAuthStore, ['isAdmin', 'id_user', 'email_user']),

    // Calcul des besoins paginés
    paginatedNeeds() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.needs.slice(start, end);
    },

    // Calcul du nombre total de pages
    totalPages() {
      return Math.ceil(this.needs.length / this.itemsPerPage);
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    }
  }
}
</script>

<template>
  <!-- Titre principal -->
  <h2 class="title">Liste de vos besoins ({{ email_user }})</h2>

  <!-- Affichage d'erreur -->
  <div class="error" v-if="error">{{ error }}</div>

  <!-- Liste des besoins paginés -->
  <div class="liste">
    <div v-for="need in paginatedNeeds" :key="need.id" class="need-card">
      <h3>{{ need.description }}</h3>
      <div class="skill-info">
        <h4>Compétence requise :</h4>
        <p>{{ need.skill.title }} - {{ need.skill.description }}</p>
      </div>
    </div>
  </div>

  <!-- Pagination -->
  <div class="pagination" v-if="totalPages > 1">
    <button @click="prevPage" :disabled="currentPage === 1" class="page-btn">Précédent</button>
    <span class="page-info">Page {{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages" class="page-btn">Suivant</button>
  </div>
</template>

<style lang="scss" scoped>
/* Titre principal */
.title {
  text-align: center;
  color: var(--primary-blue);
  font-size: 2rem;
  margin-bottom: 2rem;
  border-bottom: 3px solid var(--accent-green);
  padding-bottom: 1rem;
}

/* Message d'erreur */
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

/* Liste des besoins */
.liste {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;

  .need-card {
    background-color: var(--neutral-beige);
    border: 2px solid var(--accent-green);
    border-radius: 15px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    padding: 1.5rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
    }

    h3 {
      color: var(--primary-blue);
      margin-bottom: 1rem;
      font-size: 1.5rem;
      border-bottom: 1px solid var(--accent-green);
      padding-bottom: 0.5rem;
      text-align: center;
    }

    .skill-info {
      margin-top: 1rem;

      h4 {
        color: var(--primary-blue);
        margin-bottom: 0.5rem;
        font-size: 1.3rem;
      }

      p {
        color: #333;
        font-size: 1.1rem;
        margin: 0;
        line-height: 1.4;
      }
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
    background: linear-gradient(135deg, var(--primary-blue), var(--accent-green));
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover:enabled {
      filter: brightness(1.2);
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
    font-weight: bold;
  }
}

/* Responsive */
@media (max-width: 500px) {
  .title {
    font-size: 1.5rem;
  }

  .need-card {
    padding: 1rem;
    h3 {
      font-size: 1.3rem;
    }
    .skill-info h4 {
      font-size: 1rem;
    }
    .skill-info p {
      font-size: 0.95rem;
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
</style>
