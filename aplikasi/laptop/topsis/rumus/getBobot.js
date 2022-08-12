const mysql = require("mysql2");
const bobot = require("../query/selectBobot");

const getBobotKA1 = async () => {
  const nilai = await bobot.allBobotKA1();
  let array = [];
  for (let i = 0; i < nilai.length; i++) {
    array[i] = nilai[i];
  }

  return array;
};

const getProcessorBobotKA1 = async () => {
  const processor = await bobot.processorBobotKA1();
  let nilai = [];
  for (let i = 0; i < processor.length; i++) {
    nilai[i] = processor[i];
  }

  return nilai;
};

module.exports = {
  getBobotKA1,
  getProcessorBobotKA1,
};
