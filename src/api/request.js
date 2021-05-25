/*
* axios封装
* */
import axios from "axios";
import {message} from "antd";
/*创建axios实例*/
const service = axios.create({
    // baseURL: 'http://39.100.225.255:5000',
    timeout: 5000
})

/*
* 请求拦截
* */
service.interceptors.request.use(config => {
        console.log(config)
        const token = localStorage.getItem('Token')
        if (token) {
            config.headers['auth_token'] = token
        }
        return config
    }, error => {
        return Promise.reject(error)
    }
)


/*
* 响应拦截器
* */
service.interceptors.response.use(response => {
        console.log(response)
        const status = Number(response.status) || 200
        if (status !== 200) {
            /*请求出错的情况下拦截，提示错误信息*/
            message.error(response.data.message)

        }
        /*请求成功抛出*/
        return response.data
    }, error => {
        /*请求出错的情况下拦截，不抛出*/
        message.error(error.message)
        // return Promise.reject(error)
        // return
    }
)
export default service