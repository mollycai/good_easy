import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// 引入store
import store from '@/store'
// 引入路由模块
import router from '@/router';
// 引入Ant Design UI
import '@/plugins/design';
//引入图片懒加载插件以及加载动图、默认图片
import VueLazyload from 'vue-lazyload';
import spin from '@/assets/default/spin.gif'
import defalutImg from '@/assets/default/default.jpg'

Vue.use(VueLazyload, {
    error: defalutImg,
    loading: spin,
})

//定义全局组件：在入口文件注册一次之后，在任何组件当中都可以使用
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
//全局组件：第一个参数 组件名字  第二个参数：那个组件
Vue.component(Header.name, Header);
Vue.component(Footer.name, Footer);
// 导入自己封装的axios
import axios from '@/api/request';

// 将axios挂载到Vue的原型对象上
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
    render: h => h(App),
    router,
    store,
    beforeCreate() {
        Vue.prototype.$bus = this
    }
}).$mount('#app');