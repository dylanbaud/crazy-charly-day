const fs = require('fs');
const path = "csv_2025/etudiant/00_exemple/metier_1.csv";
const Algo = require('./algorithme/AlgoGlouton');

// Fonction pour lire un fichier CSV et parser les données
function readCSV(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split('\n').map(line => line.trim().split(';'));
}

// Charger les données depuis un fichier CSV
function loadData(filePath) {
    const rows = readCSV(filePath);
    let needs = [];
    let employees = [];
    let parsingNeeds = true;

    for (let row of rows) {
        if (row[0].toLowerCase().includes("competences")) {
            parsingNeeds = false;
            continue;
        }
        if (row.length === 0 || row[0] === "") continue;

        if (parsingNeeds && row[0] !== "besoins") {
            needs.push({ id: row[0], client: row[1], type: row[2] });
        } else if (!parsingNeeds) {
            employees.push({ id: row[0], name: row[1], skill: row[2], interest: parseInt(row[3], 10) });
        }
    }
    return { needs, employees };
}

// Sauvegarde des résultats en CSV
function saveResults(filePath, results) {
    let output = [`${results.totalScore}`];
    results.assignments.forEach(a => {
        output.push(`${a.employee};${a.needType};${a.client}`);
    });
    fs.writeFileSync(filePath, output.join('\n'), 'utf8');
}

// Exécution du programme
const algo = new Algo();
const { needs, employees } = loadData(path);
const results = algo.optimizeAssignments(needs, employees);
const pathRes = path.replace("metier_1", "metier_1_resultat");
saveResults(pathRes, results);
console.log('Optimisation terminée, résultats enregistrés dans ' + pathRes);
