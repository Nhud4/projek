const alternatif = require("../query/alternatifQuery");

const values = async () => {
  const nilai = await alternatif.allAlternatif();

  const array = [];
  for (let i = 0; i < nilai.length; i++) {
    array[i] = nilai[i];
  }
  return array;
};

const processor = async () => {
  const array = await values();
  const processor = array.map(function (element) {
    return element.processor ** 2;
  });
  const totalProcessor = processor.reduce((a, b) => a + b);
  const akarProcessor = [Math.sqrt(totalProcessor)];

  return akarProcessor;
};

const ram = async () => {
  const array = await values();
  const ram = array.map(function (element) {
    return element.ram ** 2;
  });
  const totalRam = ram.reduce((a, b) => a + b);
  const akarRam = [Math.sqrt(totalRam)];

  return akarRam;
};

const penyimpanan = async () => {
  const array = await values();
  const penyimpanan = array.map(function (element) {
    return element.penyimpanan ** 2;
  });
  const totalPenyimpanan = penyimpanan.reduce((a, b) => a + b);
  const akarPenyimpanan = [Math.sqrt(totalPenyimpanan)];

  return akarPenyimpanan;
};

const vga = async () => {
  const array = await values();
  const vga = array.map(function (element) {
    return element.vga ** 2;
  });
  const totalVga = vga.reduce((a, b) => a + b);
  const akarVga = [Math.sqrt(totalVga)];

  return akarVga;
};

const display = async () => {
  const array = await values();
  const display = array.map(function (element) {
    return element.display ** 2;
  });
  const totalDisplay = display.reduce((a, b) => a + b);
  const akarDisplay = [Math.sqrt(totalDisplay)];

  return akarDisplay;
};

const harga = async () => {
  const array = await values();
  const harga = array.map(function (element) {
    return element.harga ** 2;
  });
  const totalHarga = harga.reduce((a, b) => a + b);
  const akarHarga = [Math.sqrt(totalHarga)];

  return akarHarga;
};

module.exports = {
  values,
  processor,
  ram,
  penyimpanan,
  vga,
  display,
  harga,
};
