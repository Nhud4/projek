const response = require("../bin/res");
const bodyParser = require("body-parser");
const connection = require("../connection/db_connection");
const mysql = require("mysql2");

// get all penyimpanan
exports.getPenyimpanan = async (req, res) => {
  connection.query("SELECT * FROM tb_penyimpanan", function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

// get penyimpanan by kode
exports.getPenyimpananByKode = async (req, res) => {
  const get = {
    kd_penyimpanan: req.body.kd_penyimpanan,
  };

  let query = "SELECT kd_penyimpanan FROM ?? WHERE ??=?";
  const table = ["tb_penyimpanan", "kd_penyimpanan", get.kd_penyimpanan];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!get.kd_penyimpanan) {
        response.null("kode tidak di isi", res);
      } else {
        if (rows.length > 0) {
          let query =
            "SELECT type_penyimpanan, kapasitas_penyimpanan FROM ?? WHERE kd_penyimpanan=?";
          const table = ["tb_penyimpanan", get.kd_penyimpanan];

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

// add penyimpanan
exports.addPenyimpanan = async (req, res) => {
  const post = {
    type_penyimpanan: req.body.type_penyimpanan,
    kapasitas_penyimpanan: req.body.kapasitas_penyimpanan,
  };

  let query =
    "SELECT * FROM ?? WHERE type_penyimpanan=? AND kapasitas_penyimpanan=?";
  const table = [
    "tb_penyimpanan",
    post.type_penyimpanan,
    post.kapasitas_penyimpanan,
  ];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!post.type_penyimpanan) {
        response.null("type penyimpanan tidak di isi", res);
      } else {
        if (!post.kapasitas_penyimpanan) {
          response.null("kapasitas penyimpanan tidak di isi", res);
        } else {
          if (rows.length === 0) {
            let query = "INSERT INTO ?? SET ?";
            const table = ["tb_penyimpanan"];

            query = mysql.format(query, table);

            connection.query(query, post, function (error, rows) {
              if (error) {
                console.log(error);
              } else {
                response.ok("berhasil menambahkan data penyimpanan", res);
              }
            });
          } else {
            response.exists(
              "type penyimpanan dan kapasitas penyimpanan telah ada",
              res
            );
          }
        }
      }
    }
  });
};

// update penyimpanan
exports.updatePenyimpanan = async (req, res) => {
  const up = {
    kd_penyimpanan: req.body.kd_penyimpanan,
    type_penyimpanan: req.body.type_penyimpanan,
    kapasitas_penyimpanan: req.body.kapasitas_penyimpanan,
  };

  let query =
    "SELECT * FROM ?? WHERE type_penyimpanan=? AND kapasitas_penyimpanan=?";
  const table = [
    "tb_penyimpanan",
    up.type_penyimpanan,
    up.kapasitas_penyimpanan,
  ];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!up.kd_penyimpanan) {
        response.null("kode penyimpanan tidak di isi", res);
      } else {
        if (!up.type_penyimpanan) {
          response.null("type penyimpanan tidak di isi", res);
        } else {
          if (!up.kapasitas_penyimpanan) {
            response.null("kapasitas penyimpanan tidak di isi", res);
          } else {
            if (rows.length === 0) {
              let query =
                "UPDATE tb_penyimpanan SET type_penyimpanan=?, kapasitas_penyimpanan=? WHERE kd_penyimpanan=?";
              const table = [
                up.type_penyimpanan,
                up.kapasitas_penyimpanan,
                up.kd_penyimpanan,
              ];

              query = mysql.format(query, table);

              connection.query(query, up, function (error, rows) {
                if (error) {
                  console.log(error);
                } else {
                  response.ok("berhasil merubah data", res);
                }
              });
            } else {
              response.exists("type dan kapasitas penyimpanan telah ada", res);
            }
          }
        }
      }
    }
  });
};

// delete penyimpanan
exports.deletePeyimpanan = async (req, res) => {
  const del = {
    kd_penyimpanan: req.body.kd_penyimpanan,
  };

  let query = "SELECT kd_penyimpanan FROM ?? WHERE ??=?";
  const table = ["tb_penyimpanan", "kd_penyimpanan", del.kd_penyimpanan];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!del.kd_penyimpanan) {
        response.null("kode penyimpanan tidak di isi", res);
      } else {
        if (rows.length === 0) {
          let query = "SELECT kd_penyimpanan FROM ?? WHERE kd_penyimpanan=?";
          const table = ["tb_penyimpanan", del.kd_penyimpanan];

          query = mysql.format(query, table);

          connection.query(query, del, function (error, rows) {
            if (error) {
              console.log(error);
            } else {
              response.null("data tidak ditemukan", res);
            }
          });
        } else {
          let query = "DELETE FROM ?? WHERE kd_penyimpanan=?";
          const table = ["tb_penyimpanan", del.kd_penyimpanan];

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
