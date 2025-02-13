<script>
import { getSkills, deleteSkill } from '@/services/httpClient';
import { useAuthStore } from '@/stores/authStore';
import { mapState } from 'pinia';

export default {
  data() {
    return {
      skills: [],
      error: '',
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  async mounted() {
    await this.fetchSkills();
  },
  computed: {
    ...mapState(useAuthStore, ['isAdmin', 'id_user', 'email_user']),

    paginatedSkills() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.skills.slice(start, end);
    },

    // Nombre total de pages
    totalPages() {
      return Math.ceil(this.skills.length / this.itemsPerPage);
    }
  },
  methods: {
    async fetchSkills() {
      try {
        this.skills = await getSkills();
      } catch (e) {
        this.error = `Erreur de chargement des compétences : ${e.message}`;
      }
    },
    async deleteSkillAndUpdate(skillId) {
      const confirmation = confirm('Voulez-vous vraiment supprimer cette compétence ?');
      if (confirmation) {
        try {
          await deleteSkill(skillId);
          this.skills = this.skills.filter(skill => skill.id !== skillId);
          alert('Compétence supprimée avec succès.');
          // Recalculer les pages après suppression
          if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
          }
        } catch (e) {
          this.error = `Erreur lors de la suppression : ${e.message}`;
        }
      }
    },

    // Navigation entre les pages
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
}
</script>

<template>
  <h2>Liste des compétences</h2>
  <div class="error" v-if="error">{{ error }}</div>

  <!-- Affichage des compétences -->
  <div class="liste">
    <div v-for="skill in paginatedSkills" :key="skill.id" class="skill-info">
      <h3>{{ skill.title }}</h3>
      <p>{{ skill.description }}</p>
      <button class="delete-btn" @click="deleteSkillAndUpdate(skill.id)">Supprimer</button>
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
    text-align: center;
  }

  p {
    color: #333;
    font-size: 1.1rem;
    margin: 0.5rem 0;
    line-height: 1.5;
  }

  .delete-btn {
    margin-top: 1rem;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 10px;
    color: #fff;
    background-color: red;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: darkred;
      transform: translateY(-3px);
    }

    &:active {
      transform: translateY(1px);
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
  .skill-info {
    padding: 1rem;

    h3 {
      font-size: 1.3rem;
    }

    p {
      font-size: 1rem;
    }

    .delete-btn {
      width: 100%;
      font-size: 0.9rem;
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
