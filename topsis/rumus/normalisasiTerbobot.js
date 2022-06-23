const mysql = require("mysql2");
const bobot = require("../query/selectBobot");
const alternatif = require("./pembagi");

const normalisasiTerbobot = async () => {
  const nilai = await bobot.allBobotKA1();

  let nilaiBobot = [];
  for (let i = 0; i < nilai.length; i++) {
    nilaiBobot[i] = nilai[i];
  }

  const normalisasi = await alternatif.alternatifBobot();

  const normalisasiHasil = [
    [
      normalisasi[0][0] * nilaiBobot[0].processor,
      normalisasi[0][1] * nilaiBobot[0].processor,
      normalisasi[0][2] * nilaiBobot[0].processor,
      normalisasi[0][3] * nilaiBobot[0].processor,
    ],
    [
      normalisasi[1][0] * nilaiBobot[0].ram,
      normalisasi[1][1] * nilaiBobot[0].ram,
      normalisasi[1][2] * nilaiBobot[0].ram,
      normalisasi[1][3] * nilaiBobot[0].ram,
    ],
    [
      normalisasi[2][0] * nilaiBobot[0].penyimpanan,
      normalisasi[2][1] * nilaiBobot[0].penyimpanan,
      normalisasi[2][2] * nilaiBobot[0].penyimpanan,
      normalisasi[2][3] * nilaiBobot[0].penyimpanan,
    ],
    [
      normalisasi[3][0] * nilaiBobot[0].vga,
      normalisasi[3][1] * nilaiBobot[0].vga,
      normalisasi[3][2] * nilaiBobot[0].vga,
      normalisasi[3][3] * nilaiBobot[0].vga,
    ],
    [
      normalisasi[4][0] * nilaiBobot[0].display,
      normalisasi[4][1] * nilaiBobot[0].display,
      normalisasi[4][2] * nilaiBobot[0].display,
      normalisasi[4][3] * nilaiBobot[0].display,
    ],
    [
      normalisasi[5][0] * nilaiBobot[0].harga,
      normalisasi[5][1] * nilaiBobot[0].harga,
      normalisasi[5][2] * nilaiBobot[0].harga,
      normalisasi[5][3] * nilaiBobot[0].harga,
    ],
  ];

  // console.log(normalisasiHasil);
  return normalisasiHasil;
};

module.exports = {
  normalisasiTerbobot,
};
