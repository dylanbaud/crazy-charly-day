const AlgoInterface = require('./AlgoInterface');

class AlgoGlouton extends AlgoInterface {
    optimizeAssignments(needs, employees) {
        let assignments = {};
        let totalScore = 0;

        for (let need of needs) {
            let bestMatch = null;
            let bestScore = -1;

            for (let emp of employees) {
                if (emp.skill === need.type) {
                    let score = emp.interest;
                    if (score > bestScore) {
                        bestScore = score;
                        bestMatch = emp;
                    }
                }
            }

            if (bestMatch) {
                assignments[need.id] = bestMatch.id;
                totalScore += bestMatch.interest;
                employees = employees.filter(emp => emp.name !== bestMatch.name);
            } else {
                totalScore -= 10;
            }
        }

        if (employees.length > 0) {
            totalScore -= employees.length * 10;
        }


        return {totalScore, assignments};
    }
}

module.exports = AlgoGlouton;
