const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })

const wrapper = new Wrapper()

class BobotHpRepo {
    async getList() {
        const statement = `SELECT * FROM bobot_hp WHERE deleted_at IS NULL`
        try {
            const result = await db.query(statement)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getById(id) {
        const statement = `SELECT * FROM bobot_hp WHERE id=$1 AND deleted_at IS NULL`
        const data = [id]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }
    async insertBobot(ram, internal, batrai, kamera, harga) {
        const statement = `INSERT INTO bobot_hp(ram, internal, batrai, kamera, harga)
        VALUES($1, $2, $3, $4, $5)`
        const data = [ram, internal, batrai, kamera, harga]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async updateBobot(ram, internal, batrai, kamera, harga, id) {
        const statement = `UPDATE bobot_hp SET
        ram =$1,
        internal =$2,
        batrai =$3,
        kamera =$4,
        harga =$5
        WHERE id =$6 
        AND deleted_at IS NULL`
        const data = [ram, internal, batrai, kamera, harga, id]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async deleteBobot(id) {
        const statement = `UPDATE bobot_hp SET deleted_at = NOW()
        WHERE id =$1`
        const data = [id]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }
}

module.exports = BobotHpRepo