const Wrapper = require('../../../helper/utils/wrapper')
const BatraiDomain = require('../domain/batrai_domain')

const wrapper = new Wrapper()
const batraiDomain = new BatraiDomain()

class BtraiController {
    async getList(req, res) {
        const getList = await batraiDomain.getList()
        if (getList instanceof Error) return wrapper.responseError(res, getList)

        const data = getList.data.map(item => {
            return {
                id: item.id,
                batrai: item.batrai
            }
        })

        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }

    async getById(req, res) {
        const paylaod = { ...req.params }
        const getById = await batraiDomain.getById(paylaod)
        if (getById instanceof Error) return wrapper.responseError(res, getById)

        const data = getById.data.map(item => {
            return {
                batrai: item.batrai
            }
        })

        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }

    async insertBatrai(req, res) {
        const paylaod = { ...req.body }
        const insertBatrai = await batraiDomain.insertBatrai(paylaod)
        if (insertBatrai instanceof Error) return wrapper.responseError(res, insertBatrai)

        return wrapper.response(res, 200, {
            message: 'berhasil menambahkan data',
            code: 200,
            data: { ...paylaod },
            success: true
        })
    }

    async updateBtrai(req, res) {
        const paylaod = {
            ...req.params,
            ...req.body
        }
        const updateBatrai = await batraiDomain.updateBatrai(paylaod)
        if (updateBatrai instanceof Error) return wrapper.responseError(res, updateBatrai)

        const data = {
            id: paylaod.id,
            batrai: paylaod.batrai
        }

        return wrapper.response(res, 200, {
            message: 'berhasil merubah data',
            code: 200,
            data,
            success: true
        })
    }

    async deleteBatrai(req, res) {
        const paylaod = { ...req.params }
        const deleteBatrai = await batraiDomain.deleteBatrai(paylaod)
        if (deleteBatrai instanceof Error) return wrapper.responseError(res, deleteBatrai)

        return wrapper.response(res, 200, {
            message: 'berhasil menghapus data',
            code: 200,
            data: { id: paylaod.id },
            success: true
        })
    }
}

module.exports = BtraiController