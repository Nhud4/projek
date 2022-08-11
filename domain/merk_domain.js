const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../helper/error')
const mysql = require('mysql2')
const merkRepo = require('../infastruktur/repositories/merk_repo')

const getList = async () => {
    const getList = await merkRepo.getListMerk()
    if (getList.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    return getList
}

const getBykd = async (payload) => {
    const { id } = payload
    const getByKd = await merkRepo.getByKd(id)
    if (getByKd.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getByKd.data.length === 0) {
        return new NotFoundError('data tidak ditemukan')
    }
    return getByKd
}

const insertMerk = async (payload) => {
    const { merk } = payload
    const getByMerk = await merkRepo.getByMerk(merk)
    if (getByMerk.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getByMerk.data.length > 0) {
        return new UnprocessableEntityError('tidak dapat memproses', [{
            filed: 'merk',
            message: 'data telah ada'
        }])
    }

    const insertMerk = await merkRepo.insertMerk(merk)
    if (insertMerk.err) {
        return new InternalServerError('gagal menambahkan data merk')
    }
    return insertMerk
}

const deleteMerk = async (payload) => {
    const { id } = payload
    const getByKd = await merkRepo.getByKd(id)
    if (getByKd.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getByKd.data.length === 0) {
        return new NotFoundError('data tidak ditemukan')
    }

    const deleteMerk = await merkRepo.deleteMerk(id)
    if (deleteMerk.err) {
        return new InternalServerError('gagal menghapus data merk')
    }
    return deleteMerk
}

const updateMerk = async (payload) => {
    const { merk, id } = payload
    const getBykd = await merkRepo.getByKd(id)
    if (getBykd.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getBykd.data.length === 0) {
        return new NotFoundError('data tidak ditemukan')
    }

    const getByMerk = await merkRepo.getByMerk(merk)
    if (getByMerk.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getByMerk.data.length > 0) {
        return new UnprocessableEntityError('tidak dapat memproses', [{
            filed: 'merk',
            message: 'data telah ada'
        }])
    }

    const updateMerk = await merkRepo.updateMerk(merk, id)
    if (updateMerk.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    return updateMerk
}

module.exports = {
    getList,
    getBykd,
    insertMerk,
    deleteMerk,
    updateMerk
}