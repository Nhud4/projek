const Wrapper = require('../../../helper/utils/wrapper')
const KameraDomain = require('../domain/kamera_domain')

const wrapper = new Wrapper()
const domain = new KameraDomain()

class KameraRepo {
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

    async getById(req, res) {
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

    async insertKamera(req, res) {
        const paylaod = { ...req.body }
        const insertKamera = await domain.insertKamera(paylaod)
        if (insertKamera instanceof Error) return wrapper.responseError(res, insertInternal)

        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data: { ...paylaod },
            success: true
        })
    }

    async updateKamera(req, res) {
        const paylaod = {
            ...req.params,
            ...req.body
        }
        const updateKamera = await domain.updateKamera(paylaod)
        if (updateKamera instanceof Error) return wrapper.responseError(res, updateInternal)

        const data = {
            id: paylaod.id,
            type: paylaod.type,
            kualitas: paylaod.kualitas
        }
        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }

    async deleteKamera(req, res) {
        const paylaod = { ...req.params }
        const deleteKamera = await domain.deleteKamera(paylaod)
        if (deleteKamera instanceof Error) return wrapper.responseError(req, deleteInternal)

        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data: { id: paylaod.id },
            success: true
        })
    }
}

module.exports = KameraRepo