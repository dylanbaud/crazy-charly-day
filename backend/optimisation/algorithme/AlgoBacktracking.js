const AlgoInterface = require('./AlgoInterface');

class AlgoBacktracking extends AlgoInterface {
    optimizeAssignments(needs, employees) {
        let bestAssignments = {};
        let bestScore = -Infinity;

        function backtrack(index, assignments, usedEmployees, totalScore, minus) {
            if (index >= needs.length) {
                if (totalScore > bestScore) {
                    bestScore = totalScore;
                    bestAssignments = { ...assignments };
                }
                return;
            }

            let need = needs[index];
            let found = false;

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

                            backtrack(index + 1, assignments, usedEmployees, totalScore + score, newMinus);

                            usedEmployees.delete(emp.id);
                            delete assignments[need.id];
                        }
                    }
                }
            }

            if (!found) {
                backtrack(index + 1, assignments, usedEmployees, totalScore - 10, minus);
            }
        }

        backtrack(0, {}, new Set(), 0, {});
        return { totalScore: bestScore, assignments: bestAssignments };
    }

}

module.exports = AlgoBacktracking;
