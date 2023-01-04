const Wrapper = require('../../../helper/utils/wrapper')
const bobot = require('../domain/bobot_domain')
const Alternatif = require('../domain/alternatif_domain')
const pembagi = require('./rumus/pembagi')
const ternormalisasi = require('./rumus/ternormalisasi')
const normalisasiTerbobot = require('./rumus/normalisasiTerbobot')
const ideal = require('./rumus/idela')
const jarakIdeal = require('./rumus/jarakIdeal')
const preferensi = require('./rumus/preferensiAlternatif')
const rank = require('./rumus/rangking')

const alternatif = new Alternatif()
const wrapper = new Wrapper()

class TopisisLaptop {
    async data(req, res) {
        const payload = { ...req.body }

        const dataBobot = await bobot.getByBobot(payload)
        if (dataBobot instanceof Error) return wrapper.responseError(res, dataBobot)

        const dataAlternatif = await alternatif.getByKategori(payload)
        if (dataAlternatif instanceof Error) return wrapper.responseError(res, dataAlternatif)

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

        const nilaiPrefrensi = await preferensi.preferensi(idealPositif, idealNegatif)

        const rangking = await rank.rangking(nilaiPrefrensi)

        const dataAlter = dataAlternatif.data.map(item => {
            return item.laptop
        })

        const arr = [
            dataAlter,
            ternormalisasiC1,
            ternormalisasiC2,
            ternormalisasiC3,
            ternormalisasiC4,
            ternormalisasiC5,
            ternormalisasiC6
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
            normalisasiTerbobotC5,
            normalisasiTerbobotC6
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
            bobot: {
                id: dataBobot.data[0].id,
                bobot: dataBobot.data[0].bobot,
                processor: dataBobot.data[0].processor,
                ram: dataBobot.data[0].ram,
                penyimpanan: dataBobot.data[0].penyimpanan,
                vga: dataBobot.data[0].vga,
                display: dataBobot.data[0].display,
                harga: dataBobot.data[0].harga
            },
            alternatif: dataAlternatif.data,
            pembagi: {
                c1: pembagiC1[0],
                c2: pembagiC2[0],
                c3: pembagiC3[0],
                c4: pembagiC4[0],
                C5: pembagiC5[0],
                c6: pembagiC6[0]
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

    async dataSpek(req, res) {
        const payload = { ...req.body }

        const dataBobot = await bobot.getByBobot(payload)
        if (dataBobot instanceof Error) return wrapper.responseError(res, dataBobot)

        const dataAlternatif = await alternatif.getAlternatifSpek(payload)
        if (dataAlternatif instanceof Error) return wrapper.responseError(res, dataAlternatif)

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

        const nilaiPrefrensi = await preferensi.preferensi(idealPositif, idealNegatif)

        const rangking = await rank.rangking(nilaiPrefrensi)

        const dataAlter = dataAlternatif.data.map(item => {
            return item.laptop
        })

        const arr = [
            dataAlter,
            ternormalisasiC1,
            ternormalisasiC2,
            ternormalisasiC3,
            ternormalisasiC4,
            ternormalisasiC5,
            ternormalisasiC6
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
            normalisasiTerbobotC5,
            normalisasiTerbobotC6
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
            bobot: {
                id: dataBobot.data[0].id,
                bobot: dataBobot.data[0].bobot,
                processor: dataBobot.data[0].processor,
                ram: dataBobot.data[0].ram,
                penyimpanan: dataBobot.data[0].penyimpanan,
                vga: dataBobot.data[0].vga,
                display: dataBobot.data[0].display,
                harga: dataBobot.data[0].harga
            },
            alternatif: dataAlternatif.data,
            pembagi: {
                c1: pembagiC1[0],
                c2: pembagiC2[0],
                c3: pembagiC3[0],
                c4: pembagiC4[0],
                c5: pembagiC5[0],
                c6: pembagiC6[0]
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

module.exports = TopisisLaptop