async function processor(alternatif, pembagiC1) {

  const hasilProcessor = alternatif.map(function (element) {
    return element.processor / pembagiC1;
  });

  return hasilProcessor;
};

async function ram(alternatif, pembagiC2) {

  const hasilRam = alternatif.map(function (element) {
    return element.ram / pembagiC2;
  });

  return hasilRam;
};

async function penyimpanan(alternatif, pembagiC3) {

  const hasilPenyimpanan = alternatif.map(function (element) {
    return element.penyimpanan / pembagiC3;
  });

  return hasilPenyimpanan;
};

async function vga(element, pembagiC4) {

  const hasilVga = element.map(function (element) {
    return element.vga / pembagiC4;
  });

  return hasilVga;
};

async function display(alternatif, pembagiC5) {

  const hasilDisplay = alternatif.map(function (element) {
    return element.display / pembagiC5;
  });

  return hasilDisplay;
};

async function harga(element, pembagiC6) {

  const hasilHarga = element.map(function (element) {
    return element.harga / pembagiC6;
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
