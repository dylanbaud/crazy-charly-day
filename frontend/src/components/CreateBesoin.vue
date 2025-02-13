<script>
import { createNeed, getSkills } from '@/services/httpClient';
import { useAuthStore } from '@/stores/authStore';
import { mapState } from 'pinia';
import CreateSkills from './CreateSkills.vue';

export default {
  components: {
    CreateSkills,
  },
  data() {
    return {
      description_besoin: '',
      competence_besoin: -1,
      skills: [],
      error: '',
      showCreateSkills: false,
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
    showCreateSkill() {
      this.showCreateSkills = true;
    },
    hideCreateSkill() {
      this.showCreateSkills = false;
      this.loadSkills();
    },
    async loadSkills() {
      try {
        this.skills = await getSkills()
      } catch (e) {
        this.error = e.message;
      }
    }

  },
  async mounted() {
    this.loadSkills();
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
  <div id="page">
    <div id="formulaire">
      <h2> Créer un besoin en personnel</h2>
      <label for="description_besoin">Description du besoin </label>
      <textarea v-model="description_besoin" id="description_besoin" name="description_besoin" placeholder="description"
        maxlength="255" required></textarea>

      <div id="competences">
        <div v-if="skills.length > 0" v-for="skill in skills">
          <input v-model="competence_besoin" type="radio" :id="skill.title" name="competence_besoin" :value="skill.id"
            required>
          <label :for="skill.title">{{ skill.description }}</label>
        </div>
        <button @click="showCreateSkill">Créer une nouvelle compétence</button>
      </div>
      <button :disabled="!besoinEstValide" @click="creerBesoin">Créer le besoin</button>
      <div v-if="error">{{ error }}</div>
    </div>
    <CreateSkills v-if="showCreateSkills" @create-skill="hideCreateSkill" />
  </div>

</template>

<style lang="scss" scoped>
#page {
  display: flex;
  flex-direction: row;
}
</style>
