const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })

const wrapper = new Wrapper()

const getListDisplay = async () => {
    const statement = `SELECT * FROM display WHERE deleted_at IS NULL`
    try {
        const result = await db.query(statement)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const getByKd = async (id) => {
    const statement = `SELECT * FROM display
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

const getByType = async (type_display) => {
    const statement = `SELECT * FROM display
    WHERE type_display=$1
    AND deleted_at IS NULL`
    const data = [type_display]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const getByUkuran = async (ukuran_display) => {
    const statement = `SELECT * FROM display
    WHERE ukuran_display=$1
    AND deleted_at IS NULL`
    const data = [ukuran_display]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const InsertDisplay = async (type_display, ukuran_display) => {
    const statement = `INSERT INTO display(
        type_display, ukuran_display
    )VALUES($1, $2)`
    const data = [type_display, ukuran_display]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const deleteDisplay = async (id) => {
    const statement = `UPDATE display SET
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

const updateDisplay = async (type_display, ukuran_display, id) => {
    const statement = `UPDATE display SET
    type_display=$1,
    ukuran_display=$2
    WHERE id=$3
    AND deleted_at IS NULL`
    const data = [type_display, ukuran_display, id]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
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