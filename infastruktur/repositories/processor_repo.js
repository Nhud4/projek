const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })

const wrapper = new Wrapper()

const getListProcessor = async () => {
    const statement = `SELECT * FROM processor WHERE deleted_at IS NULL`
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const getByKd = async (id) => {
    const statement = `SELECT * FROM processor
    WHERE id =$1
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

const getBySeri = async (seri_processor) => {
    const statement = `SELECT * FROM processor
    WHERE seri_processor=$1
    AND deleted_at IS NULL`
    const data = [seri_processor]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const getByKecepatan = async (kecepatan_processor) => {
    const statement = `SELECT * FROM processor
    WHERE kecepatan_processor=$1
    AND deleted_at IS NULL`
    const data = [kecepatan_processor]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const insertProcessor = async (processor, seri_processor, kecepatan_processor) => {
    const statement = `INSERT INTO processor(
        processor, seri_processor, kecepatan_processor
    ) VALUES($1, $2, $3)`
    const data = [processor, seri_processor, kecepatan_processor]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const deleteProcessor = async (id) => {
    const statement = `UPDATE processor SET
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

const updateProcessor = async (processor, seri_processor, kecepatan_processor, id) => {
    const statement = `UPDATE processor SET 
    processor=$1,
    seri_processor=$2,
    kecepatan_processor=$3
    WHERE kd_ram=$4
    AND deleted_at IS NULL`
    const data = [processor, seri_processor, kecepatan_processor, id]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

module.exports = {
    getListProcessor,
    getByKd,
    getByKd,
    getByKecepatan,
    getBySeri,
    insertProcessor,
    deleteProcessor,
    updateProcessor
}