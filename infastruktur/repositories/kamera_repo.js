const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })

const wrapper = new Wrapper()

class Kamera {
    async getList() {
        const statement = `SELECT * FROM kamera WHERE deleted_at IS NULL`
        try {
            const result = await db.query(statement)
            if (result.err) throw result.err
            return wrapper.data(result)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getById(id) {
        const statement = `SELECT * FROM kamera WHERE id=$1 AND deleted_at IS NULL`
        const data = [id]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getByKamera(type, kualitas) {
        const statement = `SELECT * FROM kamera WHERE type=$1 AND kualitas=$2 AND deleted_at IS NULL`
        const data = [type, kualitas]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async insertKamera(type, kualitas) {
        const statement = `INSERT INTO kamera(type, kualitas)
        VALUES($1, $2)`
        const data = [type, kualitas]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async updateKamera(type, kualitas, id) {
        const statement = `UPDATE kamera SET type=$1, kamera=$2 WHERE
        id=$3 AND deleted_at IS NULL`
        const data = [type, kualitas, id]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async deleteKamera(id) {
        const statement = `UPDATE kamera SET deleted_at= NOW()
        WHERE id=$1`
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

module.exports = Kamera