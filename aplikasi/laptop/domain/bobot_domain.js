const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const bobotRepo = require('../../../infastruktur/repositories/bobot_repo')

const getList = async () => {
    const getList = await bobotRepo.getListBobot()
    if (getList.err) {
        return new InternalServerError('gagal mendapatkan data bobot')
    }
    return getList
}

const getByBobot = async (payload) => {
    const { id } = payload
    const getByBobot = await bobotRepo.getById(id)
    if (getByBobot.err) {
        return new InternalServerError('gagal mendapatkan data bobot')
    }
    if (getByBobot.data.length === 0) {
        return new NotFoundError('data tidak di temukan')
    }
    return getByBobot
}

const insertBobot = async (payload) => {
    const { bobot, processor, ram, penyimpanan, vga, display, harga } = payload
    const getByBobot = await bobotRepo.getByBobot(bobot)
    if (getByBobot.err) {
        return new InternalServerError('gagal mendapatkan data bobot')
    }
    if (getByBobot.data.length > 0) {
        return new UnprocessableEntityError('tidak dapat memproses', [{
            field: 'bobot',
            message: 'data telah ada'
        }])
    }

    const insertBobot = await bobotRepo.InsertBobot(bobot, processor, ram, penyimpanan, vga, display, harga)
    if (insertBobot.err) {
        return new InternalServerError('gagal menambahkan data')
    }
    return insertBobot
}

const deleteBobot = async (payload) => {
    const { id } = payload
    const getById = await bobotRepo.getByBobot(id)
    if (getById.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getById.data.length === 0) {
        return new NotFoundError()
    }

    const deleteBobot = await bobotRepo.deleteBobot(id)
    if (deleteBobot.err) {
        return new InternalServerError('gagal menghapus data')
    }
    return deleteBobot
}

const updateBobot = async (payload) => {
    const { bobot, processor, ram, penyimpanan, vga, display, harga, id } = payload
    const getById = await bobotRepo.getById(id)
    if (getById.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getById.data.length === 0) {
        return new NotFoundError('data tidak ditemukan')
    }

    const getByBobot = await bobotRepo.getByBobot(bobot)
    if (getByBobot.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getByBobot.data.length > 0) {
        return new UnprocessableEntityError('tidak dapat memproses', [{
            field: 'bobot',
            message: 'data telah ada'
        }])
    }

    const updateBobot = await bobotRepo.updateBobot(
        bobot, processor, ram, penyimpanan, vga, display, harga, id)
    if (updateBobot.err) {
        return new InternalServerError('gagal merubah data')
    }
    return updateBobot
}

module.exports = {
    getList,
    getByBobot,
    insertBobot,
    deleteBobot,
    updateBobot
}