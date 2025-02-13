const AlgoInterface = require('./AlgoInterface');

/**
 * Classe qui utilise l'algorithme Glouton pour optimiser les assignations des employés aux besoins
 */
class AlgoGlouton extends AlgoInterface {
    /**
     * Méthode héritée de la classe AlgoInterface
     * @param needs besoins à réaliser
     * @param employees employés à attribuer à des besoins
     * @returns {{assignments: {}, totalScore: number}} assignations optimisées selon l'algo glouton et score total de
     * l'algo
     */
    optimizeAssignments(needs, employees) {
        // Initialisation des variables
        let assignments = {};
        let totalScore = 0;
        const minus = {};

        // Pour chaque besoin, on cherche l'employé qui a le meilleur score pour ce besoin
        for (let need of needs) {
            // On initialise des variables pour chercher le meilleur employé
            let bestMatch = null;
            let bestScore = -1;

            // On parcourt les employés pour trouver un employé qui a un skill qui correspond au skill
            // requit pour le besoin
            for (let emp of employees) {
                for (let skill of emp["skill_interest"]){
                    if (skill["skill_id"] === need["skill"]["id"]) {
                        // Si le skill correspond, on regarde si le score de l'employé est meilleur que
                        // le meilleur score actuel, si oui il devient le meilleur employé
                        let score = skill["interest"];
                        if (score > bestScore) {
                            bestScore = score;
                            bestMatch = emp;
                        }
                    }
                }

            }

            // Si on a trouvé au moins un employé qui correspond au besoin, on l'ajoute aux assignations
            if (bestMatch) {
                assignments[need.id] = {need: need, employee: bestMatch}
                // On ajoute le score de l'employé au score total
                totalScore += bestScore - (minus[need['customer_id']] || 0);
                // Et on retire l'employé de la liste des employés assignable
                employees = employees.filter(emp => emp["id"] !== bestMatch["id"]);
                // on change le score à retirer selon si l'employeur a déjà eu un employé assigné ou pas
                if(!minus[need['customer_id']]){
                    minus[need['customer_id']] = 1;
                }
                else{
                    minus[need['customer_id']]++;
                }
            } else {
                // Si on n'a pas trouvé d'employé pour le besoin, on retire 10 points au score total
                totalScore -= 10;
            }
        }
        // On retire 10 points pour chaque employé qui n'a pas été assigné à un besoin
        if (employees.length > 0) {
            totalScore -= employees.length * 10;
        }

        // On retourne le score total et les assignations qui ont été effectuées
        return {totalScore, assignments};
    }
}

module.exports = AlgoGlouton;
