<template>
  <div id="login_status">
    <p v-if="id_user">Connecté <!--en tant que {{ email_user }} ({{ role_user }})--></p>
    <p v-else>Non connécté</p>
  </div>
</template>
<script>
import { useAuthStore } from '@/stores/authStore';
import { mapState } from 'pinia';

export default {
  computed: {
    ...mapState(useAuthStore, ['id_user']),
    ...mapState(useAuthStore, ['email_user']),
    ...mapState(useAuthStore, ['role_user']),
  },
}
</script>
<style lang="scss" scoped>
#login_status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: var(--accent-green);
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0 8px 8px 0;
  transition: all 0.3s ease;
  text-align: center;
}

#login_status p {
  margin: 0;
}

#login_status:hover {
  background-color: white;
  color: var(--accent-green);
}

@media (max-width: 600px) {
  #login_status {
    flex-direction: column;
    padding: 0.8rem;
  }
}
</style>
