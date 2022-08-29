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
}

module.exports = AlternatifLaptopDomain