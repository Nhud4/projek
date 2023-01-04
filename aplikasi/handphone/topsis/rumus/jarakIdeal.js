async function jarakIdealPositif(c1, c2, c3, c4, c5, positif) {

  // ram
  const langkah1 = c1.map(function (langkah1) {
    return langkah1 - positif[0];
  });
  const pangkatRam = langkah1.map(function (langkah1) {
    return Math.pow(langkah1, 2);
  });

  // internal
  const langkah2 = c2.map(function (langkah2) {
    return langkah2 - positif[1];
  });
  const pangkatInternal = langkah2.map(function (langkah2) {
    return Math.pow(langkah2, 2);
  });

  // batrai
  const langkah3 = c3.map(function (langkah3) {
    return langkah3 - positif[2];
  });
  const pangkatBatrai = langkah3.map(function (langkah3) {
    return Math.pow(langkah3, 2);
  });

  // kamera
  const langkah4 = c4.map(function (langkah4) {
    return langkah4 - positif[3];
  });
  const pangkatKamera = langkah4.map(function (langkah4) {
    return Math.pow(langkah4, 2);
  });

  // harga
  const langkah5 = c5.map(function (langkah5) {
    return langkah5 - positif[4];
  });
  const pangkatHarga = langkah5.map(function (langkah5) {
    return Math.pow(langkah5, 2);
  });

  const baris1 = pangkatRam.length;
  const tambah = [];
  for (let i = 0; i < baris1; i++) {
    tambah[i] =
      pangkatRam[i] +
      pangkatInternal[i] +
      pangkatBatrai[i] +
      pangkatKamera[i] +
      pangkatHarga[i];
  }

  const hasil = tambah.map(function (tambah) {
    return Math.sqrt(tambah);
  });

  return hasil;
};

async function jarakIdealNegatif(c1, c2, c3, c4, c5, negatif) {

  // ram
  const langkah1 = c1.map(function (langkah1) {
    return langkah1 - negatif[0];
  });
  const pangkatRam = langkah1.map(function (langkah1) {
    return Math.pow(langkah1, 2);
  });

  // Internal
  const langkah2 = c2.map(function (langkah2) {
    return langkah2 - negatif[1];
  });
  const pangkatInternal = langkah2.map(function (langkah2) {
    return Math.pow(langkah2, 2);
  });

  // Batrai
  const langkah3 = c3.map(function (langkah3) {
    return langkah3 - negatif[2];
  });
  const pangkatBatrai = langkah3.map(function (langkah3) {
    return Math.pow(langkah3, 2);
  });

  // Kamera
  const langkah4 = c4.map(function (langkah4) {
    return langkah4 - negatif[3];
  });
  const pangkatKamera = langkah4.map(function (langkah4) {
    return Math.pow(langkah4, 2);
  });

  // harga
  const langkah5 = c5.map(function (langkah5) {
    return langkah5 - negatif[4];
  });
  const pangkatHarga = langkah5.map(function (langkah5) {
    return Math.pow(langkah5, 2);
  });

  const baris1 = pangkatRam.length;
  const tambah = [];
  for (let i = 0; i < baris1; i++) {
    tambah[i] =
      pangkatRam[i] +
      pangkatInternal[i] +
      pangkatBatrai[i] +
      pangkatKamera[i] +
      pangkatHarga[i];
  }

  const hasil = tambah.map(function (tambah) {
    return Math.sqrt(tambah);
  });

  return hasil;
};

module.exports = {
  jarakIdealPositif,
  jarakIdealNegatif,
};
