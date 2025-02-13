<script>
import { getUser } from '@/services/httpClient';
import { useAuthStore } from '@/stores/authStore';
import { mapActions, mapState } from 'pinia';

export default {
  data() {
    return {
      email: '',
      error: '',
    }
  },
  computed: {
    ...mapState(useAuthStore, ['id_user']),
  },
  methods: {
    async login() {
      try {
        const user = await getUser(this.email)
        if (user === null) {
          this.error = "email non valide"
          return
        }
        console.log(user.id, user.type)
        this.setIdUser(user.id)
        this.setRoleUser(user.type)
        this.setEmailUser(user.email)
        this.$router.push('/')
      } catch (e) {
        this.error = e.message
      }
    },
    ...mapActions(useAuthStore, ['setIdUser']),
    ...mapActions(useAuthStore, ['setRoleUser']),
    ...mapActions(useAuthStore, ['setEmailUser']),
  },
}
</script>

<template>
  <div id="login">
    <h2>Connexion</h2>
    <div id="formulaire">
      <label for="email">Email</label>
      <input v-model="email" type="email" id="email" name="email" placeholder="email" required>
      <button :disabled="!email.length > 0" @click="login">Se connecter</button>
    </div>
    <div v-if="error">{{ error }}</div>
  </div>

</template>

<style lang="scss" scoped>
#login {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 3rem;
  padding: 2rem;
  background-color: var(--neutral-beige);
  border: 2px solid var(--accent-green);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    color: var(--primary-blue);
    font-size: 2rem;
    margin-bottom: 1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  #formulaire {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1.5rem;

    label {
      font-weight: bold;
      color: var(--primary-blue);
      margin-bottom: 0.5rem;
    }

    input {
      padding: 0.7rem 1rem;
      border: 2px solid var(--neutral-grey);
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;

      &:focus {
        outline: none;
        border-color: var(--accent-green);
        box-shadow: 0 0 5px var(--accent-green);
      }

      &::placeholder {
        color: var(--neutral-grey);
        font-style: italic;
      }
    }

    button {
      padding: 0.7rem;
      background-color: var(--primary-blue);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      font-size: 1rem;
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
  }

  .error {
    color: red;
    margin-top: 1rem;
    font-weight: bold;
    text-align: center;
    background-color: #ffe6e6;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 1px solid red;
  }
}

</style>
