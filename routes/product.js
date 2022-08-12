const express = require("express");
const router = express.Router();

const merk = require('../aplikasi/laptop/controller/merk_controller')

router.get('/merk', merk.getList)

module.exports = router;
