// square首页信息小仓库
import { reqCategoryList, reqAllGoodsList, reqGoodsDetail, reqGoodsByCate } from '@/api/square'
// state只能由mutations修改，actions获取到的数据用commit提交给mutations
// dispatch是异步操作，用actions接收，actions出来的是promise，需要async await处理
// Category、GoodsCate相关组件需要用到这个的数据，需要挂载
const state = {
    // state中默认初始数据别瞎写，这个是根据接口的返回值去初始化
    categoryList: [],
    // 目前展示的商品列表，默认的时候是展示所有商品列表，当点击分类是，就切换展示该分类下的商品
    // 页面展示的最终是goodList，下面两个只是缓存
    goodsList: [],
    // 所有商品列表
    allGoodsList: [],
    // 某分类的商品列表
    goodListByCate: [],
    // 商品总数
    total: 0
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    ALLGOODLIST(state, allGoodsList) {
        state.allGoodsList.push(...allGoodsList);
        state.goodsList = state.allGoodsList;
    },
    GOODLISTBYCATE(state, goodListByCate) {
        state.goodListByCate.push(...goodListByCate);
        state.goodsList = state.goodListByCate;
    },
    SETTOTAL(state, total) {
        state.total = total;
    },
    // 重置列表
    INIT(state) {
        state.total = 0;
        state.goodsList = [];
        state.allGoodsList = [];
        state.goodListByCate = [];
    }
}
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    // 获取商品分类
    async categoryList({ commit }) {
        const res = await reqCategoryList();
        if (res.code === 20000) {
            commit('CATEGORYLIST', res.data.categoryList);
            return 'ok';
        } else {
            return Promise.reject(new Error('获取分类列表失败:' + res.message));
        }
    },
    // 获取所有商品列表
    async allGoodsList({ commit }, pageData) {
        const { page, limit } = pageData;
        const res = await reqAllGoodsList(page, limit);
        if (res.code === 20000) { // 请求成功则提交数据
            // 提交刚刚查询的十条数据
            commit('ALLGOODLIST', res.data.records);
            // 提交总数
            commit('SETTOTAL', res.data.total);
            return 'ok';
        } else {
            return Promise.reject(new Error('获取商品列表失败:' + res.message));
        }
    },
    // 获取根据id商品详情
    async reqGoodsDetail({ commit }, goodId) {

    },
    // 获取商品分类
    async GoodsListByCate({ commit }, pageData) {
        const { cateId, page, limit } = pageData;
        const res = await reqGoodsByCate(cateId, page, limit);
        if (res.code === 20000) {
            commit('GOODLISTBYCATE', res.data.records);
            commit('SETTOTAL', res.data.total);
            return 'ok';
        } else {
            return Promise.reject(new Error('获取商品列表失败:' + res.message));
        }
    },
    // 重置列表
    init_square({ commit }) {
        commit('INIT');
        return 'ok';
    }

}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}