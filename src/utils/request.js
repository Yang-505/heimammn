import Vue from 'vue'
import axios from 'axios'

//设置基础路径

//暴露 设置基础路径
axios.defaults.baseURL = process.env.VUE_APP_BASEURL

// 允许携带cookie
axios.defaults.withCredentials=true

Vue.prototype.$axios = axios