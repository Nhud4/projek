const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })

const wrapper = new Wrapper()

class AlternatifRepo {
    async getList() {
        const statement = `SELECT
        bobot_alternatif.id,
        merk.merk,
        laptop.laptop,
        bobot_alternatif.processor,
        bobot_alternatif.ram,
        bobot_alternatif.penyimpanan,
        bobot_alternatif.vga,
        bobot_alternatif.display,
        bobot_alternatif.harga,
        bobot_alternatif.ka,
        bobot_alternatif.kb,
        bobot_alternatif.kc
        FROM bobot_alternatif
        INNER JOIN laptop
        ON bobot_alternatif.alternatif_id = laptop.id
        INNER JOIN merk
        ON laptop.merk_id = merk.is
        WHERE bobot_alternatif.deleted_at IS NULL`
        try {
            const result = await db.query(statement)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getKategoriGame(kategori, sub_kategori) {
        const statement = `SELECT
        bobot_alternatif.id,
        merk.merk,
        laptop.laptop,
        bobot_alternatif.processor,
        bobot_alternatif.ram,
        bobot_alternatif.penyimpanan,
        bobot_alternatif.vga,
        bobot_alternatif.display,
        bobot_alternatif.harga
        FROM bobot_alternatif
        INNER JOIN laptop
        ON bobot_alternatif.alternatif_id = laptop.id
        INNER JOIN merk
        ON laptop.merk_id = merk.id
        INNER JOIN kategori
        ON bobot_alternatif.ka = kategori.id
        WHERE kategori.kategori = $1
        AND kategori.sub_kategori = $2
        AND bobot_alternatif.deleted_at IS NULL`
        const data = [kategori, sub_kategori]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getKategoriEditing(kategori, sub_kategori) {
        const statement = `SELECT
        bobot_alternatif.id,
        merk.merk,
        laptop.laptop,
        bobot_alternatif.processor,
        bobot_alternatif.ram,
        bobot_alternatif.penyimpanan,
        bobot_alternatif.vga,
        bobot_alternatif.display,
        bobot_alternatif.harga
        FROM bobot_alternatif
        INNER JOIN laptop
        ON bobot_alternatif.alternatif_id = laptop.id
        INNER JOIN merk
        ON laptop.merk_id = merk.id
        INNER JOIN kategori
        ON bobot_alternatif.kb = kategori.id
        WHERE kategori.kategori = $1
        AND kategori.sub_kategori = $2
        AND bobot_alternatif.deleted_at IS NULL`
        const data = [kategori, sub_kategori]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getKategoriOffice(kategori, sub_kategori) {
        const statement = `SELECT
        bobot_alternatif.id,
        merk.merk,
        laptop.laptop,
        bobot_alternatif.processor,
        bobot_alternatif.ram,
        bobot_alternatif.penyimpanan,
        bobot_alternatif.vga,
        bobot_alternatif.display,
        bobot_alternatif.harga
        FROM bobot_alternatif
        INNER JOIN laptop
        ON bobot_alternatif.alternatif_id = laptop.id
        INNER JOIN merk
        ON laptop.merk_id = merk.id
        INNER JOIN kategori
        ON bobot_alternatif.kc = kategori.id
        WHERE kategori.kategori = $1
        AND kategori.sub_kategori = $2
        AND bobot_alternatif.deleted_at IS NULL`
        const data = [kategori, sub_kategori]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getSpekGame(kategori, processor, ram, penyimpanan, vga, display) {
        const statement = `SELECT
        bobot_alternatif.id,
        merk.merk,
        laptop.laptop,
        bobot_alternatif.processor,
        bobot_alternatif.ram,
        bobot_alternatif.penyimpanan,
        bobot_alternatif.vga,
        bobot_alternatif.display,
        bobot_alternatif.harga
        FROM bobot_alternatif
        INNER JOIN laptop
        ON bobot_alternatif.alternatif_id = laptop.id
        INNER JOIN merk
        ON laptop.merk_id = merk.id
        INNER JOIN kategori
        ON bobot_alternatif.ka = kategori.id
        WHERE kategori.kategori = $1
        AND laptop.processor_id = $2
        AND laptop.ram_id = $3
        AND laptop.penyimpanan_id = $4
        AND laptop.vga_id = $5
        AND laptop.display_id = $6
        AND bobot_alternatif.deleted_at IS NULL`
        const data = [kategori, processor, ram, penyimpanan, vga, display]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getSpekEditing(kategori, processor, ram, penyimpanan, vga, display) {
        const statement = `SELECT
        bobot_alternatif.id,
        merk.merk,
        laptop.laptop,
        bobot_alternatif.processor,
        bobot_alternatif.ram,
        bobot_alternatif.penyimpanan,
        bobot_alternatif.vga,
        bobot_alternatif.display,
        bobot_alternatif.harga
        FROM bobot_alternatif
        INNER JOIN laptop
        ON bobot_alternatif.alternatif_id = laptop.id
        INNER JOIN merk
        ON laptop.merk_id = merk.id
        INNER JOIN kategori
        ON bobot_alternatif.kb = kategori.id
        WHERE kategori.kategori = $1
        AND laptop.processor_id = $2
        AND laptop.ram_id = $3
        AND laptop.penyimpanan_id = $4
        AND laptop.vga_id = $5
        AND laptop.display_id = $6
        AND bobot_alternatif.deleted_at IS NULL`
        const data = [kategori, processor, ram, penyimpanan, vga, display]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async getSpekOffice(kategori, processor, ram, penyimpanan, vga, display) {
        const statement = `SELECT
        bobot_alternatif.id,
        merk.merk,
        laptop.laptop,
        bobot_alternatif.processor,
        bobot_alternatif.ram,
        bobot_alternatif.penyimpanan,
        bobot_alternatif.vga,
        bobot_alternatif.display,
        bobot_alternatif.harga
        FROM bobot_alternatif
        INNER JOIN laptop
        ON bobot_alternatif.alternatif_id = laptop.id
        INNER JOIN merk
        ON laptop.merk_id = merk.id
        INNER JOIN kategori
        ON bobot_alternatif.kc = kategori.id
        WHERE kategori.kategori = $1
        AND laptop.processor_id = $2
        AND laptop.ram_id = $3
        AND laptop.penyimpanan_id = $4
        AND laptop.vga_id = $5
        AND laptop.display_id = $6
        AND bobot_alternatif.deleted_at IS NULL`
        const data = [kategori, processor, ram, penyimpanan, vga, display]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async insertAlternatif(
        alternatif_id,
        processor,
        ram,
        penyimpanan,
        vga,
        display,
        harga,
        ka,
        kb,
        kc
    ) {
        const statement = `INSERT INTO bobot_alternatif(
        alternatif_id,
        processor,
        ram,
        penyimpanan,
        vga,
        display,
        harga,
        ka,
        kb,
        kc
        ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`
        const data = [
            alternatif_id,
            processor,
            ram,
            penyimpanan,
            vga,
            display,
            harga,
            ka,
            kb,
            kc
        ]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async updateAlternatif(
        processor,
        ram,
        penyimpanan,
        vga,
        display,
        harga,
        ka,
        kb,
        kc,
        alternatif_id
    ) {
        const statement = `UPDATE bobot_alternatif SET
        processor =$1,
        ram =$2,
        penyimpanan =$3,
        vga =$4,
        display =$5,
        harga =$6,
        ka =$7,
        kb =$8,
        kc =$9
        WHERE alternatif_id =$10
        AND deleted_at IS NULL`
        const data = [
            processor,
            ram,
            penyimpanan,
            vga,
            display,
            harga,
            ka,
            kb,
            kc,
            alternatif_id
        ]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }

    async deleteAlternatif(alternatif_id) {
        const statement = `UPDATE bobot_alternatif SET deleted_at = NOW()
        WHERE alternatif_id =$1`
        const data = [alternatif_id]
        try {
            const result = await db.query(statement, data)
            if (result.err) throw result.err
            return wrapper.data(result.data)
        } catch (err) {
            return wrapper.error(err.message)
        }
    }
}

module.exports = AlternatifRepo