const Wrapper = require('../../../helper/utils/wrapper')
const bobotDomain = require('../domain/bobot_domain')

const wrapper = new Wrapper()

const getList = async (req, res) => {
    const getList = await bobotDomain.getList()
    if (getList instanceof Error) return wrapper.responseError(res, getList)

    const data = getList.data.map(item => {
        return {
            id: item.id,
            bobot: item.bobot,
            processor: item.processor,
            ram: item.ram,
            penyimpanan: item.penyimpanan,
            vga: item.vga,
            display: item.display,
            harga: item.harga
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
    const getById = await bobotDomain.getByBobot(payload)
    if (getById instanceof Error) return wrapper.responseError(res, getById)

    const data = getById.data.map(item => {
        return {
            id: item.id,
            bobot: item.bobot,
            processor: item.processor,
            ram: item.ram,
            penyimpanan: item.penyimpanan,
            vga: item.vga,
            display: item.display,
            harga: item.harga
        }
    })

    return wrapper.response(res, 200, {
        message: 'berhasil mendapatkan data',
        code: 200,
        data,
        success: true
    })
}

const insertBobot = async (req, res) => {
    const payload = { ...req.body }
    const insertBobot = await bobotDomain.insertBobot(payload)
    if (insertBobot instanceof Error) return wrapper.responseError(res, insertBobot)

    return wrapper.response(res, 200, {
        message: 'berhasil mendapatkan data',
        code: 200,
        data: { ...payload },
        success: true
    })
}

const updateBobot = async (req, res) => {
    const payload = {
        ...req.params,
        ...req.body
    }

    const updateBobot = await bobotDomain.updateBobot(payload)
    if (updateBobot instanceof Error) return wrapper.responseError(res, updateBobot)

    const data = {
        id: payload.id,
        bobot: payload.bobot,
        processor: payload.processor,
        ram: payload.ram,
        penyimpanan: payload.penyimpanan,
        vga: payload.vga,
        display: payload.display,
        harga: payload.harga
    }
    return wrapper.response(res, 200, {
        message: 'berhasil mendapatkan data',
        code: 200,
        data,
        success: true
    })
}

const deleteBobot = async (req, res) => {
    const payload = { ...req.params }
    const deleteBobot = await bobotDomain.deleteBobot(payload)
    if (deleteBobot instanceof Error) return wrapper.responseError(res, deleteBobot)

    return wrapper.response(res, 200, {
        message: 'berhasil mendapatkan data',
        code: 200,
        data: { id: payload.id },
        success: true
    })
}

module.exports = {
    getList,
    getById,
    insertBobot,
    updateBobot,
    deleteBobot
}