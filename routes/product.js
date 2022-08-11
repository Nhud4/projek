const express = require("express");
const router = express.Router();

const merk = require('../controller/merk_controller')

router.get('/merk', merk.getList)

module.exports = router;
