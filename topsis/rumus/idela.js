const mysql = require("mysql2");
const normalisasi = require("./normalisasiTerbobot");

const idealPositif = async () => {
  const nilaiNormalisasi = await normalisasi.normalisasiTerbobot();

  const nilaiMax = [
    Math.max.apply(null, nilaiNormalisasi[0]),
    Math.max.apply(null, nilaiNormalisasi[1]),
    Math.max.apply(null, nilaiNormalisasi[2]),
    Math.max.apply(null, nilaiNormalisasi[3]),
    Math.max.apply(null, nilaiNormalisasi[4]),
    Math.min.apply(null, nilaiNormalisasi[5]),
  ];

  // console.log(nilaiMax);
  return nilaiMax;
};

const idealNegatif = async () => {
  const nilaiNormalisasi = await normalisasi.normalisasiTerbobot();

  const nilaiMin = [
    Math.min.apply(null, nilaiNormalisasi[0]),
    Math.min.apply(null, nilaiNormalisasi[1]),
    Math.min.apply(null, nilaiNormalisasi[2]),
    Math.min.apply(null, nilaiNormalisasi[3]),
    Math.min.apply(null, nilaiNormalisasi[4]),
    Math.max.apply(null, nilaiNormalisasi[5]),
  ];

  // console.log(nilaiMin);
  return nilaiMin;
};

module.exports = {
  idealPositif,
  idealNegatif,
};
