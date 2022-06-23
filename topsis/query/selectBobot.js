const mysql = require("mysql2");
const pool = require("../../connection/db_connection");

const allBobotKA1 = async () => {
  const promisePool = pool.promise();

  const [rows, fields] = await promisePool.query(
    "SELECT * FROM tb_bobot",
    [5, 5, 4, 4, 4, 4]
  );

  return rows;
};

const processorBobotKA1 = async () => {
  const promisePool = pool.promise();

  const [rows, fields] = await promisePool.query(
    "SELECT processor FROM tb_bobot WHERE kode='KA1'",
    [5]
  );

  return rows;
};

module.exports = {
  allBobotKA1,
  processorBobotKA1,
};
