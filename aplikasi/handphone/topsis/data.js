const Wrapper = require('../../../helper/utils/wrapper')
const Bobot = require('../domain/bobot_domain')
const Alternatif = require('../domain/alternatif_hp_domain')
const pembagi = require('./rumus/pembagi')
const ternormalisasi = require('./rumus/ternormalisasi')
const normalisasiTerbobot = require('./rumus/normalisasiTerbobot')
const ideal = require('./rumus/idela')
const jarakIdeal = require('./rumus/jarakIdeal')
const preferensi = require('./rumus/preferensiAlternatif')
const rank = require('./rumus/rangking')

const alternatif = new Alternatif()
const wrapper = new Wrapper()
const bobot = new Bobot()

class TopisisHandphone {
    async data(req, res) {
        const dataBobot = await bobot.getList()
        const dataAlternatif = await alternatif.getList()

        const pembagiC1 = await pembagi.ram(dataAlternatif.data)
        const pembagiC2 = await pembagi.internal(dataAlternatif.data)
        const pembagiC3 = await pembagi.batrai(dataAlternatif.data)
        const pembagiC4 = await pembagi.kamera(dataAlternatif.data)
        const pembagiC5 = await pembagi.harga(dataAlternatif.data)

        const ternormalisasiC1 = await ternormalisasi.ram(dataAlternatif.data, pembagiC1[0])
        const ternormalisasiC2 = await ternormalisasi.internal(dataAlternatif.data, pembagiC2[0])
        const ternormalisasiC3 = await ternormalisasi.batrai(dataAlternatif.data, pembagiC3[0])
        const ternormalisasiC4 = await ternormalisasi.kamera(dataAlternatif.data, pembagiC4[0])
        const ternormalisasiC5 = await ternormalisasi.harga(dataAlternatif.data, pembagiC5[0])

        const normalisasiTerbobotC1 = await normalisasiTerbobot.ram(ternormalisasiC1, dataBobot.data)
        const normalisasiTerbobotC2 = await normalisasiTerbobot.internal(ternormalisasiC2, dataBobot.data)
        const normalisasiTerbobotC3 = await normalisasiTerbobot.batrai(ternormalisasiC3, dataBobot.data)
        const normalisasiTerbobotC4 = await normalisasiTerbobot.kamera(ternormalisasiC4, dataBobot.data)
        const normalisasiTerbobotC5 = await normalisasiTerbobot.harga(ternormalisasiC5, dataBobot.data)

        const positif = await ideal.idealPositif(
            normalisasiTerbobotC1,
            normalisasiTerbobotC2,
            normalisasiTerbobotC3,
            normalisasiTerbobotC4,
            normalisasiTerbobotC5
        )

        const negatif = await ideal.idealNegatif(
            normalisasiTerbobotC1,
            normalisasiTerbobotC2,
            normalisasiTerbobotC3,
            normalisasiTerbobotC4,
            normalisasiTerbobotC5
        )

        const idealPositif = await jarakIdeal.jarakIdealPositif(
            normalisasiTerbobotC1,
            normalisasiTerbobotC2,
            normalisasiTerbobotC3,
            normalisasiTerbobotC4,
            normalisasiTerbobotC5,
            positif
        )

        const idealNegatif = await jarakIdeal.jarakIdealNegatif(
            normalisasiTerbobotC1,
            normalisasiTerbobotC2,
            normalisasiTerbobotC3,
            normalisasiTerbobotC4,
            normalisasiTerbobotC5,
            negatif
        )

        const nilaiPrefrensi = await preferensi.preferensi(idealPositif, idealNegatif)

        const rangking = await rank.rangking(nilaiPrefrensi)

        const dataAlter = dataAlternatif.data.map(item => {
            return item.hp
        })

        const arr = [
            dataAlter,
            ternormalisasiC1,
            ternormalisasiC2,
            ternormalisasiC3,
            ternormalisasiC4,
            ternormalisasiC5
        ]

        var row = arr[0].length;
        var column = arr.length;
        var dataTerbobot = new Array();

        for (let i = 0; i < row; i++) {
            dataTerbobot[i] = new Array()
            for (let j = 0; j < column; j++) {
                dataTerbobot[i][j] = arr[j][i]
            }

        }

        const arrNT = [
            dataAlter,
            normalisasiTerbobotC1,
            normalisasiTerbobotC2,
            normalisasiTerbobotC3,
            normalisasiTerbobotC4,
            normalisasiTerbobotC5
        ]

        var row = arrNT[0].length;
        var column = arrNT.length;
        var dataNT = new Array();

        for (let i = 0; i < row; i++) {
            dataNT[i] = new Array()
            for (let j = 0; j < column; j++) {
                dataNT[i][j] = arrNT[j][i]
            }

        }

        const rankData = [
            dataAlter,
            nilaiPrefrensi,
            rangking
        ]

        var row = rankData[0].length;
        var column = rankData.length;
        var dataRank = new Array();

        for (let i = 0; i < row; i++) {
            dataRank[i] = new Array()
            for (let j = 0; j < column; j++) {
                dataRank[i][j] = rankData[j][i]
            }
        }

        const dataJI = [dataAlter, idealPositif, idealNegatif]

        var row = dataJI[0].length;
        var column = dataJI.length;
        var dataJarak = new Array();

        for (let i = 0; i < row; i++) {
            dataJarak[i] = new Array()
            for (let j = 0; j < column; j++) {
                dataJarak[i][j] = dataJI[j][i]
            }
        }

        const data = {
            bobot: dataBobot.data[0],
            alternatif: dataAlternatif.data,
            pembagi: {
                c1: pembagiC1[0],
                c2: pembagiC2[0],
                c3: pembagiC3[0],
                c4: pembagiC4[0],
                c5: pembagiC5[0]
            },
            alternatifTerbobot: dataTerbobot,
            normalisasiTerbobot: dataNT,
            idealPositif: positif,
            idealNegatif: negatif,
            jarakIdeal: dataJarak,
            preferensi: dataRank,
        }

        return wrapper.response(res, 200, {
            message: 'berhasil mendapatkan data',
            code: 200,
            data,
            success: true
        })
    }
}

module.exports = TopisisHandphone