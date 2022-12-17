import { reqGetCode, reqUserLogin, reqUserRegister, reqUserInfo, reqUserLogout, reqMoblieLogin, updateUserInfo, reqUserInfoById, updateUserAvatar } from "@/api/user"
import { setToken, getToken, removeToken } from "@/utils/token"

// user用户信息小仓库
const state = {
    // 验证码
    code: '',
    // token
    token: getToken(),
    // 用户信息
    userInfo: {}
}

const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    MOBILELOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userinfo) {
        state.userInfo = userinfo
    },
    CLEAR(state) {
        // 清空用户信息与本地token
        state.token = ''
        state.userInfo = {}
        removeToken()
        sessionStorage.removeItem('id')
    },
}

const actions = {
    // 获取验证码
    async getCode({ commit }, mobile) {
        let res = await reqGetCode(mobile)
        if (res.code === 20000) {
            commit("GETCODE", res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('获取验证码失败:' + res.message))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let res = await reqUserRegister(user)
        if (res.code === 20000) {
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }
    },
    // 用户账号密码登录
    async userLogin({ commit }, data) {
        let res = await reqUserLogin(data)
        if (res.code === 20000) {
            commit('USERLOGIN', res.data.token)
            setToken(res.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('用户名或密码错误:' + res.message))
        }
    },
    // 用户手机号登录
    async moblieLogin({ commit }, data) {
        let res = await reqMoblieLogin(data)
        if (res.code === 20000) {
            commit('MOBILELOGIN', res.data.token)
            setToken(res.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('验证码或手机号错误:' + res.message))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let res = await reqUserInfo()
        if (res.code === 20000) {
            commit('GETUSERINFO', res.data.userInfo)
            return 'ok'
        } else if (res.code === 20002 && !getToken()) {
            console.log('游客用户')
        } else {
            return Promise.reject(new Error('获取用户信息失败:' + res.message))
        }
    },
    //根据用户id获取用户信息
    async getUserInfoById({ commit }, id) {
        let res = await reqUserInfoById(id)
        if (res.code === 20000) {
            commit('GETUSERINFO', res.data.userInfo)
            return 'ok'
        } else {
            return Promise.reject(new Error('获取用户信息失败:' + res.message))
        }
    },
    //退出登录
    async userLogout({ commit }) {
        let res = await reqUserLogout()
        if (res.code === 20000) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('退出登录失败:' + res.message))
        }
    },
    // 修改用户信息
    async updateUserInfo({ commit }, data) {
        let res = await updateUserInfo(data)
        if (res.code === 20000) {
            return 'ok'
        } else {
            return Promise.reject(new Error('修改信息失败:' + res.message))
        }
    },
    // 修改用户头像
    async updateUserAvatar({ commit }, data) {
        let res = await updateUserAvatar(data)
        if (res.code === 20000) {
            return 'ok'
        } else {
            return Promise.reject(new Error('修改头像失败:' + res.message))
        }
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}