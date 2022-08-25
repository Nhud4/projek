const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const BatraiModel = require('../../../infastruktur/repositories/batrai_repo')

const batraiModel = new BatraiModel()

class BatraiDomain {
    async getList() {
        const getList = await batraiModel.getList()
        if (getList.err) {
            return new InternalServerError('fail to get data')
        }
        return getList
    }

    async getById(payload) {
        const { id } = payload
        const getById = await batraiModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        return getById
    }

    async insertBatrai(payload) {
        const { batrai } = payload
        const getByBatrai = await batraiModel.getByBatrai(batrai)
        if (getByBatrai.err) {
            return new InternalServerError('fail to get data')
        }
        if (getByBatrai.data.length > 0) {
            return new UnprocessableEntityError('unprosesseble entity', [{
                field: 'batrai',
                message: 'data already exists'
            }])
        }

        const insertBatrai = await batraiModel.insertBatrai(batrai)
        if (insertBatrai.err) {
            return new InternalServerError('fail to add data')
        }
        return insertBatrai
    }

    async updateBatrai(payload) {
        const { batrai, id } = payload
        const getById = await batraiModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not found')
        }

        const getByBatrai = await batraiModel.getByBatrai(batrai)
        if (getByBatrai.err) {
            return new InternalServerError('fail to get data')
        }
        if (getByBatrai.data.length > 0) {
            return new UnprocessableEntityError('unprosesseble entity', [{
                field: 'batrai',
                message: 'data already exists'
            }])
        }

        const updateBatrai = await batraiModel.updateBatrai(batrai, id)
        if (updateBatrai.err) {
            return new InternalServerError('fail to update data')
        }
        return updateBatrai
    }

    async deleteBatrai(payload) {
        const { id } = payload
        const getById = await batraiModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not found')
        }

        const deleteBatrai = await batraiModel.deleteBatrai(id)
        if (deleteBatrai.err) {
            return new InternalServerError('fail to delete data')
        }
        return deleteBatrai
    }
}

module.exports = BatraiDomain