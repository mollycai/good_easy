<template>
    <!-- 用户信息卡片 -->
    <div class="user_box">
        <div class="message_box">
            <!-- 用户头像 -->
            <div v-if="imageUrl">
                <img :src="imageUrl" alt="" class="image"/>
            </div>
            <div v-else>
                <a-avatar class="avater_box">{{avaterName}}</a-avatar>
            </div>
            <!-- 用户信息 -->
            <div class="mid_box">
                <div class="username_box one_text">
                    {{this.userInfo.username}}
                </div>
                <div class="content_box">
                    <p style="color: var(--main-gray3);margin:0 0 18px">{{this.userInfo.description}}</p>
                    <p style="margin:0 0 10px;max-width: 700px;" class="one_text">
                        <a-icon type="bank" style="margin-right: 10px;"/>{{this.userInfo.school}}
                    </p>
                    <p style="margin:0">
                        <a-icon :type="this.userInfo.sex === 0 ? 'woman': 'man'" style="margin-right: 10px;"/>{{this.userInfo.sex === 0 ? '女': '男'}}
                    </p>
                </div>
            </div>
            <!-- 操作按钮 -->
            <div class="operate_box">
                <div class="icon_box">
                    <a-tooltip placement="bottom">
                        <template slot="title">
                        <span>绑定微信</span>
                        </template>
                        <a-icon type="wechat" class="wechat_icon"/>
                    </a-tooltip>
                    <a-tooltip placement="bottom">
                        <template slot="title">
                        <span>绑定支付宝</span>
                        </template>
                        <a-icon type="alipay" class="alipay_icon"/>
                    </a-tooltip>
                </div>
                <a-button type="primary" ghost size="large" @click="toDetailInfo(detail_route)">
                    编辑个人资料
                </a-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:'UserCard',
    data(){
        return{
            detail_route:'detailinfo',
        }
    },
    computed:{
        ...mapState({
            userInfo: (state) => state.user.userInfo,
            imageUrl: (state) => state.user.userInfo.avatar,
        }),
        avaterName(){
            let username = `${this.userInfo.username}`;
            return username.substring(0,1);
        }
    },
    methods:{
        //切换路由,到详细信息页面
        toDetailInfo(activeName){
           window.sessionStorage.setItem('activeName',activeName);
           //跳转
           this.$router.push({name:activeName});
        },
    },
    mounted(){

    }
}
</script>

<style lang="less" scoped>
    .user_box{
        background-color: var(--main-white);
        width: 100%;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
        border-radius: 2px;
        padding: 30px 40px;
        overflow: hidden;
    }

    .message_box{
        height: 140px;
        width: 100%;
        display: flex;
    }
    .image{
        border-radius: 50%;
        width: 140px;
        height: 140px;
    }
    .avater_box{
        width: 140px;
        height: 140px;
        background-color: aliceblue;
        color: var(--main-blue); 
        font-size: 70px;
        line-height: 140px;
    }

    .mid_box{
        overflow: hidden;
    }

    .operate_box{
        flex: auto;
    }

    .username_box{
        font-size: 24px;
        font-weight: 600 ;
        margin: 0 30px 10px 30px ;
        max-width: 700px;
    }

    .content_box{
        margin: 0 30px 10px 30px ;
        font-size: 15px;
    }

    .operate_box{
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        flex-direction: column;
    }

    .icon_box{
        font-size: 22px;  
    }

    .wechat_icon,.alipay_icon{
        margin-left: 15px;
    }

    .wechat_icon:hover{
        color: #3fba00;
        cursor: pointer;
        transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    .alipay_icon:hover{
        color:#679ef8;
        cursor: pointer;
        transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

</style>