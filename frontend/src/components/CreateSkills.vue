<script>
import { createSkill } from '@/services/httpClient';

export default {
  data() {
    return {
      skill_description: '',
      skill_title: '',
      error: '',
      skill: {},
    }
  },
  methods: {
    async creerCompetence() {
      try {
        this.skill = await createSkill(this.skill_title, this.skill_description);
        console.log('Compétence créée');
        console.log(this.skill);
      } catch (e) {
        this.error = e.message;
      }
    },
  },
  computed: {
    canCreateSkill() {
      return this.skill_description.length > 0 && this.skill_title.length > 0;
    }
  },
}
</script>


<template>
  <h2> Créer une compétence</h2>

  <div id="formulaire">
    <label for="skill_title"> Titre de la compétence </label>
    <input v-model="skill_title" type="text" id="skill_title" name="skill_title" placeholder="titre" required>

    <label for="skill_description">Description de la compétence </label>
    <textarea v-model="skill_description" id="skill_description" name="skill_description" placeholder="description"
      required>
    </textarea>
    <button :disabled="!canCreateSkill" @click="creerCompetence">Créer la compétence</button>
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
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  max-width: 600px;

  h2 {
    text-align: center;
    color: var(--primary-blue);
    font-size: 2rem;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid var(--accent-green);
    padding-bottom: 1rem;
  }

  label {
    font-weight: bold;
    color: var(--primary-blue);
    margin-bottom: 0.5rem;
    display: block;
    transition: color 0.3s ease;

    &:hover {
      color: var(--accent-green);
    }
  }

  input[type="text"],
  textarea {
    padding: 0.7rem 1rem;
    border: 2px solid var(--neutral-grey);
    border-radius: 10px;
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

  textarea {
    min-height: 120px;
    resize: vertical;
  }

  button {
    align-self: center;
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: var(--primary-blue);
    border: none;
    border-radius: 12px;
    margin-top: 1rem;
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
