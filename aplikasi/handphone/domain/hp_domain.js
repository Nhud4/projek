const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const HpModel = require('../../../infastruktur/repositories/hp_repo')

const hpModel = new HpModel()

class HpDomain {
    async getList() {
        const getList = await hpModel.getList()
        if (getList.err) {
            return new InternalServerError('fail to get data')
        }
        return getList
    }

    async getById(paylaod) {
        const { id } = paylaod
        const getById = await hpModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not found')
        }
        return getById
    }

    async insertHp(paylaod) {
        const {
            brand_id,
            hp,
            chipset_id,
            internal_id,
            ram_id,
            baterai_id,
            kamera_id,
            harga
        } = paylaod
        const getByHp = await hpModel.getByHp(hp)
        if (getByHp.err) {
            return new InternalServerError('fail to get data')
        }
        if (getByHp.data.length > 0) {
            return new UnprocessableEntityError('unprocesseble entity', [{
                field: 'hp',
                message: 'data already exists'
            }])
        }

        const insertHp = await hpModel.insertHp(
            brand_id,
            hp,
            chipset_id,
            internal_id,
            ram_id,
            baterai_id,
            kamera_id,
            harga
        )
        if (insertHp.err) {
            return new InternalServerError('fail to add data')
        }
        return insertHp
    }

    async updateHp(paylaod) {
        const {
            brand_id,
            hp,
            chipset_id,
            internal_id,
            ram_id,
            baterai_id,
            kamera_id,
            harga,
            id
        } = paylaod
        const getById = await hpModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not found')
        }

        const getByHp = await hpModel.getByHp(hp)
        if (getByHp.err) {
            return new InternalServerError('fail to get data')
        }
        if (getByHp.data.length > 0) {
            return new UnprocessableEntityError('unprocesseble entity', [{
                field: 'hp',
                message: 'data already exists'
            }])
        }

        const updateHp = await hpModel.updateHp(
            brand_id,
            hp,
            chipset_id,
            internal_id,
            ram_id,
            baterai_id,
            kamera_id,
            harga,
            id
        )
        if (updateHp.err) {
            return new InternalServerError('fail to update data')
        }
        return updateHp
    }

    async deleteHp(paylaod) {
        const { id } = paylaod
        const getById = await hpModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not found')
        }

        const deleteHp = await hpModel.deleteHp(id)
        if (deleteHp.err) {
            return new InternalServerError('fail to delete data')
        }
        return deleteHp
    }
}

module.exports = HpDomain