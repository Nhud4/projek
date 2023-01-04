const Wrapper = require('../../../helper/utils/wrapper')
const BobotDomain = require('../domain/bobot_domain')

const wrapper = new Wrapper()
const domain = new BobotDomain()

class BobotHpController {
    async getList(req, res) {
        const getList = await domain.getList()
        if (getList instanceof Error) return wrapper.responseError(res, getList)

        const data = getList.data.map(item => {
            return {
                id: item.id,
                ram: item.ram,
                internal: item.internal,
                batrai: item.batrai,
                kamera: item.kamera,
                harga: item.harga

            }
        })
        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }

    async insertBobot(req, res) {
        const paylaod = { ...req.body }
        const insertBobot = await domain.insertBobot(paylaod)
        if (insertBobot instanceof Error) return wrapper.responseError(res, insertBobot)

        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data: { ...paylaod },
            success: true
        })
    }

    async updateBobot(req, res) {
        const paylaod = {
            ...req.params,
            ...req.body
        }
        const updateBobot = await domain.updateBobot(paylaod)
        if (updateBobot instanceof Error) return wrapper.responseError(res, updateBobot)

        const data = {
            id: paylaod.id,
            ram: paylaod.ram,
            internal: paylaod.internal,
            batrai: paylaod.batrai,
            kamera: paylaod.kamera,
            harga: paylaod.harga
        }
        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }

    async deleteBobot(req, res) {
        const paylaod = { ...req.params }
        const deleteBobot = await domain.deleteBobot(paylaod)
        if (deleteBobot instanceof Error) return wrapper.responseError(res, deleteBobot)

        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data: { id: paylaod.id },
            success: true
        })
    }
}

module.exports = BobotHpController