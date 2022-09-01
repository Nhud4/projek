const { addDays, formatISO } = require('date-fns')

const Wrapper = require('../../helper/utils/wrapper')
const userDomain = require('./user_domain')
const BearerAuth = require('../authorization/bearer_auth')

const wrapper = new Wrapper()
const domain = new userDomain()
const bearerAuth = new BearerAuth()

class userController {
    async login(req, res) {
        const payload = { ...req.body }
        const getUser = await domain.Login(payload)
        if (getUser instanceof Error) return wrapper.responseError(res, getUser)
        if (getUser.data.length === 0) {
            return wrapper.responseError(res, new UnauthorizedError('username or password is incorrect'))
        }

        let payloadToken = {}
        let data = {}

        payloadToken = {
            id: getUser.data[0].id,
            phone: getUser.data[0].phone,
            username: getUser.data[0].username,
            name: getUser.data[0].name,
            user_extent: getUser.data[0].user_extent
        }

        data = {
            accessToken: bearerAuth.generateToken(payloadToken, { expiresIn: '1d' }),
            expAccessToken: formatISO(addDays(new Date(), 1)),
        }

        return wrapper.response(res, 200, {
            message: 'login success',
            code: 200,
            data,
            success: true
        })
    }

    async register(req, res) {
        const payload = { ...req.body }
        const insertUser = await domain.insertUser(payload)
        if (insertUser instanceof Error) return wrapper.responseError(res, insertUser)
        delete payload.password
        delete payload.konfirm_password
        return wrapper.response(res, 200, {
            message: 'register success',
            code: 201,
            data: { ...payload },
            success: true
        })
    }

    async countdata(req, res) {
        const count = await domain.count()
        if (count instanceof Error) return wrapper.responseError(res, count)

        const data = count
        return wrapper.response(res, 200, {
            message: 'register success',
            code: 201,
            data,
            success: true
        })
    }
}

module.exports = userController