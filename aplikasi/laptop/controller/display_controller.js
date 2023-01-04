const Wrapper = require('../../../helper/utils/wrapper')
const displayDomain = require('../domain/display_domain')

const wrapper = new Wrapper()

const getList = async (req, res) => {
    const getList = await displayDomain.getList()
    if (getList instanceof Error) return wrapper.responseError(res, getList)

    const data = getList.data.map(item => {
        return {
            id: item.id,
            type: item.type_display,
            ukuran: item.ukuran_display
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
    const getById = await displayDomain.getByKd(payload)
    if (getById instanceof Error) return wrapper.responseError(res, getById)

    const data = getById.data.map(item => {
        return {
            type: item.type_display,
            ukuran: item.ukuran_display
        }
    })
    return wrapper.response(res, 200, {
        message: 'berhasil mendapatkan data',
        code: 200,
        data,
        success: true
    })
}

const InsertDisplay = async (req, res) => {
    const payload = { ...req.body }
    const InsertDisplay = await displayDomain.InsertDisplay(payload)
    if (InsertDisplay instanceof Error) return wrapper.responseError(res, InsertDisplay)

    return wrapper.response(res, 200, {
        message: 'berhasil menambahka data',
        code: 201,
        data: { ...payload },
        success: true
    })
}

const deleteDisplay = async (req, res) => {
    const payload = { ...req.params }
    const deleteDisplay = await displayDomain.deleteDisplay(payload)
    if (deleteDisplay instanceof Error) return wrapper.responseError(res, deleteDisplay)

    return wrapper.response(res, 200, {
        message: 'success to delete data',
        code: 200,
        data: { id: payload.id },
        success: true
    })
}

const updateDisplay = async (req, res) => {
    const payload = {
        ...req.params,
        ...req.body
    }
    const updateDisplay = await displayDomain.updateDisplay(payload)
    if (updateDisplay instanceof Error) return wrapper.responseError(res, updateDisplay)

    const data = {
        id: payload.id,
        type_display: payload.type_display,
        ukuran_display: payload.ukuran_display
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
    InsertDisplay,
    deleteDisplay,
    updateDisplay
}