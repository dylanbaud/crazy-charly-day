const AlgoGaleEtShapley = require("./optimisation/algorithme/AlgoGaleEtShapley");
const AlgoGlouton = require("./optimisation/algorithme/AlgoGlouton");

async function fetchData(url) {
    const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    return response.json();
}

async function handleAlgorithm(algoClass, res) {
    try {
        const [needs, employees] = await Promise.all([
            fetchData("http://localhost:4000/free-needs"),
            fetchData("http://localhost:4000/free-employees")
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
}

module.exports = { initAlgorithm };
