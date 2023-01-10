// 订单交易信息小仓库
import { reqComfirmForm, reqOrder, reqOrderList, reqSellList, reqOrderInfo, cancelOrder, deleteOrder, continueToPay, deliveryGoods } from '@/api/trade'
const state = {
    // 确认单商品列表
    comfirmList: [],
    // 订单列表
    orderList: [],
    // 我卖出的商品列表
    sellList: [],
    // 订单详细信息
    orderInfo: {},
    // 总条数
    total: 0
}
const mutations = {
    GETCOMFIRMLIST(state, comfirmList) {
        state.comfirmList = comfirmList;
    },
    GETORDERLIST(state, orderList) {
        state.orderList.push(...orderList)
    },
    GETSELLLIST(state, sellList) {
        state.sellList.push(...sellList)
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    },
    SETTOTAL(state, total) {
        state.total = total;
    },
    INIT(state) {
        state.orderList = [];
        state.sellList = [];
        state.total = 0;
    }
}
const actions = {
    // 生成确认单
    async reqComfirmForm({ commit }, confirmOrders) {
        const res = await reqComfirmForm(confirmOrders);
        if (res.code === 20000) {
            const comfirmList = res.data.confirmOrderList;
            commit('GETCOMFIRMLIST', comfirmList);
            // 缓存确认单，防止刷新时丢失，这个没有存在数据库，存在redias中
            localStorage.setItem('comfirmList', JSON.stringify(this.getters.realComfirmList));
            return 'ok'
        } else {
            return Promise.reject(new Error('生成校验单失败:' + res.message));
        }
    },
    // 生成订单
    async reqOrder({ commit }, orders) {
        const res = await reqOrder(orders);
        if (res.code === 20000) {
            return res;
        } else {
            return Promise.reject(new Error(res.message));
        }
    },
    // 查询订单列表（我买到的）
    async reqOrderList({ commit }, pageData) {
        const { user_id, page, limit } = pageData;
        const res = await reqOrderList(user_id, page, limit);
        if (res.code === 20000) {
            commit('GETORDERLIST', res.data.records);
            commit('SETTOTAL', res.data.total);
            return 'ok';
        } else {
            return Promise.reject(new Error('获取失败:' + res.message));
        }
    },
    // 查询（我卖出的）
    async reqSellList({ commit }, pageData) {
        const { user_id, page, limit } = pageData;
        const res = await reqSellList(user_id, page, limit);
        if (res.code === 20000) {
            commit('GETSELLLIST', res.data.records);
            commit('SETTOTAL', res.data.total);
            return 'ok';
        } else {
            return Promise.reject(new Error('获取失败:' + res.message));
        }
    },
    // 查询订单详情
    async reqOrderInfo({ commit }, userId) {
        const res = await reqOrderInfo(userId);
        if (res.code === 20000) {
            commit('GETORDERINFO', res.data.order);
            return 'ok';
        } else {
            return Promise.reject(new Error('查询订单详情失败:' + res.message));
        }
    },
    // 取消订单
    async cancelOrder({ commit }, userId) {
        const res = await cancelOrder(userId);
        if (res.code === 20000) {
            return 'ok';
        } else {
            return Promise.reject(new Error('取消订单失败:' + res.message));
        }
    },
    // 删除订单记录
    async deleteOrder({ commit }, userId) {
        const res = await deleteOrder(userId);
        if (res.code === 20000) {
            return 'ok';
        } else {
            return Promise.reject(new Error('查询订单详情失败:' + res.message));
        }
    },
    // 继续付款
    async continueToPay({ commit }, tradeNo) {
        const res = await continueToPay(tradeNo);
        if (res.code === 20000) {
            return res
        } else {
            return Promise.reject(new Error('继续付款失败:' + res.message));
        }
    },
    // 确认收货
    async deliveryGoods({ commit }, id) {
        const res = await deliveryGoods(id);
        if (res.code === 20000) {
            return res
        } else {
            return Promise.reject(new Error('确认收货失败:' + res.message));
        }
    },
    // 重置列表
    init_trade({ commit }) {
        commit('INIT');
        return 'ok';
    }
}
const getters = {
    // 给每个确认单项加上备注属性
    realComfirmList(state) {
        const realComfirmList = state.comfirmList.map(item => {
            item['remark'] = ''
            return item
        })
        return realComfirmList
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}