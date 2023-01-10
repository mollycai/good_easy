// 商品相关数据小仓库
import { reqGoodsDetail, plogGoods, cancelPlogGoods, updatePlogGoodsInfo, reqPlogGoodsListByUserId } from '@/api/good';
import { getImageSize } from '@/utils/imageSize';
const state = {
    // 商品详情
    goodDetail: {},
    // 发布列表
    plogGoodsList: [],
    // 图片列表
    goodImageList: [],
    // 发布列表总数
    total: 0
}
const mutations = {
    GOODDETAIL(state, goodDetail) {
        state.goodDetail = goodDetail;
    },
    PLOGGOODSLIST(state, plogGoodsList) {
        state.plogGoodsList.push(...plogGoodsList);
    },
    SETTOTAL(state, total) {
        state.total = total;
    },
    INIT(state) {
        state.total = 0;
        state.plogGoodsList = [];
    }
}
const actions = {
    // 获取商品详情
    async goodDetail({ commit }, id) {
        const res = await reqGoodsDetail(id)
        if (res.code === 20000) { // 请求成功则提交数据
            commit('GOODDETAIL', res.data.goodsInfo);
            // console.log(res.data.goodsInfo)
            return 'ok'
        } else {
            return Promise.reject(new Error('获取商品详情失败:' + res.message));
        }
    },
    // 发布商品
    async reqPlogGoods({ commit }, goods) {
        const res = await plogGoods(goods);
        if (res.code === 20000) {
            return 'ok';
        } else {
            return Promise.reject(new Error('发布商品失败:' + res.message));
        }
    },
    // 取消发布
    async cancelPlogGoods({ commit }, goodsId) {
        const res = await cancelPlogGoods(goodsId);
        if (res.code === 20000) {
            return 'ok';
        } else {
            return Promise.reject(new Error('取消发布商品失败:' + res.message));
        }
    },
    // 更新发布信息
    async updatePlogGoodsInfo({ commit }, goods) {
        const res = await updatePlogGoodsInfo(goods);
        if (res.code === 20000) {
            return 'ok';
        } else {
            return Promise.reject(new Error('更新商品信息失败:' + res.message));
        }
    },
    // 根据id请求发布商品的列表
    async reqPlogGoodsListByUserId({ commit }, pageData) {
        const { user_id, page, limit } = pageData;
        const res = await reqPlogGoodsListByUserId(user_id, page, limit);
        if (res.code === 20000) {
            commit('PLOGGOODSLIST', res.data.records);
            commit('SETTOTAL', res.data.total);
            return 'ok'
        } else {
            return Promise.reject(new Error('获取发布商品列表失败:' + res.message))
        }
    },
    // 重置列表
    init_plog({ commit }) {
        commit('INIT');
        return 'ok';
    }
}
const getters = {
    GoodImageList(state) {
        const ImageStr = state.goodDetail.image;
        const goodImageStr = String(ImageStr).split(',') || [];
        const GoodImageList = goodImageStr.map(item => {
            const url = item;
            item = { url: url, imgWidth: 0, imgHeight: 0 };
            getImageSize(url).then(reslove => {
                item.imgWidth = reslove.width;
                item.imgHeight = reslove.height;
            })
            return item
        });
        return GoodImageList;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}