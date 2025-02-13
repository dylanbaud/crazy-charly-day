<template>
    <h2>Bienvenue sur le site de Job Dating de Netlordes</h2>
    <p>
      Ce site s'inscrit dans le cadre de l'initiative <strong>"Territoires Zéro Chômeur de Longue Durée"</strong>,
      un projet national visant à offrir une activité professionnelle à toute personne privée d'emploi depuis plus d'un an.
    </p>

    <p>
      Notre mission : mobiliser les acteurs locaux pour créer des emplois utiles, non délocalisables, et adaptés aux compétences
      et aux besoins de chaque individu, tout en répondant aux besoins non couverts de nos territoires.
    </p>

    <h3>Vous êtes employeur ?</h3>
    <p>
      Si vous êtes une entreprise, une association ou une collectivité locale, vous avez la possibilité d'exprimer un besoin en personnel.
      Nous vous mettons en relation avec des candidats motivés et prêts à s'investir dans des projets locaux et durables.
    </p>
    <ul>
      <li>Accédez à un vivier de talents engagés</li>
      <li>Bénéficiez d'un accompagnement dans le processus de recrutement</li>
      <li>Participez activement au développement de l'emploi sur votre territoire</li>
    </ul>

    <h3>Vous recherchez un emploi ?</h3>
    <p>
      Vous êtes sans emploi depuis longtemps et souhaitez retrouver une activité professionnelle ?
      Inscrivez-vous dès maintenant auprès d'un agent de Netlordes et participez à nos sessions de job dating.
    </p>
    <ul>
      <li>Découvrez des opportunités adaptées à vos compétences</li>
      <li>Bénéficiez d'un suivi personnalisé tout au long de votre parcours</li>
      <li>Rejoignez un collectif dynamique et solidaire</li>
    </ul>

    <h3>Pourquoi participer à notre programme ?</h3>
    <p>
      Le projet "Territoires Zéro Chômeur de Longue Durée" repose sur une conviction forte :
      <strong>personne n'est inemployable</strong> et chacun peut trouver sa place dans l'économie locale.
    </p>
    <p>Avec Netlordes, vous profitez de :</p>
    <ul>
      <li>Une mise en relation rapide et efficace entre candidats et employeurs</li>
      <li>Des formations pour renforcer vos compétences</li>
      <li>Des emplois ancrés localement et répondant aux besoins réels des territoires</li>
    </ul>

    <h3>Rejoignez-nous dès aujourd'hui !</h3>
    <p>
      Ensemble, faisons de l'emploi un levier de développement et de solidarité dans nos territoires.
      Contactez-nous pour participer à nos prochaines sessions de job dating et devenir acteur d'un avenir professionnel durable.
    </p>
</template>


<style lang="scss" scoped>
h2 {
    text-align: center;
    color: var(--primary-blue);
    font-size: 2rem;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid var(--accent-green);
    padding-bottom: 1rem;
  }

  h3 {
    color: var(--primary-blue);
    margin-top: 2rem;
    font-size: 1.5rem;
  }

  p {
    margin: 1rem 0;
    font-size: 1.1rem;
    text-align: justify;
  }

  ul {
    margin: 1rem 0 2rem 1.5rem;
    padding-left: 1rem;
    list-style-type: disc;

    li {
      margin: 0.5rem 0;
      padding-left: 0.5rem;
      border-left: 4px solid var(--accent-green);
      transition: all 0.3s ease;

      &:hover {
        color: var(--primary-blue);
        border-left-color: var(--primary-blue);
      }
    }
  }

  strong {
    color: var(--accent-green);
  }




</style>
