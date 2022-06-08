const response = require("../bin/res");
const bodyParser = require("body-parser");
const connection = require("../connection/db_connection");
const mysql = require("mysql2");

// get merek
exports.getDataMerek = async (req, res, next) => {
  connection.query("SELECT * FROM tb_merek", function (error, rows, fileds) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

// get merek by kd
exports.getMerekByKode = async (req, res) => {
  const kd_merek = req.params.kd_merek;
  connection.query(
    "SELECT merek FROM tb_merek WHERE kd_merek = ?",
    [kd_merek],
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

// add merek
exports.addMerek = async (req, res) => {
  const post = { merek: req.body.merek };

  let query = "SELECT merek FROM ?? WHERE ??=?";
  const table = ["tb_merek", "merek", post.merek];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows, fileds) {
    if (error) {
      console.log(error);
    } else {
      if (post.merek !== 0) {
        response.null("data kosong", res);
      } else {
        if (rows.length === 0) {
          let query = "INSERT INTO ?? SET ?";
          const table = ["tb_merek"];
          query = mysql.format(query, table);

          connection.query(query, post, function (error, rows) {
            if (error) {
              console.log(error);
            } else {
              response.ok("berhasil menambahkan data", res);
            }
          });
        } else {
          response.exists("merek telah ada", res);
        }
      }
    }
  });
};

// update data merek
exports.updateMerek = async (req, res) => {
  const up = {
    kd_merek: req.body.kd_merek,
    merek: req.body.merek,
  };

  let query = "SELECT kd_merek FROM ?? WHERE ??=?";
  const table = ["tb_merek", "kd_merek", up.kd_merek];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!up.kd_merek) {
        response.null("id kosong", res);
      } else {
        if (up.kd_merek) {
          let query = "SELECT kd_merek FROM ?? WHERE kd_merek=?";
          const table = ["tb_merek", up.kd_merek];
          query = mysql.format(query, table);
          connection.query(query, up, function (error, rows, fileds) {
            if (error) {
              console.log(error);
            } else {
              if (!up.merek) {
                response.null("data kosong", res);
              } else {
                if (rows.length > 0) {
                  let query = "SELECT merek FROM ?? WHERE merek=?";
                  const table = ["tb_merek", up.merek];
                  query = mysql.format(query, table);
                  connection.query(query, up, function (error, rows) {
                    if (error) {
                      console.log(error);
                    } else {
                      if (rows.length === 0) {
                        let query =
                          "UPDATE tb_merek SET merek=? WHERE kd_merek=?";
                        const table = [up.merek, up.kd_merek];
                        query = mysql.format(query, table);

                        connection.query(query, up, function (error, rows) {
                          console.log(rows);
                          if (error) {
                            console.log(error);
                          } else {
                            response.ok("data berhasil di ubah", res);
                          }
                        });
                      } else {
                        response.exists("merek sudah ada", res);
                      }
                    }
                  });
                }
              }
            }
          });
        }
      }
    }
  });
};

// delete data
exports.deleteMerek = async (req, res) => {
  const del = {
    kd_merek: req.body.kd_merek,
  };

  let query = "SELECT kd_merek FROM ?? WHERE ??=?";
  const table = ["tb_merek", "kd_merek", del.kd_merek];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length === 0) {
        let query = "SELECT kd_merek FROM ?? WHERE kd_merek=?";
        const table = ["tb_merek", del.kd_merek];
        query = mysql.format(query, table);

        connection.query(query, del, function (error, rows, fileds) {
          if (error) {
            console.log(error);
          } else {
            response.null("data tidak ada", res);
          }
        });
      } else {
        let query = "DELETE FROM ?? WHERE kd_merek=?";
        const table = ["tb_merek", del.kd_merek];
        query = mysql.format(query, table);

        connection.query(query, del, function (error, rows, fileds) {
          if (error) {
            console.log(error);
          } else {
            response.ok("berhasil menghapus data", res);
          }
        });
      }
    }
  });
};
