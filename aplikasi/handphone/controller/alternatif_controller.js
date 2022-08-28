const Wrapper = require('../../../helper/utils/wrapper')
const AlternatifHpDomain = require('../domain/alternatif_hp_domain')

const wrapper = new Wrapper()
const domain = new AlternatifHpDomain()

class AlternatifHpConteroller {
    async getList(req, res) {
        const getList = await domain.getList()
        if (getList instanceof Error) return wrapper.responseError(res, getList)

        const data = getList.data.map(item => {
            return {
                merk: item.brand,
                alternatif: item.hp,
                ram: item.ram,
                internal: item.internal,
                batrai: item.batrai,
                kamera: item.kamera,
                harga: item.harga
            }
        })

        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }

    async getByBrand(req, res) {
        const paylaod = { ...req.body }
        const getByBrand = await domain.getByBrand(paylaod)
        if (getByBrand instanceof Error) return wrapper.responseError(res, getByBrand)

        const data = getByBrand.data.map(item => {
            return {
                merk: item.brand,
                alternatif: item.hp,
                ram: item.ram,
                internal: item.internal,
                batrai: item.batrai,
                kamera: item.kamera,
                harga: item.harga
            }
        })

        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }
}

module.exports = AlternatifHpConteroller