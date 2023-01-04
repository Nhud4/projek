const Wrapper = require('../../../helper/utils/wrapper')
const Ram = require('../domain/ram_domain')

const wrapper = new Wrapper()
const domain = new Ram()

class RamController {
    async getList(req, res) {
        const getList = await domain.getList()
        if (getList instanceof Error) return wrapper.responseError(res, getList)

        const data = getList.data.map(item => {
            return {
                id: item.id,
                ram: item.ram
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
                ram: item.ram
            }
        })
        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }

    async insertRam(req, res) {
        const paylaod = { ...req.body }
        const insertRam = await domain.insertRam(paylaod)
        if (insertRam instanceof Error) return wrapper.responseError(res, insertRam)

        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data: { ...paylaod },
            success: true
        })
    }

    async updateRam(req, res) {
        const paylaod = {
            ...req.params,
            ...req.body
        }
        const updateRam = await domain.updateRam(paylaod)
        if (updateRam instanceof Error) return wrapper.responseError(res, updateRam)

        const data = {
            id: paylaod.id,
            ram: paylaod.ram
        }

        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }

    async deleteRam(req, res) {
        const paylaod = { ...req.params }
        const deleteRam = await domain.deleteRam(paylaod)
        if (deleteRam instanceof Error) return wrapper.responseError(res, deleteRam)

        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data: { id: paylaod.id },
            success: true
        })
    }
}

module.exports = RamController