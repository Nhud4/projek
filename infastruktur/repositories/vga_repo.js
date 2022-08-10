const mysql = require('mysql2')
const pool = require('../../connection/db_connection')
const Wrapper = require('../../helper/utils/wrapper')

const wrapper = new Wrapper()

const getListVga = async () => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_vga WHERE deleted_at IS NULL`
    try {
        const [rows, fields] = await promisePool.query(statment)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const getByKd = async (kd_vga) => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_vga WHERE kd_vga =? AND deleted_at IS NULL`
    const data = [kd_vga]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const getByMerk = async (merk_vga) => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_vga WHERE merk_vga  =? AND deleted_at IS NULL`
    const data = [merk_vga]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const getByKapasitas = async (kapasitas_vga) => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_vga WHERE kapasitas_vga  =? AND deleted_at IS NULL`
    const data = [kapasitas_vga]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const InsertVga = async (merek_vga, kapasitas_vga) => {
    const promisePool = pool.promise()
    const statment = `INSERT INTO tb_vga SET merek_vga=?, kapasitas_vga=?`
    const data = [merek_vga, kapasitas_vga]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const deleteVga = async (kd_vga) => {
    const promisePool = pool.promise()
    const statment = `UPDATE tb_vga SET deleted_at = NOW()
    WHERE kd_vga =?`
    const data = [kd_vga]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const updateVga = async (merk_vga, kapasitas_vga, kd_vga) => {
    const promisePool = pool.promise()
    const statment = `UPDATE tb_ram SET  merk_vga=?, kapasitas_vga=?
    WHERE kd_vga=? AND deleted_at IS NULL`
    const data = [merk_vga, kapasitas_vga, kd_vga]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

module.exports = {
    getListVga,
    getByKd,
    getByMerk,
    getByKapasitas,
    InsertVga,
    deleteVga,
    updateVga
}