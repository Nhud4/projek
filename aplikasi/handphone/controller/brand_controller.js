const Wrapper = require('../../../helper/utils/wrapper')
const BrandDomain = require('../domain/brand_domain')

const wrapper = new Wrapper()
const domain = new BrandDomain()

class BrandController {
    async getList(req, res) {
        const getList = await domain.getList()
        if (getList instanceof Error) return wrapper.responseError(res, getList)

        const data = getList.data.map(item => {
            return {
                id: item.id,
                brand: item.brand
            }
        })

        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }

    async getById(req, res) {
        const paylaod = { ...req.params }
        const getById = await domain.getById(paylaod)
        if (getById instanceof Error) return wrapper.responseError(res, getById)

        const data = getById.data.map(item => {
            return {
                brand: item.brand
            }
        })
        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }

    async insertBrand(req, res) {
        const paylaod = { ...req.body }
        const insertBrand = await domain.insertBrand(paylaod)
        if (insertBrand instanceof Error) return wrapper.responseError(res, insertBrand)

        return wrapper.response(res, 200, {
            message: 'berhasil menambahkan data',
            code: 200,
            data: { ...paylaod },
            success: true
        })
    }

    async updateBrand(req, res) {
        const paylaod = {
            ...req.params,
            ...req.body
        }

        const updateBrand = await domain.updateBrand(paylaod)
        if (updateBrand instanceof Error) return wrapper.responseError(res, updateBrand)

        const data = {
            id: paylaod.id,
            brand: paylaod.brand
        }

        return wrapper.response(res, 200, {
            message: 'berhasil merubah data',
            code: 200,
            data,
            success: true
        })
    }

    async deleteBrand(req, res) {
        const paylaod = { ...req.params }
        const deleteBrand = await domain.deleteBrand(paylaod)
        if (deleteBrand instanceof Error) return wrapper.responseError(res, deleteBrand)

        return wrapper.response(res, 200, {
            message: 'berhasil menghapus data',
            code: 200,
            data: { id: paylaod.id },
            success: true
        })
    }
}

module.exports = BrandController