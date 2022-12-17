/**
 * 首页信息相关的接口模块
 */
import requests from "./request";

/**
 * 获取分类列表数据接口
 * @returns 
 */
export const reqCategoryList = () => requests({ url: '/category/list', method: 'GET' });

/**
 * 获取所有商品数据的接口
 * @param {page,limit} page 每次传输的页数 limit 每页的商品数目
 * @returns 
 */
export const reqAllGoodsList = (page = 1, limit = 10) => requests({ url: `/goods/list/${page}/${limit}`, method: 'GET' });

/**
 * 获取对应id的商品详情
 * @param {*} id 商品id
 * @returns 
 */
export const reqGoodsDetail = (id) => requests({ url: `/goods/${id}`, method: 'GET' });

/**
 * 
 * @param {*} cid 分类id
 * @param {page,limit} page 每次传输的页数 limit 每页的商品数目
 * @returns 
 */
export const reqGoodsByCate = (cid, { page = 1, limit = 10 } = {}) => requests({ url: `/goods/list/${cid}/${page}/${limit}`, method: 'GET' });