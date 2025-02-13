const {PrismaClient} = require('@prisma/client');
const {initAccounts} = require("./accounts");
const {initNeeds} = require("./needs");

const express = require('express');
const app = express();

const port = 4000;

const prisma = new PrismaClient();

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

initNeeds(app, prisma);
initAccounts(app, prisma);