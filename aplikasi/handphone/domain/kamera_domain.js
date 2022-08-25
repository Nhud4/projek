const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const KameraModel = require('../../../infastruktur/repositories/kamera_repo')

const kameraModel = new KameraModel()

class KameraDomain {
    async getList() {
        const getList = await kameraModel.getList()
        if (getList.err) {
            return new InternalServerError('fail to get data')
        }
    }

    async getById(paylaod) {
        const { id } = paylaod
        const getById = await kameraModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        return getById
    }

    async insertKamera(paylaod) {
        const { type, kualitas } = paylaod
        const getByKamera = await kameraModel.getByKamera(type, kualitas)
        if (getByKamera.err) {
            return new IntersectionObserver('fail to get data')
        }
        if (getByKamera.data.length > 0) {
            return new UnprocessableEntityError('unprosesseble entity', [{
                filed: 'type and kamera',
                message: 'data already exists'
            }])
        }

        const insertKamera = await kameraModel.insertKamera(type, kualitas)
        if (insertKamera.err) {
            return new InternalServerError('fail to add data')
        }
        return insertKamera
    }

    async updateKamera(paylaod) {
        const { type, kualitas, id } = paylaod
        const getById = await kameraModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data no found')
        }

        const getByKamera = await kameraModel.getByKamera(type, kualitas)
        if (getByKamera.err) {
            return new IntersectionObserver('fail to get data')
        }
        if (getByKamera.data.length > 0) {
            return new UnprocessableEntityError('unprosesseble entity', [{
                filed: 'type and kamera',
                message: 'data already exists'
            }])
        }

        const updateKamera = await kameraModel.updateKamera(type, kualitas, id)
        if (updateKamera.err) {
            return new InternalServerError('fail to update data')
        }
        return updateKamera
    }

    async deleteKamera(paylaod) {
        const { id } = paylaod
        const getById = await kameraModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data no found')
        }

        const deleteKamera = await kameraModel.deleteKamera(id)
        if (deleteKamera.err) {
            return new InternalServerError('fail to delete data')
        }
        return deleteKamera
    }
}

module.exports = KameraDomain