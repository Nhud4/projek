async function ram(c1, bobot) {

  const n1 = bobot.map(function (element) {
    return element.ram;
  });

  const hasil = c1.map(function (nilai) {
    return nilai * n1;
  });

  return hasil;
};

async function internal(c2, bobot) {

  const n1 = bobot.map(function (element) {
    return element.internal;
  });

  const hasil = c2.map(function (nilai) {
    return nilai * n1;
  });

  return hasil;
};

async function batrai(c3, bobot) {

  const n1 = bobot.map(function (element) {
    return element.batrai;
  });

  const hasil = c3.map(function (nilai) {
    return nilai * n1;
  });

  return hasil;
};

async function kamera(c4, bobot) {

  const n1 = bobot.map(function (element) {
    return element.kamera;
  });

  const hasil = c4.map(function (nilai) {
    return nilai * n1;
  });

  return hasil;
};

async function harga(c5, bobot) {

  const n1 = bobot.map(function (element) {
    return element.harga;
  });

  const hasil = c5.map(function (nilai) {
    return nilai * n1;
  });

  return hasil;
};

module.exports = {
  ram,
  internal,
  batrai,
  kamera,
  harga,
};
