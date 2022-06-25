const express = require("express");
const router = express.Router();

const merek = require("../controller/merek");
const processor = require("../controller/processor");
const ram = require("../controller/ram");
const penyimpanan = require("../controller/penyimpanan");
const display = require("../controller/display");
const vga = require("../controller/vga");
const laptop = require("../controller/lapptop");
const game = require("../controller/asset/game");
const design = require("../controller/asset/design");
const office = require("../controller/asset/office");
const bobot = require("../topsis/bobot");
const alternatif = require("../topsis/alternatif");

const gameKa1 = require("../topsis/request/request");

router.get("/game/by", gameKa1.gameKa1);

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

// ketentaun game
router.post("/ketentuan/game/processor/add", game.addKetentuanProcessorGame);
router.get("/ketentuan/game/processor", game.getKetentuanProcessorGame);
router.put(
  "/ketentuan/game/processor/update",
  game.updateKetentuanProcessorgame
);
router.post("/ketentuan/game/ram/add", game.addKetentuanRamGame);
router.get("/ketentuan/game/ram", game.getKetentuanRamGame);
router.put("/ketentuan/game/ram/update", game.updateKetentuanRamGame);
router.post("/ketentuan/game/vga/add", game.addKetentuanVgaGame);
router.get("/ketentuan/game/vga", game.getKetentuanVgaGame);
router.put("/ketentuan/game/vga/update", game.updateKetentuanVgaGame);
router.post(
  "/ketentuan/game/penyimpanan/add",
  game.addKetentuanPenyimpananGame
);
router.get("/ketentuan/game/penyimpanan", game.getKetentuanPenyimpananGame);
router.put(
  "/ketentuan/game/penyimpanan/update",
  game.updateKetentuanPenyimpananGame
);
router.post("/ketentuan/game/display/add", game.addKetentuanDisplayGame);
router.get("/ketentuan/game/display", game.getKetentuanDisplayGame);
router.put("/ketentuan/game/display/update", game.updateKetentuanDispalyGame);

// ketentuan design
router.post(
  "/ketntuan/design/processor/add",
  design.addKetentuanProcessorDesign
);
router.get("/ketentuan/design/processor", design.getKetentuanProcessorDesign);
router.put(
  "/ketentuan/design/processor/update",
  design.updateKetentuanProcessorDesign
);

router.post("/ketentuan/design/ram/add", design.addKetentuanRamDesign);
router.get("/ketentuan/design/ram", design.getKetentuanRamDesign);
router.put("/ketentuan/design/ram/update", design.updateKetentuanRamDesign);

router.post(
  "/ketentuan/design/penyimpanan/add",
  design.addKetentuanPenyimpananDesign
);
router.get(
  "/ketentuan/design/penyimpanan",
  design.getKetentuanPenyimpananDesign
);
router.put(
  "/ketentuan/design/penyimpanan/update",
  design.updateKetentuanPenyimpananDesign
);

router.post("/ketentuan/design/vga/add", design.addKetentuanVgaDesign);
router.get("/ketentuan/design/vga", design.getKetentuanVgaDesign);
router.put("/ketentuan/design/vga/update", design.updateKetentuanVgaDesign);

router.post("/ketentuan/design/display/add", design.addKetentuanDisplayDesign);
router.get("/ketentuan/design/display", design.getKetentuanDisplayDesign);
router.put(
  "/ketentuan/design/display/update",
  design.updateKetentuanDispalyDesign
);

// ketentuan office
router.post(
  "/ketentuan/office/processor/add",
  office.addKetentuanProcessorOffice
);
router.get("/ketentuan/office/processor", office.getKetentuanProcessorOffice);
router.put(
  "/ketentuan/office/processor/update",
  office.updateKetentuanProcessorOffice
);

router.post("/ketentuan/office/ram/add", office.addKetentuanRamOffice);
router.get("/ketentuan/office/ram", office.getKetentuanRamOffice);
router.put("/ketentuan/office/update", office.updateKetentuanRamOffice);

router.post(
  "/ketentuan/office/penyimpanan/add",
  office.addKetentuanPenyimpananOffice
);
router.get(
  "/ketentuan/office/penyimpanan",
  office.getKetentuanPenyimpananOffice
);
router.put(
  "/ketentuan/office/penyimpanan/update",
  office.updateKetentuanPenyimpananOffice
);

router.post("/ketentuan/office/vga/add", office.addKetentuanVgaOffice);
router.get("/ketentuan/office/vga", office.getKetentuanVgaOffice);
router.put("/ketentuan/office/vga/update", office.updateKetentuanVgaOffice);

router.post("/ketentuan/office/display/add", office.addKetentuanDisplayOffice);
router.get("/ketentuan/office/display", office.getKetentuanDisplayOffice);
router.put(
  "/ketentuan/office/display/update",
  office.updateKetentuanDispalyOffice
);

router.post("/bobot/add", bobot.addDataBobot);
router.get("/bobot", bobot.getBobot);
router.put("/bobot/update", bobot.updateBobot);

router.post("/alternatif/add", alternatif.addAlternatif);
router.get("/alternatif", alternatif.getAlternatif);
router.put("/alternatif/update", alternatif.updateAlternatif);

module.exports = router;
