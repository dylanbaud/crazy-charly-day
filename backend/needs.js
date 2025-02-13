const needsPerPage = 5;
function initNeeds(app, prisma) {
    //get ALL needs
    app.get('/needs', async (req, res) => {
        const needs = await prisma.need.findMany();

        res.json(needs);
    });

    //create need
    app.post('/create-need', async (req, res) => {
        const {customer_id, description, skill_id, need_index} = req.body;

        if (!customer_id || !description || !skill_id || !need_index) {
            res.status(400).json({
                message: 'Missing arguments',
            })
        } else {
            const need = await prisma.need.create({
                data: {
                    customer_id,
                    description,
                    skill_id,
                    need_index,
                }
            });

            res.json(need);
        }
    });

    app.get('/needs/:page', async (req, res) => {
        const {page} = req.params;

        const minId = (page-1) * 5;
        const maxId = (page) * 5;

        const needs = await prisma.need.findMany({
            where: {
                id: {
                    gt: minId,
                    lte: maxId,
                },
            }
        });

        res.json(needs);
    });

    //get ALL needs of a customer
    app.get('/needs/:customer_id', async (req, res) => {
        const {customer_id} = req.params;
        const needs = await prisma.need.findMany({
            where: {
                customer_id: parseInt(customer_id),
            }
        });

        res.json(needs);
    });

    //update need
    app.put('/update-need/:id', async (req, res) => {
        const {id} = req.params;
        const {description, skill_id, need_index} = req.body;

        if (!description || !skill_id || !need_index) {
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
                    need_index,
                }
            });
            res.json(need);
        }
    });
}

module.exports = {initNeeds};