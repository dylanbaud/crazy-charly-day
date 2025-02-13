<script>
export default {
  data() {
    return {
      email_entreprise: '',
      description_besoin: '',
      competence_besoin: '',
    }
  },
}
</script>

<template>
  <h2> Créer un besoin en personnel</h2>

  <label for="email_entreprise"> Email de l'entreprise </label>
  <input v-model="email_entreprise" type="email" id="email_entreprise" name="email_entreprise" placeholder="email"
    required>

  <label for="description_besoin">Description du besoin </label>
  <textarea v-model="description_besoin" id="description_besoin" name="description_besoin" placeholder="description"
    required></textarea>

  <label for="competence_IF"> Informatique </label>
  <input v-model="competence_besoin" type="radio" id="competence_BR" name="competence_besoin" value="BR">
  <input v-model="competence_besoin" type="radio" id="competence_JD" name="competence_besoin" value="JD">
  <input v-model="competence_besoin" type="radio" id="competence_MN" name="competence_besoin" value="MN">
  <input v-model="competence_besoin" type="radio" id="competence_IF" name="competence_besoin" value="IF">
  <input v-model="competence_besoin" type="radio" id="competence_AD" name="competence_besoin" value="AD">

</template>

<style lang="scss" scoped></style>
