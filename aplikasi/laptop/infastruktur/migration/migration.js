const connection = require("../../connection/db_connection");
const mysql = require("mysql2");

function migration() {
  let query = `CREATE TABLE IF NOT EXISTS tb_merk(
        id INT(11) NOT NULL AUTO_INCREMENT,
        merk VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        PRIMARY KEY(id)
    )`;

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      query = `CREATE TABLE IF NOT EXISTS tb_processor(
                id INT(11) NOT NULL AUTO_INCREMENT,
                processor VARCHAR(25) NOT NULL,
                seri_processor VARCHAR(25) NOT NULL,
                kecepatan_processor VARCHAR(25) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL,
                PRIMARY KEY(id)
            )`;
      connection.query(query, function (error, rows) {
        if (error) {
          console.log(error);
        } else {
          query = `CREATE TABLE IF NOT EXISTS tb_ram(
                        id INT(11) NOT NULL AUTO_INCREMENT,
                        type_ram VARCHAR(25) NOT NULL,
                        kapasitas_ram VARCHAR(25) NOT NULL,
                        created_at TIMESTAMP DEFAULT NOW(),
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        deleted_at TIMESTAMP NULL,
                        PRIMARY KEY(id)
                    )`;
          connection.query(query, function (error, rows) {
            if (error) {
              console.log(error);
            } else {
              query = ` CREATE TABLE IF NOT EXISTS tb_penyimpanan(
                                id INT(11) NOT NULL AUTO_INCREMENT,
                                type_penyimpanan VARCHAR(25) NOT NULL,
                                kapasitas_penyimpanan VARCHAR(25) NOT NULL,
                                created_at TIMESTAMP DEFAULT NOW(),
                                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                deleted_at TIMESTAMP NULL,
                                PRIMARY KEY(id)
                            )`;
              connection.query(query, function (error, rows) {
                if (error) {
                  console.log(error);
                } else {
                  query = `CREATE TABLE IF NOT EXISTS tb_vga(
                                        id INT(11) NOT NULL AUTO_INCREMENT,
                                        merk_vga VARCHAR(25) NOT NULL,
                                        kapasitas_vga VARCHAR(25) NOT NULL,
                                        created_at TIMESTAMP DEFAULT NOW(),
                                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                        deleted_at TIMESTAMP NULL,
                                        PRIMARY KEY (id)
                                    )`;
                  connection.query(query, function (error, rows) {
                    if (error) {
                      console.log(error);
                    } else {
                      query = `CREATE TABLE IF NOT EXISTS tb_display(
                                                id INT(11) NOT NULL AUTO_INCREMENT,
                                                type_display VARCHAR(25) NOT NULL,
                                                ukuran_display VARCHAR(25) NOT NULL,
                                                created_at TIMESTAMP DEFAULT NOW(),
                                                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                                deleted_at TIMESTAMP NULL,
                                                PRIMARY KEY(id)
                                            )`;
                      connection.query(query, function (error, rows) {
                        if (error) {
                          console.log(error);
                        } else {
                          query = `CREATE TABLE IF NOT EXISTS tb_laptop(
                                                        id INT(11) NOT NULL AUTO_INCREMENT,
                                                        merk_id INT(11) NOT NULL,
                                                        laptop VARCHAR(50) NOT NULL, 
                                                        processor_id INT(11) NOT NULL,
                                                        ram_id INT(11) NOT NULL,
                                                        penyimpanan_id INT(11) NOT NULL,
                                                        vga_id INT(11) NOT NULL,
                                                        display_id INT(11) NOT NULL,
                                                        harga BIGINT NOT NULL,
                                                        created_at TIMESTAMP DEFAULT NOW(),
                                                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                                        deleted_at TIMESTAMP NULL,
                                                        PRIMARY KEY(id),
                                                        FOREIGN KEY(merk_id) REFERENCES tb_merk (id) ON DELETE CASCADE,
                                                        FOREIGN KEY(processor_id) REFERENCES tb_processor(id) ON DELETE CASCADE,
                                                        FOREIGN KEY(ram_id) REFERENCES tb_ram(id) ON DELETE CASCADE,
                                                        FOREIGN KEY(penyimpanan_id) REFERENCES tb_penyimpanan(id) ON DELETE CASCADE,
                                                        FOREIGN KEY(vga_id) REFERENCES tb_vga(id) ON DELETE CASCADE,
                                                        FOREIGN KEY(display_id) REFERENCES tb_display(id) ON DELETE CASCADE
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
        } else {
          console.log('migrasi berjalan')
        }
      });
    }
  });
}

module.exports = {
  migration,
  perhitungan,
};
