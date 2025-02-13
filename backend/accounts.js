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

    app.post('/create-employee', async (req, res) => {
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
    });
}

module.exports = {initAccounts};