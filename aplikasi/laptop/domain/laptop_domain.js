const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const laptopRepo = require('../../../infastruktur/repositories/laptop_repo')
const bobotRepo = require('../../../infastruktur/repositories/bobot_repo')
const Rules = require('../rules/rules')
const Alternatif = require('../../../infastruktur/repositories/bobot_alternatif_repo')

const rules = new Rules()
const alternatif = new Alternatif()

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
        merk_id,
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
        merk_id,
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

    const laptopId = insertLaptop.data[0].id

    const getData = await laptopRepo.getById(laptopId)

    let processor = getData.data[0].kecepatan_processor
    let ram = getData.data[0].kapasitas_ram
    let penyimpanan = getData.data[0].kapasitas_penyimpanan
    let vga = getData.data[0].kapasitas_vga
    let display = getData.data[0].ukuran_display
    const setKategori = await rules.kategori(processor)

    const bobotProcessor = await rules.bobotProcessor(processor)
    const bobotRam = await rules.bobotRam(ram)
    const bobotPenyimpanan = await rules.bobotPenyimpanan(penyimpanan)
    const bobotVga = await rules.bobotVga(vga)
    const bobotDisplay = await rules.bobotDisplay(display)
    const ka = setKategori.ka
    const kb = setKategori.kb
    const kc = setKategori.kc

    const insertAlternatif = await alternatif.insertAlternatif(
        laptopId,
        bobotProcessor,
        bobotRam,
        bobotPenyimpanan,
        bobotVga,
        bobotDisplay,
        harga,
        ka,
        kb,
        kc
    )
    if (insertAlternatif.err) {
        return new InternalServerError('fail to add alternatif')
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
        return new NotFoundError('data tidak ditemukan')
    }

    const deleteLaptop = await laptopRepo.deleteLaptop(id)
    if (deleteLaptop.err) {
        return new InternalServerError('gagal menghapus data laptop')
    }

    const deleteAlternatif = await alternatif.deleteAlternatif(id)
    if (deleteAlternatif.err) {
        return new InternalServerError('gagal menghapus data alternatif')
    }
    return deleteLaptop
}

const updateLaptop = async (payload) => {
    const {
        merk_id,
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
    if (getByLaptop.data.laptop !== getById.data.laptop) {
        return new UnprocessableEntityError('tidak dapat memproses', [{
            filed: 'laptop',
            message: 'data telah ada'
        }])
    }

    const updateLaptop = await laptopRepo.updateLaptop(
        merk_id,
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

    const getData = await laptopRepo.getById(id)

    const processor = getData.data[0].processor
    const ram = getData.data[0].kapasitas_ram
    const penyimpanan = getData.data[0].kapasitas_penyimpanan
    const vga = getData.data[0].kapasitas_vga
    const display = getData.data[0].ukuran_display
    const setKategori = await rules.kategori(processor)

    const bobotProcessor = await rules.bobotProcessor(processor)
    const bobotRam = await rules.bobotRam(ram)
    const bobotPenyimpanan = await rules.bobotPenyimpanan(penyimpanan)
    const bobotVga = await rules.bobotVga(vga)
    const bobotDisplay = await rules.bobotDisplay(display)
    const ka = setKategori.ka
    const kb = setKategori.kb
    const kc = setKategori.kc

    const updateAlternatif = await alternatif.updateAlternatif(
        bobotProcessor,
        bobotRam,
        bobotPenyimpanan,
        bobotVga,
        bobotDisplay,
        harga,
        ka,
        kb,
        kc,
        id
    )
    if (updateAlternatif.err) {
        return new InternalServerError('fail to add alternatif')
    }
    return updateLaptop
}

const count = async () => {
    const getList = await laptopRepo.getListLaptop()
    if (getList.err) {
        return new InternalServerError('fail to get data')
    }

    const count = getList.data
    let result = count.reduce(function (r, a) {
        r[a.merk] = r[a.merk] || [];
        r[a.merk].push(a);
        return r;
    }, Object.create(null));

    if (result.err) {
        return new InternalServerError('fail to get count data')
    }

    return result
}

const rentangHargaMax = async () => {
    const max = await laptopRepo.maxHarga()

    if (max.err) {
        return new InternalServerError('fail to get data')
    }

    return max
}

const rentangHargaMin = async () => {
    const min = await laptopRepo.minHarga()

    if (min.err) {
        return new InternalServerError('fail to get data')
    }

    return min
}


module.exports = {
    getList,
    getByKd,
    insertLaptop,
    deleteLaptop,
    updateLaptop,
    count,
    rentangHargaMax,
    rentangHargaMin
}