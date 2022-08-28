const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const AlternatifHp = require('../../../infastruktur/repositories/alternatif_hp_repo')

const alternaitf = new AlternatifHp()

class AlternatifHpDomain {
    async getList() {
        const getList = await alternaitf.getLis()
        if (getList.err) {
            return new InternalServerError('fail to get data')
        }
        return getList
    }

    async getByBrand(paylaod) {
        const { brand } = paylaod
        const getByBrand = await alternaitf.getBYBrand(brand)
        if (getByBrand.err) {
            return new InternalServerError('fail to get data')
        }
        if (getByBrand.data.length === 0) {
            return new NotFoundError('data not found')
        }
        return getByBrand
    }
}

module.exports = AlternatifHpDomain