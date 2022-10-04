const {
    InternalServerError,
    NotFoundError
} = require('../../../helper/error')
const AlternatifHp = require('../../../infastruktur/repositories/alternatif_hp_repo')

const alternaitf = new AlternatifHp()

class AlternatifHpDomain {
    async getList(paylaod) {
        const {
            harga1,
            harga2,
            ram,
            internal,
            kamera_id,
            batrai_id
        } = paylaod
        const getList = await alternaitf.getLis(
            harga1,
            harga2,
            ram,
            internal,
            kamera_id,
            batrai_id
        )
        if (getList.err) {
            return new InternalServerError('fail to get data')
        }
        return getList
    }

    async getByHarga(paylaod) {
        const {
            harga1,
            harga2
        } = paylaod
        const getByBrand = await alternaitf.getBYHarga(harga1, harga2)
        if (getByBrand.err) {
            return new InternalServerError('fail to get data')
        }
        return getByBrand
    }

    async getBySpek(paylaod) {
        const {
            ram,
            internal,
            kamera_id,
            batrai_id
        } = paylaod
        const getBySpek = await alternaitf.getBYSpek(
            ram,
            internal,
            kamera_id,
            batrai_id
        )
        if (getBySpek.err) {
            return new InternalServerError('fail to get data')
        }
        return getBySpek
    }
}

module.exports = AlternatifHpDomain