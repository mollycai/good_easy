// 活动信息相关的数据小仓库
import { reqActivityList } from "@/api/activity"
const state = {
    activityList: []
}
const mutations = {
    GETACTIVITYLIST(state, activityList) {
        state.activityList = activityList
    }
}
const actions = {
    // 获取虚拟的活动列表数据
    async getActivityList({ commit }) {
        let res = await reqActivityList()
        if (res.code === 200) {
            commit('GETACTIVITYLIST', res.data);
        }
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