const ideal = require("./idela");
const normalisasi = require("./normalisasiTerbobot");

const jarakIdealPositif = async () => {
  const processor = await normalisasi.normalisasiProcessor();
  const ram = await normalisasi.normalisasiRam();
  const penyimpanan = await normalisasi.normalisasiPenyimpanan();
  const vga = await normalisasi.normalisasiVga();
  const display = await normalisasi.normalisasiDisplay();
  const harga = await normalisasi.normalisasiHarga();

  const n2 = await ideal.idealPositif();

  // processor
  const penguranganProcessor = processor.map(function (processor) {
    return processor - n2[0];
  });
  const pangkatProcessor = penguranganProcessor.map(function (
    penguranganProcessor
  ) {
    return Math.pow(penguranganProcessor, 2);
  });

  // ram
  const penguranganRam = ram.map(function (penguranganRam) {
    return penguranganRam - n2[1];
  });
  const pangkatRam = penguranganRam.map(function (penguranganRam) {
    return Math.pow(penguranganRam, 2);
  });

  // penyimpanan
  const penguranganPenyimpanan = penyimpanan.map(function (
    penguranganPenyimpanan
  ) {
    return penguranganPenyimpanan - n2[2];
  });
  const pangkatPenyimpanan = penguranganPenyimpanan.map(function (
    penguranganPenyimpanan
  ) {
    return Math.pow(penguranganPenyimpanan, 2);
  });
  // vga
  const penguranganVga = vga.map(function (penguranganVga) {
    return penguranganVga - n2[3];
  });
  const pangkatVga = penguranganVga.map(function (penguranganVga) {
    return Math.pow(penguranganVga, 2);
  });
  // display
  const penguranganDisplay = display.map(function (penguranganDisplay) {
    return penguranganDisplay - n2[4];
  });
  const pangkatDisplay = penguranganDisplay.map(function (penguranganDisplay) {
    return Math.pow(penguranganDisplay, 2);
  });
  // harga
  const penguranganHarga = harga.map(function (penguranganHarga) {
    return penguranganHarga - n2[5];
  });
  const pangkatHarga = penguranganHarga.map(function (penguranganHarga) {
    return Math.pow(penguranganHarga, 2);
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

const jarakIdealNegatif = async () => {
  const processor = await normalisasi.normalisasiProcessor();
  const ram = await normalisasi.normalisasiRam();
  const penyimpanan = await normalisasi.normalisasiPenyimpanan();
  const vga = await normalisasi.normalisasiVga();
  const display = await normalisasi.normalisasiDisplay();
  const harga = await normalisasi.normalisasiHarga();

  const n2 = await ideal.idealNegatif();

  // processor
  const penguranganProcessor = processor.map(function (processor) {
    return processor - n2[0];
  });
  const pangkatProcessor = penguranganProcessor.map(function (
    penguranganProcessor
  ) {
    return Math.pow(penguranganProcessor, 2);
  });

  // ram
  const penguranganRam = ram.map(function (penguranganRam) {
    return penguranganRam - n2[1];
  });
  const pangkatRam = penguranganRam.map(function (penguranganRam) {
    return Math.pow(penguranganRam, 2);
  });

  // penyimpanan
  const penguranganPenyimpanan = penyimpanan.map(function (
    penguranganPenyimpanan
  ) {
    return penguranganPenyimpanan - n2[2];
  });
  const pangkatPenyimpanan = penguranganPenyimpanan.map(function (
    penguranganPenyimpanan
  ) {
    return Math.pow(penguranganPenyimpanan, 2);
  });
  // vga
  const penguranganVga = vga.map(function (penguranganVga) {
    return penguranganVga - n2[3];
  });
  const pangkatVga = penguranganVga.map(function (penguranganVga) {
    return Math.pow(penguranganVga, 2);
  });
  // display
  const penguranganDisplay = display.map(function (penguranganDisplay) {
    return penguranganDisplay - n2[4];
  });
  const pangkatDisplay = penguranganDisplay.map(function (penguranganDisplay) {
    return Math.pow(penguranganDisplay, 2);
  });
  // harga
  const penguranganHarga = harga.map(function (penguranganHarga) {
    return penguranganHarga - n2[5];
  });
  const pangkatHarga = penguranganHarga.map(function (penguranganHarga) {
    return Math.pow(penguranganHarga, 2);
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
