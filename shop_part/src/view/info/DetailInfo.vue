<template> 
    <!-- 用户详细信息页面 -->
    <a-layout id="components-layout-demo-top-side">
        <a-layout-content style="background-color: rgb(247,248,250);padding: 25px 0;">
            <a-layout style="background: rgb(247,248,250);margin: 0 auto;max-width: 1180px;">
                <a-layout-content :style="{ minHeight: '280px' }">
                    <div class="back_box">
                        <span class="back_msg" @click="toInfo(info_routeName,info_routePath)" >
                            <a-icon type="left" />&nbsp;返回个人主页
                        </span>
                    </div>
                    <UserForm></UserForm>
                </a-layout-content>
            </a-layout>
        </a-layout-content>
    </a-layout>
</template>

<script>
import UserForm from '../../components/info/InfoForm.vue'
export default{
    name:'DetailInfo',
    components:{
        UserForm
    },
    data(){
        return{
            info_routePath:'/info',
            info_routeName:'userinfo',
        }
    },
    methods:{
        //切换路由,到个人主页
        toInfo(activeName,activePath){
            window.sessionStorage.setItem('activeName',activeName);
            //跳转
            this.$router.push({path:activePath});
        }
    },
    beforeMount(){
        document.title = this.$route.meta.title;
    }
}
</script>

<style lang="less" scoped>
    .back_box{
        background-color: #fff;
        width: 100%;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
        border-radius: 2px;
        padding: 15px 30px;
        color: #a0a0a0;
    }
    .back_msg:hover{
        cursor: pointer;
        color:#1e80ff ;
    }
</style>