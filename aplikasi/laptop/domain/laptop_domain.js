const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const laptopRepo = require('../../../infastruktur/repositories/laptop_repo')
const bobotRepo = require('../../../infastruktur/repositories/bobot_repo')
const Bobot = require('../rules/rules')

const bobot = new Bobot()

const getList = async () => {
    const getList = await laptopRepo.getListLaptop()
    if (getList.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    return getList
}

const getByKd = async (payload) => {
    const { id } = payload
    const getByKd = await laptopRepo.getById(id)
    if (getByKd.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getByKd.data.length === 0) {
        return new NotFoundError('data tidak titemukan')
    }
    return getByKd
}

const insertLaptop = async (payload) => {
    const {
        merek_id,
        laptop,
        processor_id,
        ram_id,
        penyimpanan_id,
        vga_id,
        display_id,
        harga
    } = payload
    const getByLaptop = await laptopRepo.getByLaptop(laptop)
    if (getByLaptop.err) {
        return new InternalServerError('gagal mendapatakan data')
    }
    if (getByLaptop.data.length > 0) {
        return new UnprocessableEntityError('tidak dapat memproses', [{
            filed: 'laptop',
            message: 'data telah ada'
        }])
    }

    const insertLaptop = await laptopRepo.insertLaptop(
        merek_id,
        laptop,
        processor_id,
        ram_id,
        penyimpanan_id,
        vga_id,
        display_id,
        harga)
    if (insertLaptop.err) {
        return new InternalServerError('gagal menambahkan data laptop')
    }
    return insertLaptop
}

const deleteLaptop = async (payload) => {
    const { id } = payload
    const getById = await laptopRepo.getById(id)
    if (getById.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getById.data.length === 0) {
        return new NotFoundError('data telah ada')
    }

    const deleteLaptop = await laptopRepo.deleteLaptop(id)
    if (deleteLaptop.err) {
        return new InternalServerError('gagal menghapus data laptop')
    }
    return deleteLaptop
}

const updateLaptop = async (payload) => {
    const {
        merek_id,
        laptop,
        processor_id,
        ram_id,
        penyimpanan_id,
        vga_id,
        display_id,
        harga,
        id
    } = payload
    const getById = await laptopRepo.getById(id)
    if (getById.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getById.data.length === 0) {
        return new NotFoundError('data tidak ditemukan')
    }

    const getByLaptop = await laptopRepo.getByLaptop(laptop)
    if (getByLaptop.err) {
        return new InternalServerError('gagal mendapatakan data')
    }
    if (getByLaptop.data.length > 0) {
        return new UnprocessableEntityError('tidak dapat memproses', [{
            filed: 'laptop',
            message: 'data telah ada'
        }])
    }

    const updateLaptop = await laptopRepo.updateLaptop(
        merek_id,
        laptop,
        processor_id,
        ram_id,
        penyimpanan_id,
        vga_id,
        display_id,
        harga,
        id
    )
    if (updateLaptop.err) {
        return new InternalServerError('gagal menrubah data laptop')
    }
    return updateLaptop
}

module.exports = {
    getList,
    getByKd,
    insertLaptop,
    deleteLaptop,
    updateLaptop
}