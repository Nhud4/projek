const mysql = require('mysql2')
const pool = require('../../connection/db_connection')
const Wrapper = require('../../helper/utils/wrapper')

const wrapper = new Wrapper()

const getListLaptop = async () => {
    const promisePool = pool.promise()

    const statment = `SELECT
    tb_laptop.id, 
    tb_merek.merek,
    tb_laptop.laptop, 
    tb_processor.processor,
    tb_processor.seri_processor,
    tb_processor.kecepatan_processor,
    tb_ram.type_ram,
    tb_ram.kapasitas_ram,
    tb_penyimpanan.type_penyimpanan,
    tb_penyimpanan.kapasitas_penyimpanan,
    tb_vga.merek_vga,
    tb_vga.kapasitas_vga,
    tb_display.type_display,
    tb_display.ukuran_dispaly, 
    tb_laptop.harga
        FROM tb_laptop 
        INNER JOIN tb_merek
        ON tb_laptop.merek_id = tb_merek.id
        INNER JOIN tb_processor
        ON tb_laptop.processor_id = tb_processor.id
        INNER JOIN tb_ram
        ON tb_laptop.ram_id = tb_ram.id
        INNER JOIN tb_penyimpanan
        ON tb_laptop.penyimpanan_id = tb_penyimpanan.id
        INNER JOIN tb_vga
        ON tb_laptop.vga_id = tb_vga.id
        INNER JOIN tb_display
        ON tb_laptop.display_id = tb_display.id
    WHERE deleted_at IS NULL`
    try {
        const [rows, fields] = await promisePool.query(statment)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const getById = async (id) => {
    const promisePool = pool.promise()
    const statment = `SELECT
    tb_laptop.id, 
    tb_merek.merek,
    tb_laptop.laptop, 
    tb_processor.processor,
    tb_processor.seri_processor,
    tb_processor.kecepatan_processor,
    tb_ram.type_ram,
    tb_ram.kapasitas_ram,
    tb_penyimpanan.type_penyimpanan,
    tb_penyimpanan.kapasitas_penyimpanan,
    tb_vga.merek_vga,
    tb_vga.kapasitas_vga,
    tb_display.type_display,
    tb_display.ukuran_dispaly, 
    tb_laptop.harga
        FROM tb_laptop 
        INNER JOIN tb_merek
        ON tb_laptop.merek_id = tb_merek.id
        INNER JOIN tb_processor
        ON tb_laptop.processor_id = tb_processor.id
        INNER JOIN tb_ram
        ON tb_laptop.ram_id = tb_ram.id_ram
        INNER JOIN tb_penyimpanan
        ON tb_laptop.penyimpanan_id = tb_penyimpanan.id
        INNER JOIN tb_vga
        ON tb_laptop.vga_id = tb_vga.id
        INNER JOIN tb_display
        ON tb_laptop.display_id = tb_display.id
    WHERE deleted_at IS NULL`
    const data = [id]

    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const getByLaptop = async (laptop) => {
    const promisePool = pool.promise()
    const statment = `SELECT * FROM tb_laptop WHERE laptop =? AND deleted_at IS NULL`
    const data = [laptop]
    try {
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows)
    } catch (err) {
        return wrapper.response(err.message)
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
    const promisePool = pool.promise()
    const statment = `INSERT INTO tb_laptop SET
        merek_id,
        laptop,
        processor_id,
        ram_id,
        penyimpanan_id,
        vga_id,
        display_id,
        harga`
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
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows.data)
    } catch (err) {
        return wrapper.response(err.message)
    }
}

const deleteLaptop = async (id) => {
    const promisePool = pool.promise()
    const statment = `UPDATE tb_laptop SET
    deleted_at = NOW()
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
    const promisePool = pool.promise()
    const statment = `UPDATE tb_laptop SET
    merek_id =?,
    laptop =?,
    processor_id =?,
    ram_id =?,
    penyimpanan_id =?,
    vga_id =?,
    display_id =?,
    harga =?
    WHERE id =? AND deleted_at IS NULL`
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
        const [rows, fields] = await promisePool.query(statment, data)
        if (rows.err) throw rows.err
        return wrapper.data(rows.data)
    } catch (err) {
        return wrapper.response(err.message)
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