const {
    InternalServerError,
    UnprocessableEntityError,
    UnauthorizedError,
    NotFoundError
} = require('../../helper/error')
const Password = require('../../helper/utils/password')
const AuthModel = require('./user_repo')
const Count = require('../../infastruktur/repositories/alternatif_hp_repo')

const authModel = new AuthModel()
const passwordUtils = new Password()
const count = new Count()

class AuthDomain {
    async Login(paylaod) {
        const { username, password } = paylaod

        const getUser = await authModel.getByUsername(username)
        if (getUser.err) {
            return new InternalServerError('fail to get user')
        }
        // if User exists, check password
        if (getUser.data.length > 0) {
            const isPasswordValid = await passwordUtils.compare(password, getUser.data[0].password)
            if (!isPasswordValid) {
                return new UnauthorizedError('username or password is incorrect')
            }
            return getUser
        }
    }

    async getList() {
        const getList = await authModel.getList()
        if (getList.err) {
            return new InternalServerError('fail to get data')
        }
        return getList
    }

    async insertUser(payload) {
        const {
            name,
            phone,
            username,
            password,
            konfirm_password,
            user_extent
        } = payload
        const getByName = await authModel.getByName(name)
        if (getByName.err) {
            return new InternalServerError('fail to get data')
        }
        if (getByName.data.length > 0) {
            return new UnprocessableEntityError('unprocesseble entity', [{
                field: 'name',
                message: 'name already exists'
            }])
        }

        const getByPhone = await authModel.getByPhone(phone)
        if (getByPhone.err) {
            return new InternalServerError('fail to get data')
        }
        if (getByPhone.data.length > 0) {
            return new UnprocessableEntityError('unprocesseble entity', [{
                field: 'phone',
                message: 'phone already exists'
            }])
        }

        const getByUsername = await authModel.getByUsername(username)
        if (getByUsername.err) {
            return new InternalServerError('fail to get data')
        }
        if (getByUsername.data.length > 0) {
            return new UnprocessableEntityError('unprocesseble entity', [{
                field: 'username',
                message: 'username already exists'
            }])
        }

        if (konfirm_password !== password) {
            return new UnprocessableEntityError('unprocesseble entity', [{
                field: 'password',
                message: 'konfirmasi password tidak sama'
            }])
        }

        // hash password
        const hashPasword = await passwordUtils.hash(password)

        const insertUser = await authModel.insertUser(
            name,
            phone,
            username,
            hashPasword,
            user_extent
        )
        if (insertUser.err) {
            return new InternalServerError('fail to add user')
        }
        return insertUser
    }

    async deleteUser(payload) {
        const { id } = payload
        const getById = await authModel.getById(id)
        if (getById.err) {
            return new InternalServerError('fail to get data')
        }
        if (getById.data.length === 0) {
            return new NotFoundError('data not found')
        }

        const deleteUser = await authModel.deleteUser(id)
        if (deleteUser.err) {
            return new InternalServerError('fail to delete user')
        }
        return deleteUser
    }

    async count() {
        const admin = await authModel.countAdmin()
        const super_admin = await authModel.countSuperAdmin()
        const user = await authModel.countUser()
        const laptop = await count.countLaptop()
        const hp = await count.countHp()

        if (admin.err || super_admin.err || laptop.err || hp.err) {
            return new InternalServerError('fail to get data')
        }

        const dataCount = {
            admin: admin.data[0].admin,
            super_admin: super_admin.data[0].super_user,
            total_user: user.data[0].user,
            laptop: parseInt(laptop.data[0].laptop),
            hp: parseInt(hp.data[0].hp)
        }

        return dataCount
    }
}

module.exports = AuthDomain