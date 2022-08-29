const Wrapper = require('../../../helper/utils/wrapper')
const ChipsetDomain = require('../domain/chipset_domain')

const wrapper = new Wrapper()
const domain = new ChipsetDomain()

class ChipsetController {
    async getList(req, res) {
        const getList = await domain.getList()
        if (getList instanceof Error) return wrapper.responseError(res, getList)

        const data = getList.data.map(item => {
            return {
                id: item.id,
                chipset: item.chipset,
                versi: item.versi
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
        const payload = { ...req.params }
        const getById = await domain.getById(payload)
        if (getById instanceof Error) return wrapper.responseError(res, getById)

        const data = getById.data.map(item => {
            return {
                chipset: item.chipset,
                versi: item.versi
            }
        })
        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }

    async insertChipset(req, res) {
        const paylaod = { ...req.body }
        const insertChipset = await domain.insertChipset(paylaod)
        if (insertChipset instanceof Error) return wrapper.responseError(res, insertChipset)

        return wrapper.response(res, 200, {
            message: 'berhasil menambahkan data',
            code: 200,
            data: { ...paylaod },
            success: true
        })
    }

    async updateChipset(req, res) {
        const paylaod = {
            ...req.params,
            ...req.body
        }
        const updateChipset = await domain.updateChipset(paylaod)
        if (updateChipset instanceof Error) return wrapper.responseError(res, updateChipset)

        const data = {
            id: paylaod.id,
            chipset: paylaod.chipset,
            versi: paylaod.versi
        }

        return wrapper.response(res, 200, {
            message: 'berhasil merubah data',
            code: 200,
            data,
            success: true
        })
    }

    async deleteChipset(req, res) {
        const paylaod = { ...req.params }
        const deleteChipset = await domain.deleteChipset(paylaod)
        if (deleteChipset instanceof Error) return wrapper.responseError(res, deleteChipset)

        return wrapper.response(res, 200, {
            message: 'berhasil menghapus data',
            code: 200,
            data: { id: paylaod.id },
            success: true
        })
    }
}

module.exports = ChipsetController