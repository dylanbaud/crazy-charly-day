<script>
import { RouterLink, RouterView } from 'vue-router'
import LoginStatus from './components/LoginStatus.vue';
import { computed } from 'vue';
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from './stores/authStore';
export default {
  components: {
    RouterLink,
    RouterView,
    LoginStatus,
  },
  computed: {
    ...mapState(useAuthStore, ['id_user']),
    ...mapState(useAuthStore, ['isCustomerValue']),
    ...mapState(useAuthStore, ['isAdmin']),
  },
  methods: {
    ...mapActions(useAuthStore, ['isCustomer']),
  },
  mounted() {
    console.log(this.isCustomer())
  },
}
</script>

<template>
  <div id="body-app">
    <header>
      <h1> Job Dating ❤️❤️ Netlordes</h1>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink v-if="isCustomerValue" :to="{ name: 'create-besoin' }">Créer un besoin</RouterLink>
          <RouterLink v-if="isCustomerValue" :to="{ name: 'create-skill' }">Créer une compétence</RouterLink>
          <RouterLink v-if="isCustomerValue" :to="{ name: 'needs-customer-list' }">Liste des besoins</RouterLink>

          <RouterLink v-if="isAdmin" :to="{ name: 'employees-list' }">Liste des employés</RouterLink>
          <RouterLink v-if="isAdmin" :to="{ name: 'affect-task' }">Affecter les tâches</RouterLink>
          <RouterLink v-if="isAdmin" :to="{ name: 'skills-list' }">Liste des compétences</RouterLink>
          <RouterLink v-if="isAdmin" :to="{ name: 'create-employee' }">Créer un employé</RouterLink>
          <RouterLink v-if="isAdmin" :to="{ name: 'needs-list' }">Liste des besoins</RouterLink>
          <RouterLink v-if="isAdmin" :to="{ name: 'valid-employee' }">Valider les employés</RouterLink>

          <RouterLink :to="{ name: 'login' }">Login</RouterLink>
          <LoginStatus />
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
#body-app {
  display: flex;
  flex-direction: column;
  width: 100%;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}


nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
