const mysql = require("mysql2");
const pool = require("../../connection/db_connection");

const allAlternatif = async () => {
  const promisePool = pool.promise();

  const [rows, fields] = await promisePool.query(
    `SELECT
    tb_alternatif.kode, 
    tb_laptop.laptop,
    tb_alternatif.processor,
    tb_alternatif.ram,
    tb_alternatif.penyimpanan,
    tb_alternatif.vga,
    tb_alternatif.display,
    tb_laptop.harga
    FROM tb_alternatif
    INNER JOIN tb_laptop
    ON tb_alternatif.id_laptop = tb_laptop.id`
  );

  return rows;
};

const alternatifProcessor = async () => {
  const promisePool = pool.promise();

  const [rows, fields] = await promisePool.query(
    "SELECT processor FROM tb_alternatif"
  );

  return rows;
};

module.exports = {
  allAlternatif,
  alternatifProcessor,
};
