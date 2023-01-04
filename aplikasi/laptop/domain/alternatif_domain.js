const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const Alternatif = require('../../../infastruktur/repositories/bobot_alternatif_repo')

const alternatif = new Alternatif()

class AlternatifLaptopDomain {

    async getList() {
        const getListAlternatif = await alternatif.getList()
        if (getListAlternatif.err) {
            return new InternalServerError('gagal mendapatkan data alternatif')
        }
        return getListAlternatif
    }

    async getByKategori(payload) {
        const { kategori, sub_kategori } = payload

        if (kategori === 'game') {
            const getKategoriGame = await alternatif.getKategoriGame(kategori, sub_kategori)
            if (getKategoriGame.err) {
                return new InternalServerError('fail to get alternatof bobot')
            }
            if (getKategoriGame.data.length === 0) {
                return new NotFoundError('alternatif not found')
            }
            return getKategoriGame

        }

        if (kategori === 'editing') {
            const getKategoriEditing = await alternatif.getKategoriEditing(kategori, sub_kategori)
            if (getKategoriEditing.err) {
                return new InternalServerError('fail to get alternatof bobot')
            }
            if (getKategoriEditing.data.length === 0) {
                return new NotFoundError('alternatif not found')
            }
            return getKategoriEditing
        }

        if (kategori === 'office') {
            const getKategoriOffice = await alternatif.getKategoriOffice(kategori, sub_kategori)
            if (getKategoriOffice.err) {
                return new InternalServerError('fail to get alternatof bobot')
            }
            if (getKategoriOffice.data.length === 0) {
                return new NotFoundError('alternatif not found')
            }
            return getKategoriOffice
        }
    }

    async getAlternatifSpek(paylaod) {
        const { kategori, processor, ram, penyimpanan, vga, display } = paylaod
        if (kategori === 'game') {
            const game = await alternatif.getSpekGame(
                kategori,
                processor,
                ram,
                penyimpanan,
                vga,
                display)
            if (game.err) {
                return new InternalServerError('fail to get alternatof bobot')
            }
            if (game.data.length === 0) {
                return new NotFoundError('alternatif not found')
            }
            return game
        }

        if (kategori === 'editing') {
            const editing = await alternatif.getSpekEditing(
                kategori,
                processor,
                ram,
                penyimpanan,
                vga,
                display)
            if (editing.err) {
                return new InternalServerError('fail to get alternatof bobot')
            }
            if (editing.data.length === 0) {
                return new NotFoundError('alternatif not found')
            }
            return editing
        }

        if (kategori === 'office') {
            const office = await alternatif.getSpekOffice(
                kategori,
                processor,
                ram,
                penyimpanan,
                vga,
                display)
            if (office.err) {
                return new InternalServerError('fail to get alternatof bobot')
            }
            if (office.data.length === 0) {
                return new NotFoundError('alternatif not found')
            }
            return office
        }
    }
}

module.exports = AlternatifLaptopDomain