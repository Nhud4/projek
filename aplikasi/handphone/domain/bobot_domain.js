const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const BobotModel = require('../../../infastruktur/repositories/bobot_hp_repo')

const bobot = new BobotModel()

class BobotDomain {
    async getList() {
        const getData = await bobot.getList()
        if (getData.err) {
            return new InternalServerError('fail to get data')
        }
        return getData
    }

    async insertBobot(payload) {
        const { ram, internal, batrai, kamera, harga } = payload
        const insertBobot = await bobot.insertBobot(ram, internal, batrai, kamera, harga)
        if (insertBobot.err) {
            return new InternalServerError('fail to add data')
        }
        return insertBobot
    }

    async updateBobot(payload) {
        const { ram, internal, batrai, kamera, harga, id } = payload
        const getById = await bobot.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not found')
        }

        const updateBobot = await bobot.updateBobot(ram, internal, batrai, kamera, harga, id)
        if (updateBobot.err) {
            return new InternalServerError('fail to update data')
        }
        return updateBobot
    }

    async deleteBobot(payload) {
        const { id } = payload
        const getById = await bobot.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not found')
        }

        const deleteBobot = await bobot.deleteBobot(id)
        if (deleteBobot.err) {
            return new InternalServerError('fail to delete data')
        }
        return deleteBobot
    }
}

module.exports = BobotDomain