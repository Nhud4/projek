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
            return wrapper.data(result.data)
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

    async getByKamera(type, kamera_depan, kamera_belakang) {
        const statement = `SELECT * FROM kamera WHERE type=$1 AND kamera_depan=$2
        AND kamera_belakang=$3 AND deleted_at IS NULL`
        const data = [type, kamera_depan, kamera_belakang]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async insertKamera(type, kamera_depan, kamera_belakang) {
        const statement = `INSERT INTO kamera(type, kamera_depan, kamera_belakang)
        VALUES($1, $2, $3)`
        const data = [type, kamera_depan, kamera_belakang]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async updateKamera(type, kamera_depan, kamera_belakang, id) {
        const statement = `UPDATE kamera SET type=$1, kamera_depan=$2, kamera_belakang=$3
        WHERE id=$4 AND deleted_at IS NULL`
        const data = [type, kamera_depan, kamera_belakang, id]
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