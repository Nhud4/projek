const jarakIdeal = require("./jarakIdeal");

const preferensi = async () => {
  const n1 = await jarakIdeal.jarakIdealPositif();
  const n2 = await jarakIdeal.jarakIdealNegatif();

  const baris = n2.length;

  const n3 = [];
  for (let i = 0; i < baris; i++) {
    n3[i] = n2[i] + n1[i];
  }

  const hasil = [];
  for (let a = 0; a < n3.length; a++) {
    hasil[a] = n2[a] / n3[a];
  }
  return hasil;
};

module.exports = {
  preferensi,
};
