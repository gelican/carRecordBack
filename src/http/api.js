import { request } from './index'
import transformFormData from '../public/transformFormData'

/**
 * 用户端接口
 */
const user = {
    login(data) {
        return request(`/user/login`, 'post', data)
    },
    getUserList(data) {
        return request('/user/list', 'post', data)
    },
    getUserInfo(id) {
        return request(`/user/info/${id}`, 'get')
    },
    addUser(data) {
        return request(`/user/add`, 'post', data)
    },
    editUser(data) {
        return request(`/user/edit`, 'post', data)
    },
    deleteUser(id) {
        return request(`/user/delete/${id}`, 'get')
    },
}

/**
 * 菜单
 */
const menu = {
    getMenuList(data) {
        return request(`/menu/list`, 'post', data)
    },
    getMenuInfo(id) {
        return request(`/menu/info/${id}`, 'get')
    },
    addMenu(data) {
        return request(`/menu/add`, 'post', data)
    },
    editMenu(data) {
        return request(`/menu/edit`, 'post', data)
    },
    deleteMenu(id) {
        return request(`/menu/delete/${id}`, 'get')
    },
}

/**
 * 角色
 */
const role = {
    getRoleList(data) {
        return request(`/role/list`, 'post', data)
    },
    getRoleInfo(id) {
        return request(`/role/info/${id}`, 'get')
    },
    addRole(data) {
        return request(`/role/add`, 'post', data)
    },
    editRole(data) {
        return request(`/role/edit`, 'post', data)
    },
    deleteRole(id) {
        return request(`/role/delete/${id}`, 'get')
    },
}

const api = {
    ...user,
    ...menu,
    ...role,
}

export default api
