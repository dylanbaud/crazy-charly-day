function initAccounts(app, prisma) {
    //get ALL needs
    app.get('/employees', async (req, res) => {
        try {
            const employees = await prisma.account.findMany({
                where: {
                    type: "employee"
                },
                include: {
                    skill_interest: true
                }
            });
            res.json(employees);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.get('/accounts/:id', async (req, res) => {
        try {
            const {id} = req.params;
            const employee = await prisma.account.findUnique({
                where: {
                    id: parseInt(id)
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

            if (email == null) {
                res.status(400).json({
                    message: 'Missing arguments',
                })
            }

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

    app.get("/free-employees", async (req, res) => {
        try {
            const employees = await prisma.account.findMany({
                where: {
                    type: "employee",
                    task_task_employee_idToaccount: {
                        none: {
                            finish_date: {
                                lte: new Date()
                            },
                        },
                    }
                },
                include: {
                    task_task_employee_idToaccount: true,
                    skill_interest: true
                },
            });


            res.json(employees);
        } catch (error) {
            res.status(500).send(error);
        }
    })

    app.post('/employees', async (req, res) => {
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