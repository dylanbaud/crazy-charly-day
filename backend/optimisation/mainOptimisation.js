const fs = require('fs');
// Ligne ci-dessous à changer selon l'algorithme utilisé
const Algo = require('./algorithme/AlgoGlouton');

/**
 * Fonction asynchrone pour reprendre les données de la BD.
 * @returns {Promise<{needs: *, employees: *}>} Promesse contenant un objet avec les besoins et les employés.
 */
async function getDataFromDB() {
    // appel des fonctions pour récupérer les données
    const needs = await getNeedsFromDB();
    const employees = await getSkillInterestFromDB();
    // On retourne les deux données dans un objet
    return {needs, employees};
}

/**
 * Fonction pour récupérer les besoins de la BD.
 * @returns {Promise<any>} Promesse contenant un json avec les besoins.
 */
async function getNeedsFromDB() {
    // Fetch sur l'endpoint pour obtenir les besoins
    return await fetch('http://localhost:4000/needs')
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des besoins :', error);
        });
}

/**
 * Fonction pour récupérer les employées et leurs intérêts pour les compétences.
 * @returns {Promise<any>} Promesse contenant un json avec les employés et leurs intérêts pour les compétences.
 */
async function getSkillInterestFromDB() {
    // Fetch sur l'endpoint pour obtenir les employés
    return await fetch('http://localhost:4000/employees')
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des employés :', error);
        });
}

/**
 * Sauvegarde des résultats en CSV et en BD.
 * @param filePath chemin du fichier csv qui sera créé.
 * @param results résultats à sauvegarder.
 * @returns {Promise<void>} Promesse contenant le résultat de la requête POST.
 */
async function saveResults(filePath, results) {
    // Création du contenu du fichier csv avec la variable output
    let output = [`${results.totalScore}`];
    // On parcourt les assignations pour les ajouter au fichier csv et les sauvegarder en BD
    for (let i in results.assignments) {
        // On ajoute les assignations au string output avec un format csv (des ; entre les valeurs)
        output.push(`${results.assignments[i].employee.first_name};${results.assignments[i].need.skill.title};${results.assignments[i].need.account.first_name}`);
        // On initialise la date d'aujourd'hui
        const today = new Date();
        // On initialise la date de fin de la tâche d'aujourd'hui + 1 jour
        const finishDate = new Date(today);
        finishDate.setDate(finishDate.getDate() + 1);
        // On envoie des données à la BD via un fetch avec une méthode POST
        const response = await fetch('http://localhost:4000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                need_id: results.assignments[i].need.id,
                employee_id: results.assignments[i].employee.id,
                start_date: today,
                finish_date: finishDate,
            }),
            // Si on catch
        }).catch(error => {
            console.error('Erreur lors de la l\'écriture de tâche dans la bd :', error);
        });
        // Si la réponse n'est pas ok, on affiche un message d'erreur avec le status de la réponse
        if (!response.ok) {
            console.error('Erreur lors de l\'écriture de tâche dans la bd :', response.statusText);
        }
    }
    // On écrit le contenu d'output dans le fichier csv qui a le chemin qu'on a passé en paramètre
    fs.writeFileSync(filePath, output.join('\n'), 'utf8');
}

// On instancie l'algorithme
const algo = new Algo();
// On fait un appel asynchrone pour être sûr d'avoir les données avant de les traiter
(async () => {
    try {
        // On attend que les données soient récupérées afin l'appel à optimizeAssignments
        const { needs, employees } = await getDataFromDB();
        const results = algo.optimizeAssignments(needs, employees);
        saveResults("./csv_2025/DB/resultat.csv", results);
        // On affiche un message pour dire que l'execution du programme s'est déroulé sans les résultats sont enregistrés
        console.log('Résultats enregistrés');
    } catch (error) {
        console.error("Erreur lors de l'exécution :", error);
    }
})();
