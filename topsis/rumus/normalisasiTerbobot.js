const bobot = require("../query/selectBobot");
const ternormalisasi = require("./ternormalisasi");

const normalisasiProcessor = async () => {
  const n1 = await bobot.allBobotKA1();
  const n2 = await ternormalisasi.processor();

  const n3 = n1.map(function (element) {
    return element.processor;
  });

  const hasil = n2.map(function (n2) {
    return n2 * n3;
  });
  return hasil;
};

const normalisasiRam = async () => {
  const n1 = await bobot.allBobotKA1();
  const n2 = await ternormalisasi.ram();

  const n3 = n1.map(function (element) {
    return element.ram;
  });

  const hasil = n2.map(function (n2) {
    return n2 * n3;
  });

  return hasil;
};

const normalisasiPenyimpanan = async () => {
  const n1 = await bobot.allBobotKA1();
  const n2 = await ternormalisasi.penyimpanan();

  const n3 = n1.map(function (element) {
    return element.penyimpanan;
  });

  const hasil = n2.map(function (n2) {
    return n2 * n3;
  });

  return hasil;
};

const normalisasiVga = async () => {
  const n1 = await bobot.allBobotKA1();
  const n2 = await ternormalisasi.vga();

  const n3 = n1.map(function (element) {
    return element.vga;
  });

  const hasil = n2.map(function (n2) {
    return n2 * n3;
  });

  return hasil;
};

const normalisasiDisplay = async () => {
  const n1 = await bobot.allBobotKA1();
  const n2 = await ternormalisasi.display();

  const n3 = n1.map(function (element) {
    return element.display;
  });

  const hasil = n2.map(function (n2) {
    return n2 * n3;
  });

  return hasil;
};

const normalisasiHarga = async () => {
  const n1 = await bobot.allBobotKA1();
  const n2 = await ternormalisasi.harga();

  const n3 = n1.map(function (element) {
    return element.harga;
  });

  const hasil = n2.map(function (n2) {
    return n2 * n3;
  });

  return hasil;
};

module.exports = {
  normalisasiProcessor,
  normalisasiRam,
  normalisasiPenyimpanan,
  normalisasiVga,
  normalisasiDisplay,
  normalisasiHarga,
};
