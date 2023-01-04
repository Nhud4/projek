const Wrapper = require('../../../helper/utils/wrapper')
const penyimpananDomain = require('../domain/penyimpanan_domain')

const wrapper = new Wrapper()

const getList = async (req, res) => {
    const getList = await penyimpananDomain.getList()
    if (getList instanceof Error) return wrapper.responseError(res, getList)

    const data = getList.data.map(item => {
        return {
            id: item.id,
            type: item.type_penyimpanan,
            kapasitas: item.kapasitas_penyimpanan
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
    const getById = await penyimpananDomain.getByKd(payload)
    if (getById instanceof Error) return wrapper.responseError(res, getById)

    const data = getById.data.map(item => {
        return {
            type: item.type_penyimpanan,
            kapasitas: item.kapasitas_penyimpanan
        }
    })
    return wrapper.response(res, 200, {
        message: 'berhasil mendapatkan data',
        code: 200,
        data,
        success: true
    })
}

const insertPenyimpanan = async (req, res) => {
    const payload = { ...req.body }
    const insertPenyimpanan = await penyimpananDomain.insertPenyimpanan(payload)
    if (insertPenyimpanan instanceof Error) return wrapper.responseError(res, insertPenyimpanan)

    return wrapper.response(res, 200, {
        message: 'berhasil menambahka data',
        code: 201,
        data: { ...payload },
        success: true
    })
}

const deletePenyimpanan = async (req, res) => {
    const payload = { ...req.params }
    const deletePenyimpanan = await penyimpananDomain.deletePenyimpanan(payload)
    if (deletePenyimpanan instanceof Error) return wrapper.responseError(res, deletePenyimpanan)

    return wrapper.response(res, 200, {
        message: 'success to delete data',
        code: 200,
        data: { id: payload.id },
        success: true
    })
}

const updatePenyimpanan = async (req, res) => {
    const payload = {
        ...req.params,
        ...req.body
    }
    const updatePenyimpanan = await penyimpananDomain.updatePenyimpanan(payload)
    if (updatePenyimpanan instanceof Error) return wrapper.responseError(res, updatePenyimpanan)

    const data = {
        id: payload.id,
        type_penyimpanan: payload.type_penyimpanan,
        kapasitas_penyimpanan: payload.kapasitas_penyimpanan
    }

    return wrapper.response(res, 200, {
        message: 'success to update data',
        code: 200,
        data,
        success: true
    })
}

module.exports = {
    getList,
    getById,
    insertPenyimpanan,
    deletePenyimpanan,
    updatePenyimpanan
}