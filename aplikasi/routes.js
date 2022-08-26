const packageJson = require('../package.json')
const express = require('express')
const BasicAuth = require('./authorization/basic_auth')
const BearerAuth = require('./authorization/bearer_auth')
const Wrapper = require('../helper/utils/wrapper')
const { NotFoundError } = require('../helper/error')
const Uservalidation = require('./validation/auth_validation')
const User = require('./user_auth/user_controller')

const basicAuth = new BasicAuth()
const bearerAuth = new BearerAuth()
const wrapper = new Wrapper()
const usrtAuth = new Uservalidation()
const user = new User()

const router = express.Router()

router.post('/login', basicAuth.isAuthenticated, usrtAuth.login, user.login)
router.post('/register', basicAuth.isAuthenticated, usrtAuth.register, user.register)

router.get('/', (_req, res) => {
    wrapper.response(res, 200, {
        message: `${packageJson.name} server is running properly`,
        code: 200,
        data: null,
        success: true
    })
})

router.use((_req, res) => {
    wrapper.responseError(res,
        new NotFoundError(`resource not found from ${packageJson.name} server`)
    )
})

module.exports = router