const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })

const wrapper = new Wrapper()

const getListMerk = async () => {
    const statement = `SELECT * FROM merk WHERE deleted_at IS NULL`
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const getByKd = async (id) => {
    const statement = `SELECT * FROM merk WHERE id =$1
    AND deleted_at IS NULL`
    const data = [id]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const getByMerk = async (merk) => {
    const statement = `SELECT * FROM merk WHERE merk=$1
    AND deleted_at IS NULL`
    const data = [merk]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const insertMerk = async (merk) => {
    const statement = `INSERT INTO merk SET merk =$1`
    const data = [merk]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const deleteMerk = async (id) => {
    const statement = `UPDATE merk SET deleted_at = NOW()
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

const updateMerk = async (merk, id) => {
    const statement = `UPDATE merk SET merk=$1,
    updated_at = NOW()
    WHERE id =$2
    AND deleted_at IS NULL`
    const data = [merk, id]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

module.exports = {
    getListMerk,
    getByKd,
    getByMerk,
    insertMerk,
    deleteMerk,
    updateMerk
}