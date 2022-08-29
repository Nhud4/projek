const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })

const wrapper = new Wrapper()

class AlternatifHp {
    async getLis() {
        const statement = `SELECT
        hp.merk,
        hp.hp,
        bobot_alternatif_hp.ram,
        bobot_alternatif_hp.internal,
        bobot_alternatif_hp.batrai,
        bobot_alternatif_hp.kamera,
        bobot_alternatif_hp.harga
        FROM bobot_alternatif_hp
        INNER JOIN hp
        ON bobot_alternatif_hp.hp_id = hp.id
        INNER JOIN brand
        ON hp.brand_id = brand.id
        FROM bobot_alternatif_hp
        WHERE bobot_alternatif_hp.deleted_at IS NULL`
        try {
            const result = await db.query(statement)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getBYBrand(brand) {
        const statement = `SELECT
        hp.merk,
        hp.hp,
        bobot_alternatif_hp.ram,
        bobot_alternatif_hp.internal,
        bobot_alternatif_hp.batrai,
        bobot_alternatif_hp.kamera,
        bobot_alternatif_hp.harga
        FROM bobot_alternatif_hp
        INNER JOIN hp
        ON bobot_alternatif_hp.hp_id = hp.id
        INNER JOIN brand
        ON hp.brand_id = brand.id
        WHERE brand.brand =$1
        AND bobot_alternatif_hp.deleted_at IS NULL`
        const data = [brand]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async insertAlternatifHp(
        hp_id,
        ram,
        internal,
        batrai,
        kamera,
        harga
    ) {
        const statement = `INSERT INTO bobot_alternatif_hp(
        hp_id,
        ram,
        internal,
        batrai,
        kamera,
        harga
        ) VALUES($1, $2, $3, $4, $5, $6)`
        const data = [
            hp_id,
            ram,
            internal,
            batrai,
            kamera,
            harga
        ]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async updateAlternatifHp(
        ram,
        internal,
        batrai,
        kamera,
        harga,
        hp_id
    ) {
        const statement = `UPDATE bobot_alternatif_hp SET
        ram =$1,
        internal =$2,
        batrai =$3,
        kamera =$4,
        harga =$5
        WHERE hp_id =$6
        AND deleted_at IS NULL`
        const data = [
            ram,
            internal,
            batrai,
            kamera,
            harga,
            hp_id
        ]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async deletedAlternatifHp(hp_id) {
        const statement = `UPDATE bobot_alternatif_hp
        SET deleted_at = NOW()
        WHERE hp_id =$1`
        const data = [hp_id]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }
}

module.exports = AlternatifHp