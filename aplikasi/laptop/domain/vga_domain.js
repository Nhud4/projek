const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const vgaRepo = require('../../../infastruktur/repositories/vga_repo')

const getList = async () => {
    const getList = await vgaRepo.getListVga()
    if (getList.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    return getList
}

const getByKd = async (payload) => {
    const { id } = payload
    const getByKd = await vgaRepo.getByKd(id)
    if (getByKd.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getByKd.data.length === 0) {
        return new NotFoundError('data tidak ditemukan')
    }
    return getByKd
}

const insertVga = async (payload) => {
    const { merk_vga, kapasitas_vga } = payload

    const getByType = await vgaRepo.getByMerk(merk_vga)
    const getByKapasitas = await vgaRepo.getByKapasitas(kapasitas_vga)

    if (getByType.err && getByKapasitas.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getByType.data.length > 0 && getByKapasitas.data.length > 0) {
        return new UnprocessableEntityError('tidak dapat memproses', [{
            filed: 'type dan kapasitas',
            message: 'data telah ada'
        }])
    }

    const insertVga = await vgaRepo.InsertVga(merk_vga, kapasitas_vga)
    if (insertVga.err) {
        return new InternalServerError('gagal menambahkan data')
    }
    return insertVga
}

const deleteVga = async (payload) => {
    const { id } = payload
    const getBykd = await vgaRepo.getByKd(id)
    if (getBykd.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getBykd.data.length === 0) {
        return new NotFoundError('data tidak ditemukan')
    }
    const deleteVga = await vgaRepo.deleteVga(id)
    if (deleteVga.err) {
        return new InternalServerError('gagal menghapus ram')
    }
    return deleteVga
}

const updateVga = async (payload) => {
    const { merk_vga, kapasitas_vga, id } = payload

    const getByKd = await vgaRepo.getByKd(id)
    const getByKapasitas = await vgaRepo.getByKapasitas(kapasitas_vga)
    const getByType = await vgaRepo.getByMerk(merk_vga)

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

    const updateVga = await vgaRepo.updateVga(merk_vga, kapasitas_vga, id)
    if (updateVga.err) {
        return new InternalServerError('gagal merubah data ram')
    }
    return updateVga
}

module.exports = {
    getList,
    getByKd,
    insertVga,
    deleteVga,
    updateVga
}