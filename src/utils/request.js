import Vue from 'vue'
import axios from 'axios'
import { getToken,removeToken } from '@/utils/token'
import router from '@/router'
//暴露 设置基础路径
//设置基础路径
axios.defaults.baseURL = process.env.VUE_APP_BASEURL

//请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = getToken();
    if (token) {
        config.headers.token = token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


//响应拦截器
axios.interceptors.response.use(
    function(response){
        if(response.data.code == 206){//token 过期了
            //移出token
            removeToken();
            //跳转到登录页面
            router.push('/login');

            return;
        }
        return response;
    },
    function(error){
        return Promise.reject(error);
    }
)


// // 允许携带cookie
axios.defaults.withCredentials = true

Vue.prototype.$axios = axios