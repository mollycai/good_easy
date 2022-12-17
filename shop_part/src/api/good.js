/**
 * 商品信息相关的接口模块
 */
import requests from "./request";

/**
 * 获取对应id的商品详情
 * @param {*} id 商品id
 * @returns 
 */
export const reqGoodsDetail = id => requests({ url: `/goods/${id}`, method: 'GET' });

/**
 * 发布商品
 * @param {*} goods 商品相关表单
 * @returns 
 */
export const plogGoods = goods => requests({ url: '/goods/publish', data: goods, method: 'POST' });

/**
 * 取消发布商品
 * @param {*} goodsId 商品id
 * @returns 
 */
export const cancelPlogGoods = goodsId => requests({ url: `/goods/publish/${goodsId}`, method: 'DELETE' });

/**
 * 修改发布商品的信息
 * @param {*} goods 商品相关表单
 * @returns 
 */
export const updatePlogGoodsInfo = goods => requests({ url: '/goods/publish', data: goods, method: 'PUT' });

/**
 * 根据用户id请求其发布过的商品
 * @param {*} userId 用户id
 * @returns 
 */
export const reqPlogGoodsListByUserId = (userId, page = 1, limit = 10) => requests({ url: `/goods/publish/${userId}/${page}/${limit}`, method: 'GET' });

/**
 * 查询发布商品详情
 * @param {*} userId 用户id
 * @param {*} goodsId 商品id
 * @returns 
 */
export const reqPlogGoodsInfo = (userId, goodsId) => requests({ url: `/publish/${userId}/${goodsId}`, method: 'GET' });