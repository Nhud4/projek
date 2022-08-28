const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const Alternatif = require('../../../infastruktur/repositories/bobot_alternatif_repo')

const alternatif = new Alternatif()

class AlternatifDomain {
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
            if (sub_kategori === 'ringan') {
                const getKategoriGame = await alternatif.getKategoriGame(kategori, sub_kategori)
                if (getKategoriGame.err) {
                    return new InternalServerError('fail to get alternatof bobot')
                }
                if (getKategoriGame.data.length === 0) {
                    return new NotFoundError('alternatif not found')
                }
                return getKategoriGame
            }

            if (sub_kategori === 'midel') {
                const getKategoriGame = await alternatif.getKategoriGame(kategori, sub_kategori)
                if (getKategoriGame.err) {
                    return new InternalServerError('fail to get alternatof bobot')
                }
                if (getKategoriGame.data.length === 0) {
                    return new NotFoundError('alternatif not found')
                }
                return getKategoriGame
            }

            if (sub_kategori === 'berat') {
                const getKategoriGame = await alternatif.getKategoriGame(kategori, sub_kategori)
                if (getKategoriGame.err) {
                    return new InternalServerError('fail to get alternatof bobot')
                }
                if (getKategoriGame.data.length === 0) {
                    return new NotFoundError('alternatif not found')
                }
                return getKategoriGame
            }
        }

        if (kategori === 'editing') {
            if (sub_kategori === '2D') {
                const getKategoriEditing = await alternatif.getKategoriEditing(kategori, sub_kategori)
                if (getKategoriEditing.err) {
                    return new InternalServerError('fail to get alternatof bobot')
                }
                if (getKategoriEditing.data.length === 0) {
                    return new NotFoundError('alternatif not found')
                }
                return getKategoriEditing
            }

            if (sub_kategori === 'video') {
                const getKategoriEditing = await alternatif.getKategoriEditing(kategori, sub_kategori)
                if (getKategoriEditing.err) {
                    return new InternalServerError('fail to get alternatof bobot')
                }
                if (getKategoriEditing.data.length === 0) {
                    return new NotFoundError('alternatif not found')
                }
                return getKategoriEditing
            }

            if (sub_kategori === '3D') {
                const getKategoriEditing = await alternatif.getKategoriEditing(kategori, sub_kategori)
                if (getKategoriEditing.err) {
                    return new InternalServerError('fail to get alternatof bobot')
                }
                if (getKategoriEditing.data.length === 0) {
                    return new NotFoundError('alternatif not found')
                }
                return getKategoriEditing
            }
        }

        if (kategori === 'office') {
            if (sub_kategori === 'ringan') {
                const getKategoriOffice = await alternatif.getKategoriOffice(kategori, sub_kategori)
                if (getKategoriOffice.err) {
                    return new InternalServerError('fail to get alternatof bobot')
                }
                if (getKategoriOffice.data.length === 0) {
                    return new NotFoundError('alternatif not found')
                }
                return getKategoriOffice
            }

            if (sub_kategori === 'berat') {
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
}

module.exports = AlternatifDomain