const response = require("../bin/res");
const bodyParser = require("body-parser");
const connection = require("../connection/db_connection");
const mysql = require("mysql2");

// get all vga
exports.getAllVga = async (req, res) => {
  connection.query("SELECT * FROM tb_vga", function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

// get vga by kode
exports.getVgaByKode = async (req, res) => {
  const get = {
    kd_vga: req.body.kd_vga,
  };

  let query = "SELECT kd_vga FROM ?? WHERE ??=?";
  const table = ["tb_vga", "kd_vga", get.kd_vga];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!get.kd_vga) {
        response.null("kode vga tidak di isi", res);
      } else {
        if (rows.length > 0) {
          let query = "SELECT merek_vga, kapasitas_vga FROM ?? WHERE kd_vga=?";
          const table = ["tb_vga", get.kd_vga];

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

// add vga
exports.addVga = async (req, res) => {
  const post = {
    merek_vga: req.body.merek_vga,
    kapasitas_vga: req.body.kapasitas_vga,
  };

  let query = "SELECT * FROM ?? WHERE merek_vga=? AND kapasitas_vga=?";
  const table = ["tb_vga", post.merek_vga, post.kapasitas_vga];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!post.merek_vga) {
        response.null("merek vga tidak di isi", res);
      } else {
        if (!post.kapasitas_vga) {
          response.null("kapasitas vga tidak di isi", res);
        } else {
          if (rows.length === 0) {
            let query = "INSERT INTO ?? SET ?";
            const table = ["tb_vga"];

            query = mysql.format(query, table);

            connection.query(query, post, function (error, rows) {
              if (error) {
                console.log(error);
              } else {
                response.ok("berhasil menambahkan data vga", res);
              }
            });
          } else {
            response.exists("merek dan kapasitas VGA telah ada", res);
          }
        }
      }
    }
  });
};

// update vga
exports.updateVga = async (req, res) => {
  const up = {
    kd_vga: req.body.kd_vga,
    merek_vga: req.body.merek_vga,
    kapasitas_vga: req.body.kapasitas_vga,
  };

  let query = "SELECT * FROM ?? WHERE merek_vga=? AND kapasitas_vga=?";
  const table = ["tb_vga", up.merek_vga, up.kapasitas_vga];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!up.kd_vga) {
        response.null("kode vga tidak di isi", res);
      } else {
        if (!up.merek_vga) {
          response.null("merek vga tidak di isi", res);
        } else {
          if (!up.kapasitas_vga) {
            response.null("kapasitas vga tidak di isi", res);
          } else {
            if (rows.length === 0) {
              let query =
                "UPDATE tb_vga SET merek_vga=?, kapasitas_vga=? WHERE kd_vga=?";
              const table = [up.merek_vga, up.kapasitas_vga, up.kd_vga];

              query = mysql.format(query, table);

              connection.query(query, up, function (error, rows) {
                if (error) {
                  console.log(error);
                } else {
                  response.ok("berhasil mengubah data vga", res);
                }
              });
            } else {
              response.exists("merek dan kapasitas vga telah ada", res);
            }
          }
        }
      }
    }
  });
};

// delete vga
exports.deleteVga = async (req, res) => {
  const del = {
    kd_vga: req.body.kd_vga,
  };

  let query = "SELECT kd_vga FROM ?? WHERE ??=?";
  const table = ["tb_vga", "kd_vga", del.kd_vga];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!del.kd_vga) {
        response.null("kode vga tidak di isi", res);
      } else {
        if (rows.length === 0) {
          let query = "SELECT kd_vga FROM ?? WHERE kd_vga=?";
          const table = ["tb_vga", del.kd_vga];

          query = mysql.format(query, table);

          connection.query(query, del, function (error, rows) {
            if (error) {
              console.log(error);
            } else {
              response.null("data tidak ada", res);
            }
          });
        } else {
          let query = "DELETE FROM ?? WHERE kd_vga=?";
          const table = ["tb_vga", del.kd_vga];

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
