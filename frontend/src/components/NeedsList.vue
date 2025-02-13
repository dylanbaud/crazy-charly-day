<script>
import { getNeeds } from '@/services/httpClient';
import { useAuthStore } from '@/stores/authStore';
import { mapState } from 'pinia';

export default {
  data() {
    return {
      groupedNeeds: {},
      error: '',
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  async mounted() {
    try {
      const needs = await getNeeds();
      this.groupedNeeds = this.groupNeedsByUser(needs);
    } catch (e) {
      this.error = e.message;
    }
  },
  computed: {
    ...mapState(useAuthStore, ['isAdmin', 'id_user', 'email_user']),

    // Calcul dynamique du nombre total de pages
    totalPages() {
      let totalNeeds = 0;
      Object.values(this.groupedNeeds).forEach((user) => {
        totalNeeds += user.needs.length;
      });
      return Math.ceil(totalNeeds / this.itemsPerPage);
    },

    // Liste des besoins paginés
    paginatedNeeds() {
      const allNeeds = [];
      Object.values(this.groupedNeeds).forEach((user) => {
        allNeeds.push(...user.needs);
      });
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return allNeeds.slice(start, end);
    },
  },
  methods: {
    // Grouper les besoins par utilisateur
    groupNeedsByUser(needs) {
      const grouped = needs.reduce((acc, need) => {
        const userId = need.account.id;
        if (!acc[userId]) {
          acc[userId] = {
            name: `${need.account.last_name} ${need.account.first_name}`,
            needs: [],
          };
        }
        acc[userId].needs.push(need);
        return acc;
      }, {});

      return Object.keys(grouped)
        .sort((a, b) => a - b)
        .reduce((sorted, key) => {
          sorted[key] = grouped[key];
          return sorted;
        }, {});
    },

    // Navigation entre les pages
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
}
</script>

<template>
  <div v-if="error" class="error">{{ error }}</div>

  <!-- Affichage des besoins paginés -->
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
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1" class="page-btn">Précédent</button>
    <span class="page-info">Page {{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages" class="page-btn">Suivant</button>
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}
/* Liste des besoins */
.need-card {
  background-color: var(--neutral-beige);
  border: 2px solid var(--accent-green);
  border-radius: 15px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  margin: 1rem auto;
  max-width: 300px;
  height: 180px;
  overflow-y: auto;
  overflow-x: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  word-wrap: break-word;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
  }

  h3 {
    color: var(--primary-blue);
    margin-bottom: 1rem;
    font-size: 1.6rem;
    border-bottom: 1px solid var(--accent-green);
    padding-bottom: 0.5rem;
    text-align: center;
  }

  .skill-info {
    margin-top: 1rem;

    h4 {
      color: var(--primary-blue);
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }

    p {
      color: #333;
      font-size: 1.05rem;
      margin: 0;
      line-height: 1.4;
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
  h2 {
    font-size: 1.5rem;
  }

  .need-card {
    padding: 1rem 1.5rem;

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
