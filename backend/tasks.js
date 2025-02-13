function initTasks(app, prisma) {

    app.post('/tasks', async (req, res) => {
        try {
            const {need_id, employee_id, start_date, finish_date} = req.body;

            if (!need_id || !employee_id || !start_date || !finish_date) {
                res.status(400).json({
                    message: 'Missing arguments',
                })
            }

            const task = await prisma.task.create({
                data: {
                    need_id,
                    employee_id,
                    start_date,
                    finish_date,
                }
            });

            res.json(task);
        } catch (error) {
            res.status(500).send(error);
        }
    });
}

module.exports = {initTasks};