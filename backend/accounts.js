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
        const {email, lastName, firstName, tel, skills} = req.body;

        if (email == null || lastName == null || firstName == null || tel == null) {
            res.status(400).json({
                message: 'Missing arguments',
            })
        } else {
            const employee = prisma.user.create({
                data: {
                    email: email,
                    first_name: firstName,
                    last_name: lastName,
                    tel: tel,
                    valid: false,
                    type: "employee"
                },
            });

            skills.forEach(skill => {
                prisma.skill_interest.create({
                    data: {
                        employee_id: employee.id,
                        skill_id: skill.id,
                        interest: skill.interest
                    }
                })
            });

            res.json({
                data: employee,
                message: `Operation done successfully`,
            });
        }
    });
}

module.exports = {initAccounts};