// 对axios进行二次封装
import axios from 'axios';
// 引入token操作模块
import { getToken, removeToken } from '@/utils/token';
// 引入nprogress
import nprogress from 'nprogress';
// 引入nprogress样式
import "nprogress/nprogress.css";

// 利用axios方法create，创建一个axois的实例
const request = axios.create({
    // 配置基础路径
    baseURL: 'http://139.9.48.23:8081/shop',
    // 配置请求超时的时间10s
    // timeout: 10000
});

// 请求拦截器：请求拦截器可以检测，可以在请求发出去之前，处理一些业务
request.interceptors.request.use(config => {
    // 进度条开始动
    nprogress.start();
    // config配置对象，里面包含headers请求头
    const token = getToken('token');
    if (token) config.headers.Authorization = token;
    return config;
});

// 响应拦截器：请求拦截器可以检测，可以在服务器成功响应数据回来之后，进行请求回调之前，处理一些业务
request.interceptors.response.use(res => {
    // 进度条结束动
    nprogress.done();
    // 拦截20002响应（token失效响应）
    if (res.data.code === 20002 && getToken()) {
        alert('当前会话已过期，请重新登录！');
        removeToken();
        sessionStorage.removeItem('id');
        // 刷新页面
        window.location.reload();
    }
    return res.data;
}, error => {
    // 响应失败的回调
    return Promise.reject(error);
})

// 对外暴露
export default request;