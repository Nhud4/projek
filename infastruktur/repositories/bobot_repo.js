const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })

const wrapper = new Wrapper()

const getListBobot = async () => {
    const statement = `SELECT * FROM bobot WHERE deleted_at IS NULL`
    try {
        const result = await db.query(statement)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const getByBobot = async (bobot) => {
    const statement = `SELECT * FROM bobot WHERE bobot = $1 AND deleted_at IS NULL`
    const data = [bobot]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const getById = async (id) => {
    const statement = `SELECT * FROM bobot WHERE id =$1 AND deleted_at IS NULL`
    const data = [id]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const InsertBobot = async (bobot, processor, ram, penyimpanan, vga, display, harga) => {
    const statement = `INSERT INTO bobot(
        bobot, processor, ram, penyimpanan, vga, display, harga)
    VALUES($1, $2, $3, $4, $5, $6, $7)`
    const data = [bobot, processor, ram, penyimpanan, vga, display, harga]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const deleteBobot = async (id) => {
    const statement = `UPDATE bobot SET deleted_at = NOW() WHERE id =$1`
    const data = [id]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const updateBobot = async (bobot, processor, ram, penyimpanan, vga, display, harga, id) => {
    const statement = `UPDATE bobot SET
    bobot=$1,
    processor=$2,
    ram=$3, 
    penyimpanan=$4,
    vga=$5,
    display=$6,
    harga=$7
    WHERE id =$8
    AND deleted_at IS NULL`
    const data = [bobot, processor, ram, penyimpanan, vga, display, harga, id]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

module.exports = {
    getListBobot,
    getByBobot,
    getById,
    InsertBobot,
    deleteBobot,
    updateBobot
}