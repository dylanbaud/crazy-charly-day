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
}

module.exports = {initNeeds};