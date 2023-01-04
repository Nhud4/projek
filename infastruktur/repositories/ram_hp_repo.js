const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })

const wrapper = new Wrapper()

class RamHp {
    async getList() {
        const statement = `SELECT * FROM ram_hp WHERE deleted_at IS NULL`
        try {
            const result = await db.query(statement)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getById(id) {
        const statement = `SELECT * FROM ram_hp WHERE id=$1 AND deleted_at IS NULL`
        const data = [id]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getByRam(ram) {
        const statement = `SELECT * FROM ram_hp WHERE ram=$1 AND deleted_at IS NULL`
        const data = [ram]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async insertRam(ram) {
        const statement = `INSERT INTO ram_hp(ram) VALUES($1)`
        const data = [ram]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async updateRam(ram, id) {
        const statement = `UPDATE ram_hp SET ram=$1 WHERE id=$2 AND deleted_at IS NULL`
        const data = [ram, id]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async deleteRam(id) {
        const statement = `UPDATE ram_hp SET deleted_at = NOW() WHERE id=$1`
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

module.exports = RamHp