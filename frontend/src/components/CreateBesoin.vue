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

  <div id="formulaire">
    <label for="email_entreprise"> Email de l'entreprise </label>
    <input v-model="email_entreprise" type="email" id="email_entreprise" name="email_entreprise" placeholder="email"
      required>

    <label for="description_besoin">Description du besoin </label>
    <textarea v-model="description_besoin" id="description_besoin" name="description_besoin" placeholder="description"
      required></textarea>

    <label for="competence_BR">Bricolage</label>
    <input v-model="competence_besoin" type="radio" id="competence_BR" name="competence_besoin" value="BR">
    <label for="competence_JD"> Jardinage </label>
    <input v-model="competence_besoin" type="radio" id="competence_JD" name="competence_besoin" value="JD">
    <label for="competence_MN"> Ménage </label>
    <input v-model="competence_besoin" type="radio" id="competence_MN" name="competence_besoin" value="MN">
    <label for="competence_IF"> Informatique </label>
    <input v-model="competence_besoin" type="radio" id="competence_IF" name="competence_besoin" value="IF">
    <label for="competence_AD">Accompagnement dans les démarches administratives</label>
    <input v-model="competence_besoin" type="radio" id="competence_AD" name="competence_besoin" value="AD">

  </div>
  <button @click="creerBesoin">Créer le besoin</button>
</template>

<style lang="scss" scoped></style>
