function initSkills(app, prisma) {
  //get ALL skills
  app.get("/skills", async (req, res) => {
    try {
      const skills = await prisma.skill.findMany();

      res.json(skills);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  //create skill
  app.post("/skills", async (req, res) => {
    try {
      const { title, description } = req.body;

      if (!title || !description) {
        res.status(400).json({
          message: "Missing arguments",
        });
      } else {
        const skill = await prisma.skill.create({
          data: {
            title,
            description,
          },
        });

        res.json(skill);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  //update skill
  app.put("/skills/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title || !description) {
        res.status(400).json({
          message: "Missing arguments",
        });
      } else {
        const skill = await prisma.skill.update({
          where: {
            id: parseInt(id),
          },
          data: {
            title,
            description,
          },
        });
        res.json(skill);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  //delete skill
  app.delete("/skills/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const skill = await prisma.skill.delete({
        where: {
          id: parseInt(id),
        },
      });

      res.json(skill);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  //get skill by id
  app.get("/skills/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const skill = await prisma.skill.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      res.json(skill);
    } catch (err) {
      res.status(500).send(err);
    }
  });
}

module.exports = { initSkills };
