async function jarakIdealPositif(c1, c2, c3, c4, c5, c6, positif) {
  // processor
  const langkah1 = c1.map(function (processor) {
    return processor - positif[0];
  });
  const pangkatProcessor = langkah1.map(function (
    langkah1
  ) {
    return Math.pow(langkah1, 2);
  });

  // ram
  const langkah2 = c2.map(function (langkah2) {
    return langkah2 - positif[1];
  });
  const pangkatRam = langkah2.map(function (langkah2) {
    return Math.pow(langkah2, 2);
  });

  // penyimpanan
  const langkah3 = c3.map(function (langkah3) {
    return langkah3 - positif[2];
  });
  const pangkatPenyimpanan = langkah3.map(function (langkah3) {
    return Math.pow(langkah3, 2);
  });

  // vga
  const langkah4 = c4.map(function (langkah4) {
    return langkah4 - positif[3];
  });
  const pangkatVga = langkah4.map(function (langkah4) {
    return Math.pow(langkah4, 2);
  });

  // display
  const langkah5 = c5.map(function (langkah5) {
    return langkah5 - positif[4];
  });
  const pangkatDisplay = langkah5.map(function (langkah5) {
    return Math.pow(langkah5, 2);
  });

  // harga
  const langkah6 = c6.map(function (langkah6) {
    return langkah6 - positif[5];
  });
  const pangkatHarga = langkah6.map(function (langkah6) {
    return Math.pow(langkah6, 2);
  });

  const baris1 = pangkatProcessor.length;
  const tambah = [];
  for (let i = 0; i < baris1; i++) {
    tambah[i] =
      pangkatProcessor[i] +
      pangkatRam[i] +
      pangkatPenyimpanan[i] +
      pangkatVga[i] +
      pangkatDisplay[i] +
      pangkatHarga[i];
  }

  const hasil = tambah.map(function (tambah) {
    return Math.sqrt(tambah);
  });

  return hasil;
};

async function jarakIdealNegatif(c1, c2, c3, c4, c5, c6, negatif) {

  // processor
  const langkah1 = c1.map(function (c1) {
    return c1 - negatif[0];
  });
  const pangkatProcessor = langkah1.map(function (
    langkah1
  ) {
    return Math.pow(langkah1, 2);
  });

  // ram
  const langkah2 = c2.map(function (langkah2) {
    return langkah2 - negatif[1];
  });
  const pangkatRam = langkah2.map(function (langkah2) {
    return Math.pow(langkah2, 2);
  });

  // penyimpanan
  const langkah3 = c3.map(function (langkah3) {
    return langkah3 - negatif[2];
  });
  const pangkatPenyimpanan = langkah3.map(function (langkah3) {
    return Math.pow(langkah3, 2);
  });

  // vga
  const langkah4 = c4.map(function (langkah4) {
    return langkah4 - negatif[3];
  });
  const pangkatVga = langkah4.map(function (langkah4) {
    return Math.pow(langkah4, 2);
  });

  // display
  const langkah5 = c5.map(function (langkah5) {
    return langkah5 - negatif[4];
  });
  const pangkatDisplay = langkah5.map(function (langkah5) {
    return Math.pow(langkah5, 2);
  });

  // harga
  const langkah6 = c6.map(function (langkah6) {
    return langkah6 - negatif[5];
  });
  const pangkatHarga = langkah6.map(function (langkah6) {
    return Math.pow(langkah6, 2);
  });

  const baris1 = pangkatProcessor.length;
  const tambah = [];
  for (let i = 0; i < baris1; i++) {
    tambah[i] =
      pangkatProcessor[i] +
      pangkatRam[i] +
      pangkatPenyimpanan[i] +
      pangkatVga[i] +
      pangkatDisplay[i] +
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
