const Wrapper = require('../helper/utils/wrapper')
const ramDomain = require('../domain/ram_domain')

const wrapper = new Wrapper()

const getList = async (req, res) => {
    const getList = await ramDomain.getList()
    if (getList instanceof Error) return wrapper.responseError(res, getList)

    const data = getList.data.map(item => {
        return {
            id: item.id,
            type: item.type_ram,
            kapasitas: item.kapasitas_ram
        }
    })
    return wrapper.response(res, 200, {
        message: 'berhasil mendapatkan data',
        code: 200,
        data,
        success: true
    })
}

const getById = async (req, res) => {
    const payload = { ...req.params }
    const getById = await ramDomain.getByKd(payload)
    if (getById instanceof Error) return wrapper.responseError(res, getById)

    const data = getById.data.map(item => {
        return {
            type: item.type_ram,
            kapasitas: item.kapasitas_ram
        }
    })
    return wrapper.response(res, 200, {
        message: 'berhasil mendapatkan data',
        code: 200,
        data,
        success: true
    })
}

const insertRam = async (req, res) => {
    const payload = { ...req.body }
    const insertRam = await ramDomain.insertRam(payload)
    if (insertRam instanceof Error) return wrapper.responseError(res, insertRam)

    return wrapper.response(res, 200, {
        message: 'berhasil menambahka data',
        code: 201,
        data: { ...payload },
        success: true
    })
}

const deleteRam = async (req, res) => {
    const payload = { ...req.params }
    const deleteRam = await ramDomain.deleteRam(payload)
    if (deleteRam instanceof Error) return wrapper.responseError(res, deleteRam)

    return wrapper.response(res, 200, {
        message: 'success to delete driver',
        code: 200,
        data: { id: payload.id },
        success: true
    })
}

const updateRam = async (req, res) => {
    const payload = {
        ...req.params,
        ...req.body
    }
    const updateRam = await ramDomain.updateRam(payload)
    if (updateRam instanceof Error) return wrapper.responseError(res, updateRam)

    const data = {
        id: payload.id,
        type_ram: payload.type_ram,
        kapasitas_ram: payload.kapasitas_ram
    }

    return wrapper.response(res, 200, {
        message: 'success to update driver',
        code: 200,
        data,
        success: true
    })
}

module.exports = {
    getList,
    getById,
    insertRam,
    deleteRam,
    updateRam
}