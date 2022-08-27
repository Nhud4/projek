const Wrapper = require('../../../helper/utils/wrapper')
const merkDomain = require('../domain/merk_domain')

const wrapper = new Wrapper()

const getList = async (req, res) => {
    const getList = await merkDomain.getList()
    if (getList instanceof Error) return wrapper.responseError(res, getList)
    const data = getList.data.map(item => {
        return {
            id: item.id,
            merk: item.merk
        }
    })
    return wrapper.response(res, 200, {
        message: 'berhasil mendapatkan data',
        code: 200,
        data,
        success: true
    })
}

const getByKd = async (req, res) => {
    const payload = { ...req.params }
    const getByKd = await merkDomain.getBykd(payload)
    if (getByKd instanceof Error) return wrapper.responseError(res, getByKd)

    const data = getByKd.data.map(item => {
        return {
            id: item.kd_merk,
            merk: item.merk
        }
    })
    return wrapper.response(res, 200, {
        message: 'berhasil mendapatkan data',
        code: 200,
        data,
        success: true
    })
}

const insertMerk = async (req, res) => {
    const payload = { ...req.body }
    const insertMerk = await merkDomain.insertMerk(payload)
    if (insertMerk instanceof Error) return wrapper.responseError(res, insertMerk)

    return wrapper.response(res, 200, {
        message: 'berhasil menambahka data',
        code: 201,
        data: { ...payload },
        success: true
    })
}

const deleteMerk = async (req, res) => {
    const payload = { ...req.params }
    const deleteMerk = await merkDomain.deleteMerk(payload)
    if (deleteMerk instanceof Error) return wrapper.responseError(res, deleteMerk)

    return wrapper.response(res, 200, {
        message: 'success to delete data',
        code: 200,
        data: { id: payload.id },
        success: true
    })
}

const updateMerk = async (req, res) => {
    const payload = {
        ...req.params,
        ...req.body
    }
    const updateMerk = await merkDomain.updateMerk(payload)
    if (updateMerk instanceof Error) return wrapper.responseError(res, updateMerk)
    const data = {
        id: payload.id,
        merk: payload.merk
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
    getByKd,
    insertMerk,
    deleteMerk,
    updateMerk
}