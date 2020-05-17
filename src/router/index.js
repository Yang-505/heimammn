import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

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

//暴露出去
export default router;