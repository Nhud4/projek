const bodyParser = require("body-parser");
const responseKA1 = require("../respoense/responseKA1");
const preferensi = require("../rumus/preferensiAlternatif");
const rank = require("../rumus/rangking");

const gameKa1 = async (req, res) => {
  const bobot = await responseKA1.resBobot();
  const alternatif = await responseKA1.resAlternatif();
  const pembagi = await responseKA1.tbPembagi();
  const normalisasi = await responseKA1.tbNormalisasi();
  const normalisasiTerbobot = await responseKA1.tbNormalisasiTerbobot();
  const ideal = await responseKA1.tbIdeal();
  const jarakIdeal = await responseKA1.tbJarakIdeal();
  const refrensi = await preferensi.preferensi();
  const rangking = await rank.rangking();

  const post = {
    kriteria: req.body.kriteria,
    subKriteria: req.body.subKriteria,
  };

  if (post.kriteria === "game") {
    if (post.subKriteria === "berat") {
      res.send({
        message: "rekomendasi data game berat",
        bobot,
        alternatif,
        pembagi,
        normalisasi,
        normalisasiTerbobot,
        ideal,
        jarakIdeal,
        refrensi,
        rangking,
      });
    }
  } else {
    res.send("tidak ada");
  }
};

module.exports = {
  gameKa1,
};
