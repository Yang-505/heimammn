import Vue from 'vue'
import axios from 'axios'
import { getToken } from '@/utils/token.js'
//设置基础路径

//暴露 设置基础路径
axios.defaults.baseURL = process.env.VUE_APP_BASEURL

//请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = getToken();
    if (token) {
        config.headers.token = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 允许携带cookie
axios.defaults.withCredentials = true

Vue.prototype.$axios = axios