const AlgoInterface = require("./AlgoInterface");

class AlgoGaleEtShapley extends AlgoInterface {
    optimizeAssignments(needs, employees) {
        let totalScore = 0;
        let assignments = {};
        let skills = [];

        needs.forEach(need => {
            if (!skills.includes(need.skill_id)) {
                skills.push(need.skill_id);
            }
        });

        // Initialiser les employés
        for (let i = 0; i < employees.length; i++) {
            employees[i].hasJob = false;

            let skillInterestMap = {};
            employees[i].skill_interest.forEach(skill => {
                skillInterestMap[skill.skill_id] = skill.interest;
            });

            skills.forEach(skill => {
                if (!(skill in skillInterestMap)) {
                    skillInterestMap[skill] = 0;
                }
            });

            employees[i].skill_interest = skillInterestMap;
        }

        // Tant que les salariés n'ont pas tous un job et qu'il reste des jobs
        while (!employees.every(emp => emp.hasJob) && Object.keys(assignments).length < needs.length) {
            const joblessEmployees = employees.filter(emp => !emp.hasJob);
            const freeNeeds = needs.filter(n => !(n.id in assignments));

            // Le classement de chaque employé pour chaque besoin
            const nRanking = this.rankEmployeesForNeeds(freeNeeds, employees);

            // Le classement de chaque besoin pour chaque employé
            const eRanking = this.rankNeedsForEmployees(needs, joblessEmployees);

            for (let j = 0; j < freeNeeds.length; j++) {
                const need = freeNeeds[j];

                while(!assignments[need.id]) {

                    const preferredEmployee = nRanking[need.id][0];
                    console.log(preferredEmployee);
                    if (!preferredEmployee.hasJob) {
                        assignments[need.id] = {need: need, employee: preferredEmployee};
                        preferredEmployee.hasJob = true;
                        preferredEmployee.job = need;
                    } else {
                        const currentJob = preferredEmployee.job;

                        if (
                            eRanking[preferredEmployee.id] &&
                            eRanking[preferredEmployee.id].findIndex(n => n.id === need.id) <
                            eRanking[preferredEmployee.id].findIndex(n => n.id === currentJob.id)
                        ) {
                            assignments[currentJob.id] = null;
                            preferredEmployee.job = need;
                            assignments[need.id] = {need: need, employee: preferredEmployee};
                        } else {
                            if(nRanking[need.id].length === 1){
                                break;
                            }
                            else nRanking[need.id].shift();
                        }
                    }
                }
            }
        }
        const minus = {};
        Object.values(assignments).forEach(({ need, employee }) => {
            totalScore += employee.skill_interest[need.skill_id] - (minus[need['customer_id']] || 0);

            console.log("minus:", (minus[need['customer_id']] || 0))
            console.log("minus client:", need['customer_id'])

            if(!minus[need['customer_id']]){
                minus[need['customer_id']] = 1;
            }
            else{
                minus[need['customer_id']]++;
            }
        });

        totalScore -= employees.filter(emp => !emp.hasJob).length * 10;

        return { totalScore, assignments };
    }

    rankEmployeesForNeeds(needs, employees) {
        let nRanking = {};

        for (let i = 0; i < needs.length; i++) {
            nRanking[needs[i].id] = [...employees].sort(
                (a, b) => b.skill_interest[needs[i].skill_id] - a.skill_interest[needs[i].skill_id]
            );
        }

        return nRanking;
    }

    rankNeedsForEmployees(needs, employees) {
        let eRanking = {};

        for (let i = 0; i < employees.length; i++) {
            eRanking[employees[i].id] = [...needs].sort(
                (a, b) => employees[i].skill_interest[b.skill_id] - employees[i].skill_interest[a.skill_id]
            );
        }

        return eRanking;
    }

}

module.exports = AlgoGaleEtShapley;
