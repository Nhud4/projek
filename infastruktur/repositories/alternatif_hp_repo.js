const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })

const wrapper = new Wrapper()

class AlternatifHp {
    async getLis(
        harga1,
        harga2,
        ram,
        internal
    ) {
        const statement = `SELECT
        brand.brand,
        hp.hp,
        bobot_alternatif_hp.ram,
        bobot_alternatif_hp.internal,
        bobot_alternatif_hp.batrai,
        bobot_alternatif_hp.kamera,
        bobot_alternatif_hp.harga
        FROM bobot_alternatif_hp
        INNER JOIN hp ON bobot_alternatif_hp.hp_id = hp.id
        INNER JOIN brand ON hp.brand_id = brand.id
		INNER JOIN ram_hp ON ram_hp.id = hp.ram_id
		INNER JOIN internal ON internal.id = hp.internal_id
        WHERE hp.harga BETWEEN $1 AND $2
		AND ram_hp.ram = $3
		AND internal.internal = $4
		AND bobot_alternatif_hp.deleted_at IS NULL`
        const data = [
            harga1,
            harga2,
            ram,
            internal
        ]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getBYHarga(harga1, harga2) {
        const statement = `SELECT
        brand.brand,
        hp.hp,
        bobot_alternatif_hp.ram,
        bobot_alternatif_hp.internal,
        bobot_alternatif_hp.batrai,
        bobot_alternatif_hp.kamera,
        bobot_alternatif_hp.harga
        FROM bobot_alternatif_hp
        INNER JOIN hp ON bobot_alternatif_hp.hp_id = hp.id
        INNER JOIN brand ON hp.brand_id = brand.id
        WHERE hp.harga BETWEEN $1 AND $2
		AND bobot_alternatif_hp.deleted_at IS NULL`
        const data = [harga1, harga2]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getBYSpek(ram, internal) {
        const statement = `SELECT
        brand.brand,
        hp.hp,
        bobot_alternatif_hp.ram,
        bobot_alternatif_hp.internal,
        bobot_alternatif_hp.batrai,
        bobot_alternatif_hp.kamera,
        bobot_alternatif_hp.harga
        FROM bobot_alternatif_hp
        INNER JOIN hp ON bobot_alternatif_hp.hp_id = hp.id
        INNER JOIN brand ON hp.brand_id = brand.id
		INNER JOIN ram_hp ON ram_hp.id = hp.ram_id
		INNER JOIN internal ON internal.id = hp.internal_id
		AND ram_hp.ram = $1
		AND internal.internal = $2
		AND bobot_alternatif_hp.deleted_at IS NULL`
        const data = [ram, internal]
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

    async countLaptop() {
        const statement = `SELECT COUNT(*) AS laptop FROM laptop WHERE deleted_at IS NULL`
        try {
            const result = await db.query(statement)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async countHp() {
        const statement = `SELECT COUNT(*) AS hp FROM hp WHERE deleted_at IS NULL`
        try {
            const result = await db.query(statement)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }
}

module.exports = AlternatifHp