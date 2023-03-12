const express = require("express");
const router = express.Router();
//imported the functions
const {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne
} = require("../db/queries/employees");

//so when we have several queries, all the queries will be exprted from queries/index.js
// we can do:
//const db = require("../db/queries/index.js")
//to access the function of all the quesries -> db.employees.getAll() or db.product.getAll()

router.get("/hello", (req, res, next) => {
  try {
    res.send("World");
  } catch (error) {
    next(error);
  }
});

//Get all employees, or get one employee by id
//reading from the database, so need to async
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

//post, we will posting a new employee with all its detail
//from the request we would get the employee body, we don't need id for it
router.post("/employees", async (req, res, next) => {
  const employeeDetails = req.body;
  try {
    //will return an object with an insertedId
    let { insertId } = await createOne(employeeDetails);
    res.json({ msg: `Added the employee at`, insertId });
  } catch (error) {
    next(error);
  }
});

//put, will get an id and employee detail so that it can update the the selected employee
router.put("/employees/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateBody = req.body;
    if (id) {
      if (isNaN(parseInt(id))) {
        res.status(400).json({ msg: "Invalid Id" });
      }
      const result = await updateOne(updateBody, id);
      res.json({ msg: "Updated Succesfully" });
    }
  } catch (error) {
    next(error);
  }
});

//will receive an id to delete the employee
router.delete("/employees/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    if (id) {
      if (isNaN(parseInt(id))) {
        res.status(400).json({ msg: "Invalid Id" });
      }
      let result = await deleteOne(id);
      res.json({ msg: "Succesfully Deleted Employee" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
