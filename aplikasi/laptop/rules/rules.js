class Bobot {
    async kategori(processor) {

        let data = []
        if (processor < '3,0 Ghz') {

            data = {
                ka: 1,
                kb: 4,
                kc: 7
            }
        }
        if (processor === '3,0 Ghz' || processor < '4,5 Ghz') {
            data = {
                ka: 2,
                kb: 5,
                kc: 8
            }
        }
        if (processor === '4,5 Ghz' || processor > '4,5 Ghz') {
            data = {
                ka: 3,
                kb: 6,
                kc: 8
            }
        }

        return data
    }

    async bobotProcessor(processor) {
        let c1 = []

        if (processor < '2,0 Ghz') {
            c1 = 1
        }
        if (processor === '2,0 Ghz' || processor < '3,0 Ghz') {
            c1 = 2
        }
        if (processor === '3,0 Ghz' || processor < '3,5 Ghz') {
            c1 = 3
        }
        if (processor === '3,5 Ghz' || processor < '4,5 Ghz') {
            c1 = 4
        }
        if (processor === '4,5 Ghz' || processor > '4,5 Ghz') {
            c1 = 5
        }
        return c1
    }

    async bobotRam(ram) {
        let c2 = []
        if (ram < '2 Gb') {
            c2 = 1
        }
        if (ram === '2 Gb') {
            c2 = 2
        }
        if (ram === '4 Gb') {
            c2 = 3
        }
        if (ram === '8 Gb') {
            c2 = 4
        }
        if (ram === '16 Gb') {
            c2 = 5
        }
        return c2
    }

    async bobotPenyimpanan(penyimpanan) {
        let c3 = []
        if (penyimpanan < '128 Gb') {
            c3 = 1
        }
        if (penyimpanan === '128 Gb') {
            c3 = 2
        }
        if (penyimpanan === '256 Gb') {
            c3 = 3
        }
        if (penyimpanan === '512 Gb') {
            c3 = 4
        }
        if (penyimpanan === '1 Tb' && penyimpanan > '1 Tb') {
            c3 = 5
        }
        return c3
    }

    async bobotVga(vga) {
        let c4 = []
        if (vga < '1 Gb') {
            c4 = 1
        }
        if (vga == '1 Gb') {
            c4 = 2
        }
        if (vga === '2 Gb') {
            c4 = 3
        }
        if (vga === '4 Gb') {
            c4 = 4
        }
        if (vga > '4 Gb') {
            c4 = 5
        }
        return c4
    }

    async bobotDisplay(display) {
        let c5 = []
        if (display === '13 Inc') {
            c5 = 1
        }
        if (display === '14 Inc') {
            c5 = 2
        }
        if (display === '15 Inc') {
            c5 = 3
        }
        if (display === '16 Inc') {
            c5 = 4
        }
        return c5
    }
}

module.exports = Bobot