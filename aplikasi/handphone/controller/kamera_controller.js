const Wrapper = require('../../../helper/utils/wrapper')
const KameraDomain = require('../domain/kamera_domain')

const wrapper = new Wrapper()
const domain = new KameraDomain()

class KameraRepo {
    async getList(req, res) {
        const getList = await domain.getList()
        if (getList instanceof Error) return wrapper.responseError(res, getList)

        const data = getList.data.map(item => {
            return {
                id: item.id,
                type: item.type,
                kamera_depan: item.kamera_depan,
                kamera_belakang: item.kamera_belakang
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
        const getById = await domain.getById(paylaod)
        if (getById instanceof Error) return wrapper.responseError(res, getById)

        const data = getById.data.map(item => {
            return {
                id: item.id,
                type: item.type,
                kamera_depan: item.kamera_depan,
                kamera_belakang: item.kamera_belakang
            }
        })
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
        if (insertKamera instanceof Error) return wrapper.responseError(res, insertKamera)

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
            kamera_depan: paylaod.kamera_depan,
            kamera_belakang: paylaod.kamera_belakang
        }
        return wrapper.response(res, 200, {
            message: 'berhasil merubah data',
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
            message: 'berhasil menghapus data',
            code: 200,
            data: { id: paylaod.id },
            success: true
        })
    }
}

module.exports = KameraRepo