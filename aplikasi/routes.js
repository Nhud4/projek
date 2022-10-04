const packageJson = require('../package.json')
const express = require('express')
const BasicAuth = require('./authorization/basic_auth')
const BearerAuth = require('./authorization/bearer_auth')
const Wrapper = require('../helper/utils/wrapper')
const { NotFoundError } = require('../helper/error')
const Uservalidation = require('./validation/auth_validation')
const User = require('./user_auth/user_controller')

const merk = require('./laptop/controller/merk_controller')
const processor = require('./laptop/controller/processor_controller')
const ram = require('./laptop/controller/ram_controller')
const penyimpanan = require('./laptop/controller/penyimpanan_controller')
const vga = require('./laptop/controller/vga_controller')
const display = require('./laptop/controller/display_controller')
const Laptop = require('./laptop/controller/laptop_controller')
const bobot = require('./laptop/controller/bobot_controller')

const Brand = require('./handphone/controller/brand_controller')
const Chipset = require('./handphone/controller/chipset_controller')
const Internal = require('./handphone/controller/internal_controller')
const RamHp = require('./handphone/controller/ram_controller')
const Kamera = require('./handphone/controller/kamera_controller')
const Batrai = require('./handphone/controller/batrai_controller')
const Hp = require('./handphone/controller/hp_controller')
const BobotHp = require('./handphone/controller/bobot_controller')

const TopisisLaptop = require('./laptop/topsis/data')
const TopisisHandphone = require('./handphone/topsis/data')

const basicAuth = new BasicAuth()
const bearerAuth = new BearerAuth()
const wrapper = new Wrapper()
const usrtAuth = new Uservalidation()
const user = new User()
const laptop = new Laptop()

const brand = new Brand()
const chipset = new Chipset()
const internal = new Internal()
const ramHp = new RamHp()
const kamera = new Kamera()
const batrai = new Batrai()
const hp = new Hp()
const bobotHp = new BobotHp()

const topisisLaptop = new TopisisLaptop()
const topisisHandphone = new TopisisHandphone()

const router = express.Router()

router.post("/login", basicAuth.isAuthenticated, usrtAuth.login, user.login)
router.post('/register', basicAuth.isAuthenticated, usrtAuth.register, user.register)
router.get('/count', user.countdata)
router.get('/user/data', user.getUser)
router.delete('/user/delete/:id=?', user.deleteUser)

// laptop
router.get('/get/merk', bearerAuth.isAuthenticated, merk.getList)
router.post('/add/merk', bearerAuth.isAuthenticated, merk.insertMerk)
router.get('/get/merk/by/:id=?', bearerAuth.isAuthenticated, merk.getByKd)
router.put('/update/merk/:id=?', bearerAuth.isAuthenticated, merk.updateMerk)
router.delete('/delete/merk/:id=?', bearerAuth.isAuthenticated, merk.deleteMerk)

router.get('/rentang', laptop.rentang)
router.get('/count/spesifikasi', laptop.countSpesifikasi)
router.get('/count/laptop', bearerAuth.isAuthenticated, laptop.count)

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

router.get('/get/bobot', bobot.getList)
router.post('/add/bobot', bobot.insertBobot)
router.get('/get/bobot/by/:id=?', bobot.getById)
router.put('/update/bobot/:id=?', bobot.updateBobot)
router.delete('/delete/bobot/:id=?', bobot.deleteBobot)

// hp
router.get('/get/brand', bearerAuth.isAuthenticated, brand.getList)
router.post('/add/brand', bearerAuth.isAuthenticated, brand.insertBrand)
router.get('/get/brand/by/:id=?', bearerAuth.isAuthenticated, brand.getById)
router.put('/update/brand/:id=?', bearerAuth.isAuthenticated, brand.updateBrand)
router.delete('/delete/brand/:id=?', bearerAuth.isAuthenticated, brand.deleteBrand)

router.get('/get/chipset', bearerAuth.isAuthenticated, chipset.getList)
router.post('/add/chipset', bearerAuth.isAuthenticated, chipset.insertChipset)
router.get('/get/chipset/by/:id=?', bearerAuth.isAuthenticated, chipset.getById)
router.put('/update/chipset/:id=?', bearerAuth.isAuthenticated, chipset.updateChipset)
router.delete('/delete/chipset/:id+?', bearerAuth.isAuthenticated, chipset.deleteChipset)

router.get('/get/ram/hp', bearerAuth.isAuthenticated, ramHp.getList)
router.post('/add/ram/hp', bearerAuth.isAuthenticated, ramHp.insertRam)
router.get('/get/ram/hp/by/:id=?', bearerAuth.isAuthenticated, ramHp.getById)
router.put('/update/ram/hp/:id=?', bearerAuth.isAuthenticated, ramHp.updateRam)
router.delete('/delete/ram/hp/:id=?', bearerAuth.isAuthenticated, ramHp.deleteRam)

router.get('/get/internal', bearerAuth.isAuthenticated, internal.getList)
router.post('/add/internal', bearerAuth.isAuthenticated, internal.insertInternal)
router.get('/get/internal/by/:id=?', bearerAuth.isAuthenticated, internal.getById)
router.put('/update/internal/:id=?', bearerAuth.isAuthenticated, internal.updateInternal)
router.delete('/delete/internal/:id=?', bearerAuth.isAuthenticated, internal.deleteInternal)

router.get('/get/kamera', bearerAuth.isAuthenticated, kamera.getList)
router.post('/add/kamera', bearerAuth.isAuthenticated, kamera.insertKamera)
router.get('/get/kamera/by/:id=?', bearerAuth.isAuthenticated, kamera.getById)
router.put('/update/kamera/:id=?', bearerAuth.isAuthenticated, kamera.updateKamera)
router.delete('/delete/kamera/:id=?', bearerAuth.isAuthenticated, kamera.deleteKamera)

router.get('/get/batrai', bearerAuth.isAuthenticated, batrai.getList)
router.post('/add/batrai', bearerAuth.isAuthenticated, batrai.insertBatrai)
router.get('/get/batrai/by/:id=?', bearerAuth.isAuthenticated, batrai.getById)
router.put('/update/batrai/:id=?', bearerAuth.isAuthenticated, batrai.updateBtrai)
router.delete('/delete/batrai/:id=?', bearerAuth.isAuthenticated, batrai.deleteBatrai)

router.get('/get/hp', bearerAuth.isAuthenticated, hp.getList)
router.post('/add/hp', bearerAuth.isAuthenticated, hp.insertHp)
router.get('/get/hp/by/:id=?', bearerAuth.isAuthenticated, hp.getbyId)
router.put('/update/hp/:id=?', bearerAuth.isAuthenticated, hp.updateHp)
router.delete('/delete/hp/:id=?', bearerAuth.isAuthenticated, hp.deleteHp)
router.get('/count/handphone', hp.countData)
router.get('/rentang/hanphone', hp.rentang)

router.get('/get/bobot/hp', bobotHp.getList)
router.post('/add/bobot/hp', bobotHp.insertBobot)
router.put('/update/bobot/hp/:id=?', bobotHp.updateBobot)
router.delete('/delete/bobot/hp/:id=?', bobotHp.deleteBobot)

router.post('/topsis/laptop', topisisLaptop.data)
router.post('/topsis/laptop/spek', topisisLaptop.dataSpek)
router.post('/topsis/hanphone', topisisHandphone.data)
router.post('/topsis/hanphone/harga', topisisHandphone.harga)
router.post('/topsis/hanphone/spek', topisisHandphone.spek)

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