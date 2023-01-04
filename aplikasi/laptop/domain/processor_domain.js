const {
    InternalServerError,
    UnprocessableEntityError,
    NotFoundError
} = require('../../../helper/error')
const processorRepo = require('../../../infastruktur/repositories/processor_repo')

const getList = async () => {
    const getList = await processorRepo.getListProcessor()
    if (getList.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    return getList
}

const getByKd = async (payload) => {
    const { id } = payload
    const getByKd = await processorRepo.getByKd(id)
    if (getByKd.err) {
        return new InternalServerError()
    }
    if (getByKd.data.length === 0) {
        return new NotFoundError('data tiak ditemukan')
    }
    return getByKd
}

const insertProcessor = async (payload) => {
    const { processor, seri_processor, kecepatan_processor } = payload
    const getBySeri = await processorRepo.getBySeri(seri_processor)
    if (getBySeri.err) {
        return new InternalServerError('gagal mendapatkan data')
    }

    if (getBySeri.data.length > 0) {
        return new UnprocessableEntityError('tidak dapat memproses', [{
            filed: 'seri',
            message: 'data telah ada'
        }])
    }

    const insertProcessor = await processorRepo.insertProcessor(processor, seri_processor, kecepatan_processor)
    if (insertProcessor.err) {
        return new InternalServerError('gagal menambahkan data processor')
    }
    return insertProcessor
}

const deleteProcessor = async (payload) => {
    const { id } = payload
    const getByKd = await processorRepo.getByKd(id)
    if (getByKd.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getByKd.data.length === 0) {
        return new NotFoundError('data tidak ditemukan')
    }

    const deleteProcessor = await processorRepo.deleteProcessor(id)
    if (deleteProcessor.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    return deleteProcessor
}

const updateProcessor = async (payload) => {
    const { processor, seri_processor, kecepatan_processor, id } = payload
    const getByKd = await processorRepo.getByKd(id)
    if (getByKd.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getByKd.data.length === 0) {
        return new NotFoundError('data tidak ditemukan')
    }

    const getBySeri = await processorRepo.getBySeri(seri_processor)
    if (getBySeri.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    if (getBySeri.data.length > 0) {
        return new UnprocessableEntityError('tidak dapat memproses', [{
            filed: 'seri',
            message: 'data telah ada'
        }])
    }

    const updateProcessor = await processorRepo.updateProcessor(
        processor, seri_processor, kecepatan_processor, id
    )
    if (updateProcessor.err) {
        return new InternalServerError('gagal mendapatkan data')
    }
    return updateProcessor
}

module.exports = {
    getList,
    getByKd,
    insertProcessor,
    deleteProcessor,
    updateProcessor
}