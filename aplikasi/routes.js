const packageJson = require('../package.json')
const express = require('express')
const BasicAuth = require('./authorization/basic_auth')
const BearerAuth = require('./authorization/bearer_auth')
const Wrapper = require('../helper/utils/wrapper')
const { NotFoundError } = require('../helper/error')
const Uservalidation = require('./validation/auth_validation')
const User = require('./user_auth/user_controller')

const merk = require('../aplikasi/laptop/controller/merk_controller')
const processor = require('../aplikasi/laptop/controller/processor_controller')
const ram = require('../aplikasi/laptop/controller/ram_controller')
const penyimpanan = require('../aplikasi/laptop/controller/penyimpanan_controller')
const vga = require('../aplikasi/laptop/controller/vga_controller')
const display = require('../aplikasi/laptop/controller/display_controller')
const Laptop = require('../aplikasi/laptop/controller/laptop_controller')
const bobot = require('../aplikasi/laptop/controller/bobot_controller')

const basicAuth = new BasicAuth()
const bearerAuth = new BearerAuth()
const wrapper = new Wrapper()
const usrtAuth = new Uservalidation()
const user = new User()
const laptop = new Laptop()

const router = express.Router()

router.post("/login", basicAuth.isAuthenticated, usrtAuth.login, user.login)
router.post('/register', basicAuth.isAuthenticated, usrtAuth.register, user.register)

// laptop
router.get('/get/merk', bearerAuth.isAuthenticated, merk.getList)
router.post('/add/merk', bearerAuth.isAuthenticated, merk.insertMerk)
router.get('/get/merk/by/:id=?', bearerAuth.isAuthenticated, merk.getByKd)
router.put('/update/merk/:id=?', bearerAuth.isAuthenticated, merk.updateMerk)
router.delete('/delete/merk/:id=?', bearerAuth.isAuthenticated, merk.deleteMerk)

router.get('/get/processor', bearerAuth.isAuthenticated, processor.getList)
router.post('/add/processor', bearerAuth.isAuthenticated, processor.insertProcessor)
router.get('/get/processor/by/:id=?', bearerAuth.isAuthenticated, processor.getById)
router.put('/update/processor/:id=?', bearerAuth.isAuthenticated, processor.updateProcessor)
router.delete('/delete/processor/:id=?', bearerAuth.isAuthenticated, processor.deleteProcessor)

router.get('/get/ram', bearerAuth.isAuthenticated, ram.getList)
router.post('/add/ram', bearerAuth.isAuthenticated, ram.insertRam)
router.get('/get/ram/by/:id=?', bearerAuth.isAuthenticated, ram.getById)
router.put('/update/ram/:id', bearerAuth.isAuthenticated, ram.updateRam)
router.delete('/delete/ram/:id=?', bearerAuth.isAuthenticated, ram.deleteRam)

router.get('/get/penyimpanan', bearerAuth.isAuthenticated, penyimpanan.getList)
router.post('/add/penyimpanan', bearerAuth.isAuthenticated, penyimpanan.insertPenyimpanan)
router.get('/get/penyimpanan/by/:id=?', bearerAuth.isAuthenticated, penyimpanan.getById)
router.put('/update/penyimpanan/:id=?', bearerAuth.isAuthenticated, penyimpanan.updatePenyimpanan)
router.delete('/delete/penyimpanan/:id=?', bearerAuth.isAuthenticated, penyimpanan.deletePenyimpanan)

router.get('/get/vga', bearerAuth.isAuthenticated, vga.getList)
router.post('/add/vga', bearerAuth.isAuthenticated, vga.insertVga)
router.get('/get/vga/by/:id=?', bearerAuth.isAuthenticated, vga.getById)
router.put('/update/vga/:id=?', bearerAuth.isAuthenticated, vga.updateVga)
router.delete('/delete/vga/:id=?', bearerAuth.isAuthenticated, vga.deleteVga)

router.get('/get/display', bearerAuth.isAuthenticated, display.getList)
router.post('/add/display', bearerAuth.isAuthenticated, display.InsertDisplay)
router.get('/get/display/by/:id=?', bearerAuth.isAuthenticated, display.getById)
router.put('/update/display/:id=?', bearerAuth.isAuthenticated, display.updateDisplay)
router.delete('/delete/display/:id=?', bearerAuth.isAuthenticated, display.deleteDisplay)

router.get('/get/laptop', bearerAuth.isAuthenticated, laptop.getList)
router.post('/add/laptop', bearerAuth.isAuthenticated, laptop.insertLaptop)
router.get('/get/laptop/by/:id=?', bearerAuth.isAuthenticated, laptop.getById)
router.put('/update/laptop/:id=?', bearerAuth.isAuthenticated, laptop.updatelaptop)
router.delete('/delete/laptop/:id=?', bearerAuth.isAuthenticated, laptop.deleteLaptop)

router.get('/get/bobot', bearerAuth.isAuthenticated, bobot.getList)
router.post('/add/bobot', bearerAuth.isAuthenticated, bobot.insertBobot)
router.get('/get/bobot/by/:id=?', bearerAuth.isAuthenticated, bobot.getById)
router.put('/update/bobot/:id=?', bearerAuth.isAuthenticated, bobot.updateBobot)
router.delete('/delete/bobot/:id=?', bearerAuth.isAuthenticated, bobot.deleteBobot)

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