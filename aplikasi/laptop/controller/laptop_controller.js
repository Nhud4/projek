const Wrapper = require('../../../helper/utils/wrapper')
const laptopDomain = require('../domain/laptop_domain')

const wrapper = new Wrapper()

class LaptopController {
    async getList(req, res) {
        const getList = await laptopDomain.getList()
        if (getList instanceof Error) return wrapper.responseError(res, getList)

        const data = getList.data
        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }

    async getById(req, res) {
        const paylaod = { ...req.params }
        const getById = await laptopDomain.getByKd(paylaod)
        if (getById instanceof Error) return wrapper.responseError(res, getById)

        const data = getById.data

        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }

    async insertLaptop(req, res) {
        const paylaod = { ...req.body }
        const insertLaptop = await laptopDomain.insertLaptop(paylaod)
        if (insertLaptop instanceof Error) return wrapper.responseError(res, insertLaptop)

        return wrapper.response(res, 200, {
            message: 'berhasil menambahkan data',
            code: 200,
            data: { ...paylaod },
            success: true
        })
    }

    async updatelaptop(req, res) {
        const paylaod = {
            ...req.params,
            ...req.body
        }

        const updateLaptop = await laptopDomain.updateLaptop(paylaod)
        if (updateLaptop instanceof Error) return wrapper.responseError(res, updateLaptop)

        const data = {
            id: paylaod.id,
            merek_id: paylaod.merek_id,
            laptop: paylaod.laptop,
            processor_id: paylaod.processor_id,
            ram_id: paylaod.ram_id,
            penyimpanan_id: paylaod.penyimpanan_id,
            vga_id: paylaod.vga_id,
            display_id: paylaod.display_id,
            harga: paylaod.harga
        }

        return wrapper.response(res, 200, {
            message: 'berhasil merubah data',
            code: 200,
            data,
            success: true
        })
    }

    async deleteLaptop(req, res) {
        const paylaod = { ...req.params }
        const deleteLaptop = await laptopDomain.deleteLaptop(paylaod)
        if (deleteLaptop instanceof Error) return wrapper.responseError(res, deleteLaptop)

        return wrapper.response(res, 200, {
            message: 'berhasil menghapus data',
            code: 200,
            data: { id: paylaod.id },
            success: true
        })
    }
}

module.exports = LaptopController