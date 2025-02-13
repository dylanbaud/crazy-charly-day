function initSkills(app, prisma) {

    //get ALL skills
    app.get('/skills', async (req, res) => {
        const skills = await prisma.skill.findMany();

        res.json(skills);
    });

    //create skill
    app.post('/skill', async (req, res) => {
        const {title, description} = req.body;

        if (!title || !description) {
            res.status(400).json({
                message: 'Missing arguments',
            })
        } else {
            const skill = await prisma.skill.create({
                data: {
                    title,
                    description,
                }
            });

            res.json(skill);
        }
    });

    //update skill
    app.put('/skill/:id', async (req, res) => {
        const {id} = req.params;
        const {title, description} = req.body;

        if (!title || !description) {
            res.status(400).json({
                message: 'Missing arguments',
            })
        } else {
            const skill = await prisma.skill.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    title,
                    description,
                }
            });
            res.json(skill);
        }
    });

    //delete skill
    app.delete('/skill/:id', async (req, res) => {
        const {id} = req.params;

        const skill = await prisma.skill.delete({
            where: {
                id: parseInt(id),
            }
        });

        res.json(skill);
    });

    //get skill by id
    app.get('/skill/:id', async (req, res) => {
        const {id} = req.params;

        const skill = await prisma.skill.findUnique({
            where: {
                id: parseInt(id),
            }
        });

        res.json(skill);
    });
}

module.exports = {initSkills};

