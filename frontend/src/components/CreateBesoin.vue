<script>
import { getSkills } from '@/services/httpClient';

export default {
  data() {
    return {
      email_entreprise: '',
      description_besoin: '',
      competence_besoin: '',
      skills: [],
      error: '',
    }
  },
  methods: {
    creerBesoin() {
      console.log('Besoin créé');
      console.log(this.email_entreprise, this.description_besoin, this.competence_besoin);
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
      return this.email_entreprise.length > 0 && this.description_besoin.length > 0 &&
        this.competence_besoin.length > 0;
    }
  },
}
</script>

<template>
  <h2> Créer un besoin en personnel</h2>

  <div id="formulaire">
    <label for="email_entreprise"> Email de l'entreprise </label>
    <input v-model="email_entreprise" type="email" id="email_entreprise" name="email_entreprise" placeholder="email"
      required>

    <label for="description_besoin">Description du besoin </label>
    <textarea v-model="description_besoin" id="description_besoin" name="description_besoin" placeholder="description"
      required></textarea>

    <div v-if="skills.length > 0" v-for="skill in skills">
      <input v-model="competence_besoin" type="radio" :id="skill.title" name="competence_besoin" :value="skill.title">
      <label :for="skill.title">{{ skill.description }}</label>
    </div>
  </div>
  <button :disabled="!besoinEstValide" @click="creerBesoin">Créer le besoin</button>
  <div v-if="error">{{ error }}</div>
</template>

<style lang="scss" scoped></style>
