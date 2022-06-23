const response = require("../bin/res");
const bodyParser = require("body-parser");
const connection = require("../connection/db_connection");
const mysql = require("mysql2");

// tambah data bobot
exports.addDataBobot = async (req, res) => {
  const post = {
    kode: req.body.kode,
    processor: req.body.processor,
    ram: req.body.ram,
    penyimpanan: req.body.penyimpanan,
    vga: req.body.vga,
    display: req.body.display,
    harga: req.body.harga,
  };

  let query = "SELECT * FROM ??";
  const table = ["tb_bobot"];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!post.kode) {
        response.null("kode bobot harus di isi", res);
      } else {
        if (!post.processor) {
          response.null("bobot processro harus di isi", res);
        } else {
          if (!post.ram) {
            response.null("bobot ram harus di isi", res);
          } else {
            if (!post.penyimpanan) {
              response.null("bobot penyimpanan harus di isi", res);
            } else {
              if (!post.vga) {
                response.null("bobot vga harus di isi", res);
              } else {
                if (!post.display) {
                  response.null("bobot display harus di isi", res);
                } else {
                  if (!post.harga) {
                    response.null("bobot harga harus di isi", res);
                  } else {
                    if (rows.length === 0) {
                      let query = "INSERT INTO ?? SET ?";
                      const table = ["tb_bobot"];

                      query = mysql.format(query, table);

                      connection.query(query, post, function (error, rows) {
                        if (error) {
                          console.log(error);
                        } else {
                          response.ok("berhasil menambahkan bobot", res);
                        }
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
};

exports.getBobot = async (req, res) => {
  connection.query("SELECT * FROM tb_bobot", function (error, rows) {
    if (error) {
      console.log(error);
    } else response.ok(rows, res);
  });
};

// update bobot
exports.updateBobot = async (req, res) => {
  const up = {
    kode: req.body.kode,
    processor: req.body.processor,
    ram: req.body.ram,
    penyimpanan: req.body.penyimpanan,
    vga: req.body.vga,
    display: req.body.display,
    harga: req.body.harga,
  };

  let query = "SELECT * FROM ?? WHERE kode=?";
  const table = ["tb_bobot", up.kode];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!post.kode) {
        response.null("kode bobot harus di isi", res);
      } else {
        if (!post.processor) {
          response.null("bobot processro harus di isi", res);
        } else {
          if (!post.ram) {
            response.null("bobot ram harus di isi", res);
          } else {
            if (!post.penyimpanan) {
              response.null("bobot penyimpanan harus di isi", res);
            } else {
              if (!post.vga) {
                response.null("bobot vga harus di isi", res);
              } else {
                if (!post.display) {
                  response.null("bobot display harus di isi", res);
                } else {
                  if (!post.harga) {
                    response.null("bobot harga harus di isi", res);
                  } else {
                    if (rows.length === 0) {
                      let query =
                        "UPDATE tb_bobot SET processor=?, ram=?, penyimpanan=?, vga=?, display=?, harga=? WHERE kode=?";
                      const table = [
                        ip.processor,
                        up.ram,
                        up.penyimpanan,
                        up.vga,
                        up.display,
                        up.harga,
                        up.kode,
                      ];

                      query = mysql.format(query, table);

                      connection.query(query, post, function (error, rows) {
                        if (error) {
                          console.log(error);
                        } else {
                          response.ok("berhasil merubah bobot", res);
                        }
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
};
