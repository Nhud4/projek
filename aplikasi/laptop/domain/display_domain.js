const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const displayRepo = require('../../../infastruktur/repositories/display_repo')

const getList = async () => {
    const getList = await displayRepo.getListDisplay()
    if (getList.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    return getList
}

const getByKd = async (payload) => {
    const { id } = payload
    const getByKd = await displayRepo.getByKd(id)
    if (getByKd.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getByKd.data.length === 0) {
        return new NotFoundError('data tidak ditemukan')
    }
    return getByKd
}

const InsertDisplay = async (payload) => {
    const { type_display, ukuran_display } = payload

    const getByType = await displayRepo.getByType(type_display)
    const getByKapasitas = await displayRepo.getByUkuran(ukuran_display)

    if (getByType.err && getByKapasitas.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getByType.data.length > 0 && getByKapasitas.data.length > 0) {
        return new UnprocessableEntityError('tidak dapat memproses', [{
            filed: 'type dan kapasitas',
            message: 'data telah ada'
        }])
    }

    const InsertDisplay = await displayRepo.InsertDisplay(type_display, ukuran_display)
    if (InsertDisplay.err) {
        return new InternalServerError('gagal menambahkan data')
    }
    return InsertDisplay
}

const deleteDisplay = async (payload) => {
    const { id } = payload
    const getBykd = await displayRepo.getByKd(id)
    if (getBykd.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getBykd.data.length === 0) {
        return new NotFoundError('data tidak ditemukan')
    }
    const deleteDisplay = await displayRepo.deleteDisplay(id)
    if (deleteDisplay.err) {
        return new InternalServerError('gagal menghapus ram')
    }
    return deleteDisplay
}

const updateDisplay = async (payload) => {
    const { type_display, ukuran_display, id } = payload

    const getByKd = await displayRepo.getByKd(id)
    const getByKapasitas = await displayRepo.getByUkuran(ukuran_display)
    const getByType = await displayRepo.getByType(type_display)

    if (getByKd.err || getByType.err || getByKapasitas.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getByKd.data.length === 0) {
        return new NotFoundError('data tidak ditemukan')
    }
    if (getByType.data.length > 0 && getByKapasitas.data.length > 0) {
        return new UnprocessableEntityError('tidak dapay memproses', [{
            filed: 'type dan kapasitas',
            message: 'data telah ada'
        }])
    }

    const updateDisplay = await displayRepo.updateDisplay(type_display, ukuran_display, id)
    if (updateDisplay.err) {
        return new InternalServerError('gagal merubah data ram')
    }
    return updateDisplay
}

module.exports = {
    getList,
    getByKd,
    InsertDisplay,
    deleteDisplay,
    updateDisplay
}