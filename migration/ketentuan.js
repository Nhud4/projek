const connection = require("../connection/db_connection");
const mysql = require("mysql2");

function KA() {
  let query = `CREATE TABLE IF NOT EXISTS tb_KA_processor(
                                kode VARCHAR(5) NOT NULL,
                                kecepatan_processor VARCHAR(25) NOT NULL,
                                ketentuan VARCHAR(50) NOT NULL,
                                nilai INT(10) NOT NULL,
                                PRIMARY KEY(ketentuan) 
                              )`;
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      query = `CREATE TABLE IF NOT EXISTS tb_KA_ram(
                                kode VARCHAR(5) NOT NULL,
                                ram VARCHAR(25) NOT NULL,
                                ketentuan VARCHAR(50) NOT NULL,
                                nilai INT(10) NOT NULL,
                                PRIMARY KEY(ketentuan) 
                              )`;
      connection.query(query, function (error, rows) {
        if (error) {
          console.log(error);
        } else {
          query = `CREATE TABLE IF NOT EXISTS tb_KA_penyimpanan(
                                kode VARCHAR(5) NOT NULL,
                                kapasitas VARCHAR(25) NOT NULL,
                                jenis VARCHAR(25) NOT NULL,
                                ketentuan VARCHAR(50) NOT NULL,
                                nilai INT(10) NOT NULL,
                                PRIMARY KEY(ketentuan) 
                              )`;
          connection.query(query, function (error, rows) {
            if (error) {
              console.log(error);
            } else {
              query = `CREATE TABLE IF NOT EXISTS tb_KA_vga(
                                kode VARCHAR(5) NOT NULL,
                                vga VARCHAR(25) NOT NULL,
                                ketentuan VARCHAR(50) NOT NULL,
                                nilai INT(10) NOT NULL,
                                PRIMARY KEY(ketentuan) 
                              )`;
              connection.query(query, function (error, rows) {
                if (error) {
                  console.log(error);
                } else {
                  query = `CREATE TABLE IF NOT EXISTS tb_KA_display(
                                            kode VARCHAR(5) NOT NULL,
                                            display VARCHAR(25) NOT NULL,
                                            ketentuan VARCHAR(50) NOT NULL,
                                            nilai INT(10) NOT NULL,
                                            PRIMARY KEY(ketentuan) 
                                            )`;
                  connection.query(query, function (error, rows) {
                    if (error) {
                      console.log(error);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
  console.log("berhasil membuat Ketentuan Game");
}

function KB() {
  let query = `CREATE TABLE IF NOT EXISTS tb_KB_processor(
                                kode VARCHAR(5) NOT NULL,
                                kecepatan_processor VARCHAR(25) NOT NULL,
                                ketentuan VARCHAR(50) NOT NULL,
                                nilai INT(10) NOT NULL,
                                PRIMARY KEY(ketentuan) 
                              )`;
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      query = `CREATE TABLE IF NOT EXISTS tb_KB_ram(
                                kode VARCHAR(5) NOT NULL,
                                ram VARCHAR(25) NOT NULL,
                                ketentuan VARCHAR(50) NOT NULL,
                                nilai INT(10) NOT NULL,
                                PRIMARY KEY(ketentuan) 
                              )`;
      connection.query(query, function (error, rows) {
        if (error) {
          console.log(error);
        } else {
          query = `CREATE TABLE IF NOT EXISTS tb_KB_penyimpanan(
                                kode VARCHAR(5) NOT NULL,
                                kapasitas VARCHAR(25) NOT NULL,
                                jenis VARCHAR(25) NOT NULL,
                                ketentuan VARCHAR(50) NOT NULL,
                                nilai INT(10) NOT NULL,
                                PRIMARY KEY(ketentuan) 
                              )`;
          connection.query(query, function (error, rows) {
            if (error) {
              console.log(error);
            } else {
              query = `CREATE TABLE IF NOT EXISTS tb_KB_vga(
                                kode VARCHAR(5) NOT NULL,
                                vga VARCHAR(25) NOT NULL,
                                ketentuan VARCHAR(50) NOT NULL,
                                nilai INT(10) NOT NULL,
                                PRIMARY KEY(ketentuan) 
                              )`;
              connection.query(query, function (error, rows) {
                if (error) {
                  console.log(error);
                } else {
                  query = `CREATE TABLE IF NOT EXISTS tb_KB_display(
                                            kode VARCHAR(5) NOT NULL,
                                            display VARCHAR(25) NOT NULL,
                                            ketentuan VARCHAR(50) NOT NULL,
                                            nilai INT(10) NOT NULL,
                                            PRIMARY KEY(ketentuan) 
                                            )`;
                  connection.query(query, function (error, rows) {
                    if (error) {
                      console.log(error);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
  console.log("berhasil membuat Ketentuan Desain");
}

function KC() {
  let query = `CREATE TABLE IF NOT EXISTS tb_KC_processor(
                                kode VARCHAR(5) NOT NULL,
                                kecepatan_processor VARCHAR(25) NOT NULL,
                                ketentuan VARCHAR(50) NOT NULL,
                                nilai INT(10) NOT NULL,
                                PRIMARY KEY(ketentuan) 
                              )`;
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      query = `CREATE TABLE IF NOT EXISTS tb_KC_ram(
                                kode VARCHAR(5) NOT NULL,
                                ram VARCHAR(25) NOT NULL,
                                ketentuan VARCHAR(50) NOT NULL,
                                nilai INT(10) NOT NULL,
                                PRIMARY KEY(ketentuan) 
                              )`;
      connection.query(query, function (error, rows) {
        if (error) {
          console.log(error);
        } else {
          query = `CREATE TABLE IF NOT EXISTS tb_KC_penyimpanan(
                                kode VARCHAR(5) NOT NULL,
                                kapasitas VARCHAR(25) NOT NULL,
                                jenis VARCHAR(25) NOT NULL,
                                ketentuan VARCHAR(50) NOT NULL,
                                nilai INT(10) NOT NULL,
                                PRIMARY KEY(ketentuan) 
                              )`;
          connection.query(query, function (error, rows) {
            if (error) {
              console.log(error);
            } else {
              query = `CREATE TABLE IF NOT EXISTS tb_KC_vga(
                                kode VARCHAR(5) NOT NULL,
                                vga VARCHAR(25) NOT NULL,
                                ketentuan VARCHAR(50) NOT NULL,
                                nilai INT(10) NOT NULL,
                                PRIMARY KEY(ketentuan) 
                              )`;
              connection.query(query, function (error, rows) {
                if (error) {
                  console.log(error);
                } else {
                  query = `CREATE TABLE IF NOT EXISTS tb_KC_display(
                                            kode VARCHAR(5) NOT NULL,
                                            display VARCHAR(25) NOT NULL,
                                            ketentuan VARCHAR(50) NOT NULL,
                                            nilai INT(10) NOT NULL,
                                            PRIMARY KEY(ketentuan) 
                                            )`;
                  connection.query(query, function (error, rows) {
                    if (error) {
                      console.log(error);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
  console.log("berhasil membuat Ketentuan Office");
}

module.exports = {
  KA,
  KB,
  KC,
};
