const needsPerPage = 5;

function initNeeds(app, prisma) {
    //get ALL needs
    app.get('/needs', async (req, res) => {
        try {
            const {page} = req.query;

            let needs;

            if(page != null) {
                const skip = (page - 1) * needsPerPage;

                needs = await prisma.need.findMany({
                    skip: skip,
                    take: needsPerPage,
                    include: {
                        account: true,
                        skill: true,
                    }
                });
            }
            else {
                needs = await prisma.need.findMany({
                    include: {
                        account: true,
                        skill: true,
                    }
                });
            }

            res.json(needs);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    //create need
    app.post('/needs', async (req, res) => {
        try {
            const {customer_id, description, skill_id} = req.body;

            if (!customer_id || !description || !skill_id) {
                res.status(400).json({
                    message: 'Missing arguments',
                })
            } else {
                const need = await prisma.need.create({
                    data: {
                        customer_id,
                        description,
                        skill_id,
                    }
                });

                res.json(need);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });

    //get ALL needs of a customer
    app.get('/needs/:customer_id', async (req, res) => {
        try {
            const {customer_id} = req.params;
            const needs = await prisma.need.findMany({
                where: {
                    customer_id: parseInt(customer_id),
                },
                include: {
                    account: true,
                    skill: true,
                }
            });

            res.json(needs);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    //get free needs
    app.get('/free-needs', async (req, res) => {
        try {
            const needs = await prisma.need.findMany({
                where: {
                    task: {
                        none: {}
                    }
                },
                include: {
                    account: true,
                    skill: true,
                    task: true,
                }
            });

            res.json(needs);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    //update need
    app.put('/needs/:id', async (req, res) => {
        try {
            const {id} = req.params;
            const {description, skill_id} = req.body;

            if (!description || !skill_id) {
                res.status(400).json({
                    message: 'Missing arguments',
                })
            } else {
                const need = await prisma.need.update({
                    where: {
                        id: parseInt(id),
                    },
                    data: {
                        description,
                        skill_id,
                    }
                });
                res.json(need);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });
}

module.exports = {initNeeds};