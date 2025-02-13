const {PrismaClient} = require('@prisma/client');
const {initAccounts} = require("./accounts");
const {initNeeds} = require("./needs");
const {initSkills} = require("./skills");
const {initTasks} = require("./tasks");
const Algo = require("./optimisation/algorithme/AlgoGaleEtShapley");

const express = require('express');
const cors = require('cors');
const app = express();

const port = 4000;

const prisma = new PrismaClient();

app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
));

app.options('*', cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }));

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get("/algoGaleEtShapley", async (req, res) => {
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

        const algo = new Algo();
        const result = algo.optimizeAssignments(needs_json, employees_json);

        res.json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

initNeeds(app, prisma);
initSkills(app, prisma);
initAccounts(app, prisma);
initTasks(app, prisma);
