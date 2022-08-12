const response = require("../bin/res");
const bodyParser = require("body-parser");
const connection = require("../connection/db_connection");
const mysql = require("mysql2");

//tambah bobot
exports.addAlternatif = async (req, res) => {
  const add = {
    id_laptop: req.body.id_laptop,
    processor: req.body.processor,
    ram: req.body.ram,
    penyimpanan: req.body.penyimpanan,
    vga: req.body.vga,
    display: req.body.display,
  };

  let query = "SELECT * FROM ?? WHERE id_laptop=?";
  const table = ["tb_alternatif", add.id_laptop];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!add.id_laptop) {
        response.null("id laptop harus di isi", res);
      } else {
        if (!add.processor) {
          response.null("processor harus di isi", res);
        } else {
          if (!add.ram) {
            response.null("ram harus di isi", res);
          } else {
            if (!add.penyimpanan) {
              response.null("penyimpanan harus di isi", res);
            } else {
              if (!add.vga) {
                response.null("vga harus di isi", res);
              } else {
                if (!add.display) {
                  response.null("display harus di isi", res);
                } else {
                  if (rows.length === 0) {
                    let query = "INSERT INTO ?? SET ?";
                    const tabel = ["tb_alternatif"];

                    query = mysql.format(query, tabel);

                    connection.query(query, add, function (error, rows) {
                      if (error) {
                        console.log(error);
                      } else {
                        response.ok("berhasil menambahkan data", res);
                      }
                    });
                  } else {
                    response.exists("data telah ada", res);
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

exports.getAlternatif = async (req, res) => {
  let query = `SELECT
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
    ON tb_alternatif.id_laptop = tb_laptop.id`;

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

// update alternatif
exports.updateAlternatif = async (req, res) => {
  const up = {
    kode: req.body.kode,
    id_laptop: req.body.id_laptop,
    processor: req.body.processor,
    ram: req.body.ram,
    penyimpanan: req.body.penyimpanan,
    vga: req.body.vga,
    display: req.body.display,
  };

  let query = "SELECT * FROM ?? WHERE kode=?";
  const table = ["tb_alternatif", up.kode, up.id_laptop];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!up.id_laptop) {
        response.null("id laptop harus di isi", res);
      } else {
        if (!up.processor) {
          response.null("processor harus di isi", res);
        } else {
          if (!up.ram) {
            response.null("ram harus di isi", res);
          } else {
            if (!up.penyimpanan) {
              response.null("penyimpanan harus di isi", res);
            } else {
              if (!up.vga) {
                response.null("vga harus di isi", res);
              } else {
                if (!up.display) {
                  response.null("display harus di isi", res);
                } else {
                  if (rows.length > 0) {
                    let query =
                      "UPDATE tb_alternatif SET id_laptop=?, processor=?, ram=?, penyimpanan=?, vga=?, display=? WHERE kode=?";
                    const tabel = [
                      up.id_laptop,
                      up.processor,
                      up.ram,
                      up.penyimpanan,
                      up.vga,
                      up.display,
                      up.kode,
                    ];

                    query = mysql.format(query, tabel);

                    connection.query(query, up, function (error, rows) {
                      if (error) {
                        console.log(error);
                      } else {
                        response.ok("berhasil merubah data", res);
                      }
                    });
                  } else {
                    response.exists("data telah ada", res);
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
