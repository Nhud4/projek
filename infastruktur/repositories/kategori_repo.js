const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })

const wrapper = new Wrapper()

const insertKategori = async () => {
    const statement = `INSERT INTO kategori(kategori, sub_kategori)
    VALUES
    ('game','ringan'),
    ('game','midel'),
    ('game','berat'),
    ('editing', '2D'),
    ('editing','video'),
    ('editing','3D'),
    ('office','ringan'),
    ('office','berat')`
    try {
        const result = await db.query(statement)
        if (result.err) throw result.err
        return wrapper.data(result)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

module.exports = {
    insertKategori
}