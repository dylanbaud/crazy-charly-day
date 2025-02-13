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
