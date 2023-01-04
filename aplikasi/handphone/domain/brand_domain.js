const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const BrandModel = require('../../../infastruktur/repositories/brand_repo')

const brandModel = new BrandModel()

class BrandDomain {
    async getList() {
        const getList = await brandModel.getListBrand()
        if (getList.err) {
            return new InternalServerError('fail to get data')
        }
        return getList
    }

    async getById(payload) {
        const { id } = payload
        const getById = await brandModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not found')
        }
        return getById
    }

    async insertBrand(payload) {
        const { brand } = payload
        const getByBrand = await brandModel.getByBrand(brand)
        if (getByBrand.err) {
            return new InternalServerError('fail to get data')
        }
        if (getByBrand.data.length > 0) {
            return new UnprocessableEntityError('unproses entity', [{
                field: 'brand',
                message: 'data already exists'
            }])
        }

        const insertBrand = await brandModel.isertBarnd(brand)
        if (insertBrand.err) {
            return new InternalServerError('fail to add brand')
        }
        return insertBrand
    }

    async updateBrand(payload) {
        const { brand, id } = payload
        const getById = await brandModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not found')
        }

        const getByBrand = await brandModel.getByBrand(brand)
        if (getByBrand.err) {
            return new InternalServerError('fail to get data')
        }
        if (getByBrand.data.length > 0) {
            return new UnprocessableEntityError('unproseseble entity', [{
                field: 'brand',
                message: 'brand already exists'
            }])
        }

        const updateBrand = await brandModel.updateBrand(brand, id)
        if (updateBrand.err) {
            return new InternalServerError('fail to update brand')
        }
        return updateBrand
    }

    async deleteBrand(payload) {
        const { id } = payload
        const getById = await brandModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not found')
        }

        const deleteBrand = await brandModel.deleteBrand(id)
        if (deleteBrand.err) {
            return new InternalServerError('fail to deleted brand')
        }
        return deleteBrand
    }
}

module.exports = BrandDomain