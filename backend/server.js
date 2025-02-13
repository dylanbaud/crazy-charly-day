const {initNeeds} = require("./needs");


const express = require('express');
const app = express();

const port = 4000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

initNeeds(app);