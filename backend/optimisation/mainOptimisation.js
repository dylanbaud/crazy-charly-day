const fs = require('fs');
const Algo = require('./algorithme/AlgoGlouton');

// Fonction pour reprendre les données de la BD
async function getDataFromDB() {
    const needs = await getNeedsFromDB();
    const employees = await getSkillInterestFromDB();
    return {needs, employees};
}

// Fonction pour récupérer les needs de la BD
async function getNeedsFromDB() {
    return await fetch('http://localhost:4000/needs')
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des besoins :', error);
        });
}

// Fonction pour récupérer les compétences et intérêts des employés de la BD
async function getSkillInterestFromDB() {
    return await fetch('http://localhost:4000/employees')
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des employés :', error);
        });
}

// Sauvegarde des résultats en CSV
function saveResults(filePath, results) {
    console.log(results);
    let output = [`${results.totalScore}`];
    fs.writeFileSync(filePath, output.join('\n'), 'utf8');
}

// Exécution du programme
const algo = new Algo();
(async () => {
    try {
        const { needs, employees } = await getDataFromDB(); // ✅ On attend que les données soient chargées
        const results = algo.optimizeAssignments(needs, employees);
        saveResults("./csv_2025/DB/resultat.csv", results);
        console.log('Résultats enregistrés');
    } catch (error) {
        console.error("Erreur lors de l'exécution :", error);
    }
})();
