const config = require("../../../config");
const Postgres = require("../../../helper/database/postgres");

let db = null;

const createConnectDb = async () => {
    db = new Postgres({ connectionString: config.database.postgres.url });
};

const migrationSpesifikasi = async () => {
    try {
        if (db) {
            let result = await db.query(`CREATE TABLE IF NOT EXISTS brand(
                id BIGSERIAL NOT NULL UNIQUE,
                brand VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL
            )`)

            if (result.err) throw result.err

            result = await db.query(`CREATE TABLE IF NOT EXISTS chipset(
                id BIGSERIAL NOT NULL UNIQUE,
                chipset VARCHAR(100) NOT NULL,
                versi VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL
            )`)
            if (result.err) throw result.err

            result = await db.query(`CREATE TABLE IF NOT EXISTS kamera(
                id BIGSERIAL NOT NULL UNIQUE,
                type VARCHAR(100) NOT NULL,
                kualitas VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL
            )`)
            if (result.err) throw result.err

            result = await db.query(`CREATE TABLE IF NOT EXISTS batrai(
                id BIGSERIAL NOT NULL UNIQUE,
                batrai VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL
            )`)
            if (result.err) throw result.err

            result = await db.query(`CREATE TABLE IF NOT EXISTS internal(
                id BIGSERIAL NOT NULL UNIQUE,
                internal VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL
            )`)
            if (result.err) throw result.err

            result = await db.query(`CREATE TABLE IF NOT EXISTS ram_hp(
                id BIGSERIAL NOT NULL UNIQUE,
                ram VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL
            )`)
            if (result.err) throw result.err
        }
    } catch (err) {
        console.log(err)
    }
}

const init = async () => {
    await createConnectDb()
    await migrationSpesifikasi()
}

module.exports = init