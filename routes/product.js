const express = require("express");
const router = express.Router();

const merek = require("../controller/merek");
const processor = require("../controller/processor");
const ram = require("../controller/ram");
const penyimpanan = require("../controller/penyimpanan");
const display = require("../controller/display");
const vga = require("../controller/vga");
const laptop = require("../controller/lapptop");

// list
const list = require("../bin/api_listTable");
router.get("/list/table", list.listTable);
router.get("/show/table", list.showTable);

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

// penyimpanan
router.get("/penyimpanan", penyimpanan.getPenyimpanan);
router.get("/penyimpanan/bykode", penyimpanan.getPenyimpananByKode);
router.post("/penyimpanan/add", penyimpanan.addPenyimpanan);
router.put("/penyimpanan/update", penyimpanan.updatePenyimpanan);
router.delete("/penyimpanan/delete", penyimpanan.deletePeyimpanan);

// display
router.get("/display", display.getAllDisplay);
router.get("/display/bykode", display.getDisplayByKode);
router.post("/display/add", display.addDisplay);
router.put("/display/update", display.updateDisplay);
router.delete("/display/delete", display.deleteDsiplay);

// vga
router.get("/vga", vga.getAllVga);
router.get("/vga/bykode", vga.getVgaByKode);
router.post("/vga/add", vga.addVga);
router.put("/vga/update", vga.updateVga);
router.delete("/vga/delete", vga.deleteVga);

// laptop
router.post("/laptop/add", laptop.addLaptop);
router.get("/laptop", laptop.getLaptop);
router.get("/laptop/byId", laptop.getLaptopById);
router.put("/laptop/update", laptop.updateLaptop);
router.delete("/laptop/delete", laptop.deleteLaptop);

module.exports = router;
