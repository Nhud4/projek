async function bobotRam(ram) {
    let c1 = []
    if (ram === '4 GB') {
        c1 = 1
    }
    if (ram === '8 GB') {
        c1 = 2
    }
    if (ram === '12 GB') {
        c1 = 3
    }
    if (ram === '16 GB') {
        c1 = 4
    }
    if (ram === '18 GB') {
        c1 = 5
    }

    return c1
}

async function bobotInternal(internal) {
    let c2 = []
    if (internal === '32 GB') {
        c2 = 1
    }
    if (internal === '64 GB') {
        c2 = 2
    }
    if (internal === '128 GB') {
        c2 = 3
    }
    if (internal === '256 GB') {
        c2 = 4
    }
    if (internal === '512 GB') {
        c2 = 5
    }

    return c2
}

async function bobotBatrai(batrai) {
    let c3 = []
    if (batrai === '2000 Mah') {
        c3 = 1
    }
    if (batrai === '3000 Mah' || batrai < '4000 Mah') {
        c3 = 2
    }
    if (batrai === '4000 Mah' || batrai < '5000 Mah') {
        c3 = 3
    }
    if (batrai === '5000 Mah' || batrai < '6000 Mah') {
        c3 = 4
    }
    if (batrai === '6000 Mah' || batrai > '6000 Mah') {
        c3 = 5
    }

    return c3
}

async function bobotKamera(kamera_depan, kamera_belakang) {
    let c4 = []
    if (kamera_depan === '16 MP') {
        if (kamera_belakang < '16 MP') {
            c4 = 1
        }
        if (kamera_belakang === '16 MP' || kamera_belakang < '32 MP') {
            c4 = 2
        }
        if (kamera_belakang === '32 MP' || kamera_belakang < '64 MP') {
            c4 = 3
        }
        if (kamera_belakang === '64 MP' || kamera_belakang < '128 MP') {
            c4 = 4
        }
        if (kamera_belakang === '128 MP' || kamera_belakang > '128 MP') {
            c4 = 5
        }
    }

    if (kamera_depan === '16 MP' || kamera_depan < '32 MP') {
        if (kamera_belakang < '16 MP') {
            c4 = 1
        }
        if (kamera_belakang === '16 MP' || kamera_belakang < '32 MP') {
            c4 = 2
        }
        if (kamera_belakang === '32 MP' || kamera_belakang < '64 MP') {
            c4 = 3
        }
        if (kamera_belakang === '64 MP' || kamera_belakang < '128 MP') {
            c4 = 4
        }
        if (kamera_belakang === '128 MP' || kamera_belakang > '128 MP') {
            c4 = 5
        }
    }

    if (kamera_depan === '32 MP' || kamera_depan < '64 MP') {
        if (kamera_belakang < '16 MP') {
            c4 = 1
        }
        if (kamera_belakang === '16 MP' || kamera_belakang < '32 MP') {
            c4 = 2
        }
        if (kamera_belakang === '32 MP' || kamera_belakang < '64 MP') {
            c4 = 3
        }
        if (kamera_belakang === '64 MP' || kamera_belakang < '128 MP') {
            c4 = 4
        }
        if (kamera_belakang === '128 MP' || kamera_belakang > '128 MP') {
            c4 = 5
        }
    }

    if (kamera_depan === '64 MP' || kamera_depan < '128 MP') {
        if (kamera_belakang < '16 MP') {
            c4 = 1
        }
        if (kamera_belakang === '16 MP' || kamera_belakang < '32 MP') {
            c4 = 2
        }
        if (kamera_belakang === '32 MP' || kamera_belakang < '64 MP') {
            c4 = 3
        }
        if (kamera_belakang === '64 MP' || kamera_belakang < '128 MP') {
            c4 = 4
        }
        if (kamera_belakang === '128 MP') {
            c4 = 5
        }
    }

    if (kamera_depan === '128 MP' || kamera_depan > '128 MP') {
        if (kamera_belakang < '16 MP') {
            c4 = 1
        }
        if (kamera_belakang === '16 MP' || kamera_belakang < '32 MP') {
            c4 = 2
        }
        if (kamera_belakang === '32 MP' || kamera_belakang < '64 MP') {
            c4 = 3
        }
        if (kamera_belakang === '64 MP' || kamera_belakang < '128 MP') {
            c4 = 4
        }
        if (kamera_belakang === '128 MP') {
            c4 = 5
        }
    }

    return c4
}

module.exports = {
    bobotRam,
    bobotInternal,
    bobotBatrai,
    bobotKamera
}