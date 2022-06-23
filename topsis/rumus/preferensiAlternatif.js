const mysql = require("mysql2");
const jarakIdeal = require("./jarakIdeal");

const preferensi = async () => {
  const nilai1 = await jarakIdeal.jarakIdealPositif();
  const positif = [];
  for (let i = 0; i < nilai1.length; i++) {
    positif[i] = nilai1[i];
  }

  const nilai2 = await jarakIdeal.jarakIdealNegatif();
  const negatif = [];
  for (let a = 0; a < nilai2.length; a++) {
    negatif[a] = nilai2[a];
  }

  const matriks = [
    negatif[0] / (negatif[0] + positif[0]),
    negatif[1] / (negatif[1] + positif[1]),
    negatif[2] / (negatif[2] + positif[2]),
    negatif[3] / (negatif[3] + positif[3]),
  ];

  console.log(matriks);
  return matriks;
};

const rangking = async () => {
  const array = await preferensi();

  const rank = array.sort((a, b) => b - a);

  console.log(rank);
};

module.exports = {
  preferensi,
  rangking,
};
