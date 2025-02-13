<script>
import { createNeed, getSkills } from '@/services/httpClient';
import { useAuthStore } from '@/stores/authStore';
import { mapState } from 'pinia';

export default {
  data() {
    return {
      description_besoin: '',
      competence_besoin: -1,
      skills: [],
      error: '',
    }
  },
  methods: {
    async creerBesoin() {
      try {
        const need = await createNeed(this.id_user, this.description_besoin, this.competence_besoin);
        console.log(need)
      } catch (e) {
        this.error = e.message;
      }
      console.log('Besoin créé');
    },
  },
  async mounted() {
    try {
      this.skills = await getSkills()
    } catch (e) {
      this.error = e.message;
    }
    console.log(this.skills);
  },
  computed: {
    besoinEstValide() {
      return this.description_besoin.length > 0 &&
        this.competence_besoin !== 0 && this.id_user !== 0;
    },
    ...mapState(useAuthStore, ['id_user']),
  },
}
</script>

<template>
  <div id="formulaire">
    <h2>Créer un besoin en personnel</h2>

    <label for="description_besoin">Description du besoin</label>
    <textarea
      v-model="description_besoin"
      id="description_besoin"
      name="description_besoin"
      placeholder="Décrivez le besoin en quelques phrases"
      maxlength="255"
      required
    ></textarea>

    <div class="liste" v-if="skills.length > 0">
      <div class="skill-option" v-for="skill in skills" :key="skill.id">
        <input
          v-model="competence_besoin"
          type="radio"
          :id="`skill-${skill.id}`"
          name="competence_besoin"
          :value="skill.id"
          required
        />
        <label :for="`skill-${skill.id}`">{{ skill.description }}</label>
      </div>
    </div>

    <button :disabled="!besoinEstValide" @click="creerBesoin">Créer le besoin</button>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<style lang="scss" scoped>
#formulaire {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--neutral-beige);
  border: 2px solid var(--accent-green);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 600px;

  h2 {
    color: var(--primary-blue);
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.8rem;
    border-bottom: 2px solid var(--accent-green);
    padding-bottom: 1rem;
  }

  label {
    font-weight: bold;
    color: var(--primary-blue);
    margin-bottom: 0.5rem;
    display: block;
  }

  textarea {
    min-height: 100px;
    resize: vertical;
    border: 2px solid var(--neutral-grey);
    border-radius: 8px;
    padding: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: var(--accent-green);
      box-shadow: 0 0 5px var(--accent-green);
      outline: none;
    }

    &::placeholder {
      color: var(--neutral-grey);
      font-style: italic;
    }
  }
  .liste {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
  .skill-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input[type="radio"] {
      accent-color: var(--accent-green);
      transform: scale(1.2);
      cursor: pointer;
    }

    label {
      cursor: pointer;
      color: #333;
      transition: color 0.3s ease;

      &:hover {
        color: var(--primary-blue);
      }
    }
  }

  button {
    align-self: center;
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: var(--primary-blue);
    border: none;
    border-radius: 10px;
    margin-top: 1.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s;

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

  .error {
    color: red;
    text-align: center;
    margin-top: 1rem;
    font-weight: bold;
    background-color: #ffe6e6;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 1px solid red;
  }

  @media (max-width: 500px) {
    padding: 1.5rem;

    h2 {
      font-size: 1.5rem;
    }

    button {
      width: 100%;
    }
  }
}

</style>
