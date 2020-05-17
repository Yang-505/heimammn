import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

//导入路由
import Login from '../views/login/index'
import Layout from '../views/layout/index.vue'

const router = new VueRouter({
    routers:[
        {
            //路由重定向
            path:'/',
            redirect:'/login'
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/layout',
            component:Layout
        }
    ],
});

//暴露出去
export default router;