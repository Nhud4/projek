const getBobot = require("../rumus/getBobot");
const getAlternatif = require("../query/alternatifQuery");
const pembagi = require("../rumus/pembagi");
const normalisasi = require("../rumus/ternormalisasi");
const normalisasiTerbobot = require("../rumus/normalisasiTerbobot");
const ideal = require("../rumus/idela");
const jarak = require("../rumus/jarakIdeal");

const resBobot = async () => {
  try {
    const nilai = await getBobot.getBobotKA1();

    return nilai;
  } catch (error) {
    return error;
  }
};

const resAlternatif = async () => {
  try {
    const nilai = await pembagi.values();

    return nilai;
  } catch (error) {
    return error;
  }
};

const tbPembagi = async () => {
  try {
    const c1 = await pembagi.processor();
    const c2 = await pembagi.ram();
    const c3 = await pembagi.penyimpanan();
    const c4 = await pembagi.vga();
    const c5 = await pembagi.display();
    const c6 = await pembagi.harga();

    const array = [].concat(c1, c2, c3, c4, c5, c6);

    return array;
  } catch (error) {
    return error;
  }
};

const tbNormalisasi = async () => {
  try {
    const nilai = [
      await normalisasi.processor(),
      await normalisasi.ram(),
      await normalisasi.penyimpanan(),
      await normalisasi.vga(),
      await normalisasi.display(),
      await normalisasi.harga(),
    ];

    return nilai;
  } catch (error) {
    return error;
  }
};

const tbNormalisasiTerbobot = async () => {
  try {
    const nilai = [
      await normalisasiTerbobot.normalisasiProcessor(),
      await normalisasiTerbobot.normalisasiRam(),
      await normalisasiTerbobot.normalisasiPenyimpanan(),
      await normalisasiTerbobot.normalisasiVga(),
      await normalisasiTerbobot.normalisasiDisplay(),
      await normalisasiTerbobot.normalisasiHarga(),
    ];

    return nilai;
  } catch (error) {
    return error;
  }
};

const tbIdeal = async (req, res) => {
  try {
    const nilai = [await ideal.idealPositif(), await ideal.idealNegatif()];

    return nilai;
  } catch (error) {
    return error;
  }
};

const tbJarakIdeal = async () => {
  try {
    const nilai = [
      await jarak.jarakIdealPositif(),
      await jarak.jarakIdealNegatif(),
    ];

    return nilai;
  } catch (error) {
    return error;
  }
};

module.exports = {
  resBobot,
  resAlternatif,
  tbPembagi,
  tbNormalisasi,
  tbNormalisasiTerbobot,
  tbIdeal,
  tbJarakIdeal,
};
