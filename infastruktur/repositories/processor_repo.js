const mysql = require('mysql2')
const pool = require('../../connection/db_connection')
const Wrapper = require('../../helper/utils/wrapper')

const wrapper = new Wrapper()

const getListProcessor = async () => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_processor WHERE deleted_at IS NULL`
    try {
        const [rows, fields] = await promisePool.query(statment)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const getByKd = async (kd_processor) => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_processor WHERE kd_processor =? AND deleted_at IS NULL`
    const data = [kd_processor]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const getBySeri = async (seri_processor) => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_processor WHERE seri_processor=? AND deleted_at IS NULL`
    const data = [seri_processor]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const getByKecepatan = async (kecepatan_processor) => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_processor WHERE kecepatan_processor=? AND deleted_at IS NULL`
    const data = [kecepatan_processor]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const insertProcessor = async (processor, seri_processor, kecepatan_processor) => {
    const promisePool = pool.promise()
    const statment = `INSERT INTO tb_processor SET processor=?, seri_processor=?, kecepatan_processor=?`
    const data = [processor, seri_processor, kecepatan_processor]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const deleteProcessor = async (kd_processor) => {
    const promisePool = pool.promise()
    const statment = `UPDATE tb_processor SET deleted_at = NOW()
    WHERE kd_processor =?`
    const data = [kd_processor]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const updateProcessor = async (processor, seri_processor, kecepatan_processor, kd_processor) => {
    const promisePool = pool.promise()
    const statment = `UPDATE tb_ram SET  processor=?, seri_processor=?, kecepatan_processor=?
    WHERE kd_ram =? AND deleted_at IS NULL`
    const data = [processor, seri_processor, kecepatan_processor, kd_processor]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
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