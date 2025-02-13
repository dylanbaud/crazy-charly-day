<script>
import { createUser, getSkills } from '@/services/httpClient';

export default {
  data() {
    return {
      email: '',
      firstName: '',
      lastName: '',
      tel: '',
      password: '',
      skills: [],
      skills_input: {},
      error: "",
    }
  },
  computed: {
    canSubmit() {
      return this.email.length > 0 && this.firstName.length > 0 && this.lastName.length > 0 &&
        this.tel.length > 0 && this.password.length > 0
    }
  },
  async mounted() {
    try {
      this.skills = await getSkills()
    } catch (e) {
      this.error = e.message;
    }
  },
  methods: {
    async submit() {
      let skills_filtered = []
      for (const [key, value] of Object.entries(this.skills_input)) {
        skills_filtered.push({
          id: Number(key),
          interest: Number(value)
        })
      }

      try {
        await createUser(this.email, this.firstName, this.lastName, this.tel, skills_filtered, this.password)
        this.$router.push({ name: 'home' })
      } catch (e) {
        this.error = e.message;
      }

    }
  }
}
</script>
<template>
  <div class="form-container">
    <label for="email">Email</label>
    <input v-model="email" id="email" type="email" required />

    <label for="firstName">First Name</label>
    <input v-model="firstName" id="firstName" type="text" required />

    <label for="lastName">Last Name</label>
    <input v-model="lastName" id="lastName" type="text" required />

    <label for="tel">Phone Number</label>
    <input v-model="tel" id="tel" type="tel" required />

    <label for="password">Mot de passe </label>
    <input v-model="password" id="password" type="password" required />

    <div v-for="skill in skills" :key="skill.id">
      <input v-model="skills_input[skill.id]" type="number" :key="skill.id" :id="skill.title" min="0" max="10"
        step="1" />
      <label :for="skill.title">{{ skill.description }}</label>
    </div>

    <button type="submit" @click="submit" :disabled="!canSubmit">Créer une employee</button>
  </div>
</template>
