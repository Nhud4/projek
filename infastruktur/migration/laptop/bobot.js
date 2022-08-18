const config = require("../../../config");
const Postgres = require("../../../helper/database/postgres");

let db = null;

const createConnectDb = async () => {
    db = new Postgres({ connectionString: config.database.postgres.url });
};

const bobotMigration = async () => {
    try {
        if (db) {
            let result = await db.query(`CREATE TABLE IF NOT EXISTS kategori(
                id BIGSERIAL NOT NULL UNIQUE,
                kategori VARCHAR(50) NOT NULL,
                sub_kategori VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL
                )`)
            if (result.err) throw result.err;

            result = await db.query(`CREATE TABLE IF NOT EXISTS bobot_alternatif(
                id BIGSERIAL NOT NULL UNIQUE,
                alternatif_id INT NOT NULL,
                processor INT NOT NULL,
                ram INT NOT NULL,
                penyimpanan INT NOT NULL,
                vga INT NOT NULL,
                display INT NOT NULL,
                harga BIGINT NOT NULL,
                ka INT NULL,
                kb INT NULL,
                kc INT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL,
                CONSTRAINT FK_laptop FOREIGN KEY (alternatif_id) REFERENCES laptop(id) ON DELETE CASCADE,
                CONSTRAINT FK_kategori_a FOREIGN KEY (ka) REFERENCES kategori(id) ON DELETE CASCADE,
                CONSTRAINT FK_kategori_b FOREIGN KEY (kb) REFERENCES kategori(id) ON DELETE CASCADE,
                CONSTRAINT FK_kategori_c FOREIGN KEY (kc) REFERENCES kategori(id) ON DELETE CASCADE
                )`)
            if (result.err) throw result.err;

            result = await db.query(`CREATE TABLE IF NOT EXISTS bobot(
                id BIGSERIAL NOT NULL UNIQUE,
                bobot VARCHAR(50) NOT NULL,
                processor INT NOT NULL,
                ram INT NOT NULL,
                penyimpanan INT NOT NULL,
                vga INT NOT NULL,
                display INT NOT NULL,
                harga INT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL
                )`)
            if (result.err) throw result.err;
        }
    } catch (err) {
        console.log(err)
    }
}

const init = async () => {
    await createConnectDb()
    await bobotMigration()
}

module.exports = init