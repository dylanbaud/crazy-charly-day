<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="body-app">
    <header>
      <h1> Job Dating ❤️❤️ Netlordes</h1>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink :to="{ name: 'create-besoin' }">Créer un besoin</RouterLink>
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
