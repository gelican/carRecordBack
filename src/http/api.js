import {request} from './index'
import transformFormData from '../public/transformFormData'

const api = {
    /**
     * 用户端接口
     */
    login(data) {
        return request('/user/login', 'post', data)
    },
    getMenuList(data) {
        return request('/menu/list', 'post', data)
    },
}

export default api
