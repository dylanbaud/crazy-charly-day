const fs = require('fs');
const readline = require('readline');

// Fonction pour parser un fichier CSV
function parseCSV(filePath) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let rows = [];
    rl.on('line', (line) => {
        rows.push(line.split(';'));
    });

    return new Promise((resolve) => {
        rl.on('close', () => resolve(rows));
    });
}

// Fonction pour convertir les données du CSV en objets structurés
async function parseData(filePath) {
    const rows = await parseCSV(filePath);

    // Séparer les données pour 'besoins' et 'competences'
    const besoinsData = [];
    const competencesData = [];
    const usersData = [];
    let section = '';

    rows.forEach(row => {
        if (row[0] === 'besoins') {
            section = 'besoins';
            return;
        }
        if (row[0] === 'competences') {
            section = 'competences';
            return;
        }

        if (section === 'besoins') {
            besoinsData.push(row);
        } else if (section === 'competences') {
            competencesData.push(row);
        }
    });

    // Création des compétences (skills)
    const skills = {
        "AD": 1,
        "MN": 2,
        "JD": 3,
        "IF": 4,
        "BR": 5,
    };

    // Fonction pour récupérer l'ID de compétence par le titre
    function getSkillByTitle(title) {
        return {
            id: skills[title] || null,
            title: title,
            description: title // Tu peux changer ça en fonction des descriptions des compétences
        };
    }

    // Créer un tableau d'objets 'account' pour les utilisateurs
    const accounts = {};

    // Création des besoins
    const besoins = besoinsData.map((row) => {
        const customer_id = parseInt(row[1]);
        const skill = getSkillByTitle(row[2]);
        let account = accounts[customer_id];

        // Si l'account n'existe pas encore, on le crée
        if (!account) {
            account = {
                id: customer_id,
                email: `${row[1]}@example.com`,
                last_name: `LastName_${customer_id}`,
                first_name: `FirstName_${customer_id}`,
                tel: `+33 6 02 25 47 81`,
                type: 'customer',
                valid: true
            };
            accounts[customer_id] = account;
        }

        return {
            id: parseInt(row[0]),
            customer_id: customer_id,
            description: row[2],
            skill_id: skill.id,
            account: account,
            skill: skill
        };
    });

    // Créer les employés (avec leur compétence et l'intérêt)
    const employees = competencesData.map((row) => {
        const [id, first_name, last_name, skill_title, interest] = row;
        return {
            id: parseInt(id),
            first_name,
            last_name,
            skill_interest: [
                {
                    skill_id: getSkillByTitle(skill_title).id,
                    interest: parseInt(interest),
                }
            ]
        };
    });

    return { besoins, employees };
}

module.exports = parseData;
