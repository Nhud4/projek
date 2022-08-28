const config = require("../../../config");
const Postgres = require("../../../helper/database/postgres");

let db = null;

const createConnectDb = async () => {
    db = new Postgres({ connectionString: config.database.postgres.url });
};

const migrationHp = async () => {
    try {
        if (db) {
            let result = await db.query(`CREATE TABLE IF NOT EXISTS hp(
                id BIGSERIAL NOT NULL UNIQUE,
                brand_id BIGINT NOT NULL,
                hp VARCHAR(100) NOT NULL,
                chipset_id BIGINT NOT NULL,
                internal_id BIGINT NOT NULL,
                ram_id BIGINT NOT NULL,
                batrai_id BIGINT NOT NULL,
                kamera_id BIGINT NOT NULL,
                harga BIGINT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL,
                CONSTRAINT FK_brand FOREIGN KEY(brand_id) REFERENCES brand(id) ON DELETE CASCADE,
                CONSTRAINT FK_chipset FOREIGN KEY(chipset_id) REFERENCES chipset(id) ON DELETE CASCADE,
                CONSTRAINT FK_internal FOREIGN KEY(internal_id) REFERENCES internal(id) ON DELETE CASCADE,
                CONSTRAINT FK_ram_hp FOREIGN KEY(ram_id) REFERENCES ram_hp(id) ON DELETE CASCADE,
                CONSTRAINT FK_baterai FOREIGN KEY(batrai_id) REFERENCES batrai(id) ON DELETE CASCADE,
                CONSTRAINT FK_kamera FOREIGN KEY(kamera_id) REFERENCES kamera(id) ON DELETE CASCADE
            )`)
            if (result.err) throw result.err

            result = await db.query(`CREATE TABLE IF NOT EXISTS bobot_hp(
                id BIGSERIAL NOT NULL UNIQUE,
                ram BIGINT NOT NULL,
                internal BIGINT NOT NULL,
                batrai BIGINT NOT NULL,
                kamera BIGINT NOT NULL,
                harga BIGINT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL
                )`)
            if (result.err) throw result.err;

            result = await db.query(`CREATE TABLE IF NOT EXISTS bobot_alternatif_hp(
                id BIGSERIAL NOT NULL UNIQUE,
                hp_id BIGINT NOT NULL,
                ram BIGINT NOT NULL,
                internal BIGINT NOT NULL,
                batrai BIGINT NOT NULL,
                kamera BIGINT NOT NULL,
                harga BIGINT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL,
                CONSTRAINT FK_hp_alternatif FOREIGN KEY(hp_id) REFERENCES hp(id) ON DELETE CASCADE
                )`)
            if (result.err) throw result.err;
        }
    } catch (err) {
        console.log(err)
    }
}

const init = async () => {
    await createConnectDb()
    await migrationHp()
}

module.exports = init