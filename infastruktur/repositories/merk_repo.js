const mysql = require('mysql2')
const pool = require('../../connection/db_connection')
const Wrapper = require('../../helper/utils/wrapper')

const wrapper = new Wrapper()

const getListMerk = async () => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_merk WHERE deleted_at IS NULL`
    try {
        const [rows, fields] = await promisePool.query(statment)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const getByKd = async (kd_merk) => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_merk WHERE kd_merk =? AND deleted_at IS NULL`
    const data = [kd_merk]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const getByMerk = async (merk) => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_penyimpanan WHERE merk=? AND deleted_at IS NULL`
    const data = [merk]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const insertMerk = async (merk) => {
    const promisePool = pool.promise()
    const statment = `INSERT INTO tb_penyimpanan SET merk =?`
    const data = [merk]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const deleteMerk = async (kd_merk) => {
    const promisePool = pool.promise()
    const statment = `UPDATE tb_merk SET deleted_at = NOW()
    WHERE kd_merk =?`
    const data = [kd_merk]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const updateMerk = async (merk, kd_merk) => {
    const promisePool = pool.promise()
    const statment = `UPDATE tb_merk SET  merk=?, updated_at = NOW()
    WHERE kd_merk =? AND deleted_at IS NULL`
    const data = [merk, kd_merk]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

module.exports = {
    getListMerk,
    getByKd,
    insertMerk,
    deleteMerk,
    updateMerk
}