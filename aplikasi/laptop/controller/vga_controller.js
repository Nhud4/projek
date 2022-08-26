const Wrapper = require('../../../helper/utils/wrapper')
const vgaDomain = require('../domain/vga_domain')

const wrapper = new Wrapper()

const getList = async (req, res) => {
    const getList = await vgaDomain.getList()
    if (getList instanceof Error) return wrapper.responseError(res, getList)

    const data = getList.data.map(item => {
        return {
            id: item.id,
            merek: item.merek_vga,
            kapasitas: item.kapasitas_vga
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
    const getById = await vgaDomain.getByKd(payload)
    if (getById instanceof Error) return wrapper.responseError(res, getById)

    const data = getById.data.map(item => {
        return {
            merek: item.merek_vga,
            kapasitas: item.kapasitas_vga
        }
    })
    return wrapper.response(res, 200, {
        message: 'berhasil mendapatkan data',
        code: 200,
        data,
        success: true
    })
}

const insertVga = async (req, res) => {
    const payload = { ...req.body }
    const insertVga = await vgaDomain.insertVga(payload)
    if (insertVga instanceof Error) return wrapper.responseError(res, insertVga)

    return wrapper.response(res, 200, {
        message: 'berhasil menambahka data',
        code: 201,
        data: { ...payload },
        success: true
    })
}

const deleteVga = async (req, res) => {
    const payload = { ...req.params }
    const deleteVga = await vgaDomain.deleteVga(payload)
    if (deleteVga instanceof Error) return wrapper.responseError(res, deleteVga)

    return wrapper.response(res, 200, {
        message: 'success to delete driver',
        code: 200,
        data: { id: payload.id },
        success: true
    })
}

const updateVga = async (req, res) => {
    const payload = {
        ...req.params,
        ...req.body
    }
    const updateVga = await vgaDomain.updateVga(payload)
    if (updateVga instanceof Error) return wrapper.responseError(res, updateVga)

    const data = {
        id: payload.id,
        merek_vga: payload.merek_vga,
        kapasitas_vga: payload.kapasitas_vga
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
    insertVga,
    deleteVga,
    updateVga
}