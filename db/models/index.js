const mysql = require("mysql");

const mysqlConfig = {
  host: "localhost",
  user: "root",
  password: "Shahadat66!",
  database: "bestbuy"
};

//will return a connection instance that can be used to write queries to the database
const connection = mysql.createPool(mysqlConfig);

//query will be string
//values will be an array
const query = (query, values) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      }
      //the result is what is returned from the database
      resolve(results);
    });
  });
};

//exporting the query function
module.exports = query;
