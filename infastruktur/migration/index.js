const merk = require('./laptop/merk')
const processor = require('./laptop/processor')
const ram = require('./laptop/ram')
const penyimpanan = require('./laptop/penyimpanan')
const vga = require('./laptop/vga')
const display = require('./laptop/display')
const laptop = require('./laptop/laptop')
const bobot = require('./laptop/bobot')

const spesifikasi = require('./handphone/spesifikasi')
const handphone = require('./handphone/handphone')

const init = async () => {
    await merk()
    await processor()
    await ram()
    await penyimpanan()
    await vga()
    await display()
    await laptop()
    await bobot()
    await spesifikasi()
    await handphone()
}

module.exports = {
    init
}