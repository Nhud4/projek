const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })

const wrapper = new Wrapper()

const getListRam = async () => {
    const statement = `SELECT * FROM ram WHERE deleted_at IS NULL`
    try {
        const result = await db.query(statement)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const getByKd = async (id) => {
    const statement = `SELECT * FROM ram
    WHERE id=$1
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

const getByType = async (type_ram) => {
    const statement = `SELECT * FROM ram
    WHERE type_ram=$1
    AND deleted_at IS NULL`
    const data = [type_ram]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const getByKapasitas = async (kapasitas_ram) => {
    const statement = `SELECT * FROM ram
    WHERE kapasitas_ram=$1
    AND deleted_at IS NULL`
    const data = [kapasitas_ram]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const insertRam = async (type_ram, kapasitas_ram) => {
    const statement = `INSERT INTO ram(
        type_ram, kapasitas_ram
    ) VALUES($1, $2)`
    const data = [type_ram, kapasitas_ram]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const deleteRam = async (id) => {
    const statement = `UPDATE ram SET
    deleted_at = NOW()
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

const updateRam = async (type_ram, kapasitas_ram, id) => {
    const statement = `UPDATE ram SET
    type_ram =$1,
    kapasitas_ram =$2
    WHERE id =$3
    AND deleted_at IS NULL`
    const data = [type_ram, kapasitas_ram, id]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

module.exports = {
    getListRam,
    getByKd,
    getByType,
    getByKapasitas,
    insertRam,
    deleteRam,
    updateRam
}