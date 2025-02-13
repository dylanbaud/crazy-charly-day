const AlgoOptimisation = require('./algoInterface');

class AlgoSimple extends AlgoOptimisation {
    optimizeAssignments(needs, employees) {
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
}

module.exports = AlgoSimple;
