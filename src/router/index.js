import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import {getToken} from '@/utils/token'
//导入组件
import Login from "@/views/login";
import Layout from "@/views/layout";

const router = new VueRouter({
    routes:[
        {
            path:"/",
            redirect:"/login"
        },
        {
            path:"/login",
            component:Login
        },
        {
            path:"/layout",
            component:Layout
        }
    ]
});

//全局导航守卫
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    if (to.fullPath == '/login') {
        next();
    } else {
        //你要去非登录页面,这个时候,我们先判断你是否登录了,如果登录了,让你走,没有登录则回到登录页面
        const token = getToken();
        if (token) {
            //代表登录
            next();
        } else {
            alert('token没有,没有登录');
            next('/login');
        }
    }
});


//暴露出去
export default router;