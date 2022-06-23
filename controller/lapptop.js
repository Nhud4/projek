const response = require("../bin/res");
const bodyParser = require("body-parser");
const connection = require("../connection/db_connection");
const mysql = require("mysql2");

// add laptop
exports.addLaptop = async (req, res) => {
  const post = {
    merek_kd: req.body.merek_kd,
    laptop: req.body.laptop,
    processor_kd: req.body.processor_kd,
    ram_kd: req.body.ram_kd,
    penyimpanan_kd: req.body.penyimpanan_kd,
    vga_kd: req.body.vga_kd,
    display_kd: req.body.display_kd,
    harga: req.body.harga,
  };

  let query = "SELECT merek_kd, laptop FROM ?? WHERE merek_kd=? AND laptop=? ";
  const table = ["tb_laptop", post.merek_kd, post.laptop];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!post.merek_kd) {
        response.null("merek tidak di isi", res);
      } else {
        if (!post.laptop) {
          response.null("laptop tidak di isi", res);
        } else {
          if (!post.processor_kd) {
            response.null("processor tidak di isi", res);
          } else {
            if (!post.ram_kd) {
              response.null("ram tidak di isi", res);
            } else {
              if (!post.penyimpanan_kd) {
                response.null("penyimpanan tidak di isi", res);
              } else {
                if (!post.vga_kd) {
                  response.null("vga tidak di isi", res);
                } else {
                  if (!post.display_kd) {
                    response.null("display tidak di isi", res);
                  } else {
                    if (!post.harga) {
                      response.null("harga tidak di isi", res);
                    } else {
                      if (rows.length === 0) {
                        let query = "INSERT INTO ?? SET ?";
                        const table = ["tb_laptop"];

                        query = mysql.format(query, table);

                        connection.query(query, post, function (error, rows) {
                          if (error) {
                            console.log(error);
                          } else {
                            response.ok("berhasil menambahkan data", res);
                          }
                        });
                      } else {
                        response.exists("data laptop telah ada", res);
                      }
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

// get data laptop
exports.getLaptop = async (req, res) => {
  let query = `SELECT
    tb_laptop.id, 
    tb_merek.merek,
    tb_laptop.laptop, 
    tb_processor.processor,
    tb_processor.seri_processor,
    tb_processor.kecepatan_processor,
    tb_ram.type_ram,
    tb_ram.kapasitas_ram,
    tb_penyimpanan.type_penyimpanan,
    tb_penyimpanan.kapasitas_penyimpanan,
    tb_vga.merek_vga,
    tb_vga.kapasitas_vga,
    tb_display.type_display,
    tb_display.ukuran_dispaly, 
    tb_laptop.harga
        FROM tb_laptop 
        INNER JOIN tb_merek
        ON tb_laptop.merek_kd = tb_merek.kd_merek
        INNER JOIN tb_processor
        ON tb_laptop.processor_kd = tb_processor.kd_processor
        INNER JOIN tb_ram
        ON tb_laptop.ram_kd = tb_ram.kd_ram
        INNER JOIN tb_penyimpanan
        ON tb_laptop.penyimpanan_kd = tb_penyimpanan.kd_penyimpanan
        INNER JOIN tb_vga
        ON tb_laptop.vga_kd = tb_vga.kd_vga
        INNER JOIN tb_display
        ON tb_laptop.display_kd = tb_display.kd_display`;

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

// get laptop by id
exports.getLaptopById = async (req, res) => {
  const get = {
    id: req.body.id,
  };

  let query = "SELECT id FROM ?? WHERE ??=?";

  const table = ["tb_laptop", "id", get.id];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!get.id) {
        response.null("id laptop tidak di isi", res);
      } else {
        if (rows.length > 0) {
          let query = `SELECT 
          tb_laptop.id,
          tb_merek.merek,
          tb_laptop.laptop, 
          tb_processor.processor,
          tb_processor.seri_processor,
          tb_processor.kecepatan_processor,
          tb_ram.type_ram,
          tb_ram.kapasitas_ram,
          tb_penyimpanan.type_penyimpanan,
          tb_penyimpanan.kapasitas_penyimpanan,
          tb_vga.merek_vga,
          tb_vga.kapasitas_vga,
          tb_display.type_display,
          tb_display.ukuran_dispaly, 
          tb_laptop.harga
              FROM tb_laptop 
              INNER JOIN tb_merek
              ON tb_laptop.merek_kd = tb_merek.kd_merek
              INNER JOIN tb_processor
              ON tb_laptop.processor_kd = tb_processor.kd_processor
              INNER JOIN tb_ram
              ON tb_laptop.ram_kd = tb_ram.kd_ram
              INNER JOIN tb_penyimpanan
              ON tb_laptop.penyimpanan_kd = tb_penyimpanan.kd_penyimpanan
              INNER JOIN tb_vga
              ON tb_laptop.vga_kd = tb_vga.kd_vga
              INNER JOIN tb_display
              ON tb_laptop.display_kd = tb_display.kd_display
          WHERE id=?`;

          const table = [get.id];

          query = mysql.format(query, table);

          connection.query(query, get, function (error, rows) {
            if (error) {
              console.log(error);
            } else {
              response.ok(rows, res);
            }
          });
        } else {
          response.null("kode tidak di temukan", res);
        }
      }
    }
  });
};

// update
exports.updateLaptop = async (req, res) => {
  const up = {
    id: req.body.id,
    merek_kd: req.body.merek_kd,
    laptop: req.body.laptop,
    processor_kd: req.body.processor_kd,
    ram_kd: req.body.ram_kd,
    penyimpanan_kd: req.body.penyimpanan_kd,
    vga_kd: req.body.vga_kd,
    display_kd: req.body.display_kd,
    harga: req.body.harga,
  };

  let query = "SELECT * FROM ?? WHERE ??=?";
  const table = ["tb_laptop", "id", up.id];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!up.id) {
        response.null("id laptop tidak di isi", res);
      } else {
        if (rows.length > 0) {
          let query =
            "UPDATE tb_laptop SET merek_kd=?, laptop=?, processor_kd=?, ram_kd=?, penyimpanan_kd=?, vga_kd=?, display_kd=?, harga=? WHERE id=?";
          const table = [
            up.merek_kd,
            up.laptop,
            up.processor_kd,
            up.ram_kd,
            up.penyimpanan_kd,
            up.vga_kd,
            up.display_kd,
            up.harga,
            up.id,
          ];

          query = mysql.format(query, table);

          connection.query(query, up, function (error, rows) {
            if (error) {
              console.log(error);
            } else {
              response.ok("berhasil mengubah data", res);
            }
          });
        } else {
          response.null("id tidak di temukan", res);
        }
      }
    }
  });
};

// delete laptop
exports.deleteLaptop = async (req, res) => {
  const del = {
    id: req.body.id,
  };

  let query = "SELECT id FROM ?? WHERE ??=?";
  const table = ["tb_laptop", "id", del.id];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!del.id) {
        response.null("id laptop tidak di isi", res);
      } else {
        if (rows.length > 0) {
          let query = "DELETE FROM ?? WHERE id=?";
          const table = ["tb_laptop", del.id];

          query = mysql.format(query, table);

          connection.query(query, del, function (error, rows) {
            if (error) {
              console.log(error);
            } else {
              response.ok("berhasil menghapus data laptop", res);
            }
          });
        } else {
          response.null("kode tidak di temukan", res);
        }
      }
    }
  });
};
