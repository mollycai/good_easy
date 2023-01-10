// 聊天室相关数据小仓库
const state = {
    userId: '',
    username: '',
    avatar: '',
    sellerId: '',
    sellerName: '',
    sellerAvatar: '',
    goodId: ''
}
const mutations = {
    SETALLSTATES(state, chatMsg) {
        const { userId, username, avatar, sellerId, sellerName, sellerAvatar, goodId } = chatMsg;
        state.userId = userId;
        state.username = username;
        state.avatar = avatar;
        state.sellerId = sellerId;
        state.sellerName = sellerName;
        state.sellerAvatar = sellerAvatar;
        state.goodId = goodId;
    }
}
const actions = {
    setChatMsg({ commit }, chatMsg) {
        // 存本地存储里
        localStorage.setItem('chatMsg', JSON.stringify(chatMsg));
        return 'ok';
    },
    getChatMsg({ commit }) {
        // 再从里面拿
        const chatMsg = JSON.parse(localStorage.getItem('chatMsg'));
        commit('SETALLSTATES', chatMsg);
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