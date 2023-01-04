async function ram(alternatif, pembagiC1) {

  const hasilRam = alternatif.map(function (element) {
    return element.ram / pembagiC1;
  });

  return hasilRam;
};

async function internal(alternatif, pembagiC2) {

  const hasilInternal = alternatif.map(function (element) {
    return element.internal / pembagiC2;
  });

  return hasilInternal;
};

async function batrai(element, pembagiC3) {

  const hasilBatrai = element.map(function (element) {
    return element.batrai / pembagiC3;
  });

  return hasilBatrai;
};

async function kamera(alternatif, pembagiC4) {

  const hasilKamera = alternatif.map(function (element) {
    return element.kamera / pembagiC4;
  });

  return hasilKamera;
};

async function harga(element, pembagiC5) {

  const hasilHarga = element.map(function (element) {
    return element.harga / pembagiC5;
  });

  return hasilHarga;
};

module.exports = {
  ram,
  internal,
  batrai,
  kamera,
  harga,
};
