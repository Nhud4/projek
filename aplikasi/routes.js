const packageJson = require('../package.json')
const express = require('express')
const BasicAuth = require('./authorization/basic_auth')
const BearerAuth = require('./authorization/bearer_auth')
const Wrapper = require('../helper/utils/wrapper')
const { NotFoundError } = require('../helper/error')

const basicAuth = new BasicAuth()
const bearerAuth = new BearerAuth()
const wrapper = new Wrapper()

const router = express.Router()

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