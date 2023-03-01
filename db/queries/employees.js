const query = require("../models");

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

module.exports = {
  getAll,
  getOneById
};
