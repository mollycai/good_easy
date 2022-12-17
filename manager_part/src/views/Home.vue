<template>
    <a-layout id="components-layout-demo-responsive" class="home-container">
        <!-- 侧边栏区域 -->
        <a-layout-sider v-model="collapsed" :trigger="null" breakpoint="lg">
            <!-- logo区域 -->
            <div class="logo" >
                <img src="../assets/images/logo.jpg" alt="" style="height: 100%; width: 100%;">
            </div>
            <!-- 侧边菜单栏区域 -->
            <Menu></Menu>
        </a-layout-sider>
        <!-- 右边主体区域 -->
        <a-layout>
            <!-- 头部 -->
            <Header ref="header"></Header>
            <!-- 主要内容 -->
            <a-layout-content :style="{ margin: '24px 16px 0'}">
                <!-- keep-alive：包裹动态组件时，会缓存不活动的组件实例,主要用于保留组件状态或避免重新渲染。 -->
                <keep-alive>
                    <!-- 添加动画效果 -->
                    <router-view :class="transitionName"/>
                </keep-alive>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
    import Menu from '../components/layout/Menu.vue'
    import Header from '../components/layout/Header.vue'
    export default {
        name:'Home',
        components:{
            Menu,
            Header
        },
        data(){
            return{
                //侧边栏是否收起
                collapsed: false,
                //切换动画的类名
                transitionName:'',
            }
        },
        methods: {
            setCollapsed(collapsed){
                this.collapsed = collapsed
            }
        },
         //在路由发生变化时监听,应用动画
        watch: {
            '$route' (to, from){
                this.transitionName = 'animated fadeInLeft'
            }
        },
        created(){
            
        },
        mounted(){
            //接收Header组件传来的菜单栏状态
            this.$refs.header.$on('setCollapsed',this.setCollapsed)
        }
    };
</script>
  
<style lang="less" scoped>
    .home-container{
        height: 100%;
    }
    
    #components-layout-demo-responsive .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
    }

    .animated{
        animation-name: fadeInLeft;
        animation-timing-function: ease;
        animation-duration: 1s;
    }

    @keyframes fadeInLeft {
        0% {
            opacity: 0;
            transform: translate3d(-5%, 0, 0);
        }
        100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        } 
    }
</style>
  