const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })

const wrapper = new Wrapper()

const getListLaptop = async () => {
    const statement = `SELECT
    laptop.id, 
    merek.merek,
    laptop.laptop, 
    processor.processor,
    processor.seri_processor,
    processor.kecepatan_processor,
    ram.type_ram,
    ram.kapasitas_ram,
    penyimpanan.type_penyimpanan,
    penyimpanan.kapasitas_penyimpanan,
    vga.merek_vga,
    vga.kapasitas_vga,
    display.type_display,
    display.ukuran_dispaly, 
    laptop.harga
        FROM laptop 
        INNER JOIN merek
        ON laptop.merek_id = merek.id
        INNER JOIN processor
        ON laptop.processor_id = processor.id
        INNER JOIN ram
        ON laptop.ram_id = ram.id
        INNER JOIN penyimpanan
        ON laptop.penyimpanan_id = penyimpanan.id
        INNER JOIN vga
        ON laptop.vga_id = vga.id
        INNER JOIN display
        ON laptop.display_id = display.id
    WHERE deleted_at IS NULL`
    try {
        const result = await db.query(statement)
        if (result.err) throw result.err
        return wrapper.data(result)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const getById = async (id) => {
    const statement = `SELECT
    laptop.id, 
    merek.merek,
    laptop.laptop, 
    processor.processor,
    processor.seri_processor,
    processor.kecepatan_processor,
    ram.type_ram,
    ram.kapasitas_ram,
    penyimpanan.type_penyimpanan,
    penyimpanan.kapasitas_penyimpanan,
    vga.merek_vga,
    vga.kapasitas_vga,
    display.type_display,
    display.ukuran_dispaly, 
    laptop.harga
        FROM laptop 
        INNER JOIN merek
        ON laptop.merek_id = merek.id
        INNER JOIN processor
        ON laptop.processor_id = processor.id
        INNER JOIN ram
        ON laptop.ram_id = ram.id_ram
        INNER JOIN penyimpanan
        ON laptop.penyimpanan_id = penyimpanan.id
        INNER JOIN vga
        ON laptop.vga_id = vga.id
        INNER JOIN display
        ON laptop.display_id = display.id
    WHERE deleted_at IS NULL`
    const data = [id]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const getByLaptop = async (laptop) => {
    const statement = `SELECT * FROM laptop WHERE laptop =$1 AND deleted_at IS NULL`
    const data = [laptop]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const insertLaptop = async (
    merek_id,
    laptop,
    processor_id,
    ram_id,
    penyimpanan_id,
    vga_id,
    display_id,
    harga) => {
    const statement = `INSERT INTO laptop(
        merek_id,
        laptop,
        processor_id,
        ram_id,
        penyimpanan_id,
        vga_id,
        display_id,
        harga
    )VALUES($1, $2. $3. $4, $5, $6, $7, $8)`
    const data = [
        merek_id,
        laptop,
        processor_id,
        ram_id,
        penyimpanan_id,
        vga_id,
        display_id,
        harga
    ]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

const deleteLaptop = async (id) => {
    const statement = `UPDATE laptop SET
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

const updateLaptop = async (
    merek_id,
    laptop,
    processor_id,
    ram_id,
    penyimpanan_id,
    vga_id,
    display_id,
    harga,
    id) => {
    const statement = `UPDATE laptop SET
    merek_id =$1,
    laptop =$2,
    processor_id =$3,
    ram_id =$4,
    penyimpanan_id =$5,
    vga_id =$6,
    display_id =$7,
    harga =$8
    WHERE id =$9
    AND deleted_at IS NULL`
    const data = [
        merek_id,
        laptop,
        processor_id,
        ram_id,
        penyimpanan_id,
        vga_id,
        display_id,
        harga,
        id
    ]
    try {
        const result = await db.query(statement, data)
        if (result.err) throw result.err
        return wrapper.data(result.data)
    } catch (err) {
        return wrapper.error(err.message)
    }
}

module.exports = {
    getListLaptop,
    getById,
    getByLaptop,
    insertLaptop,
    deleteLaptop,
    updateLaptop
}