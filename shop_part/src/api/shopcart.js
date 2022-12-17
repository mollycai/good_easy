/**
 * 与购物车相关的接口
 */

import requests from "./request";

/**
 * 请求购物车商品列表
 * @param {*} userId 用户id
 * @returns 
 */
export const reqShopcart = userId => requests({ url: `/shopcar/${userId}`, method: 'GET' });

/**
 * 加入购物车
 * @param {*} data 相关数据，包括用户id,商品id,数量number
 * @returns 
 */
export const addToShopcart = data => requests({ url: '/shopcar', data: data, method: 'POST' });

/**
 * 删除购物车中的商品
 * @param {*} data 相关数据，包括用户id,商品id
 * @returns 
 */
export const delGoodFromShopcart = id => requests({ url: `/shopcar/${id}`, method: 'DELETE' });