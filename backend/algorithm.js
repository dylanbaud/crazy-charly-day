const AlgoGaleEtShapley = require("./optimisation/algorithme/AlgoGaleEtShapley");
const AlgoGlouton = require("./optimisation/algorithme/AlgoGlouton");
const AlgoBacktracking = require("./optimisation/algorithme/AlgoBacktracking");

async function fetchData(url) {
    const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    return response.json();
}

async function handleAlgorithm(algoClass, res) {
    try {
        const [needs, employees] = await Promise.all([
            fetchData("http://localhost:45555/free-needs"),
            fetchData("http://localhost:45555/free-employees")
        ]);

        const algo = new algoClass();

        const assignments = algo.optimizeAssignments(needs, employees)

        for (const assignment of assignments) {
            const { needId, employeeId } = assignment;

            const startDate = new Date();
            startDate.setHours(startDate.getHours() + 1);
            const finishDate = new Date(startDate);
            finishDate.setDate(finishDate.getDate() + 1);

            try {
                await fetch("http://localhost:45555/tasks", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        need_id: needId,
                        employee_id: employeeId,
                        start_date: startDate,
                        finish_date: finishDate
                    })
                });
            } catch (error) {
                console.error("Erreur lors de la création de la tâche :", error);
            }
        }

        res.json(assignments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function initAlgorithm(app) {
    app.get("/galeEtShapley", (req, res) => handleAlgorithm(AlgoGaleEtShapley, res));
    app.get("/glouton", (req, res) => handleAlgorithm(AlgoGlouton, res));
    app.get("/backtracking", (req, res) => handleAlgorithm(AlgoBacktracking, res));
}

module.exports = { initAlgorithm };
