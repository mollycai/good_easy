// 引入mockjs模块
import Mock from 'mockjs';
// 引入JSON数据，JSON数据没有对外暴露，但可以引入
// webpack默认对外暴露的：图片、JSON数据格式
import activity from './activity.json';

// mock数据
// mock(请求地址，请求数据)
Mock.mock("/mock/activity", { code: 200, data: activity });