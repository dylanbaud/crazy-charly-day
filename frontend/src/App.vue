<script>
import { RouterLink, RouterView } from 'vue-router'
import LoginStatus from './components/LoginStatus.vue';
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from './stores/authStore';

export default {
  components: {
    RouterLink,
    RouterView,
    LoginStatus,
  },
  data() {
    return {
      showButton: false, // Pour le bouton de retour en haut
    };
  },
  computed: {
    ...mapState(useAuthStore, ['id_user', 'isCustomerValue', 'isAdmin']),
  },
  methods: {
    ...mapActions(useAuthStore, ['isCustomer']),
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    handleScroll() {
      this.showButton = window.scrollY > 300;
    }
  },
  mounted() {
    console.log(this.isCustomer());
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>


<template>
  <div id="body-app">
    <header>
      <div class="wrapper">
        <nav>
          <h1><RouterLink to="/">Job Dating ❤️❤️ Netlordes</RouterLink></h1>
          <div class="nav-links">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink v-if="isCustomerValue" :to="{ name: 'create-need' }">Créer un besoin</RouterLink>
            <RouterLink v-if="isCustomerValue" :to="{ name: 'create-skill' }">Créer une compétence</RouterLink>
            <RouterLink v-if="isCustomerValue" :to="{ name: 'needs-list' }">Liste des besoins</RouterLink>

            <RouterLink v-if="isAdmin" :to="{ name: 'employees-list' }">Liste des employés</RouterLink>
            <RouterLink v-if="isAdmin" :to="{ name: 'skills-list' }">Liste des compétences</RouterLink>

            <RouterLink v-if="!id_user" :to="{ name: 'login' }">Login</RouterLink>
            <LoginStatus />
          </div>
        </nav>
      </div>
    </header>

    <main>
      <RouterView />
      <button
        v-show="showButton"
        class="scroll-to-top"
        @click="scrollToTop"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-short" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
        </svg>
      </button>
    </main>

    <footer>
      <div class="footer-container">
        <div class="footer-section">
          <h3>À propos de Netlordes</h3>
          <p>
            Netlordes s'engage à faciliter la réinsertion professionnelle des chômeurs de longue durée
            grâce à des initiatives locales et un accompagnement personnalisé. Nous croyons en un avenir
            professionnel durable pour tous.
          </p>
        </div>

        <div class="footer-section">
          <h3>Nos Contributeurs</h3>
          <ul class="contributor-list">
            <li>Baudson Dylan</li>
            <li>Daza Sasha</li>
            <li>Fontanez Antoine</li>
            <li>Pedretti Zack</li>
            <li>Pinot Gaëtan</li>
            <li>Slimani Robin</li>
            <li>Toussaint Jarod</li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Liens utiles</h3>
          <ul class="footer-links">
            <li><RouterLink to="/">Home</RouterLink></li>

            <li><RouterLink v-if="isCustomerValue" :to="{ name: 'create-need' }">Créer un besoin</RouterLink></li>
            <li><RouterLink v-if="isCustomerValue" :to="{ name: 'create-skill' }">Créer une compétence</RouterLink></li>
            <li><RouterLink v-if="isCustomerValue" :to="{ name: 'needs-list' }">Liste des besoins</RouterLink></li>

            <li><RouterLink v-if="isAdmin" :to="{ name: 'employees-list' }">Liste des employés</RouterLink></li>
            <li><RouterLink v-if="isAdmin" :to="{ name: 'skills-list' }">Liste des compétences</RouterLink></li>

            <li><RouterLink v-if="!id_user" :to="{ name: 'login' }">Login</RouterLink></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 Netlordes - Tous droits réservés à Nous</p>
      </div>
    </footer>

  </div>
</template>

<style lang="scss" scoped>
nav {
  width: 100%;
  background-color: var(--primary-blue);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-bottom: 3px solid var(--accent-green);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 a{
    color: white;
    font-size: 1.5rem;
    margin: 0;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    text-decoration: none;
  }
  h1::hover a{
    color: var(--accent-green);
    background-color: white;
  }
  .nav-links {
    display: flex;
    a {
      color: white;
      background-color: var(--accent-green);
      text-decoration: none;
      font-weight: bold;
      padding: 0.5rem 1rem;
      transition: background-color 0.3s ease, transform 0.2s;
      &:first-child {
        border-radius: 8px 0 0 8px;
      }
      &:hover {
        background-color: white;
        transform: translateY(-3px);
        color: var(--accent-green);
      }

    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .nav-links {
      flex-direction: column;
      gap: 1rem;
    }
  }
}
footer {
  background-color: var(--primary-blue);
  color: #fff;
  padding: 2rem 1rem;
  margin-top: 3rem;

  .footer-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 2rem;
    border-bottom: 2px solid var(--accent-green);
    padding-bottom: 2rem;

    .footer-section {
      flex: 1 1 300px;

      h3 {
        margin-bottom: 1rem;
        font-size: 1.3rem;
        border-bottom: 1px solid var(--accent-green);
        padding-bottom: 0.5rem;
      }

      p {
        font-size: 1rem;
        line-height: 1.5;
      }

      .contributor-list {
        list-style: none;
        padding: 0;

        li {
          padding: 0.5rem 0;
          border-left: 3px solid var(--accent-green);
          padding-left: 0.5rem;
          transition: color 0.3s ease;

          &:hover {
            color: var(--neutral-beige);
          }
        }
      }

      .footer-links {
        list-style: none;
        padding: 0;

        li {
          margin: 0.5rem 0;

          a {
            color: #fff;
            text-decoration: none;
            transition: color 0.3s ease;

            &:hover {
              color: var(--accent-green);
            }
          }
        }
      }
    }
  }

  .footer-bottom {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: var(--neutral-beige);
  }

  @media (max-width: 600px) {
    .footer-container {
      flex-direction: column;
      align-items: center;
      text-align: center;

      .footer-section {
        margin-bottom: 1.5rem;
      }
    }
  }
}
.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background-color: var(--primary-blue);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease, transform 0.2s ease;
  z-index: 1000;

  &:hover {
    background-color: var(--accent-green);
    transform: translateY(-5px);
  }

  &:focus {
    outline: none;
  }
  svg {
    margin: 0 auto;
    display: block;
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 600px) {
  .scroll-to-top {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
    bottom: 1.5rem;
    right: 1.5rem;
  }
}
</style>

