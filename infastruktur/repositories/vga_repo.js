const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })

const wrapper = new Wrapper()

const getListVga = async () => {
    const statement = `SELECT * FROM vga WHERE deleted_at IS NULL`
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const getByKd = async (id) => {
    const statement = `SELECT * FROM vga
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

const getByMerk = async (merk_vga) => {
    const statement = `SELECT * FROM vga
    WHERE merk_vga=$1
    AND deleted_at IS NULL`
    const data = [merk_vga]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const getByKapasitas = async (kapasitas_vga) => {
    const statement = `SELECT * FROM vga
    WHERE kapasitas_vga=$1 
    AND deleted_at IS NULL`
    const data = [kapasitas_vga]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const InsertVga = async (merek_vga, kapasitas_vga) => {
    const statement = `INSERT INTO vga(
        merek_vga, kapasitas_vga
    ) VALUES($1, $2)`
    const data = [merek_vga, kapasitas_vga]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const deleteVga = async (id) => {
    const statement = `UPDATE vga SET
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

const updateVga = async (merk_vga, kapasitas_vga, id) => {
    const statement = `UPDATE ram SET
    merk_vga=$1,
    kapasitas_vga=$2
    WHERE id=%3
    AND deleted_at IS NULL`
    const data = [merk_vga, kapasitas_vga, id]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
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