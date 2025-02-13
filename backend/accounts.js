const bcrypt = require('bcrypt');

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
            const {email, password} = req.body;

            if (email == null) {
                res.status(400).json({
                    message: 'Missing arguments',
                })
            }

            // Bypass password
            if(password == null) {
                const employee = await prisma.account.findFirst({
                    where: {
                        email: email
                    }
                });
                res.json(employee);
            }

            else{
                const saltRounds = 10;
                let securedPassword;
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    securedPassword = hash;
                });

                const employee = await prisma.account.findFirst({
                    where: {
                        email: email,
                        password: securedPassword
                    }
                });

                if(employee) {

                    res.json(
                        {
                            data: {
                                id: employee.id,
                                email: email,
                                first_name: employee.firstName,
                                last_name: employee.lastName,
                                tel: employee.tel,
                                valid: (employee.type !== "employee"),
                                type: employee.type,
                            },
                        }
                    );
                }
                else{
                    res.status(500).send("le mot de passe ne correspond pas.");
                }
            }
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
            const {email, lastName, firstName, tel, skills, password} = req.body;

            if (email == null || lastName == null || firstName == null || tel == null || password == null) {
                res.status(400).json({
                    message: 'Missing arguments',
                })
            } else {
                await createAccount(res, email, firstName, lastName, tel, skills, password, "employee");
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.post('/clients', async (req, res) => {
        try {
            const {email, lastName, firstName, tel, password} = req.body;

            if (email == null || lastName == null || firstName == null || tel == null || password == null) {
                res.status(400).json({
                    message: 'Missing arguments',
                })
            } else {
                await createAccount(res, email, firstName, lastName, tel, password, "client");
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.post('/administrator', async (req, res) => {
        try {
            const {email, lastName, firstName, tel, password} = req.body;

            if (email == null || lastName == null || firstName == null || tel == null || password == null) {
                res.status(400).json({
                    message: 'Missing arguments',
                })
            } else {
                await createAccount(res, email, firstName, lastName, tel, null, password, "administrator");
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });

    async function createAccount(res, email, firstName, lastName, tel, skills, password, type) {

        const saltRounds = 10;
        const securedPassword = await bcrypt.hash(password, saltRounds);

        const employee = await prisma.account.create({
            data: {
                email: email,
                first_name: firstName,
                last_name: lastName,
                tel: tel,
                valid: (type !== "employee"),
                type: type,
                password: securedPassword,
            },
        });

        if(skills != null){
            for (const skill of skills) {
                await prisma.skill_interest.create({
                    data: {
                        employee_id: employee.id,
                        skill_id: skill.id,
                        interest: skill.interest
                    }
                })
            }
        }


        res.json({
            data: {
                email: email,
                first_name: firstName,
                last_name: lastName,
                tel: tel,
                valid: (type !== "employee"),
                type: type,
            },
            message: `Operation done successfully`,
        });
    }
}

module.exports = {initAccounts};