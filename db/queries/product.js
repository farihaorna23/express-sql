const query = require("../models");

//all the product queries should be here
const getAll = async () => {
  return await query("SELECT * FROM products");
};

module.exports = {
  getAll
};
