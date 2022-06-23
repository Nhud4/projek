const connection = require("../connection/db_connection");
const mysql = require("mysql2");

function migration() {
  let query = `CREATE TABLE IF NOT EXISTS tb_merek(
        kd_merek INT(11) NOT NULL AUTO_INCREMENT,
        merek VARCHAR(50) NOT NULL,
        PRIMARY KEY(kd_merek)
    )`;

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      query = `CREATE TABLE IF NOT EXISTS tb_processor(
                kd_processor INT(25) NOT NULL AUTO_INCREMENT,
                processor VARCHAR(25) NOT NULL,
                seri_processor VARCHAR(25) NOT NULL,
                kecepatan_processor VARCHAR(25) NOT NULL,
                PRIMARY KEY(kd_processor)
            )`;

      connection.query(query, function (error, rows) {
        if (error) {
          console.log(error);
        } else {
          query = `CREATE TABLE IF NOT EXISTS tb_ram(
                        kd_ram INT(25) NOT NULL AUTO_INCREMENT,
                        type_ram VARCHAR(25) NOT NULL,
                        kapasitas_ram VARCHAR(25) NOT NULL,
                        PRIMARY KEY(kd_ram)
                    )`;
          connection.query(query, function (error, rows) {
            if (error) {
              console.log(error);
            } else {
              query = ` CREATE TABLE IF NOT EXISTS tb_penyimpanan(
                                kd_penyimpanan INT(25) NOT NULL AUTO_INCREMENT,
                                type_penyimpanan VARCHAR(25) NOT NULL,
                                kapasitas_penyimpanan VARCHAR(25) NOT NULL,
                                PRIMARY KEY(kd_penyimpanan)
                            )`;
              connection.query(query, function (error, rows) {
                if (error) {
                  console.log(error);
                } else {
                  query = `CREATE TABLE IF NOT EXISTS tb_vga(
                                        kd_vga INT(25) NOT NULL AUTO_INCREMENT,
                                        merek_vga VARCHAR(25) NOT NULL,
                                        kapasitas_vga VARCHAR(25) NOT NULL,
                                        PRIMARY KEY (kd_vga)
                                    )`;
                  connection.query(query, function (error, rows) {
                    if (error) {
                      console.log(error);
                    } else {
                      query = `CREATE TABLE IF NOT EXISTS tb_display(
                                                kd_display INT(25) NOT NULL AUTO_INCREMENT,
                                                type_display VARCHAR(25) NOT NULL,
                                                ukuran_dispaly VARCHAR(25) NOT NULL,
                                                PRIMARY KEY(kd_display)
                                            )`;
                      connection.query(query, function (error, rows) {
                        if (error) {
                          console.log(error);
                        } else {
                          query = `CREATE TABLE IF NOT EXISTS tb_laptop(
                                                        id INT(25) NOT NULL AUTO_INCREMENT,
                                                        merek_kd INT(25) NOT NULL,
                                                        laptop VARCHAR(50) NOT NULL, 
                                                        processor_kd INT(25) NOT NULL,
                                                        ram_kd INT(25) NOT NULL,
                                                        penyimpanan_kd INT(25) NOT NULL,
                                                        vga_kd INT(25) NOT NULL,
                                                        display_kd INT(25) NOT NULL,
                                                        harga VARCHAR(50) NOT NULL,
                                                        CONSTRAINT PK_laptop PRIMARY KEY(id),
                                                        CONSTRAINT FK_merek FOREIGN KEY(merek_kd) REFERENCES tb_merek(kd_merek),
                                                        CONSTRAINT FK_processor FOREIGN KEY(processor_kd) REFERENCES tb_processor(kd_processor),
                                                        CONSTRAINT FK_ram FOREIGN KEY(ram_kd) REFERENCES tb_ram(kd_ram),
                                                        CONSTRAINT FK_penyimpanan FOREIGN KEY(penyimpanan_kd) REFERENCES tb_penyimpanan(kd_penyimpanan),
                                                        CONSTRAINT FK_vga FOREIGN KEY(vga_kd) REFERENCES tb_vga(kd_vga),
                                                        CONSTRAINT FK_display FOREIGN KEY(display_kd) REFERENCES tb_display(kd_display)
                                                    )`;
                          connection.query(query, function (error, rows) {
                            if (error) {
                              console.log(error);
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });

  console.log("migrasi berjalan");
}

function perhitungan() {
  let query = `CREATE TABLE IF NOT EXISTS tb_bobot(
    kode VARCHAR(15) NOT NULL,
    processor INT(11) NOT NULL,
    ram INT(11) NOT NULL,
    penyimpanan INT(11) NOT NULL,
    vga INT(11) NOT NULL,
    display INT(11) NOT NULL,
    harga VARCHAR(50) NOT NULL,
    PRIMARY KEY(kode)
  )`;
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      query = `CREATE TABLE IF NOT EXISTS tb_alternatif(
        kode INT(11) NOT NULL AUTO_INCREMENT,
        id_laptop INT(25) NOT NULL,
        processor INT(11) NOT NULL,
        ram INT(11) NOT NULL,
        penyimpanan INT(11) NOT NULL,
        vga INT(11) NOT NULL,
        display INT(11) NOT NULL,
        PRIMARY KEY(kode),
        CONSTRAINT FK_laptop FOREIGN KEY(id_laptop) REFERENCES tb_laptop(id)
      )`;

      connection.query(query, function (error, rows) {
        if (error) {
          console.log(error);
        } else {
          query = `CREATE TABLE IF NOT EXISTS tb_pembagi(
            kode INT(11) NOT NULL AUTO_INCREMENT,
            c1 VARCHAR(100) NOT NULL,
            c2 VARCHAR(100) NOT NULL,
            c3 VARCHAR(100) NOT NULL,
            c4 VARCHAR(100) NOT NULL,
            c5 VARCHAR(100) NOT NULL,
            c6 VARCHAR(100) NOT NULL,
            PRIMARY KEY(kode)
          )`;
          connection.query(query, function (error, rows) {
            if (error) {
              console.log(error);
            }
          });
        }
      });
    }
  });
  console.log("tabel perhitunagn telah di buat");
}

module.exports = {
  migration,
  perhitungan,
};
