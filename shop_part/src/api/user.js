/**
 * 与用户相关的接口
 */

import requests from "./request";
/**
 * 获取验证码，记得看手机
 * @param {*} mobile 用户手机号
 * @returns 
 */
export const reqGetCode = mobile => requests({ url: `/sms/code/${mobile}`, method: 'GET' });

/**
 * 用户注册
 * @param {*} data 用户基本数据
 * @returns 
 */
export const reqUserRegister = data => requests({ url: '/user/register', data: data, method: 'POST' });

/**
 * 账号密码登录
 * @param {*} data 用户名+密码
 * @returns 
 */
export const reqUserLogin = data => requests({ url: '/user/login', data: data, method: 'POST' });

/**
 * 手机号登录
 * @param {*} data 用户手机号+验证码
 * @returns 
 */
export const reqMoblieLogin = data => requests({ url: '/user/login/phone', data: data, method: 'POST' });

/**
 * 请求用户信息
 * @returns 
 */
export const reqUserInfo = () => requests({ url: '/user/userInfo', method: 'GET' });

/**
 * 根据用户id获取用户信息
 * @param {*} id 用户id
 * @returns 
 */
export const reqUserInfoById = id => requests({ url: `/user/userInfo/${id}`, method: 'GET' });

/**
 * 用户退出登录
 * @returns 
 */
export const reqUserLogout = () => requests({ url: '/user/logout', method: 'POST' });

/**
 * 修改用户信息，除头像密码外
 * @param {*} data 用户信息对象
 * @returns 
 */
export const updateUserInfo = data => requests({ url: '/user/userInfo', data: data, method: 'PUT' });

/**
 * 修改用户头像 
 * @param {*} data 该对象包括id,avatar
 * @returns 
 */
export const updateUserAvatar = data => requests({ url: '/user/avatar', data: data, method: 'PUT' });