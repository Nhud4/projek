const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })

const wrapper = new Wrapper()

class Hp {
    async getList() {
        const statement = `SELECT
        hp.id,
        brand.id AS brandId,
        brand.brand,
        hp.hp,
        chipset.id AS chipsetId,
        chipset.chipset,
        chipset.versi,
        internal.id AS internalId,
        internal.internal,
        ram_hp.id AS ramId,
        ram_hp.ram,
        batrai.id AS batraiId,
        batrai.batrai,
        kamera.id AS kameraId,
        kamera.type,
        kamera.kamera_depan,
        kamera.kamera_belakang,
        hp.harga FROM hp
        INNER JOIN brand
        ON hp.brand_id = brand.id
        INNER JOIN chipset
        ON hp.chipset_id = chipset.id
        INNER JOIN internal
        ON hp.internal_id = internal.id
        INNER JOIN ram_hp
        ON hp.ram_id = ram_hp.id
        INNER JOIN batrai
        ON hp.batrai_id = batrai.id
        INNER JOIN kamera
        ON hp.kamera_id = kamera.id
        WHERE hp.deleted_at IS NULL`
        try {
            const result = await db.query(statement)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getById(id) {
        const statement = `SELECT
        hp.id,
        brand.id AS brandId,
        brand.brand,
        hp.hp,
        chipset.id AS chipsetId,
        chipset.chipset,
        chipset.versi,
        internal.id AS internalId,
        internal.internal,
        ram_hp.id AS ramId,
        ram_hp.ram,
        batrai.id AS batraiId,
        batrai.batrai,
        kamera.id AS kameraId,
        kamera.type,
        kamera.kamera_depan,
        kamera.kamera_belakang,
        hp.harga FROM hp
        INNER JOIN brand
        ON hp.brand_id = brand.id
        INNER JOIN chipset
        ON hp.chipset_id = chipset.id
        INNER JOIN internal
        ON hp.internal_id = internal.id
        INNER JOIN ram_hp
        ON hp.ram_id = ram_hp.id
        INNER JOIN batrai
        ON hp.batrai_id = batrai.id
        INNER JOIN kamera
        ON hp.kamera_id = kamera.id
        WHERE HP.id=$1 AND hp.deleted_at IS NULL`
        const data = [id]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getByHp(hp) {
        const statement = `SELECT * FROM hp WHERE hp=$1 AND deleted_at IS NULL`
        const data = [hp]
        try {
            const result = await db.query(statement, data)
            console.log(result)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async insertHp(
        brand_id,
        hp,
        chipset_id,
        internal_id,
        ram_id,
        batrai_id,
        kamera_id,
        harga
    ) {
        const statement = `INSERT INTO hp(
        brand_id,
        hp,
        chipset_id,
        internal_id,
        ram_id,
        batrai_id,
        kamera_id,
        harga
        ) VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id`
        const data = [
            brand_id,
            hp,
            chipset_id,
            internal_id,
            ram_id,
            batrai_id,
            kamera_id,
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

    async updateHp(
        brand_id,
        hp,
        chipset_id,
        internal_id,
        ram_id,
        batrai_id,
        kamera_id,
        harga,
        id
    ) {
        const statement = `UPDATE hp SET
        brand_id=$1,
        hp=$2,
        chipset_id=$3,
        internal_id=$4,
        ram_id=$5,
        batrai_id=$6,
        kamera_id=$7,
        harga=$8
        WHERE id=$9 AND deleted_at IS NULL
        RETURNING id`
        const data = [
            brand_id,
            hp,
            chipset_id,
            internal_id,
            ram_id,
            batrai_id,
            kamera_id,
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

    async deleteHp(id) {
        const statement = `UPDATE hp SET deleted_at =NOW() WHERE id=$1`
        const data = [id]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async maxHarga() {
        const statement = `SELECT MAX(harga) FROM hp`
        try {
            const result = await db.query(statement)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async minHarga() {
        const statement = `SELECT MIN(harga) FROM hp`
        try {
            const result = await db.query(statement)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }
}

module.exports = Hp