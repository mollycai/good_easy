//引入Vue核心库
import { DatePicker } from 'ant-design-vue'
import { theme } from 'antd'
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {}
    //准备mutations对象——修改state中的数据
const mutations = {
    addUnCheck(){
        state.unCheck++
    },
    deUnCheck(){
        state.unCheck--
    }
}
    //准备state对象——保存具体的数据
const state = {
    unCheck: 0,//未审核数量

}

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})