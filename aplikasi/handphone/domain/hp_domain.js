const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const HpModel = require('../../../infastruktur/repositories/hp_repo')
const AlternatifRepo = require('../../../infastruktur/repositories/alternatif_hp_repo')
const rules = require('../rules/rules')

const hpModel = new HpModel()
const alternatif = new AlternatifRepo()

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

        const id = insertHp.data[0].id
        const getById = await hpModel.getById(id)

        const getRam = getById.data[0].ram
        const getInternal = getById.data[0].internal
        const getBartai = getById.data[0].batrai
        const kamera_depan = getById.data[0].kamera_depan
        const kamera_belakang = getById.data[0].kamera_belakang

        const ram = await rules.bobotRam(getRam)
        const internal = await rules.bobotInternal(getInternal)
        const batrai = await rules.bobotBatrai(getBartai)
        const kamera = await rules.bobotKamera(kamera_depan, kamera_belakang)

        const insertAlternatif = await alternatif.insertAlternatifHp(
            id,
            ram,
            internal,
            batrai,
            kamera,
            harga
        )
        if (insertAlternatif.err) {
            return new InternalServerError('fail to add alternatif')
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
            batrai_id,
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
        if (getByHp.data.hp !== getById.data.hp) {
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
            batrai_id,
            kamera_id,
            harga,
            id
        )
        if (updateHp.err) {
            return new InternalServerError('fail to update data')
        }

        const hp_id = updateHp.data[0].id

        const getData = await hpModel.getById(hp_id)

        const getRam = getData.data[0].ram
        const getInternal = getData.data[0].internal
        const getBartai = getData.data[0].batrai
        const kamera_depan = getData.data[0].kamera_depan
        const kamera_belakang = getData.data[0].kamera_belakang

        const ram = await rules.bobotRam(getRam)
        const internal = await rules.bobotInternal(getInternal)
        const batrai = await rules.bobotBatrai(getBartai)
        const kamera = await rules.bobotKamera(kamera_depan, kamera_belakang)

        const updateAlternatif = await alternatif.updateAlternatifHp(
            ram,
            internal,
            batrai,
            kamera,
            harga,
            hp_id
        )
        if (updateAlternatif.err) {
            return new InternalServerError('fail to update alternatif')
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

        const deleteAlternatif = await alternatif.deletedAlternatifHp(id)
        if (deleteAlternatif.err) {
            return new InternalServerError('fail to delete alternatif')
        }

        return deleteHp
    }
}

module.exports = HpDomain