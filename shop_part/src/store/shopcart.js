// shopcart购物车小仓库
import { reqShopcart, addToShopcart, delGoodFromShopcart } from '@/api/shopcart';
import { getImageSize } from '@/utils/imageSize';
const state = {
    // 购物车
    shopcart: [],
    // 判断是否全选
    allChecked: false,
    // 总价
    totalPrice: 0.00,
    // 未读，控制小红点
    noticeCount: sessionStorage.getItem('noticeInCart') || 0,
}
const mutations = {
    // 获取购物车列表数据
    GETSHOPCARTINFO(state, shopcart) {
        state.shopcart = shopcart;
    },
    // 点击商品前面的商品的复选框
    SELECTITEM(state, index) {
        state.shopcart[index].isCheck = !state.shopcart[index].isCheck;
        state.allChecked = state.shopcart.every(item => item.isCheck == true);
        state.totalPrice = 0;
        state.shopcart.forEach(item => {
            if (item.isCheck) {
                // 注意toFixed后用+=运算符会默认为字符串拼接,toFixed转化后类型为字符串
                state.totalPrice += ((item.price * item.number) * 100 / 100);
            }
        });
        // 最后再转
        state.totalPrice = state.totalPrice.toFixed(2);

    },
    // 点击底部的全选按钮
    ALLSELECT(state) {
        state.allChecked = !state.allChecked;
        state.shopcart.forEach(item => {
            item['isCheck'] = state.allChecked;
        })
        state.totalPrice = 0;
        state.shopcart.forEach(item => {
            if (item.isCheck) {
                state.totalPrice += ((item.price * item.number) * 100 / 100);
            }
        })
        state.totalPrice = state.totalPrice.toFixed(2);
    },
    // 控制小红点，有sessionStorge这一步好像也没用
    SETNOTICECOUNT(state, number) {
        state.noticeCount = number
    }
}
const actions = {
    // 获取购物车列表数据
    async getShopcartInfo({ commit }, userId) {
        const res = await reqShopcart(userId);
        if (res.code === 20000) {
            commit('GETSHOPCARTINFO', res.data.shopcar);
            return 'ok';
        } else {
            return Promise.reject(new Error('获取购物车列表失败:' + res.message));
        }
    },
    // 添加入购物车
    async addToShopcart({ commit }, data) {
        const res = await addToShopcart(data);
        if (res.code === 20000) {
            return 'ok';
        } else {
            return Promise.reject(new Error('加入购物车失败:' + res.message));
        }
    },
    // 删除购物车中的商品
    async delGoodFromShopcart({ commit }, id) {
        const res = await delGoodFromShopcart(id);
        if (res.code === 20000) {
            return 'ok';
        } else {
            return Promise.reject(new Error('删除商品失败:' + res.message));
        }
    },
    // 点击商品前面的商品的复选框
    selectItems({ commit }, index) {
        commit('SELECTITEM', index);
    },
    // 点击底部的全选按钮
    allSelect({ commit }) {
        commit('ALLSELECT');
    },
    // 设置未读信息状态
    setNoticeCount({ commit }, number) {
        sessionStorage.setItem('noticeInCart', number);
        commit('SETNOTICECOUNT', number);
    }
}
const getters = {
    realShopcart(state) {
        // 为购物车列表动态添加isCheck属性，默认为false
        // 并且加载图片长宽
        const realShopcart = state.shopcart.map(item => {
            item['isCheck'] = false;
            item['imgWidth'] = 0;
            item['imgHeight'] = 0;
            getImageSize(item.goodsImage).then(reslove => {
                item.imgWidth = reslove.width;
                item.imgHeight = reslove.height;
            })
            return item;
        })
        state.allChecked = false;
        return realShopcart;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}