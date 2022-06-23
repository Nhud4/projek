const mysql = require("mysql2");
const ideal = require("./idela");
const normalisasi = require("./normalisasiTerbobot");

const jarakIdealPositif = async () => {
  const nilai = await normalisasi.normalisasiTerbobot();
  const terbobot = [];
  for (let a = 0; a < nilai.length; a++) {
    terbobot[a] = nilai[a];
  }

  const nilaiIdeal = await ideal.idealPositif();

  const positif = [];
  for (let i = 0; i < nilaiIdeal.length; i++) {
    positif[i] = nilaiIdeal[i];
  }

  const jarakPositif = [
    Math.sqrt(
      Math.pow(positif[0] - terbobot[0][0], 2) +
        Math.pow(positif[1] - terbobot[1][0], 2) +
        Math.pow(positif[2] - terbobot[2][0], 2) +
        Math.pow(positif[3] - terbobot[3][0], 2) +
        Math.pow(positif[4] - terbobot[4][0], 2) +
        Math.pow(positif[5] - terbobot[5][0], 2)
    ),
    Math.sqrt(
      Math.pow(positif[0] - terbobot[0][1], 2) +
        Math.pow(positif[1] - terbobot[1][1], 2) +
        Math.pow(positif[2] - terbobot[2][1], 2) +
        Math.pow(positif[3] - terbobot[3][1], 2) +
        Math.pow(positif[4] - terbobot[4][1], 2) +
        Math.pow(positif[5] - terbobot[5][1], 2)
    ),
    Math.sqrt(
      Math.pow(positif[0] - terbobot[0][2], 2) +
        Math.pow(positif[1] - terbobot[1][2], 2) +
        Math.pow(positif[2] - terbobot[2][2], 2) +
        Math.pow(positif[3] - terbobot[3][2], 2) +
        Math.pow(positif[4] - terbobot[4][2], 2) +
        Math.pow(positif[5] - terbobot[5][2], 2)
    ),
    Math.sqrt(
      Math.pow(positif[0] - terbobot[0][3], 2) +
        Math.pow(positif[1] - terbobot[1][3], 2) +
        Math.pow(positif[2] - terbobot[2][3], 2) +
        Math.pow(positif[3] - terbobot[3][3], 2) +
        Math.pow(positif[4] - terbobot[4][3], 2) +
        Math.pow(positif[5] - terbobot[5][3], 2)
    ),
  ];

  //   console.log(jarakPositif);
  return jarakPositif;
};

const jarakIdealNegatif = async () => {
  const nilai = await normalisasi.normalisasiTerbobot();
  const terbobot = [];
  for (let a = 0; a < nilai.length; a++) {
    terbobot[a] = nilai[a];
  }
  const nilaiIdeal = await ideal.idealNegatif();

  const negatif = [];
  for (let i = 0; i < nilaiIdeal.length; i++) {
    negatif[i] = nilaiIdeal[i];
  }

  const jarakNegatif = [
    Math.sqrt(
      Math.pow(negatif[0] - terbobot[0][0], 2) +
        Math.pow(negatif[1] - terbobot[1][0], 2) +
        Math.pow(negatif[2] - terbobot[2][0], 2) +
        Math.pow(negatif[3] - terbobot[3][0], 2) +
        Math.pow(negatif[4] - terbobot[4][0], 2) +
        Math.pow(negatif[5] - terbobot[5][0], 2)
    ),
    Math.sqrt(
      Math.pow(negatif[0] - terbobot[0][1], 2) +
        Math.pow(negatif[1] - terbobot[1][1], 2) +
        Math.pow(negatif[2] - terbobot[2][1], 2) +
        Math.pow(negatif[3] - terbobot[3][1], 2) +
        Math.pow(negatif[4] - terbobot[4][1], 2) +
        Math.pow(negatif[5] - terbobot[5][1], 2)
    ),
    Math.sqrt(
      Math.pow(negatif[0] - terbobot[0][2], 2) +
        Math.pow(negatif[1] - terbobot[1][2], 2) +
        Math.pow(negatif[2] - terbobot[2][2], 2) +
        Math.pow(negatif[3] - terbobot[3][2], 2) +
        Math.pow(negatif[4] - terbobot[4][2], 2) +
        Math.pow(negatif[5] - terbobot[5][2], 2)
    ),
    Math.sqrt(
      Math.pow(negatif[0] - terbobot[0][3], 2) +
        Math.pow(negatif[1] - terbobot[1][3], 2) +
        Math.pow(negatif[2] - terbobot[2][3], 2) +
        Math.pow(negatif[3] - terbobot[3][3], 2) +
        Math.pow(negatif[4] - terbobot[4][3], 2) +
        Math.pow(negatif[5] - terbobot[5][3], 2)
    ),
  ];
  //   console.log(jarakNegatif);
  return jarakNegatif;
};

module.exports = {
  jarakIdealPositif,
  jarakIdealNegatif,
};
