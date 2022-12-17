/**
 * 订单交易信息相关的接口模块
 */
import requests from "./request";

/**
 * 生成确认单
 * @param {*} confirmOrders 发送至后台的信息，包括要结算的购物车项id,商品数量
 * @returns 
 */
export const reqComfirmForm = (confirmOrders) => requests({ url: '/order/confirm', data: confirmOrders, method: 'POST' });

/**
 * 生成订单
 * @param {*} order 订单对象，包括确认单id，买家姓名，地址，备注
 * @returns 
 */
export const reqOrder = (orders) => requests({ url: '/order', data: orders, method: 'POST' });

/**
 * 获取我买到的（订单列表）
 * @param {*} userId 用户id
 * @param {*} page 页数
 * @param {*} limit 每页的条数
 * @returns 
 */
export const reqOrderList = (userId, page = 1, limit = 10) => requests({ url: `/order/buy/list/${userId}/${page}/${limit}`, method: 'GET' });

/**
 * 获取我卖出的
 * @param {*} userId 用户id
 * @param {*} page 页数
 * @param {*} limit 每页的条数
 * @returns 
 */
export const reqSellList = (userId, page = 1, limit = 10) => requests({ url: `/order/sell/list/${userId}/${page}/${limit}`, method: 'GET' });

/**
 * 获取订单详情
 * @param {*} userId 用户id
 * @param {*} orderId 订单id
 * @returns 
 */
export const reqOrderInfo = (orderId) => requests({ url: `/order/${orderId}`, method: 'GET' });

/**
 * 取消订单
 * @param {*} orderId 订单id
 * @returns 
 */
export const cancelOrder = (orderId) => requests({ url: `/order/${orderId}`, method: 'PUT' });

/**
 * 删除订单记录
 * @param {*} orderId 订单id
 * @returns 
 */
export const deleteOrder = (orderId) => requests({ url: `/order/${orderId}`, method: 'DELETE' });

/**
 * 继续付款
 * @param {*} orderId 订单id
 * @returns 
 */
export const continueToPay = (tradeNo) => requests({ url: `/alipay/pay`, data: tradeNo, method: 'POST' });

/**
 * 确认收货
 * @param {*} orderId 订单id
 * @returns 
 */
export const deliveryGoods = (id) => requests({ url: '/order/delivery', data: id, method: 'POST' });