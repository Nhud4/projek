const mysql = require('mysql2')
const pool = require('../../connection/db_connection')
const Wrapper = require('../../helper/utils/wrapper')

const wrapper = new Wrapper()

const getListDisplay = async () => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_display WHERE deleted_at IS NULL`
    try {
        const [rows, fields] = await promisePool.query(statment)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const getByKd = async (kd_display) => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_display WHERE kd_display =? AND deleted_at IS NULL`
    const data = [kd_display]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const getByType = async (type_display) => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_display WHERE type_display  =? AND deleted_at IS NULL`
    const data = [type_display]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const getByUkuran = async (ukuran_display) => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_display WHERE ukuran_display  =? AND deleted_at IS NULL`
    const data = [ukuran_display]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const InsertDisplay = async (type_display, ukuran_display) => {
    const promisePool = pool.promise()
    const statment = `INSERT INTO tb_display SET type_display=?, ukuran_display=?`
    const data = [type_display, ukuran_display]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const deleteDisplay = async (kd_display) => {
    const promisePool = pool.promise()
    const statment = `UPDATE tb_display SET deleted_at = NOW()
    WHERE kd_display =?`
    const data = [kd_display]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const updateDisplay = async (type_display, ukuran_display, kd_display) => {
    const promisePool = pool.promise()
    const statment = `UPDATE tb_ram SET  type_display=?, ukuran_display=?
    WHERE kd_display=? AND deleted_at IS NULL`
    const data = [type_display, ukuran_display, kd_display]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

module.exports = {
    getListDisplay,
    getByKd,
    getByType,
    getByUkuran,
    InsertDisplay,
    deleteDisplay,
    updateDisplay
}