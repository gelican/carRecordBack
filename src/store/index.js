import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pageType: 'front', // 当前页面是用户界面/管理界面/登录界面 front/behind/login
        userData: {
            userId: '', // 当前登录用户id
            userName: '',  // 用户名
            deptname: '',  // 部门
            name: '',  // 姓名
            code: '',  // 工号
            status: '',  // 状态
            isAdmin: 0,  // 管理员 1
            token: '',
        }, // 当前登录用户的信息
        noLoginApi: [
            '/user/login'
        ], // 当前不验证登录的api列表
    },
    getters: {
        // 获取登录用户信息
        getUserData: (state) => () => {
            let localData = JSON.parse(localStorage.getItem('userData'))
            if (!localData) {
                state.userData = {
                    userId: '', // 当前登录用户id
                    userName: '',  // 用户名
                    deptname: '',  // 部门
                    name: '',  // 姓名
                    code: '',  // 工号
                    status: '',  // 状态
                    isAdmin: 0,  // 管理员 1
                    token: '',
                }
            } else {
                state.userData = localData
            }
            console.log(state.userData)
            return state.userData
        },
    },
    mutations: {
        // 修改登录用户信息
        updateUserData(state, data) {
            state.userData.userId = data.user.id
            state.userData.userName = data.user.userName
            state.userData.deptname = data.user.deptname
            state.userData.name = data.user.name
            state.userData.code = data.user.code
            state.userData.status = data.user.status
            state.userData.isAdmin = data.user.isAdmin
            state.userData.token = data.user.token
            localStorage.setItem('userData', JSON.stringify(state.userData))
        },
        // 删除登录用户信息
        removeUserData(state) {
            state.userData.userId = ''
            state.userData.userName = ''
            state.userData.deptname = ''
            state.userData.name = ''
            state.userData.code = ''
            state.userData.status = ''
            state.userData.isAdmin = 0
            state.userData.token = ''
            localStorage.removeItem('userData')
        },
        // 更新缓存用户信息
        getStorageUserData(state) {
            let storage = JSON.parse(window.localStorage.getItem('userData'))
            state.userData.userId = storage.id
            state.userData.userName = storage.userName
            state.userData.deptname = storage.deptname
            state.userData.name = storage.name
            state.userData.code = storage.code
            state.userData.status = storage.status
            state.userData.isAdmin = storage.isAdmin
            state.userData.token = storage.token
        }
    },
})
