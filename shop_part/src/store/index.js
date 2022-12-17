import Vue from 'vue';
// 引入vuex
import vuex from 'vuex';
// 需要使用一次插件
Vue.use(vuex);

// 引入小仓库
import user from './user';
import square from './square';
import good from './good';
import shopcart from './shopcart';
import trade from './trade';
//对外暴露store的一个实例
export default new vuex.Store({
    // 实现vuex仓库模块式开发存储数据
    modules: {
        user,
        square,
        good,
        shopcart,
        trade
    }
});