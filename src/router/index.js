import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import { getToken } from '@/utils/token'

//导入页面
import Login from "@/views/login";
import Layout from "@/views/layout";
import Chart from '@/views/layout/chart';
import Enterprise from '@/views/layout/enterprise';
import Question from '@/views/layout/question';
import Subject from '@/views/layout/subject';
import User from '@/views/layout/user';
import Welcome from '@/views/layout/welcome'

//以下是测试的
import Slot3 from '@/test/slot3/index'

const router = new VueRouter({
    routes: [
        {// 重定向
            path: "/",
            redirect: "/login"
        },
        {
            path: "/login",
            component: Login
        },
        {
            path: "/layout",
            component: Layout, children: [
                { path: 'welcome', component: Welcome },
                { path: 'chart', component: Chart },
                { path: 'enterprise', component: Enterprise },
                { path: 'question', component: Question },
                { path: 'subject', component: Subject },
                { path: 'user', component: User },
            ]
        },
        //下面是测试的路由
        {path:'/slot3',component:Slot3}
    ]
});

//全局导航守卫
router.beforeEach((to, from, next) => {
    // console.log(to);
    // console.log(from);
    // console.log(next);
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