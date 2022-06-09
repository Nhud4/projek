const response = require("../bin/res");
const bodyParser = require("body-parser");
const connection = require("../connection/db_connection");
const mysql = require("mysql2");

// get all processor
exports.getDataProcessor = async (req, res) => {
  connection.query("SELECT * FROM tb_processor", function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

// get processor by kode
exports.getProcessorByKode = async (req, res) => {
  const get = {
    kd_processor: req.body.kd_processor,
  };

  let query = "SELECT kd_processor FROM ?? WHERE ??=?";
  const table = ["tb_processor", "kd_processor", get.kd_processor];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!get.kd_processor) {
        response.null("kode tidak boleh kosong", res);
      } else {
        if (rows.length > 0) {
          let query =
            "SELECT processor, seri_processor, kecepatan_processor FROM ?? WHERE kd_processor=?";
          const table = ["tb_processor", get.kd_processor];

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

// add processor
exports.addProcessor = async (req, res) => {
  const post = {
    processor: req.body.processor,
    seri_processor: req.body.seri_processor,
    kecepatan_processor: req.body.kecepatan_processor,
  };

  let query = "SELECT seri_processor FROM ?? WHERE ??=?";
  const table = ["tb_processor", "seri_processor", post.seri_processor];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!post.processor) {
        response.null("processor tidak di isi", res);
      } else {
        if (!post.seri_processor) {
          response.null("seri processor tidak di isi", res);
        } else {
          if (!post.kecepatan_processor) {
            response.null("kecepatan processor tidak di isi", res);
          } else {
            if (rows.length === 0) {
              let query = "INSERT INTO ?? SET ?";
              const table = ["tb_processor"];

              query = mysql.format(query, table);

              connection.query(query, post, function (error, rows) {
                if (error) {
                  console.log(error);
                } else {
                  response.ok("berhasil menambahkan data", res);
                }
              });
            } else {
              response.exists("seri processor telah ada", res);
            }
          }
        }
      }
    }
  });
};

// update processor
exports.updateProcessor = async (req, res) => {
  const up = {
    kd_processor: req.body.kd_processor,
    processor: req.body.processor,
    seri_processor: req.body.seri_processor,
    kecepatan_processor: req.body.kecepatan_processor,
  };

  let query = "SELECT kd_processor FROM ?? WHERE ??=?";
  const table = ["tb_processor", "kd_processor", up.kd_processor];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!up.kd_processor) {
        response.null("kode tidak di isi", res);
      } else {
        if (!up.processor) {
          response.null("processor tidak di isi", res);
        } else {
          if (!up.seri_processor) {
            response.null("seri processor tidak di isi", res);
          } else {
            if (!up.kecepatan_processor) {
              response.null("kecepatan processro tidak di isi", res);
            } else {
              if (rows.length > 0) {
                let query = "SELECT kd_processor FROM ?? WHERE kd_processor=?";
                const table = ["tb_processor", up.kd_processor];

                query = mysql.format(query, table);

                connection.query(query, up, function (error, rows) {
                  if (error) {
                    console.log(error);
                  } else {
                    if (rows.length > 0) {
                      let query =
                        "SELECT seri_processor FROM ?? WHERE seri_processor=?";
                      const table = ["tb_processor", up.seri_processor];

                      query = mysql.format(query, table);

                      connection.query(query, up, function (error, rows) {
                        if (error) {
                          console.log(error);
                        } else {
                          if (rows.length === 0) {
                            let query =
                              "UPDATE tb_processor SET processor=?, seri_processor=?, kecepatan_processor=? WHERE kd_processor=?";
                            const table = [
                              up.processor,
                              up.seri_processor,
                              up.kecepatan_processor,
                              up.kd_processor,
                            ];

                            query = mysql.format(query, table);

                            connection.query(query, up, function (error, rows) {
                              if (error) {
                                console.log(error);
                              } else {
                                response.ok("data berhasil di update", res);
                              }
                            });
                          }
                        }
                      });
                    } else {
                      response.exists("seri prosessor telah ada", res);
                    }
                  }
                });
              } else {
                response.exists("kode processor tidak ada", res);
              }
            }
          }
        }
      }
    }
  });
};

// delete
exports.deleteProcessor = async (req, res) => {
  const del = {
    kd_processor: req.body.kd_processor,
  };

  let query = "SELECT kd_processor FROM ?? WHERE ??=?";
  const table = ["tb_processor", "kd_processor", del.kd_processor];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!del.kd_processor) {
        response.null("kode processor tidak di isi", res);
      } else {
        if (rows.length === 0) {
          let query = "SELECT kd_processor FROM ?? WHERE kd_processor=?";
          const table = ["tb_processor", del.kd_processor];
          query = mysql.format(query, table);

          connection.query(query, del, function (error, rows, fileds) {
            if (error) {
              console.log(error);
            } else {
              response.null("data tidak ada", res);
            }
          });
        } else {
          let query = "DELETE FROM ?? WHERE kd_processor=?";
          const table = ["tb_processor", del.kd_processor];
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
    }
  });
};
