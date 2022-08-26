const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })

const wrapper = new Wrapper()

class UserAuth {
    async getList() {
        const statement = `SELECT * FROM user WHERE deleted_at IS NULL`
        try {
            const result = await db.query(statement)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getById(id) {
        const statement = `SELECT * FROM user WHERE id=$1 AND deleted_at IS NULL`
        const data = [id]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getByUsername(username) {
        const statement = `SELECT * FROM user WHERE username=$1 AND deleted_at IS NULL`
        const data = [username]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getByPhone(phone) {
        const statement = `SELECT * FROM user WHERE phone=$1 AND deleted_at IS NULL`
        const data = [phone]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getByName(name) {
        const statement = `SELECT * FROM user WERE name=$1 AND deleted_at IS NULL`
        const data = [name]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async insertUser(name, phone, address, username, password, user_extent) {
        const statement = `INSERT INTO user(name, phone, address, username, password, user_extent)
        VALUES($1, $2, $3, $4, $5, $6)`
        const data = [name, phone, address, username, password, user_extent]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async updateUser(name, phone, address, username, password, user_extent, id) {
        const statement = `UPDATE user SET
        name=$1,
        phone=$2,
        address=$3,
        username=$4,
        password=$5,
        user_extent=$6
        WHERE id=$7 AND deleted_at IS NULL`
        const data = [name, phone, address, username, password, user_extent, id]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async deleteUser(id) {
        const statement = `UPDATE user SET deleted_at =NOW() WHERE id =$1`
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

module.exports = UserAuth