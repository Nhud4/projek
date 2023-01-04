async function preferensi(positif, negatif) {

  const baris = negatif.length;

  const n3 = [];
  for (let i = 0; i < baris; i++) {
    n3[i] = negatif[i] + positif[i];
  }

  const hasil = [];
  for (let a = 0; a < n3.length; a++) {
    hasil[a] = negatif[a] / n3[a];
  }
  return hasil;
};

module.exports = {
  preferensi,
};
