async function processor(c1, bobot) {

  const n1 = bobot.map(function (element) {
    return element.processor;
  });

  const hasil = c1.map(function (nilai) {
    return nilai * n1;
  });

  return hasil;
};

async function ram(c2, bobot) {

  const n1 = bobot.map(function (element) {
    return element.ram;
  });

  const hasil = c2.map(function (nilai) {
    return nilai * n1;
  });

  return hasil;
};

async function penyimpanan(c3, bobot) {

  const n1 = bobot.map(function (element) {
    return element.penyimpanan;
  });

  const hasil = c3.map(function (nilai) {
    return nilai * n1;
  });

  return hasil;
};

async function vga(c4, bobot) {

  const n1 = bobot.map(function (element) {
    return element.vga;
  });

  const hasil = c4.map(function (nilai) {
    return nilai * n1;
  });

  return hasil;
};

async function display(c5, bobot) {

  const n1 = bobot.map(function (element) {
    return element.display;
  });

  const hasil = c5.map(function (nilai) {
    return nilai * n1;
  });

  return hasil;
};

async function harga(c6, bobot) {

  const n1 = bobot.map(function (element) {
    return element.harga;
  });

  const hasil = c6.map(function (nilai) {
    return nilai * n1;
  });

  return hasil;
};

module.exports = {
  processor,
  ram,
  penyimpanan,
  vga,
  display,
  harga,
};
