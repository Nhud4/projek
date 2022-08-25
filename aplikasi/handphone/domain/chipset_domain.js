const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const ChipsetModel = require('../../../infastruktur/repositories/chipset_repo')

const chipsetModel = new ChipsetModel()

class ChipsetDomain {
    async getList() {
        const getList = await chipsetModel.getList()
        if (getList.err) {
            return new InternalServerError('fail to get data')
        }
        return getList
    }

    async getById(payload) {
        const { id } = payload
        const getById = await chipsetModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not found')
        }
        return getById
    }

    async insertChipset(payload) {
        const { chipset } = payload
        const getByChipset = await chipsetModel.getByChipset(chipset)
        if (getByChipset.err) {
            return new InternalServerError('fail to get data')
        }
        if (getByChipset.data.length > 0) {
            return new UnprocessableEntityError('unprosesseble entity', [{
                field: 'chipset',
                message: 'data already exists'
            }])
        }

        const insertChipset = await chipsetModel.insertChipset(chipset)
        if (insertChipset.err) {
            return new InternalServerError('fail to add data')
        }
        return insertChipset
    }

    async updateChipset(payload) {
        const { chipset, id } = payload
        const getById = await chipsetModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not found')
        }

        const getByChipset = await chipsetModel.getByChipset(chipset)
        if (getByChipset.err) {
            return new InternalServerError('fail to get data')
        }
        if (getByChipset.data.length > 0) {
            return new UnprocessableEntityError('unprosesseble entity', [{
                field: 'chipset',
                message: 'data already exists'
            }])
        }

        const updateChipset = await chipsetModel.updateChipset(chipset, id)
        if (updateChipset.err) {
            return new InternalServerError('fail to update data')
        }
        return updateChipset
    }

    async deleteChipset(payload) {
        const { id } = payload
        const getById = await chipsetModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not found')
        }

        const deleteChipset = await chipsetModel.deleteChipset(id)
        if (deleteChipset.err) {
            return new InternalServerError('fail to delete data')
        }
        return deleteChipset
    }
}

module.exports = ChipsetDomain