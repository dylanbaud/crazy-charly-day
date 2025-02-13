const {PrismaClient} = require('@prisma/client');
const {initAccounts} = require("./accounts");
const {initNeeds} = require("./needs");
const {initSkills} = require("./skills");
const {initTasks} = require("./tasks");
const {initAlgorithm} = require("./algorithm");

const express = require('express');
const cors = require('cors');
const app = express();

const port = 45555;

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

initNeeds(app, prisma);
initSkills(app, prisma);
initAccounts(app, prisma);
initTasks(app, prisma);
initAlgorithm(app);