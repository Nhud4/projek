const Wrapper = require('../../../helper/utils/wrapper')
const bobotDomain = require('../domain/bobot_domain')

const wrapper = new Wrapper()

const getList = async (req, res) => {
    const getList = await bobotDomain.getList()
    if (getList instanceof Error) return wrapper.responseError(res, getList)

    return wrapper.response(res, 200, {
        message: 'berhasil mendapatkan data',
        code: 200,
        data,
        success: true
    })
}

const getById = async (req, res) => {
    const payload = { ...req.params }
    const getById = await bobotDomain.getByBobot(payload)
    if (getById instanceof Error) return new wrapper.responseError(res, getById)

    return wrapper.response(res, 200, {
        message: 'berhasil mendapatkan data',
        code: 200,
        data,
        success: true
    })
}

module.exports = {
    getList,
    getById
}