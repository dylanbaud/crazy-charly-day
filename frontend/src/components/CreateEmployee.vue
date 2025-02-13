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
      <input v-model="skills_input[skill.id]" type="number"  value="0" :key="skill.id" :id="skill.title" min="0" max="10"
        step="1" />
      <label :for="skill.title">{{ skill.description }}</label>
    </div>

    <button type="submit" @click="submit" :disabled="!canSubmit">Créer une employee</button>
  </div>
</template>

<style lang="scss" scoped>

.form-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--neutral-beige);
  border: 3px solid var(--accent-green);
  border-radius: 20px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  label {
    font-weight: bold;
    color: var(--primary-blue);
    margin-bottom: 0.5rem;
  }

  input[type="email"],
  input[type="text"],
  input[type="tel"],
  input[type="password"],
  input[type="number"] {
    padding: 0.7rem 1rem;
    border: 2px solid var(--neutral-grey);
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
      outline: none;
      border-color: var(--accent-green);
      box-shadow: 0 0 6px var(--accent-green);
    }

    &::placeholder {
      color: #aaa;
      font-style: italic;
    }
  }

  .skill-input {
    display: flex;
    align-items: center;
    gap: 1rem;

    input {
      width: 60px;
    }

    label {
      color: #444;
    }
  }

  button {
    margin-top: 2rem;
    padding: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
    background: linear-gradient(135deg, var(--primary-blue), var(--accent-green));
    border: none;
    border-radius: 15px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);

    &:hover:enabled {
      transform: translateY(-4px);
      filter: brightness(1.2);
    }

    &:disabled {
      background-color: var(--neutral-grey);
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  .error {
    color: red;
    text-align: center;
    background-color: #ffe6e6;
    border: 2px solid red;
    border-radius: 10px;
    padding: 1rem;
    margin-top: 1rem;
    font-weight: bold;
  }

  @media (max-width: 500px) {
    padding: 1.5rem;

    input {
      font-size: 0.95rem;
    }

    button {
      font-size: 1rem;
    }
  }
}
</style>
