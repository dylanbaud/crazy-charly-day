<template>
  <div id="login_status">
    <p v-if="id_user">Connecté en tant que {{ email_user }} ({{ role_user }})</p>
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
