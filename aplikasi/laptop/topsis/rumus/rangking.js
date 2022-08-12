const preferensi = require("./preferensiAlternatif");

const rangking = async () => {
  const n1 = await preferensi.preferensi();

  const rank = n1.sort((a, b) => b - a);

  return rank;
};

module.exports = {
  rangking,
};
