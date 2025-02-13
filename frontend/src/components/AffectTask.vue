<script>
import { useAuthStore } from '@/stores/authStore'
import { mapState } from 'pinia'
import { getBacktracking, getGaleEtShapley, getGlouton } from '@/services/httpClient.js'

export default {
  data() {
    return {
      algorithms: {},
      result: {},
    }
  },
  computed: {
    ...mapState(useAuthStore, ['isAdmin']),
    ...mapState(useAuthStore, ['id_user']),
    ...mapState(useAuthStore, ['email_user']),
  },
  async mounted() {
    this.algorithms = {
      backtracking: {
        name: 'Backtracking',
        action: await getBacktracking(),
      },
      galeEtShapley: {
        name: 'Gale et Shapley',
        action: await getGaleEtShapley(),
      },
      glouton: {
        name: 'Glouton',
        action: await getGlouton(),
      },
    }
  },
}
</script>

<template>
  <h2>Affecter les tâches</h2>
  <div id="algo">
    <div  v-for="(algorithm, key) in algorithms" :key="key">
      <button @click="result = algorithm.action">
        {{ algorithm.name }}
      </button>
    </div>
  </div>

  <div id="result" v-if="result">
    <h3>Résultat</h3>
    <p>Score total : {{ result.totalScore }}</p>
    <div class="liste">
      <div id="infos" v-for="(assignment, key) in result.assignments" :key="key">
        <p>
          {{ assignment.employee.last_name }} {{ assignment.employee.first_name }} a été affecté à la
          tache {{ assignment.need.description }} de {{ assignment.need.account.last_name }}
          {{ assignment.need.account.first_name }}
        </p>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
/* Titre principal */
h2 {
  text-align: center;
  color: var(--primary-blue);
  font-size: 2.5rem;
  margin-bottom: 2rem;
  border-bottom: 4px solid var(--accent-green);
  padding-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Section des algorithmes */
#algo {
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 1.5rem;
  margin: 2rem 0;

  button {
    padding: 1rem 2rem;
    background-color: var(--primary-blue);
    color: #fff;
    border: none;
    border-radius: 15px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

    &:hover {
      background-color: var(--accent-green);
      transform: translateY(-5px);
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;

    button {
      width: 80%;
    }
  }
}

/* Section des résultats */
#result {
  margin-top: 3rem;
  background-color: var(--neutral-beige);
  border: 2px solid var(--accent-green);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);

  h3 {
    color: var(--primary-blue);
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid var(--accent-green);
    padding-bottom: 1rem;
  }

  p {
    text-align: center;
    font-size: 1.3rem;
    color: #333;
    margin: 1rem 0;
  }
}

/* Liste des affectations */
#infos {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 2rem;

  p {
    background-color: #fff;
    border: 1px solid var(--neutral-grey);
    border-left: 5px solid var(--primary-blue);
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
    font-size: 1.1rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateX(5px);
    }
  }

  @media (max-width: 500px) {
    p {
      font-size: 1rem;
    }
  }
}


</style>
