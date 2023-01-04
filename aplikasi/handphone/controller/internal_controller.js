const Wrapper = require('../../../helper/utils/wrapper')
const InternalDomain = require('../domain/internal_domain')

const wrapper = new Wrapper()
const domain = new InternalDomain()

class InternalControleer {
    async getList(req, res) {
        const getList = await domain.getList()
        if (getList instanceof Error) return wrapper.responseError(res, getList)

        const data = getList.data.map(item => {
            return {
                id: item.id,
                internal: item.internal
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
                internal: item.internal
            }
        })
        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }

    async insertInternal(req, res) {
        const paylaod = { ...req.body }
        const insertInternal = await domain.insertInternal(paylaod)
        if (insertInternal instanceof Error) return wrapper.responseError(res, insertInternal)

        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data: { ...paylaod },
            success: true
        })
    }

    async updateInternal(req, res) {
        const paylaod = {
            ...req.params,
            ...req.body
        }
        const updateInternal = await domain.updateInternal(paylaod)
        if (updateInternal instanceof Error) return wrapper.responseError(res, updateInternal)

        const data = {
            id: paylaod.id,
            internal: paylaod.internal
        }
        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }

    async deleteInternal(req, res) {
        const paylaod = { ...req.params }
        const deleteInternal = await domain.deleteInternal(paylaod)
        if (deleteInternal instanceof Error) return wrapper.responseError(req, deleteInternal)

        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data: { id: paylaod.id },
            success: true
        })
    }
}

module.exports = InternalControleer