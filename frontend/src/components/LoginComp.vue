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
