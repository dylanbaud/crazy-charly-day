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

// Sauvegarde des résultats en CSV et en BD
async function saveResults(filePath, results) {
    let output = [`${results.totalScore}`];
    for (let i in results.assignments) {
        output.push(`${results.assignments[i].employee.first_name};${results.assignments[i].need.skill.title};${results.assignments[i].need.account.first_name}`);
        const today = new Date();
        const finishDate = new Date(today);
        finishDate.setDate(finishDate.getDate() + 1);
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
        }).catch(error => {
            console.error('Erreur lors de la l\'écriture de tâche dans la bd :', error);
        });

        if (!response.ok) {
            console.error('Erreur lors de l\'écriture de tâche dans la bd :', response.statusText);
        }
    }

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

module.exports = saveResults;