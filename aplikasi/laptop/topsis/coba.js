const response = require("../bin/res");
const bodyParser = require("body-parser");
const connection = require("../connection/db_connection");
const mysql = require("mysql2");

exports.alternatif = async (req, res) => {
  const data = [
    (alternatif = ["Acer", "Assus", "HP", "Lenuvo"]),
    (kriteria = ["Processro", "RAM", "Penyimpanan", "VGA", "Display", "Harga"]),
    (costBenefit = [
      "benefit",
      "benefit",
      "benefit",
      "benefit",
      "benefit",
      "cost",
    ]),
    (kepentingan = ["5", "5", "4", "4", "4", "4"]),
    (nilai = [
      [1, 3, 3, 2, 2, 4645000],
      [5, 4, 3, 3, 1, 6600000],
      [5, 3, 3, 2, 2, 5675000],
      [5, 5, 4, 4, 3, 11749000],
    ]),
  ];

  const pembagi = [
    Math.sqrt(
      Math.pow(data[4][0][0], 2) +
        Math.pow(data[4][1][0], 2) +
        Math.pow(data[4][2][0], 2) +
        Math.pow(data[4][3][0], 2)
    ),
    Math.sqrt(
      Math.pow(data[4][0][1], 2) +
        Math.pow(data[4][1][1], 2) +
        Math.pow(data[4][2][1], 2) +
        Math.pow(data[4][3][1], 2)
    ),
    Math.sqrt(
      Math.pow(data[4][0][2], 2) +
        Math.pow(data[4][1][2], 2) +
        Math.pow(data[4][2][2], 2) +
        Math.pow(data[4][3][2], 2)
    ),
    Math.sqrt(
      Math.pow(data[4][0][3], 2) +
        Math.pow(data[4][1][3], 2) +
        Math.pow(data[4][2][3], 2) +
        Math.pow(data[4][3][3], 2)
    ),
    Math.sqrt(
      Math.pow(data[4][0][4], 2) +
        Math.pow(data[4][1][4], 2) +
        Math.pow(data[4][2][4], 2) +
        Math.pow(data[4][3][4], 2)
    ),
    Math.sqrt(
      Math.pow(data[4][0][5], 2) +
        Math.pow(data[4][1][5], 2) +
        Math.pow(data[4][2][5], 2) +
        Math.pow(data[4][3][5], 2)
    ),
  ];

  const ternormalisasi = [
    (t1 = [
      data[4][0][0] / pembagi[0],
      data[4][1][0] / pembagi[0],
      data[4][2][0] / pembagi[0],
      data[4][3][0] / pembagi[0],
    ]), // dikali 5 data[3][0]
    (t2 = [
      data[4][0][1] / pembagi[1],
      data[4][1][1] / pembagi[1],
      data[4][2][1] / pembagi[1],
      data[4][3][1] / pembagi[1],
    ]), // dikali 5 data[3][1]
    (t3 = [
      data[4][0][2] / pembagi[2],
      data[4][1][2] / pembagi[2],
      data[4][2][2] / pembagi[2],
      data[4][3][2] / pembagi[2],
    ]), // dikali 4 data[3][2]
    (t4 = [
      data[4][0][3] / pembagi[3],
      data[4][1][3] / pembagi[3],
      data[4][2][3] / pembagi[3],
      data[4][3][3] / pembagi[3],
    ]), // dikali 4 data[3][3]
    (t5 = [
      data[4][0][4] / pembagi[4],
      data[4][1][4] / pembagi[4],
      data[4][2][4] / pembagi[4],
      data[4][3][4] / pembagi[4],
    ]), // dikali 4 data[3][4]
    (t6 = [
      data[4][0][5] / pembagi[5],
      data[4][1][5] / pembagi[5],
      data[4][2][5] / pembagi[5],
      data[4][3][5] / pembagi[5],
    ]), // dikali 4 data[3][5]
  ];

  const normalisasiBobot = [
    (nb1 = [
      ternormalisasi[0][0] * data[3][0],
      ternormalisasi[0][1] * data[3][0],
      ternormalisasi[0][2] * data[3][0],
      ternormalisasi[0][3] * data[3][0],
    ]),
    (nb1 = [
      ternormalisasi[1][0] * data[3][1],
      ternormalisasi[1][1] * data[3][1],
      ternormalisasi[1][2] * data[3][1],
      ternormalisasi[1][3] * data[3][1],
    ]),
    (nb1 = [
      ternormalisasi[2][0] * data[3][2],
      ternormalisasi[2][1] * data[3][2],
      ternormalisasi[2][2] * data[3][2],
      ternormalisasi[2][3] * data[3][2],
    ]),
    (nb1 = [
      ternormalisasi[3][0] * data[3][3],
      ternormalisasi[3][1] * data[3][3],
      ternormalisasi[3][2] * data[3][3],
      ternormalisasi[3][3] * data[3][3],
    ]),
    (nb1 = [
      ternormalisasi[4][0] * data[3][4],
      ternormalisasi[4][1] * data[3][4],
      ternormalisasi[4][2] * data[3][4],
      ternormalisasi[4][3] * data[3][4],
    ]),
    (nb1 = [
      ternormalisasi[5][0] * data[3][5],
      ternormalisasi[5][1] * data[3][5],
      ternormalisasi[5][2] * data[3][5],
      ternormalisasi[5][3] * data[3][5],
    ]),
  ];

  const max = [
    Math.max.apply(null, normalisasiBobot[0]),
    Math.max.apply(null, normalisasiBobot[1]),
    Math.max.apply(null, normalisasiBobot[2]),
    Math.max.apply(null, normalisasiBobot[3]),
    Math.max.apply(null, normalisasiBobot[4]),
    Math.min.apply(null, normalisasiBobot[5]),
  ];

  const min = [
    Math.min.apply(null, normalisasiBobot[0]),
    Math.min.apply(null, normalisasiBobot[1]),
    Math.min.apply(null, normalisasiBobot[2]),
    Math.min.apply(null, normalisasiBobot[3]),
    Math.min.apply(null, normalisasiBobot[4]),
    Math.max.apply(null, normalisasiBobot[5]),
  ];

  const D1 = [
    Math.sqrt(
      Math.pow(max[0] - normalisasiBobot[0][0], 2) +
        Math.pow(max[1] - normalisasiBobot[1][0], 2) +
        Math.pow(max[2] - normalisasiBobot[2][0], 2) +
        Math.pow(max[3] - normalisasiBobot[3][0], 2) +
        Math.pow(max[4] - normalisasiBobot[4][0], 2) +
        Math.pow(max[5] - normalisasiBobot[5][0], 2)
    ),
    Math.sqrt(
      Math.pow(max[0] - normalisasiBobot[0][1], 2) +
        Math.pow(max[1] - normalisasiBobot[1][1], 2) +
        Math.pow(max[2] - normalisasiBobot[2][1], 2) +
        Math.pow(max[3] - normalisasiBobot[3][1], 2) +
        Math.pow(max[4] - normalisasiBobot[4][1], 2) +
        Math.pow(max[5] - normalisasiBobot[5][1], 2)
    ),
    Math.sqrt(
      Math.pow(max[0] - normalisasiBobot[0][2], 2) +
        Math.pow(max[1] - normalisasiBobot[1][2], 2) +
        Math.pow(max[2] - normalisasiBobot[2][2], 2) +
        Math.pow(max[3] - normalisasiBobot[3][2], 2) +
        Math.pow(max[4] - normalisasiBobot[4][2], 2) +
        Math.pow(max[5] - normalisasiBobot[5][2], 2)
    ),
    Math.sqrt(
      Math.pow(max[0] - normalisasiBobot[0][3], 2) +
        Math.pow(max[1] - normalisasiBobot[1][3], 2) +
        Math.pow(max[2] - normalisasiBobot[2][3], 2) +
        Math.pow(max[3] - normalisasiBobot[3][3], 2) +
        Math.pow(max[4] - normalisasiBobot[4][3], 2) +
        Math.pow(max[5] - normalisasiBobot[5][3], 2)
    ),
  ];

  const D2 = [
    Math.sqrt(
      Math.pow(min[0] - normalisasiBobot[0][0], 2) +
        Math.pow(min[1] - normalisasiBobot[1][0], 2) +
        Math.pow(min[2] - normalisasiBobot[2][0], 2) +
        Math.pow(min[3] - normalisasiBobot[3][0], 2) +
        Math.pow(min[4] - normalisasiBobot[4][0], 2) +
        Math.pow(min[5] - normalisasiBobot[5][0], 2)
    ),
    Math.sqrt(
      Math.pow(min[0] - normalisasiBobot[0][1], 2) +
        Math.pow(min[1] - normalisasiBobot[1][1], 2) +
        Math.pow(min[2] - normalisasiBobot[2][1], 2) +
        Math.pow(min[3] - normalisasiBobot[3][1], 2) +
        Math.pow(min[4] - normalisasiBobot[4][1], 2) +
        Math.pow(min[5] - normalisasiBobot[5][1], 2)
    ),
    Math.sqrt(
      Math.pow(min[0] - normalisasiBobot[0][2], 2) +
        Math.pow(min[1] - normalisasiBobot[1][2], 2) +
        Math.pow(min[2] - normalisasiBobot[2][2], 2) +
        Math.pow(min[3] - normalisasiBobot[3][2], 2) +
        Math.pow(min[4] - normalisasiBobot[4][2], 2) +
        Math.pow(min[5] - normalisasiBobot[5][2], 2)
    ),
    Math.sqrt(
      Math.pow(min[0] - normalisasiBobot[0][3], 2) +
        Math.pow(min[1] - normalisasiBobot[1][3], 2) +
        Math.pow(min[2] - normalisasiBobot[2][3], 2) +
        Math.pow(min[3] - normalisasiBobot[3][3], 2) +
        Math.pow(min[4] - normalisasiBobot[4][3], 2) +
        Math.pow(min[5] - normalisasiBobot[5][3], 2)
    ),
  ];

  const refersi = [
    D2[0] / (D2[0] + D1[0]),
    D2[1] / (D2[1] + D1[1]),
    D2[2] / (D2[2] + D1[2]),
    D2[3] / (D2[3] + D1[3]),
  ];
  response.ok(refersi, res);
};
