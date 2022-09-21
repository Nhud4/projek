const {
    InternalServerError,
    NotFoundError
} = require('../../../helper/error')
const CountModel = require('../../../infastruktur/repositories/count')

const model = new CountModel()
class CountDomain {
    async count() {
        const HP = await model.merkHP()
        if (HP.err) {
            return new InternalServerError('fail to get data')
        }

        const lenuvo = await model.merkLenuvo()
        if (lenuvo.err) {
            return new InternalServerError('fail to get data')
        }

        const acer = await model.merkAcer()
        if (acer.err) {
            return new InternalServerError('fail to get data')
        }

        const assus = await model.merkAssus()
        if (assus.err) {
            return new InternalServerError('fail to get data')
        }

        const dell = await model.merkDell()
        if (dell.err) {
            return new InternalServerError('fail to get data')
        }

        const count = {
            hp: HP.data.length,
            lenuvo: lenuvo.data.length,
            acer: acer.data.length,
            assus: assus.data.length,
            dell: dell.data.length
        }

        return count
    }
}

module.exports = CountDomain