async function ram(alternatif) {

  const arr = alternatif.map(function (element) {
    return element.ram ** 2;
  });
  const totalRam = arr.reduce((a, b) => a + b);
  const akarRam = [Math.sqrt(totalRam)];

  return akarRam;
};

async function internal(alternatif) {

  const arr = alternatif.map(function (element) {
    return element.internal ** 2;
  });
  const totalInternal = arr.reduce((a, b) => a + b);
  const akarInternal = [Math.sqrt(totalInternal)];

  return akarInternal;
};

async function batrai(alternatif) {

  const arr = alternatif.map(function (element) {
    return element.batrai ** 2;
  });
  const totalBatrai = arr.reduce((a, b) => a + b);
  const akarBatrai = [Math.sqrt(totalBatrai)];

  return akarBatrai;
};

async function kamera(alternatif) {

  const arr = alternatif.map(function (element) {
    return element.kamera ** 2;
  });

  const totalKamera = arr.reduce((a, b) => a + b);
  const akarKamera = [Math.sqrt(totalKamera)];

  return akarKamera;
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
  ram,
  internal,
  batrai,
  kamera,
  harga,
};
