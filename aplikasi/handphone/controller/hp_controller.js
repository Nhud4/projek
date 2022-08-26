const Wrapper = require('../../../helper/utils/wrapper')
const HpDomain = require('../domain/hp_domain')

const wrapper = new Wrapper()
const domain = new HpDomain()

class HpController {
    async getList(req, res) {
        const getList = await domain.getList()
        if (getList instanceof Error) return wrapper.responseError(res, getList)

        const data = getList.data
        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }

    async getbyId(req, res) {
        const paylaod = { ...req.params }
        const getById = await domain.getById(paylaod)
        if (getById instanceof Error) return wrapper.responseError(res, getById)

        const data = getById.data
        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }

    async insertHp(req, res) {
        const paylaod = { ...req.body }
        const insertHp = await domain.insertHp(paylaod)
        if (insertHp instanceof Error) return wrapper.responseError(res, insertHp)

        return wrapper.response(res, 200, {
            message: 'berhasil menambahkan data',
            code: 200,
            data: { ...paylaod },
            success: true
        })
    }

    async updateHp(req, res) {
        const paylaod = {
            ...req.params,
            ...req.body
        }

        const updateHp = await domain.updateHp(paylaod)
        if (updateHp instanceof Error) return wrapper.responseError(res, updateHp)

        const data = {
            id: paylaod.id,
            brand_id: paylaod.brand_id,
            hp: paylaod.hp,
            chipset_id: paylaod.chipset_id,
            internal_id: paylaod.internal_id,
            ram_id: paylaod.ram_id,
            baterai_id: paylaod.baterai_id,
            kamera_id: paylaod.kamera_id,
            harga: paylaod.harga
        }

        return wrapper.response(res, 200, {
            message: 'berhasil merubah data',
            code: 200,
            data,
            success: true
        })
    }

    async deleteHp(req, res) {
        const paylaod = { ...req.params }
        const deleteHp = await domain.deleteHp(paylaod)
        if (deleteHp instanceof Error) return wrapper.responseError(res, deleteHp)

        return wrapper.response(res, 200, {
            message: 'berhasil menghapus data',
            code: 200,
            data: { id: paylaod.id },
            success: true
        })
    }
}

module.exports = HpController