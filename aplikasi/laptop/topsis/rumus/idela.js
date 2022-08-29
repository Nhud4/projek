async function idealPositif(c1, c2, c3, c4, c5, c6) {

  const nilaiMax = [
    Math.max.apply(null, c1),
    Math.max.apply(null, c2),
    Math.max.apply(null, c3),
    Math.max.apply(null, c4),
    Math.max.apply(null, c5),
    Math.min.apply(null, c6),
  ];

  return nilaiMax;
};

async function idealNegatif(c1, c2, c3, c4, c5, c6) {

  const nilaiMin = [
    Math.min.apply(null, c1),
    Math.min.apply(null, c2),
    Math.min.apply(null, c3),
    Math.min.apply(null, c4),
    Math.min.apply(null, c5),
    Math.max.apply(null, c6),
  ];

  return nilaiMin;
};

module.exports = {
  idealPositif,
  idealNegatif,
};
