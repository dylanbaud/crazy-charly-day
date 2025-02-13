const fs = require('fs');
const path = "csv_2025/etudiant/00_exemple/metier_1.csv";

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

// Fonction d’optimisation pour affecter les salariés aux besoins
function optimizeAssignments(needs, employees) {
    let assignments = [];
    let clientNeedsCount = {};
    let employeeAssigned = new Set();
    let clientServed = new Set();
    let totalScore = 0;

    for (let need of needs) {
        let bestMatch = null;
        let bestScore = -1;

        for (let emp of employees) {
            if (emp.skill === need.type && !employeeAssigned.has(emp.name)) {
                let score = emp.interest - (clientNeedsCount[need.client] || 0);
                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = emp;
                }
            }
        }

        if (bestMatch) {
            assignments.push({ employee: bestMatch.name, needType: need.type, client: need.client });
            employeeAssigned.add(bestMatch.name);
            clientNeedsCount[need.client] = (clientNeedsCount[need.client] || 0) + 1;
            clientServed.add(need.client);
            totalScore += Math.max(1, bestMatch.interest - (clientNeedsCount[need.client] - 1));
        }
    }

    let unassignedEmployees = employees.filter(emp => !employeeAssigned.has(emp.name));
    totalScore -= unassignedEmployees.length * 10;
    totalScore -= (new Set(needs.map(n => n.client)).size - clientServed.size) * 10;

    return { totalScore, assignments };
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
const { needs, employees } = loadData(path);
const results = optimizeAssignments(needs, employees);
saveResults(path.join(__dirname, 'results.csv'), results);
console.log('Optimisation terminée, résultats enregistrés dans results.csv');
