const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const ramRepo = require('../../../infastruktur/repositories/ram_repo')

const getList = async () => {
    const getList = await ramRepo.getListRam()
    if (getList.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    return getList
}

const getByKd = async (payload) => {
    const { id } = payload
    const getByKd = await ramRepo.getByKd(id)
    if (getByKd.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getByKd.data.length === 0) {
        return new NotFoundError('data tidak ditemukan')
    }
    return getByKd
}

const insertRam = async (payload) => {
    const { type_ram, kapasitas_ram } = payload

    const getByKapasitas = await ramRepo.getByKapasitas(kapasitas_ram)
    if (getByKapasitas.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getByKapasitas.data.length > 0) {
        return new UnprocessableEntityError('tidak dapat memproses', [{
            filed: 'type dan kapasitas',
            message: 'data telah ada'
        }])
    }

    const insertRam = await ramRepo.insertRam(type_ram, kapasitas_ram)
    if (insertRam.err) {
        return new InternalServerError('gagal menambahkan data')
    }
    return insertRam
}

const deleteRam = async (payload) => {
    const { id } = payload
    const getBykd = await ramRepo.getByKd(id)
    if (getBykd.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getBykd.data.length === 0) {
        return new NotFoundError('data tidak ditemukan')
    }
    const deleteRam = await ramRepo.deleteRam(id)
    if (deleteRam.err) {
        return new InternalServerError('gagal menghapus ram')
    }
    return deleteRam
}

const updateRam = async (payload) => {
    const { type_ram, kapasitas_ram, id } = payload
    const getByKd = await ramRepo.getByKd(id)
    const getByKapasitas = await ramRepo.getByKapasitas(kapasitas_ram)
    const getByType = await ramRepo.getByType(type_ram)
    if (getByKd.err || getByType.err || getByKapasitas.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getByKd.data.length === 0) {
        return new NotFoundError('data tidak ditemukan')
    }

    if (getByKapasitas.data.length > 0) {
        return new UnprocessableEntityError('tidak dapay memproses', [{
            filed: 'kapasitas',
            message: 'data telah ada'
        }])
    }

    const updateRam = await ramRepo.updateRam(type_ram, kapasitas_ram, id)
    if (updateRam.err) {
        return new InternalServerError('gagal merubah data ram')
    }
    return updateRam
}

module.exports = {
    getList,
    getByKd,
    insertRam,
    deleteRam,
    updateRam
}