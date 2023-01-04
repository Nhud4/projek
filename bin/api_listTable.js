const mysql = require("mysql2");
const bodyParser = require("body-parser");
const response = require("./res");
const connection = require("../connection/db_connection");

// show table
exports.showTable = async (req, res) => {
  connection.query("SHOW TABLES", function (error, rows, fileds) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

// list
exports.listTable = async (req, res) => {
  const list = {
    table: req.body.table,
  };

  let query = "SELECT * FROM ??";
  const table = [list.table];

  query = mysql.format(query, table);

  connection.query(query, list, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};
