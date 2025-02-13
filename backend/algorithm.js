const AlgoGaleEtShapley = require("./optimisation/algorithme/AlgoGaleEtShapley");
const AlgoGlouton = require("./optimisation/algorithme/AlgoGlouton");

function initAlgorithm(app) {

    app.get("/galeEtShapley", async (req, res) => {
        try {

            const needs = await fetch("http://localhost:4000/free-needs", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const needs_json = await needs.json();

            const employees = await fetch("http://localhost:4000/free-employees", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const employees_json = await employees.json();

            const algo = new AlgoGaleEtShapley();
            const result = algo.optimizeAssignments(needs_json, employees_json);

            res.json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    });

    app.get("/glouton", async (req, res) => {
        try {
            const needs = await fetch("http://localhost:4000/free-needs", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const needs_json = await needs.json();

            const employees = await fetch("http://localhost:4000/free-employees", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const employees_json = await employees.json();

            const algo = new AlgoGlouton();
            const result = algo.optimizeAssignments(needs_json, employees_json);

            res.json(result);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    });
}

module.exports = {initAlgorithm};