import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('@/view/home.vue'),
        children: [
        ],
    },
    {
        path: '/login',
        component: () => import('@/view/login.vue'),
        children: [
        ],
    },
    {
        path: '/404',
        component: () => import('@/view/404.vue'),
        children: [
        ],
    },
]

let router = new VueRouter({
    mode: 'hash',
    routes
})

export default router;
