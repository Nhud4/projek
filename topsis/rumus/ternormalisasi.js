const pembagi = require("./pembagi");

const processor = async () => {
  const n1 = await pembagi.values();
  const n2 = await pembagi.processor();

  const hasilProcessor = n1.map(function (element) {
    return element.processor / n2;
  });

  console.log(hasilProcessor);
  return hasilProcessor;
};

const ram = async () => {
  const n1 = await pembagi.values();
  const n2 = await pembagi.ram();

  const hasilRam = n1.map(function (element) {
    return element.ram / n2;
  });

  console.log(hasilRam);
  return hasilRam;
};

module.exports = {
  processor,
};
