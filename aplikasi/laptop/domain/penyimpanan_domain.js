const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const penyimpananRepo = require('../../../infastruktur/repositories/penyimpanan_repo')

const getList = async () => {
    const getList = await penyimpananRepo.getListPenyimpanan()
    if (getList.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    return getList
}

const getByKd = async (payload) => {
    const { id } = payload
    const getByKd = await penyimpananRepo.getByKd(id)
    if (getByKd.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getByKd.data.length === 0) {
        return new NotFoundError('data tidak ditemukan')
    }
    return getByKd
}

const insertPenyimpanan = async (payload) => {
    const { type_penyimpanan, kapasitas_penyimpanan } = payload

    const getByType = await penyimpananRepo.getByType(type_penyimpanan)
    const getByKapasitas = await penyimpananRepo.getByKapasitas(kapasitas_penyimpanan)

    if (getByType.err && getByKapasitas.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getByType.data.length > 0 && getByKapasitas.data.length > 0) {
        return new UnprocessableEntityError('tidak dapat memproses', [{
            filed: 'type dan kapasitas',
            message: 'data telah ada'
        }])
    }

    const insertPenyimpanan = await penyimpananRepo.insertPenyimpanan(type_penyimpanan, kapasitas_penyimpanan)
    if (insertPenyimpanan.err) {
        return new InternalServerError('gagal menambahkan data')
    }
    return insertPenyimpanan
}

const deletePenyimpanan = async (payload) => {
    const { id } = payload
    const getBykd = await penyimpananRepo.getByKd(id)
    if (getBykd.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getBykd.data.length === 0) {
        return new NotFoundError('data tidak ditemukan')
    }
    const deletePenyimpanan = await penyimpananRepo.deletePenyimpanan(id)
    if (deletePenyimpanan.err) {
        return new InternalServerError('gagal menghapus ram')
    }
    return deletePenyimpanan
}

const updatePenyimpanan = async (payload) => {
    const { type_penyimpanan, kapasitas_penyimpanan, id } = payload

    const getByKd = await penyimpananRepo.getByKd(id)
    const getByKapasitas = await penyimpananRepo.getByKapasitas(type_penyimpanan)
    const getByType = await penyimpananRepo.getByType(type_penyimpanan)

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

    const updatePenyimpanan = await penyimpananRepo.updatePenyimpanan(type_penyimpanan, kapasitas_penyimpanan, id)
    if (updatePenyimpanan.err) {
        return new InternalServerError('gagal merubah data ram')
    }
    return updatePenyimpanan
}

module.exports = {
    getList,
    getByKd,
    insertPenyimpanan,
    deletePenyimpanan,
    updatePenyimpanan
}