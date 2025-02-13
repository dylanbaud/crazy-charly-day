function initNeeds(app, prisma) {
    //get ALL needs
    app.get('/needs', async (req, res) => {
        await prisma.need.findMany().then(needs => {
            res.json(needs);
        });
        res.json(needs);
    });

    app.post('/create-need', (req, res) => {
        const {description, skill, customer} = req.body;

        if (description == null || skill == null || customer == null) {
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
}

module.exports = {initNeeds};