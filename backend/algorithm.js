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
        res.json(algo.optimizeAssignments(needs, employees));
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
