function initAccounts(app, prisma) {
    //get ALL needs
    app.get('/employees', async (req, res) => {
        try {
            const employees = await prisma.account.findMany({
                where: {
                    type: "employee"
                }
            });
            res.json(employees);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.get('/employee/:emp_id', async (req, res) => {
        try {
            const {emp_id} = req.params;
            const employee = await prisma.account.findFirst({
                where: {
                    id: emp_id
                }
            });
            res.json(employee);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.post('/login', async (req, res) => {
        try {
            const {email} = req.body;
            const employee = await prisma.account.findFirst({
                where: {
                    email: email
                }
            });
            res.json(employee);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.post('/employee', async (req, res) => {
        try {
            const {email, lastName, firstName, tel, skills} = req.body;

            if (email == null || lastName == null || firstName == null || tel == null) {
                res.status(400).json({
                    message: 'Missing arguments',
                })
            } else {
                const employee = await prisma.account.create({
                    data: {
                        email: email,
                        first_name: firstName,
                        last_name: lastName,
                        tel: tel,
                        valid: false,
                        type: "employee"
                    },
                });

                for (const skill of skills) {
                    await prisma.skill_interest.create({
                        data: {
                            employee_id: employee.id,
                            skill_id: skill.id,
                            interest: skill.interest
                        }
                    })
                }

                res.json({
                    data: employee,
                    message: `Operation done successfully`,
                });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });
}

module.exports = {initAccounts};