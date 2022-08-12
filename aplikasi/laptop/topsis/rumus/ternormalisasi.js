const pembagi = require("./pembagi");

const processor = async () => {
  const n1 = await pembagi.values();
  const n2 = await pembagi.processor();

  const hasilProcessor = n1.map(function (element) {
    return element.processor / n2;
  });

  return hasilProcessor;
};

const ram = async () => {
  const n1 = await pembagi.values();
  const n2 = await pembagi.ram();

  const hasilRam = n1.map(function (element) {
    return element.ram / n2;
  });

  return hasilRam;
};

const penyimpanan = async () => {
  const n1 = await pembagi.values();
  const n2 = await pembagi.penyimpanan();

  const hasilPenyimpanan = n1.map(function (element) {
    return element.penyimpanan / n2;
  });

  return hasilPenyimpanan;
};

const vga = async () => {
  const n1 = await pembagi.values();
  const n2 = await pembagi.vga();

  const hasilVga = n1.map(function (element) {
    return element.vga / n2;
  });

  return hasilVga;
};

const display = async () => {
  const n1 = await pembagi.values();
  const n2 = await pembagi.display();

  const hasilDisplay = n1.map(function (element) {
    return element.display / n2;
  });

  return hasilDisplay;
};

const harga = async () => {
  const n1 = await pembagi.values();
  const n2 = await pembagi.harga();

  const hasilHarga = n1.map(function (element) {
    return element.harga / n2;
  });

  return hasilHarga;
};

module.exports = {
  processor,
  ram,
  penyimpanan,
  vga,
  display,
  harga,
};
