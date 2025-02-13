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

    app.get('/employees/:empId', async (req, res) => {
        try {
            const {empId} = req.params;
            const employee = await prisma.account.findUnique({
                where: {
                    id: parseInt(empId)
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