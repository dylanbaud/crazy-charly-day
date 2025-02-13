function initAccounts(app, prisma) {
    //get ALL needs
    app.get('/employees', async (req, res) => {
        const employees = await prisma.account.findMany({
            where: {
                type: "employee"
            }
        });
        res.json(employees);
    });

    app.post('/create-employee', (req, res) => {
        const {email, lastName, firstName, tel, valid} = req.body;

        if (email == null || lastName == null || firstName == null || tel == null || valid == null) {
            res.status(400).json({
                message: 'Missing arguments',
            })
        } else {
            prisma.user.create({
                data: {
                    email: email,
                    first_name: firstName,
                    last_name: lastName,
                    tel: tel,
                    valid: valid,
                    type: "employee"
                },
            });

            res.json({
                message: `Operation done successfully`,
            });
        }
    });
}

module.exports = {initAccounts};