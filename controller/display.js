const response = require("../bin/res");
const bodyParser = require("body-parser");
const connection = require("../connection/db_connection");
const mysql = require("mysql2");

// get all display
exports.getAllDisplay = async (req, res) => {
  connection.query("SELECT * FROM tb_display", function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

// get display by kode
exports.getDisplayByKode = async (req, res) => {
  const get = {
    kd_display: req.body.kd_display,
  };

  let query = "SELECT kd_display FROM ?? WHERE ??=?";
  const table = ["tb_display", "kd_display", get.kd_display];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!get.kd_display) {
        response.null("kode display tidak di isi", res);
      } else {
        if (rows.length > 0) {
          let query =
            "SELECT type_display, ukuran_dispaly FROM ?? WHERE kd_display=?";
          const table = ["tb_display", get.kd_display];

          query = mysql.format(query, table);

          connection.query(query, function (error, rows) {
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

// add display
exports.addDisplay = async (req, res) => {
  const post = {
    type_display: req.body.type_display,
    ukuran_dispaly: req.body.ukuran_dispaly,
  };
  console.log(req.body);

  let query = "SELECT * FROM ?? WHERE type_display=? AND ukuran_dispaly=?";
  const table = ["tb_display", post.type_display, post.ukuran_dispaly];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!post.type_display) {
        response.null("type display tidak di isi", res);
      } else {
        if (!post.ukuran_dispaly) {
          response.null("ukuran display tidak di isi", res);
        } else {
          if (rows.length === 0) {
            let query = "INSERT INTO ?? SET ?";
            const table = ["tb_display"];

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

// update display
exports.updateDisplay = async (req, res) => {
  const up = {
    kd_display: req.body.kd_display,
    type_display: req.body.type_display,
    ukuran_dispaly: req.body.ukuran_dispaly,
  };

  let query = "SELECT * FROM ?? WHERE type_display=? AND ukuran_dispaly=?";
  const table = ["tb_display", up.type_display, up.ukuran_dispaly];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!up.kd_display) {
        response.null("kode display tidak di isi", res);
      } else {
        if (!up.type_display) {
          response.null("type display tidak di isi", res);
        } else {
          if (!up.ukuran_dispaly) {
            response.null("ukuran display tidak di isi", res);
          } else {
            if (rows.length === 0) {
              let query =
                "UPDATE tb_display SET type_display=?, ukuran_dispaly=? WHERE kd_display=?";
              const table = [up.type_display, up.ukuran_dispaly, up.kd_display];

              query = mysql.format(query, table);

              connection.query(query, up, function (error, rows) {
                if (error) {
                  console.log(error);
                } else {
                  response.ok("berhasil mengubah data display", res);
                }
              });
            } else {
              response.exists("type dan ukuran display telah ada", res);
            }
          }
        }
      }
    }
  });
};

// delete display
exports.deleteDsiplay = async (req, res) => {
  const del = {
    kd_display: req.body.kd_display,
  };

  let query = "SELECT kd_display FROM ?? WHERE ??=?";
  const table = ["tb_display", "kd_display", del.kd_display];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!del.kd_display) {
        response.null("kode display tidak di isi", res);
      } else {
        if (rows.length === 0) {
          let query = "SELECT kd_display FROM ?? WHERE kd_display=?";
          const table = ["tb_display", del.kd_display];

          query = mysql.format(query, table);

          connection.query(query, del, function (error, rows) {
            if (error) {
              console.log(error);
            } else {
              response.null("data tidak ditemukan", res);
            }
          });
        } else {
          let query = "DELETE FROM ?? WHERE kd_display=?";
          const table = ["tb_display", del.kd_display];

          query = mysql.format(query, table);

          connection.query(query, del, function (error, rows) {
            if (error) {
              console.log(error);
            } else {
              response.ok("berasil menghapus data", res);
            }
          });
        }
      }
    }
  });
};
