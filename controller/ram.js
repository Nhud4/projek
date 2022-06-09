const response = require("../bin/res");
const bodyParser = require("body-parser");
const connection = require("../connection/db_connection");
const mysql = require("mysql2");

// get all ram
exports.getDataRam = async (req, res) => {
  connection.query("SELECT * FROM tb_ram", function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

// get processor by kode
exports.getRamByKode = async (req, res) => {
  const get = {
    kd_ram: req.body.kd_ram,
  };

  let query = "SELECT kd_ram FROM ?? WHERE ??=?";
  const table = ["tb_ram", "kd_ram", get.kd_ram];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!get.kd_ram) {
        response.null("kode tidak boleh kosong", res);
      } else {
        if (rows.length > 0) {
          let query = "SELECT type_ram, kapasitas_ram FROM ?? WHERE kd_ram=?";
          const table = ["tb_ram", get.kd_ram];

          query = mysql.format(query, table);

          connection.query(query, get, function (error, rows) {
            if (error) {
              console.log(error);
            } else {
              response.ok(rows, res);
            }
          });
        } else {
          response.null("kode tidak ditemukan", res);
        }
      }
    }
  });
};

// add ram
exports.addRam = async (req, res) => {
  const post = {
    type_ram: req.body.type_ram,
    kapasitas_ram: req.body.kapasitas_ram,
  };

  let query = "SELECT * FROM ?? WHERE type_ram=? AND kapasitas_ram=?";
  const table = ["tb_ram", post.type_ram, post.kapasitas_ram];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!post.type_ram) {
        response.null("type ram tidak di isi", res);
      } else {
        if (!post.kapasitas_ram) {
          response.null("kapasitas ram tidak di isi", res);
        } else {
          if (rows.length === 0) {
            let query = "INSERT INTO ?? SET ?";
            const table = ["tb_ram"];

            query = mysql.format(query, table);

            connection.query(query, post, function (error, rows) {
              if (error) {
                console.log(error);
              } else {
                response.ok("behasil menambahkan data", res);
              }
            });
          } else {
            response.exists("type ram dan kapasitas ram telah ada", res);
          }
        }
      }
    }
  });
};

// update ram
exports.updateRam = async (req, res) => {
  const up = {
    kd_ram: req.body.kd_ram,
    type_ram: req.body.type_ram,
    kapasitas_ram: req.body.kapasitas_ram,
  };

  let query = "SELECT * FROM ?? WHERE type_ram=? AND kapasitas_ram=?";
  const table = ["tb_ram", up.type_ram, up.kapasitas_ram];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!up.kd_ram) {
        response.null("kode ram tidak di isi", res);
      } else {
        if (!up.type_ram) {
          response.null("type ram tidak di isi", res);
        } else {
          if (!up.kapasitas_ram) {
            response.null("kapasitas ram tidak di isi", res);
          } else {
            if (rows.length === 0) {
              let query =
                "UPDATE tb_ram SET type_ram=?, kapasitas_ram=? WHERE kd_ram=?";
              const table = [up.type_ram, up.kapasitas_ram, up.kd_ram];

              query = mysql.format(query, table);

              connection.query(query, up, function (error, rows) {
                if (error) {
                  console.log(error);
                } else {
                  response.ok("behasil mengubah data ram", res);
                }
              });
            } else {
              response.exists("type ram dan kapasitas ram telah ada", res);
            }
          }
        }
      }
    }
  });
};

//delete data
exports.deleteRam = async (req, res) => {
  const del = {
    kd_ram: req.body.kd_ram,
  };

  let query = "SELECT kd_ram FROM ?? WHERE ??=?";
  const table = ["tb_ram", "kd_ram", del.kd_ram];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!del.kd_ram) {
        response.null("kode ram tidak di isi", res);
      } else {
        if (rows.length === 0) {
          let query = "SELECT kd_ram FROM ?? WHERE kd_ram=?";
          const table = ["tb_ram", del.kd_ram];

          query = mysql.format(query, table);

          connection.query(query, del, function (error, rows) {
            if (error) {
              console.log(error);
            } else {
              response.null("data tidak ada", res);
            }
          });
        } else {
          let query = "DELETE FROM ?? WHERE kd_ram=?";
          const table = ["tb_ram", del.kd_ram];

          query = mysql.format(query, table);

          connection.query(query, del, function (error, rows) {
            if (error) {
              console.log(error);
            } else {
              response.ok("berhasil menghapus data", res);
            }
          });
        }
      }
    }
  });
};
