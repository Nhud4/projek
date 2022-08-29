const Wrapper = require('../../../helper/utils/wrapper')
const bobot = require('../domain/bobot_domain')
const Alternatif = require('../domain/alternatif_domain')
const pembagi = require('./rumus/pembagi')
const ternormalisasi = require('./rumus/ternormalisasi')
const normalisasiTerbobot = require('./rumus/normalisasiTerbobot')
const ideal = require('./rumus/idela')
const jarakIdeal = require('./rumus/jarakIdeal')

const alternatif = new Alternatif()
const wrapper = new Wrapper()

class TopisisLaptop {
    async data(req, res) {
        const payload = { ...req.body }

        const dataBobot = await bobot.getByBobot(payload)
        const dataAlternatif = await alternatif.getByKategori(payload)

        const pembagiC1 = await pembagi.processor(dataAlternatif.data)
        const pembagiC2 = await pembagi.ram(dataAlternatif.data)
        const pembagiC3 = await pembagi.penyimpanan(dataAlternatif.data)
        const pembagiC4 = await pembagi.vga(dataAlternatif.data)
        const pembagiC5 = await pembagi.display(dataAlternatif.data)
        const pembagiC6 = await pembagi.harga(dataAlternatif.data)

        const ternormalisasiC1 = await ternormalisasi.processor(dataAlternatif.data, pembagiC1[0])
        const ternormalisasiC2 = await ternormalisasi.ram(dataAlternatif.data, pembagiC2[0])
        const ternormalisasiC3 = await ternormalisasi.penyimpanan(dataAlternatif.data, pembagiC3[0])
        const ternormalisasiC4 = await ternormalisasi.vga(dataAlternatif.data, pembagiC4[0])
        const ternormalisasiC5 = await ternormalisasi.display(dataAlternatif.data, pembagiC5[0])
        const ternormalisasiC6 = await ternormalisasi.harga(dataAlternatif.data, pembagiC6[0])

        const normalisasiTerbobotC1 = await normalisasiTerbobot.processor(ternormalisasiC1, dataBobot.data)
        const normalisasiTerbobotC2 = await normalisasiTerbobot.ram(ternormalisasiC2, dataBobot.data)
        const normalisasiTerbobotC3 = await normalisasiTerbobot.penyimpanan(ternormalisasiC3, dataBobot.data)
        const normalisasiTerbobotC4 = await normalisasiTerbobot.vga(ternormalisasiC4, dataBobot.data)
        const normalisasiTerbobotC5 = await normalisasiTerbobot.display(ternormalisasiC5, dataBobot.data)
        const normalisasiTerbobotC6 = await normalisasiTerbobot.harga(ternormalisasiC6, dataBobot.data)

        const positif = await ideal.idealPositif(
            normalisasiTerbobotC1,
            normalisasiTerbobotC2,
            normalisasiTerbobotC3,
            normalisasiTerbobotC4,
            normalisasiTerbobotC5,
            normalisasiTerbobotC6
        )

        const negatif = await ideal.idealNegatif(
            normalisasiTerbobotC1,
            normalisasiTerbobotC2,
            normalisasiTerbobotC3,
            normalisasiTerbobotC4,
            normalisasiTerbobotC5,
            normalisasiTerbobotC6
        )

        const idealPositif = await jarakIdeal.jarakIdealPositif(
            normalisasiTerbobotC1,
            normalisasiTerbobotC2,
            normalisasiTerbobotC3,
            normalisasiTerbobotC4,
            normalisasiTerbobotC5,
            normalisasiTerbobotC6,
            positif
        )

        const idealNegatif = await jarakIdeal.jarakIdealNegatif(
            normalisasiTerbobotC1,
            normalisasiTerbobotC2,
            normalisasiTerbobotC3,
            normalisasiTerbobotC4,
            normalisasiTerbobotC5,
            normalisasiTerbobotC6,
            negatif
        )

        const data = {
            bobot: dataBobot.data[0],
            alternatif: dataAlternatif.data[0],
            pembagi: {
                c1: pembagiC1[0],
                c2: pembagiC2[0],
                c3: pembagiC3[0],
                c4: pembagiC4[0],
                c5: pembagiC5[0],
                c6: pembagiC6[0]
            },
            alternatifTerbobot: {
                c1: ternormalisasiC1,
                c2: ternormalisasiC2,
                c3: ternormalisasiC3,
                c4: ternormalisasiC4,
                c5: ternormalisasiC5,
                c6: ternormalisasiC6
            },
            normalisasiTerbobot: {
                c1: normalisasiTerbobotC1,
                c2: normalisasiTerbobotC2,
                c3: normalisasiTerbobotC3,
                c4: normalisasiTerbobotC4,
                c5: normalisasiTerbobotC5,
                c6: normalisasiTerbobotC6
            },
            idealPositif: positif,
            idealNegatif: negatif,
            jarakIdealPositif: idealPositif,
            jarakIdealNegatif: idealNegatif
        }

        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }
}

module.exports = TopisisLaptop