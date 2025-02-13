const express = require('express');
const app = express();

const port = 4000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/users', (req, res) => {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
    ];
    res.json(users);
});

//NEEDS

//get ALL needs
app.get('/needs', (req, res) => {
    const needs = {};
    res.json(needs);
});

app.post('/create-need', (req, res) => {
    const {description, skill, customer} = req.body;

    if(description==null || skill ==null || customer == null) {
        res.status(400).json({
            message: 'Missing arguments',
        })
    } else {
        //TODO

        res.json({
            message: `Operation done successfully`,
        });
    }
});

//