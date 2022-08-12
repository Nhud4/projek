const mysql = require('mysql2')
const pool = require('../../connection/db_connection')
const Wrapper = require('../../helper/utils/wrapper')

const wrapper = new Wrapper()

const getListPenyimpanan = async () => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_penyimpanan WHERE deleted_at IS NULL`
    try {
        const [rows, fields] = await promisePool.query(statment)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const getByKd = async (id) => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_penyimoanan WHERE kd_penyimoanan =? AND deleted_at IS NULL`
    const data = [id]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const getByType = async (type_penyimpanan) => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_penyimpanan WHERE type_penyimpanan  =? AND deleted_at IS NULL`
    const data = [type_penyimpanan]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const getByKapasitas = async (kapasitas_penyimpanan) => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_penyimpanan WHERE kapasitas_penyimpanan  =? AND deleted_at IS NULL`
    const data = [kapasitas_penyimpanan]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const insertPenyimpanan = async (type_penyimpanan, kapasitas_penyimpanan) => {
    const promisePool = pool.promise()
    const statment = `INSERT INTO tb_penyimpanan SET type_penyimpanan =?, kapasitas_penyimpanan =?`
    const data = [type_penyimpanan, kapasitas_penyimpanan]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const deletePenyimpanan = async (id) => {
    const promisePool = pool.promise()
    const statment = `UPDATE tb_penyimpanan SET deleted_at = NOW()
    WHERE id =?`
    const data = [id]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const updatePenyimpanan = async (type_penyimpanan, kapasitas_penyimpanan, id) => {
    const promisePool = pool.promise()
    const statment = `UPDATE tb_penyimpanan SET  type_penyimpanan =?, kapasitas_penyimpanan =?, updated_at = NOW()
    WHERE id =? AND deleted_at IS NULL`
    const data = [type_penyimpanan, kapasitas_penyimpanan, id]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
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