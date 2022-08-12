const mysql = require('mysql2')
const pool = require('../../connection/db_connection')
const Wrapper = require('../../helper/utils/wrapper')

const wrapper = new Wrapper()

const getListRam = async () => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_ram WHERE deleted_at IS NULL`
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
    const statment = `SELECT * FROM tb_ram WHERE id =? AND deleted_at IS NULL`
    const data = [id]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const getByType = async (type_ram) => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_ram WHERE type_ram  =? AND deleted_at IS NULL`
    const data = [type_ram]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const getByKapasitas = async (kapasitas_ram) => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_ram WHERE kapasitas_ram  =? AND deleted_at IS NULL`
    const data = [kapasitas_ram]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const insertRam = async (type_ram, kapasitas_ram) => {
    const promisePool = pool.promise()
    const statment = `INSERT INTO tb_ram SET type_ram =?, kapasitas_ram =?`
    const data = [type_ram, kapasitas_ram]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const deleteRam = async (id) => {
    const promisePool = pool.promise()
    const statment = `UPDATE tb_ram SET deleted_at = NOW()
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

const updateRam = async (type_ram, kapasitas_ram, id) => {
    const promisePool = pool.promise()
    const statment = `UPDATE tb_ram SET  type_ram =?, kapasitas_ram =?
    WHERE id =? AND deleted_at IS NULL`
    const data = [type_ram, kapasitas_ram, id]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
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