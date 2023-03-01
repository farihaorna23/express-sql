const express = require("express");
const router = express.Router();
const { getAll, getOneById } = require("../db/queries/employees");

router.get("/hello", (req, res, next) => {
  try {
    res.send("World");
  } catch (error) {
    next(error);
  }
});

//Get all employees, or get one employee by id
router.get("/employees/:id?", async (req, res, next) => {
  try {
    const { id } = req.params;
    let data;

    if (id) {
      if (isNaN(parseInt(id))) {
        res.status(404).json({ msg: "Invalid Id" });
      }
      data = await getOneById(id);
    } else {
      data = await getAll();
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
