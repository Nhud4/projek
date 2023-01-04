const Wrapper = require('../../../helper/utils/wrapper')
const AlternatifDomain = require('../domain/alternatif_domain')

const wrapper = new Wrapper()
const alternatif = new AlternatifDomain()

class AlternatifController {
    async getByKategori(req, res) {
        const payload = { ...req.body }
        const getByKategori = await alternatif.getByKategori(payload)
        if (getByKategori instanceof Error) return wrapper.responseError(res, getByKategori)

        const data = getByKategori.data[0]
        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }
}

module.exports = AlternatifController