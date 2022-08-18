const config = require("../../../config");
const Postgres = require("../../../helper/database/postgres");

let db = null;

const createConnectDb = async () => {
    db = new Postgres({ connectionString: config.database.postgres.url });
};

const vgaMigration = async () => {
    try {
        if (db) {
            result = await db.query(`CREATE TABLE IF NOT EXISTS vga(
            id BIGSERIAL NOT NULL UNIQUE,
            merk_vga VARCHAR(25) NOT NULL,
            kapasitas_vga VARCHAR(100) NOT NULL,
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
    await vgaMigration()
}

module.exports = init