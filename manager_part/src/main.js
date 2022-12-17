import './assets/css/global.css'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
//引入store
import store from './store'
//引入路由模块
import router from './router'
//引入Ant Design UI
import './plugins/design'
//引入axios进行请求
import axios from 'axios'
import {message } from 'ant-design-vue'

//配置请求根路径
axios.defaults.baseURL = 'http://139.9.48.23:8080/manage'
//请求拦截器
axios.interceptors.request.use(config => {
     const token = window.sessionStorage.getItem('token')
     //如果token存在则发送
     if (token) config.headers.Authorization = token
     return config
}, (error) => {
    return Promise.reject(error)
  })
//响应拦截器
axios.interceptors.response.use(response => {
  return response
},
  error => {
  console.log(error)
  //如果返回403
        if (error.response.status === 403) {
         message.error( '登陆过期请重新登陆！')  
        //清除token
         window.sessionStorage.clear();
         //跳转到登录页面重新登录
              router.push({
                path:'/'
              })
          }
        
}

)
Vue.prototype.$http = axios 

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
    render: h => h(App),
    router,
    store,
    beforeCreate() {
        Vue.prototype.$bus = this
    }
}).$mount('#app')