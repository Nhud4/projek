const express = require("express");
const router = express.Router();

const merek = require("../controller/merek");

// merek
router.get("/merek", merek.getDataMerek);
router.get("/merek/:kd_merek", merek.getMerekByKode);
router.post("/merek/add", merek.addMerek);
router.put("/merek/update/", merek.updateMerek);
router.delete("/merek/delete", merek.deleteMerek);
// processor

module.exports = router;
