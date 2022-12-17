import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import UserForm from '../views/user/UserForm'
import RolePlay from '../views/user/RolePlay'
import CommodityClassify from '../views/commodity/CommodityClassify'
import CommodityForm from '../views/commodity/CommodityForm'
import CommodityAudit from '../views/commodity/CommodityAudit'
import OrderForm from '../views/orders/OrderForm'
import CusService from '../views/after-sale/CusService'
import DataStatistics from '../views/statistics/DataStatistics'
import AboutOurs from '../views/our/AboutOurs'
import Default from '../views/home/Default.vue'

const router = new VueRouter({
    
    routes: [{
        path: '/',
        redirect: '/login',
    }, {
        path: '/login',
        component: Login
    }, 
    {
        path:'/default',
        component: Home,
        children: [{
            name: 'defaultHome',
            path: 'defaultHome',
            component: Default
        }]
    },
    {
        path: '/user',
        component: Home,
        children: [{
            name: 'userForm',
            path: 'form',
            component: UserForm
        }, {
            name: 'userRoles',
            path: 'roles',
            component: RolePlay
        }]
    }, {
        path: '/commodity',
        component: Home,
        children: [{
            name: 'commodityClassify',
            path: 'classify',
            component: CommodityClassify
        }, {
            name: 'commodityForm',
            path: 'form',
            component: CommodityForm
        }, {
            name: 'commodityAudit',
            path: 'audit',
            component: CommodityAudit
        }]
    }, {
        path: '/order',
        component: Home,
        children: [{
            name: 'orderForm',
            path: 'form',
            component: OrderForm
        }]
    }, {
        path: '/after-service',
        component: Home,
        children: [{
            name: 'cusService',
            path: 'customer',
            component: CusService
        }]
    }, {
        path: '/statistics',
        component: Home,
        children: [{
            name: 'dataStatistics',
            path: 'index',
            component: DataStatistics
        }]
    }, {
        path: '/about',
        component: Home,
        children: [{
            name: 'aboutOurs',
            path: 'index',
            component: AboutOurs
        }]
    }]
})



export default router