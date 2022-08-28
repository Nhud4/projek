const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const RamModel = require('../../../infastruktur/repositories/ram_hp_repo')

const ramModel = new RamModel()

class RamDomain {
    async getList() {
        const getList = await ramModel.getList()
        if (getList.err) {
            return new InternalServerError('fail to get data')
        }
        return getList
    }

    async getById(payload) {
        const { id } = payload
        const getById = await ramModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not found')
        }
        return getById
    }

    async insertRam(paylaod) {
        const { ram } = paylaod
        const getByRam = await ramModel.getByRam(ram)
        if (getByRam.err) {
            return new InternalServerError('fail to get data')
        }
        if (getByRam.data.length > 0) {
            return new UnprocessableEntityError('unprosesseble entity', [{
                field: 'ram',
                message: 'data already exists'
            }])
        }

        const insertRam = await ramModel.insertRam(ram)
        if (insertRam.err) {
            return new InternalServerError('fail to add data')
        }
        return insertRam
    }

    async updateRam(paylaod) {
        const { ram, id } = paylaod
        const getById = await ramModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not found')
        }

        const getByRam = await ramModel.getByRam(ram)
        if (getByRam.err) {
            return new InternalServerError('fail to get data')
        }
        if (getByRam.data.length > 0) {
            return new UnprocessableEntityError('unprosesseble entity', [{
                field: 'ram',
                message: 'data already exists'
            }])
        }

        const updateRam = await ramModel.updateRam(ram, id)
        if (updateRam.err) {
            return new InternalServerError('fail to update ram')
        }
        return updateRam
    }

    async deleteRam(paylaod) {
        const { id } = paylaod

        const getById = await ramModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not found')
        }

        const deleteRam = await ramModel.deleteRam(id)
        if (deleteRam.err) {
            return new InternalServerError('fail to delete data')
        }
        return deleteRam
    }
}

module.exports = RamDomain