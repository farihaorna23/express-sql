const query = require("../models");

//the employee queries

//because we are going to be getting data from database, the function needs to be asyncronus
const getAll = async () => {
  return await query("SELECT * FROM employees");
};

//paramatized query
const getOneById = async EmployeeId => {
  return await query("SELECT * FROM employees WHERE EmployeeId = ?", [
    EmployeeId
  ]);
};

//the properties of the employee object will match the coloumn
const createOne = async employee => {
  return await query("INSERT INTO employees SET ?", [employee]);
};

const updateOne = async (employeeDetail, employeeId) => {
  return await query("UPDATE employees SET ? WHERE EmployeeId = ?", [
    employeeDetail,
    employeeId
  ]);
};

const deleteOne = async EmployeeId => {
  return await query("DELETE FROM employees WHERE EmployeeId = ?", [
    EmployeeId
  ]);
};

//exporting all the function
module.exports = {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne
};
