const AlgoInterface = require('./AlgoInterface');

class AlgoGlouton extends AlgoInterface {
    optimizeAssignments(needs, employees) {
        let assignments = {};
        let totalScore = 0;

        for (let need of needs) {
            let bestMatch = null;
            let bestScore = -1;

            for (let emp of employees) {
                for (let e of emp["skill_interest"]){
                    if (e["skill_id"] === need["skill"]["id"]) {
                        let score = e["interest"];
                        if (score > bestScore) {
                            bestScore = score;
                            bestMatch = emp;
                        }
                    }
                }

            }

            if (bestMatch) {
                assignments[need.id] = {need: need, employee: bestMatch}
                totalScore += bestScore;
                employees = employees.filter(emp => emp["id"] !== bestMatch["id"]);
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
