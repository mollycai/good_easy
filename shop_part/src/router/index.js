//引入vue-router路由插件
import VueRouter from 'vue-router';
//引入Vue
import Vue from "vue";
import routes from "./routes";
//使用插件
Vue.use(VueRouter);
//引入store
import store from '@/store';
// 保存VueRouter原型对象中的push|replace
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace
// location：告诉原来的push方法，你往哪里跳转（传递哪些参数）
// resolve：成功的回调
// reject：失败的回调
//重写VueRouter.prototype身上的push方法
VueRouter.prototype.push = function(location, resolve, reject) {
    //第一个形参：路由跳转的配置对象（query|params）
    //第二个参数：undefined|箭头函数（成功的回调）
    //第三个参数:undefined|箭头函数（失败的回调）
    if (resolve && reject) {
        //push方法传递第二个参数|第三个参数（箭头函数）
        //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
        originPush.call(this, location, resolve, reject);
    } else {
        //push方法没有传递第二个参数|第三个参数
        originPush.call(this, location, () => {}, () => {});
    }
};
//重写VueRouter.prototype身上的replace方法
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {}, () => {});
    }
};
//对外暴露VueRouter类的实例
const router = new VueRouter({
    //配置路由注意：
    //1.路径的前面需要有/(不是二级路由)
    //2.路径中单词都是小写的
    //3.component右侧V别加单引号【字符串：组件是对象（VueComponent类的实例）】
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        //返回的这个y=0，代表的滚动条在最上方
        return { y: 0 };
    },
})

// 挂载全局前置守卫
//to:获取到要跳转到的路由信息
//from：获取到从哪个路由跳转过来来的信息
//next: next() 放行  next(path) 放行  
router.beforeEach(async(to, from, next) => {
    // console.log(to, from, next)
    // 拿出token
    let token = store.state.user.token;
    // 拿出用户名
    let name = store.state.user.token;
    if (token) {
        // 用户已经登录了，就不能再回login
        if (to.path == '/login') {
            next('/square');
        } else {
            //已经登陆了,访问的是非登录与注册
            //登录了且拥有用户信息放行
            if (name) {
                next();
            } else {
                // 登陆了且没有用户信息，派发action让仓库储存用户信息再跳转，记得try catch
                // 刷新页面，仓库空了，继续派发用户信息
                // 在路由跳转之前获取信息再放行
                try {
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) { // token过期，获取不到用户信息
                    // token失效重新登录
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    } else {
        // 未登录，除了登录、注册、首页、活动可以走，其他都不可以
        if (to.path === '/login' || to.path === '/register' || to.path == '/square' || to.path == '/activity') return next();
        alert('请先登录账号')
        next('/login'); // 自动到登录页面
    }
})

export default router;