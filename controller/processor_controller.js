const Wrapper = require('../helper/utils/wrapper')
const processorDomain = require('../domain/processor_domain')

const wrapper = new Wrapper()

const getList = async (req, res) => {
    const getList = await processorDomain.getList()
    if (getList instanceof Error) return wrapper.responseError(res, getList)
    const data = getList.data.map(item => {
        return {
            id: item.id,
            processor: item.processor
        }
    })
    return wrapper.response(res, 200, {
        message: 'berhasil mendapatkan data',
        code: 200,
        data,
        success: true
    })
}