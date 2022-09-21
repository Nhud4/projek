const Wrapper = require('../../../helper/utils/wrapper')
const Domain = require('../domain/count')

const wrapper = new Wrapper()
const domain = new Domain()

class CountController {
    async count(req, res) {
        const data = await domain.count()
        if (data instanceof Error) return wrapper.responseError(res, data)

        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }
}

module.exports = CountController