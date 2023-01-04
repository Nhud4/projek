const config = require("../../../config");
const Postgres = require("../../../helper/database/postgres");

let db = null;

const createConnectDb = async () => {
    db = new Postgres({ connectionString: config.database.postgres.url });
};

const merkMigration = async () => {
    try {
        if (db) {
            let result = await db.query(`CREATE TABLE IF NOT EXISTS merk(
            id BIGSERIAL NOT NULL UNIQUE,
            merk VARCHAR(50) NOT NULL,
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
    await merkMigration()
}

module.exports = init