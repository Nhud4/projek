const express = require("express");
const router = express.Router();

const merek = require("../controller/merek");
const processor = require("../controller/processor");
const ram = require("../controller/ram");

// merek
router.get("/merek", merek.getDataMerek);
router.get("/merek/bykode", merek.getMerekByKode);
router.post("/merek/add", merek.addMerek);
router.put("/merek/update/", merek.updateMerek);
router.delete("/merek/delete", merek.deleteMerek);

// processor
router.get("/processor", processor.getDataProcessor);
router.get("/processor/bykode", processor.getProcessorByKode);
router.post("/processor/add", processor.addProcessor);
router.put("/processor/update", processor.updateProcessor);
router.delete("/processor/delete", processor.deleteProcessor);

// ram
router.get("/ram", ram.getDataRam);
router.get("/ram/bykode", ram.getRamByKode);
router.post("/ram/add", ram.addRam);
router.put("/ram/update", ram.updateRam);
router.delete("/ram/delete", ram.deleteRam);

module.exports = router;
