const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })

const wrapper = new Wrapper()

class UserAuth {
    async getList() {
        const statement = `SELECT * FROM admin WHERE deleted_at IS NULL`
        try {
            const result = await db.query(statement)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getById(id) {
        const statement = `SELECT * FROM admin WHERE id=$1 AND deleted_at IS NULL`
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
        const statement = `SELECT * FROM admin WHERE username=$1 AND deleted_at IS NULL`
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
        const statement = `SELECT * FROM admin WHERE phone=$1 AND deleted_at IS NULL`
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
        const statement = `SELECT * FROM admin WHERE name =$1 AND deleted_at IS NULL`
        const data = [name]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async countUser() {
        const statement = `SELECT COUNT(*) AS user FROM admin WHERE deleted_at IS NULL`
        try {
            const result = await db.query(statement)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async countSuperAdmin() {
        const statement = `SELECT COUNT(*) AS super_user FROM admin WHERE user_extent='super-admin'
        AND deleted_at IS NULL`
        try {
            const result = await db.query(statement)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async countAdmin() {
        const statement = `SELECT COUNT(*) AS admin FROM admin WHERE user_extent='admin'
        AND deleted_at IS NULL`
        try {
            const result = await db.query(statement)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async insertUser(name, phone, username, password, user_extent) {
        const statement = `INSERT INTO admin(name, phone, username, password, user_extent)
        VALUES($1, $2, $3, $4, $5)`
        const data = [name, phone, username, password, user_extent]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async updateUser(name, phone, username, password, user_extent, id) {
        const statement = `UPDATE user SET
        name=$1,
        phone=$2,
        address=$3,
        username=$4,
        password=$5,
        user_extent=$6
        WHERE id=$7 AND deleted_at IS NULL`
        const data = [name, phone, username, password, user_extent, id]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async deleteUser(id) {
        const statement = `UPDATE admin SET deleted_at =NOW() WHERE id =$1`
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