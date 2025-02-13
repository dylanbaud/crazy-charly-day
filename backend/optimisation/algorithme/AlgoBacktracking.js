const AlgoInterface = require('./AlgoInterface');

class AlgoBacktracking extends AlgoInterface {
    optimizeAssignments(needs, employees) {
        function backtrack(index, assignments, usedEmployees, totalScore, minus) {
            if (index >= needs.length) {
                return { score: totalScore, assignments: { ...assignments } };
            }

            let need = needs[index];
            let found = false;
            let bestAssignments = { ...assignments }; // Copier l'état actuel
            let bestScore = -Infinity;

            for (let emp of employees) {
                if (!usedEmployees.has(emp.id)) {
                    for (let skill of emp.skill_interest) {
                        if (skill.skill_id === need.skill.id) {
                            found = true;

                            let score = skill.interest - (minus[need.customer_id] || 0);
                            assignments[need.id] = { need, employee: emp };
                            usedEmployees.add(emp.id);

                            let newMinus = { ...minus };
                            newMinus[need.customer_id] = (newMinus[need.customer_id] || 0) + 1;

                            const backtrackObj = backtrack(index + 1, assignments, usedEmployees, totalScore + score, newMinus);
                            const currentScore = backtrackObj.score;

                            if (currentScore > bestScore) {
                                bestScore = currentScore;
                                bestAssignments = { ...backtrackObj.assignments }; // Copier le meilleur résultat
                            }

                            // Rétablir l'état initial après l'exploration
                            usedEmployees.delete(emp.id);
                            delete assignments[need.id];
                        }
                    }
                }
            }

            // Si aucun employé n'est trouvé, on passe à la prochaine tâche avec pénalité
            if (!found) {
                return backtrack(index + 1, assignments, usedEmployees, totalScore - 10, minus);
            }

            return { score: bestScore, assignments: bestAssignments };
        }

        const backtrackObj = backtrack(0, {}, new Set(), 0, {});
        return { totalScore: backtrackObj.score, assignments: backtrackObj.assignments };
    }

}

module.exports = AlgoBacktracking;
