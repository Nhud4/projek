const config = require("../../config");
const Postgres = require("../../helper/database/postgres");

let db = null;

const createConnectDb = async () => {
    db = new Postgres({ connectionString: config.database.postgres.url });
};

const userMigration = async () => {
    try {
        if (db) {
            let result = await db.query(`CREATE TABLE IF NOT EXISTS admin(
            id BIGSERIAL NOT NULL,
            name VARCHAR(25) NOT NULL,
            phone VARCHAR(25) NOT NULL,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(100) NOT NULL,
            user_extent VARCHAR(20) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP NULL)`)
            if (result.err) throw result.err;
        }
    } catch (err) {
        console.log(err)
    }
}

const init = async () => {
    await createConnectDb()
    await userMigration()
}

module.exports = init