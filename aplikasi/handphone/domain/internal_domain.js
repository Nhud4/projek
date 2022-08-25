const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const InternalModel = require('../../../infastruktur/repositories/internal_repo')

const internalModel = new InternalModel()

class InternalDomain {
    async getList() {
        const getList = await internalModel.getList()
        if (getList.err) {
            return InternalServerError('fail to get data')
        }
        return getList
    }

    async getById(payload) {
        const { id } = payload
        const getById = await internalModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        return getById
    }

    async insertInternal(payload) {
        const { internal } = payload
        const getByInternal = await internalModel.getByInternal(internal)
        if (getByInternal.err) {
            return new InternalServerError('fail to get data')
        }

        if (getByInternal.data.length > 0) {
            return new UnprocessableEntityError('unprosesseble entry', [{
                filed: 'internal',
                message: 'data already exists'
            }])
        }

        const insertInternal = await internalModel.insertInternal(internal)
        if (insertInternal.err) {
            return new InternalServerError('fail to add data')
        }
        return insertInternal
    }

    async updateInternal(payload) {
        const { internal, id } = payload
        const getById = await internalModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not foun')
        }

        const getByInternal = await internalModel.getByInternal(internal)
        if (getByInternal.err) {
            return new InternalServerError('fail to get data')
        }

        if (getByInternal.data.length > 0) {
            return new UnprocessableEntityError('unprosessedle entity', [{
                filed: 'internal',
                message: 'data already exists'
            }])
        }

        const updateInternal = await internalModel.updateInternal(internal, id)
        if (updateInternal.err) {
            return new InternalServerError('fail to update data')
        }
        return updateInternal
    }

    async deleteInternal(payload) {
        const { id } = payload
        const getById = await internalModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail tp get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not found')
        }

        const deleteInternal = await internalModel.deleteInternal(id)
        if (deleteInternal.err) {
            return new InternalServerError('fail to delete data')
        }
        return deleteInternal
    }
}

module.exports = InternalDomain