<template>
    <!-- 网站页面 -->
    <a-layout id="components-layout-demo-top-side">
        <!-- 头部导航 -->
        <Header></Header>
        <!-- 主要部分 -->
        <!-- 注意要给路由添加key值，防止进入相同的组件数据更新了，页面没有更新，外面不要keep-alive -->
        <router-view style="min-height: 796px;" :key="$route.fullPath"></router-view>
        <!-- 底部 -->
        <Footer></Footer>
    </a-layout>
</template>

<script>
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
export default{
    name:'Index',
    components:{
        Header,
        Footer
    },
    mounted(){
        this.$store.dispatch('getUserInfo').then(()=>{
            sessionStorage.setItem('id',this.$store.state.user.userInfo.id);
        });
    },
}
</script>

<style lang="less" scoped>
</style>