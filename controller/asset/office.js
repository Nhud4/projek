const response = require("../../bin/res");
const bodyParser = require("body-parser");
const connection = require("../../connection/db_connection");
const mysql = require("mysql2");

// add ketentuan Office - processor
exports.addKetentuanProcessorOffice = async (req, res) => {
  const add = {
    kecepatan_processor: req.body.kecepatan_processor,
    ketentuan: req.body.ketentuan,
    nilai: req.body.nilai,
  };

  let query = "SELECT ketentuan FROM ?? WHERE ketentuan=?";
  const table = ["tb_kc_processor", add.ketentuan];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!add.kecepatan_processor) {
        response.null("kecepatan processor tidak di isi", res);
      } else {
        if (!add.ketentuan) {
          response.null("ketentuan tidak di isi", res);
        } else {
          if (!add.nilai) {
            response.null("nilai tidak di isi", res);
          } else {
            if (rows.length === 0) {
              let query = "INSERT INTO ?? SET kode='C1', ? ";
              const table = ["tb_kc_processor"];

              query = mysql.format(query, table);

              connection.query(query, add, function (error, rows) {
                if (error) {
                  console.log(error);
                } else {
                  response.ok(
                    "berhasil menambahkan data pada ketentuan processor Office",
                    res
                  );
                }
              });
            } else {
              response.exists("data telah ada", res);
            }
          }
        }
      }
    }
  });
};

// get ketentuan Office - processor
exports.getKetentuanProcessorOffice = async (req, res) => {
  connection.query(
    "SELECT * FROM tb_kc_processor ORDER BY nilai DESC",
    function (error, rows) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

// update ketentuan Office - processor
exports.updateKetentuanProcessorOffice = async (req, res) => {
  const update = {
    kecepatan_processor: req.body.kecepatan_processor,
    ketentuan: req.body.ketentuan,
    nilai: req.body.nilai,
  };

  let query =
    "SELECT * FROM ?? WHERE ketentuan=? AND kecepatan_processor=? AND nilai=?";
  const table = [
    "tb_kc_processor",
    update.ketentuan,
    update.kecepatan_processor,
    update.nilai,
  ];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!update.kecepatan_processor) {
        response.null("kecepatan processor tidak di isi", res);
      } else {
        if (!update.ketentuan) {
          response.null("ketentuan tidak di isi", res);
        } else {
          if (!update.nilai) {
            response.null("nilai tidak di isi", res);
          } else {
            if (rows.length === 0) {
              let query =
                "UPDATE tb_kc_processor SET kecepatan_processor=?, nilai=? WHERE ketentuan=?";
              const table = [
                update.kecepatan_processor,
                update.nilai,
                update.ketentuan,
              ];

              query = mysql.format(query, table);

              connection.query(query, update, function (error, rows) {
                if (error) {
                  console.log(error);
                } else {
                  response.ok("berhasil mengubah data", res);
                }
              });
            } else {
              response.exists("data telah ada", res);
            }
          }
        }
      }
    }
  });
};

// add ketentuan Office - ram
exports.addKetentuanRamOffice = async (req, res) => {
  const add = {
    ram: req.body.ram,
    ketentuan: req.body.ketentuan,
    nilai: req.body.nilai,
  };

  let query = "SELECT ketentuan FROM ?? WHERE ketentuan=?";
  const table = ["tb_kc_ram", add.ketentuan];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!add.ram) {
        response.null("ram tidak di isi", res);
      } else {
        if (!add.ketentuan) {
          response.null("ketentuan tidak di isi", res);
        } else {
          if (!add.nilai) {
            response.null("nilai tidak di isi", res);
          } else {
            if (rows.length === 0) {
              let query = "INSERT INTO ?? SET kode='C2', ? ";
              const table = ["tb_kc_ram"];

              query = mysql.format(query, table);

              connection.query(query, add, function (error, rows) {
                if (error) {
                  console.log(error);
                } else {
                  response.ok(
                    "berhasil menambahkan data pada ketentuan ram Office",
                    res
                  );
                }
              });
            } else {
              response.exists("data telah ada", res);
            }
          }
        }
      }
    }
  });
};

// get ketentuan Office - ram
exports.getKetentuanRamOffice = async (req, res) => {
  connection.query(
    "SELECT * FROM tb_kc_ram ORDER BY nilai DESC",
    function (error, rows) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

// update ketentuan Office - ram
exports.updateKetentuanRamOffice = async (req, res) => {
  const update = {
    ram: req.body.ram,
    ketentuan: req.body.ketentuan,
    nilai: req.body.nilai,
  };

  let query = "SELECT * FROM ?? WHERE ketentuan=? AND ram=? AND nilai=?";
  const table = ["tb_kc_ram", update.ketentuan, update.ram, update.nilai];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!update.ram) {
        response.null("ram tidak di isi", res);
      } else {
        if (!update.ketentuan) {
          response.null("ketentuan tidak di isi", res);
        } else {
          if (!update.nilai) {
            response.null("nilai tidak di isi", res);
          } else {
            if (rows.length === 0) {
              let query =
                "UPDATE tb_kc_ram SET ram=?, nilai=? WHERE ketentuan=?";
              const table = [update.ram, update.nilai, update.ketentuan];

              query = mysql.format(query, table);

              connection.query(query, update, function (error, rows) {
                if (error) {
                  console.log(error);
                } else {
                  response.ok("berhasil mengubah data", res);
                }
              });
            } else {
              response.exists("data telah ada", res);
            }
          }
        }
      }
    }
  });
};

// add ketentuan Office - penyimpanan
exports.addKetentuanPenyimpananOffice = async (req, res) => {
  const add = {
    kapasitas: req.body.kapasitas,
    jenis: req.body.jenis,
    ketentuan: req.body.ketentuan,
    nilai: req.body.nilai,
  };

  let query = "SELECT ketentuan FROM ?? WHERE ketentuan=?";
  const table = ["tb_kc_penyimpanan", add.ketentuan];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!add.kapasitas) {
        response.null("kapasitas tidak di isi", res);
      } else {
        if (!add.jenis) {
          response.null("jenis penyimpanantidak di isi", res);
        } else {
          if (!add.ketentuan) {
            response.null("ketentuan tidak di isi", res);
          } else {
            if (!add.nilai) {
              response.null("nilai tidak di isi", res);
            } else {
              if (rows.length === 0) {
                let query = "INSERT INTO ?? SET kode='C3', ? ";
                const table = ["tb_kc_penyimpanan"];

                query = mysql.format(query, table);

                connection.query(query, add, function (error, rows) {
                  if (error) {
                    console.log(error);
                  } else {
                    response.ok(
                      "berhasil menambahkan data pada ketentuan penyimpanan Office",
                      res
                    );
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
  });
};

// get ketentuan Office - penyimpanan
exports.getKetentuanPenyimpananOffice = async (req, res) => {
  connection.query(
    "SELECT * FROM tb_kc_penyimpanan ORDER BY nilai DESC",
    function (error, rows) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

// update ketentuan Office - penyimpanan
exports.updateKetentuanPenyimpananOffice = async (req, res) => {
  const update = {
    kapasitas: req.body.kapasitas,
    jenis: req.body.jenis,
    ketentuan: req.body.ketentuan,
    nilai: req.body.nilai,
  };

  let query = "SELECT * FROM ?? WHERE ketentuan=? AND kapasitas=? AND nilai=?";
  const table = [
    "tb_kc_penyimpanan",
    update.ketentuan,
    update.kapasitas,
    update.nilai,
  ];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!update.kapasitas) {
        response.null("kapasitas tidak di isi", res);
      } else {
        if (!update.jenis) {
          response.null("jenis penyimpanantidak di isi", res);
        } else {
          if (!update.ketentuan) {
            response.null("ketentuan tidak di isi", res);
          } else {
            if (!update.nilai) {
              response.null("nilai tidak di isi", res);
            } else {
              if (rows.length === 0) {
                let query =
                  "UPDATE tb_kc_penyimpanan SET kapasitas=?, jenis=?, nilai=? WHERE ketentuan=?";
                const table = [
                  update.kapasitas,
                  update.jenis,
                  update.nilai,
                  update.ketentuan,
                ];

                query = mysql.format(query, table);

                connection.query(query, update, function (error, rows) {
                  if (error) {
                    console.log(error);
                  } else {
                    response.ok("berhasil mengubah data", res);
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
  });
};

// add ketentuan Office - vga
exports.addKetentuanVgaOffice = async (req, res) => {
  const add = {
    vga: req.body.vga,
    ketentuan: req.body.ketentuan,
    nilai: req.body.nilai,
  };

  let query = "SELECT ketentuan FROM ?? WHERE ketentuan=?";
  const table = ["tb_kc_vga", add.ketentuan];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!add.vga) {
        response.null("vga tidak di isi", res);
      } else {
        if (!add.ketentuan) {
          response.null("ketentuan tidak di isi", res);
        } else {
          if (!add.nilai) {
            response.null("nilai tidak di isi", res);
          } else {
            if (rows.length === 0) {
              let query = "INSERT INTO ?? SET kode='C4', ? ";
              const table = ["tb_kc_vga"];

              query = mysql.format(query, table);

              connection.query(query, add, function (error, rows) {
                if (error) {
                  console.log(error);
                } else {
                  response.ok(
                    "berhasil menambahkan data pada ketentuan vga Office",
                    res
                  );
                }
              });
            } else {
              response.exists("data telah ada", res);
            }
          }
        }
      }
    }
  });
};

// get ketentuan Office - vga
exports.getKetentuanVgaOffice = async (req, res) => {
  connection.query(
    "SELECT * FROM tb_kc_vga ORDER BY nilai DESC",
    function (error, rows) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

// update ketentuan Office - vga
exports.updateKetentuanVgaOffice = async (req, res) => {
  const update = {
    vga: req.body.vga,
    ketentuan: req.body.ketentuan,
    nilai: req.body.nilai,
  };

  let query = "SELECT * FROM ?? WHERE ketentuan=? AND vga=? AND nilai=?";
  const table = ["tb_kc_vga", update.ketentuan, update.vga, update.nilai];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!update.vga) {
        response.null("vga tidak di isi", res);
      } else {
        if (!update.ketentuan) {
          response.null("ketentuan tidak di isi", res);
        } else {
          if (!update.nilai) {
            response.null("nilai tidak di isi", res);
          } else {
            if (rows.length === 0) {
              let query =
                "UPDATE tb_kc_vga SET ram=?, nilai=? WHERE ketentuan=?";
              const table = [update.vga, update.nilai, update.ketentuan];

              query = mysql.format(query, table);

              connection.query(query, update, function (error, rows) {
                if (error) {
                  console.log(error);
                } else {
                  response.ok("berhasil mengubah data", res);
                }
              });
            } else {
              response.exists("data telah ada", res);
            }
          }
        }
      }
    }
  });
};

// add ketentuan Office - display
exports.addKetentuanDisplayOffice = async (req, res) => {
  const add = {
    display: req.body.display,
    ketentuan: req.body.ketentuan,
    nilai: req.body.nilai,
  };

  let query = "SELECT ketentuan FROM ?? WHERE ketentuan=?";
  const table = ["tb_kc_display", add.ketentuan];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!add.display) {
        response.null("display tidak di isi", res);
      } else {
        if (!add.ketentuan) {
          response.null("ketentuan tidak di isi", res);
        } else {
          if (!add.nilai) {
            response.null("nilai tidak di isi", res);
          } else {
            if (rows.length === 0) {
              let query = "INSERT INTO ?? SET kode='C5', ? ";
              const table = ["tb_kc_display"];

              query = mysql.format(query, table);

              connection.query(query, add, function (error, rows) {
                if (error) {
                  console.log(error);
                } else {
                  response.ok(
                    "berhasil menambahkan data pada ketentuan display Office",
                    res
                  );
                }
              });
            } else {
              response.exists("data telah ada", res);
            }
          }
        }
      }
    }
  });
};

// get ketentuan Office - display
exports.getKetentuanDisplayOffice = async (req, res) => {
  connection.query(
    "SELECT * FROM tb_kc_display ORDER BY nilai DESC",
    function (error, rows) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

// update ketentuan Office - display
exports.updateKetentuanDispalyOffice = async (req, res) => {
  const update = {
    display: req.body.display,
    ketentuan: req.body.ketentuan,
    nilai: req.body.nilai,
  };

  let query = "SELECT * FROM ?? WHERE ketentuan=? AND display=? AND nilai=?";
  const table = ["tb_kc_ram", update.ketentuan, update.display, update.nilai];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (!update.display) {
        response.null("display tidak di isi", res);
      } else {
        if (!update.ketentuan) {
          response.null("ketentuan tidak di isi", res);
        } else {
          if (!update.nilai) {
            response.null("nilai tidak di isi", res);
          } else {
            if (rows.length === 0) {
              let query =
                "UPDATE tb_kc_display SET display=?, nilai=? WHERE ketentuan=?";
              const table = [update.display, update.nilai, update.ketentuan];

              query = mysql.format(query, table);

              connection.query(query, update, function (error, rows) {
                if (error) {
                  console.log(error);
                } else {
                  response.ok("berhasil mengubah data", res);
                }
              });
            } else {
              response.exists("data telah ada", res);
            }
          }
        }
      }
    }
  });
};
