const Wrapper = require('../helper/utils/wrapper')
const processorDomain = require('../domain/processor_domain')

const wrapper = new Wrapper()

const getList = async (req, res) => {
    const getList = await processorDomain.getList()
    if (getList instanceof Error) return wrapper.responseError(res, getList)
    const data = getList.data.map(item => {
        return {
            id: item.id,
            processor: item.processor,
            seri: item.seri_processor,
            kecepatan: item.kecepatan_processor
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
    const getByKd = await processorDomain.getByKd(payload)
    if (getByKd instanceof Error) return wrapper.responseError(res, getByKd)

    const data = getByKd.data.map(item => {
        return {
            processor: item.processor,
            seri: item.seri_processor,
            kecepatan: item.kecepatan_processor
        }
    })
    return wrapper.response(res, 200, {
        message: 'berhasil mendapatkan data',
        code: 200,
        data,
        success: true
    })
}

const insertProcessor = async (req, res) => {
    const payload = { ...req.body }
    const insertProcessor = await processorDomain.insertProcessor(payload)
    if (insertProcessor instanceof Error) return wrapper.responseError(res, insertProcessor)

    return wrapper.response(res, 200, {
        message: 'berhasil menambahka data',
        code: 201,
        data: { ...payload },
        success: true
    })
}

const deleteProcessor = async (req, res) => {
    const payload = { ...req.params }
    const deleteProcessor = await processorDomain.deleteProcessor(payload)
    if (deleteProcessor instanceof Error) return wrapper.responseError(res, deleteProcessor)

    return wrapper.response(res, 200, {
        message: 'success to delete driver',
        code: 200,
        data: { id: payload.id },
        success: true
    })
}

const updateProcessor = async (req, res) => {
    const payload = {
        ...req.params,
        ...req.body
    }
    const updateProcessor = await processorDomain.updateProcessor(payload)
    if (updateProcessor instanceof Error) return wrapper.responseError(res, updateProcessor)

    const data = {
        id: payload.id,
        processor: payload.processor,
        seri_processor: payload.seri_processor,
        kecepatan_processor: payload.kecepatan_processor
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
    insertProcessor,
    deleteProcessor,
    updateProcessor
}