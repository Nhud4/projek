const mysql = require("mysql2");
const pool = require("../connection/db_connection");

const test = async () => {
  const promisePool = pool.promise();

  const [rows, fields] = await promisePool.query("SELECT ?", ["HELLO"]);
  // console.log(rows);
  // console.log(fields);

  return rows;
};

module.exports = {
  test,
};
