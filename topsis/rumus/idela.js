const mysql = require("mysql2");
const normalisasi = require("./normalisasiTerbobot");

const idealPositif = async () => {
  const n1 = await normalisasi.normalisasiProcessor();
  const n2 = await normalisasi.normalisasiRam();
  const n3 = await normalisasi.normalisasiPenyimpanan();
  const n4 = await normalisasi.normalisasiVga();
  const n5 = await normalisasi.normalisasiDisplay();
  const n6 = await normalisasi.normalisasiHarga();

  const nilaiMax = [
    Math.max.apply(null, n1),
    Math.max.apply(null, n2),
    Math.max.apply(null, n3),
    Math.max.apply(null, n4),
    Math.max.apply(null, n5),
    Math.min.apply(null, n6),
  ];

  return nilaiMax;
};

const idealNegatif = async () => {
  const n1 = await normalisasi.normalisasiProcessor();
  const n2 = await normalisasi.normalisasiRam();
  const n3 = await normalisasi.normalisasiPenyimpanan();
  const n4 = await normalisasi.normalisasiVga();
  const n5 = await normalisasi.normalisasiDisplay();
  const n6 = await normalisasi.normalisasiHarga();

  const nilaiMin = [
    Math.min.apply(null, n1),
    Math.min.apply(null, n2),
    Math.min.apply(null, n3),
    Math.min.apply(null, n4),
    Math.min.apply(null, n5),
    Math.max.apply(null, n6),
  ];

  return nilaiMin;
};

module.exports = {
  idealPositif,
  idealNegatif,
};
