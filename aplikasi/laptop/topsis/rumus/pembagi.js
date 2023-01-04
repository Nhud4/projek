async function processor(alternatif) {

  const arr = alternatif.map(function (element) {
    return element.processor ** 2;
  });
  const totalProcessor = arr.reduce((a, b) => a + b);
  const akarProcessor = [Math.sqrt(totalProcessor)];
  return akarProcessor;
};

async function ram(alternatif) {

  const arr = alternatif.map(function (element) {
    return element.ram ** 2;
  });
  const totalRam = arr.reduce((a, b) => a + b);
  const akarRam = [Math.sqrt(totalRam)];

  return akarRam;
};

async function penyimpanan(alternatif) {

  const arr = alternatif.map(function (element) {
    return element.penyimpanan ** 2;
  });
  const totalPenyimpanan = arr.reduce((a, b) => a + b);
  const akarPenyimpanan = [Math.sqrt(totalPenyimpanan)];

  return akarPenyimpanan;
};

async function vga(alternatif) {

  const arr = alternatif.map(function (element) {
    return element.vga ** 2;
  });
  const totalVga = arr.reduce((a, b) => a + b);
  const akarVga = [Math.sqrt(totalVga)];

  return akarVga;
};

async function display(alternatif) {

  const arr = alternatif.map(function (element) {
    return element.display ** 2;
  });

  const totalDisplay = arr.reduce((a, b) => a + b);
  const akarDisplay = [Math.sqrt(totalDisplay)];

  return akarDisplay;
};

async function harga(alternatif) {

  const arr = alternatif.map(function (element) {
    return element.harga ** 2;
  });

  const totalHarga = arr.reduce((a, b) => a + b);
  const akarHarga = [Math.sqrt(totalHarga)];

  return akarHarga;
};

module.exports = {
  processor,
  ram,
  penyimpanan,
  vga,
  display,
  harga,
};
