const parseData = require('./csvParser');
const fs = require('fs');
const Algo = require('./algorithme/AlgoGaleEtShapley');

const filePath = 'csv_2025/etudiant/01_pb_simples/Probleme_1_nbSalaries_3_nbClients_3_nbTaches_2.csv';  // Remplacer par le chemin de ton fichier CSV

async function saveResults(filePath, results) {
    const { totalScore, assignments } = results;

    // Convertir les données en format CSV
    let csvContent = 'id_besoin;id_employe;skill_id\n';  // En-têtes du CSV

    // Parcourir les assignments pour générer les lignes du CSV
    Object.values(assignments).forEach(assignment => {
        const need = assignment.need;
        const employee = assignment.employee;

        // On assume que chaque "assignment" contient un "need" et un "employee" avec les bonnes propriétés
        const line = `${need.account.first_name};${employee.first_name};${need.skill.title}\n`;
        csvContent += line;
    });

    // On ajoute une ligne pour le score total de l'assignement
    csvContent += `\nscore;${totalScore}\n`;

    // Écrire le CSV dans le fichier
    fs.writeFileSync(filePath, csvContent, 'utf8');
    console.log('Résultats sauvegardés dans le fichier :', filePath);
}

// Fonction principale pour exécuter l'algorithme et sauvegarder les résultats
async function processCSV(filePath) {
    try {
        // Lecture et parsing des données CSV
        const { besoins, employees } = await parseData(filePath);

        // Initialisation de l'algorithme
        const algo = new Algo();

        // Exécution de l'algorithme et sauvegarde des résultats
        const results = algo.optimizeAssignments(besoins, employees);

        await saveResults("./csv_2025/CSV/resultat.csv", results);

        console.log("Les résultats ont été sauvegardés avec succès.");
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
}

// Lancer le processus
processCSV(filePath);
