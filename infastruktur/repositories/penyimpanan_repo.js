const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })

const wrapper = new Wrapper()

const getListPenyimpanan = async () => {
    const statement = `SELECT * FROM penyimpanan WHERE deleted_at IS NULL`
    try {
        const result = await db.query(statement)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const getByKd = async (id) => {
    const statement = `SELECT * FROM penyimpanan
    WHERE id =$1 AND deleted_at IS NULL`
    const data = [id]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const getByType = async (type_penyimpanan) => {
    const statement = `SELECT * FROM penyimpanan
    WHERE type_penyimpanan=$1
    AND deleted_at IS NULL`
    const data = [type_penyimpanan]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const getByKapasitas = async (kapasitas_penyimpanan) => {
    const statement = `SELECT * FROM penyimpanan
    WHERE kapasitas_penyimpanan=$1
    AND deleted_at IS NULL`
    const data = [kapasitas_penyimpanan]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const insertPenyimpanan = async (type_penyimpanan, kapasitas_penyimpanan) => {
    const statement = `INSERT INTO penyimpanan(type_penyimpanan, kapasitas_penyimpanan)
    VALUES($1, $2)`
    const data = [type_penyimpanan, kapasitas_penyimpanan]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const deletePenyimpanan = async (id) => {
    const statement = `UPDATE penyimpanan SET deleted_at = NOW()
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

const updatePenyimpanan = async (type_penyimpanan, kapasitas_penyimpanan, id) => {
    const statement = `UPDATE penyimpanan SET
    type_penyimpanan =$1,
    kapasitas_penyimpanan =$2,
    updated_at = NOW()
    WHERE id =$3 AND deleted_at IS NULL`
    const data = [type_penyimpanan, kapasitas_penyimpanan, id]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

module.exports = {
    getListPenyimpanan,
    getByKd,
    getByType,
    getByKapasitas,
    insertPenyimpanan,
    deletePenyimpanan,
    updatePenyimpanan
}