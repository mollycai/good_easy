<template>
    <!-- 头部导航栏组件 -->
    <a-layout-header class="header">
        <!-- logo -->
        <div class="logo">
            <img src="../../assets/logo/logo.jpg" alt="" style="background-color: var(--main-gray2);height: 100%;"/>
        </div>
        <!-- 导航栏 -->
        <a-menu
            mode="horizontal"
            :default-selected-keys="selectedKeys"
            :selectedKeys="selectedKeys"
            style="line-height: 60px;width: 600px;float: left;font-size: 15px;border-bottom:none ;"
            >
            <a-menu-item v-for="item in navList" :key="item.id" style="margin: 0 20px;height: 100%;" 
            @click="saveNavState(item.route_name,item.id)">
                {{item.title}}
            </a-menu-item>
        </a-menu>
        <!-- 退出登录 -->
        <a-tooltip placement="bottom">
            <template slot="title">
                <span>退出登录</span>
            </template>
            <div class="logout_box" v-show="userName" @click="logout">
                <a-icon type="logout" />
            </div>
        </a-tooltip>
        <!-- 用户头像及用户名 -->
        <div class="avater_name_box">
            <!-- 这个应该还可以再改进，只要token存在就显示该token对于的账号信息，并没有经过校验 -->
            <div v-if="userName" @click="saveNavState(userinfo.route_name,userinfo.id)">
                <AvatarBox :avatar="imageUrl" :name="userName"/>
            </div>
            <!-- 没有登录时显示 登录 | 注册 -->
            <div v-else style="padding: 0 10px;">
                <router-link to="/login"><a href="">登录</a></router-link>
                &nbsp;<a-divider type="vertical" />&nbsp;
                <router-link to="/register"><a href="">注册</a></router-link>
            </div>
        </div>        
        <!-- 消息提示按钮 -->
        <a-popover placement="bottom">
            <template slot="content">
                <p>Content</p>
                <p>Content</p>
            </template>
            <template slot="title">
                <span>消息提示</span>
            </template>
            <div class="bell_box">
                <a-icon type="bell" />
            </div>
        </a-popover>
        <!-- 购物车按钮 -->
        <a-tooltip placement="bottom">
            <template slot="title">
                <span>购物车</span>
            </template>
            <div class="shopcar_box" @click="saveNavState(shopcart.route_name,userinfo.id)">
                <a-badge dot :count="this.count">
                    <a-icon type="shopping-cart" />
                </a-badge>
            </div>
        </a-tooltip>
        <!-- 搜索框 -->
        <div class="search_box">
            <a-input-search placeholder="input search text" @search="onSearch" />
        </div>
    </a-layout-header>
</template>

<script>
import { mapState } from "vuex";
import AvatarBox from '@/components/layout/AvatarBox.vue';
export default{
    name:'Header',
    components:{
        AvatarBox
    },
    data(){
        return{
            // 选中的导航栏项
            selectedKeys:[],
            // 路由激活名称
            activeName:'',
            // 头部导航栏信息
            navList:[
                {id:'100',title:'广场',route_name:'first'},
                {id:'200',title:'活动',route_name:'activity'},
                {id:'300',title:'发闲置',route_name:'plog'},
            ],
            // 头部导航栏信息的id
            navListId:[],
            // 购物车路由信息
            shopcart:{id:'400',title:'购物车',route_name:'shopcart'},
            // 个人主页路由信息
            userinfo:{id:'500',title:'个人信息',route_name:'userinfo'},    
        }
    },
    computed:{
        //用户名及头像信息
        ...mapState({
            userName: (state) => state.user.userInfo.username,
            imageUrl: (state) => state.user.userInfo.avatar,
        }),
        //默认头像
        avaterName(){
            let username = `${this.$store.state.user.userInfo.username}`
            return username.substring(0,1)
        },
        // 购物车的小红点
        ...mapState({
            count:(state) => state.shopcart.noticeCount
        })
    },
    methods:{
        // 设置小红点徽标的回调
        getCount(count){
            this.count = count;
        },        
        //获取搜索框信息
        onSearch(value) {
            
        },
        //保存链接激活状态，并切换路由
        saveNavState(activeName,activeKey){
            window.sessionStorage.setItem('activeName',activeName);
            window.sessionStorage.setItem('activeKey',activeKey);
            //将对应的路由激活名称进行存储
            this.activeName = activeName;
            //将对应的导航栏项id为选中的key
            this.selectedKeys[0] = activeKey;
            //如果选中购物车或个人信息，导航栏没有被选中的项
            if(this.navListId.indexOf(activeKey) < 0) this.selectedKeys = [];
            //跳转，个人信息还存在子路由，所以不能用name跳转
            if(activeName == 'userinfo'){
                this.$router.push({path:'/info'});
            }else{
                if(activeName == 'shopcart') {
                    // sessionStorage.setItem('noticeInCart',0);
                    this.$store.dispatch('setNoticeCount',0);
                }
                // 跳到别的地方就把activetabKey设置回100
                sessionStorage.setItem('activetabKey',100);
                this.$router.push({name:activeName});
            }
           
        },
        // 退出登录
        logout(){
            let _this = this;
            this.$confirm({
                title: `提示`,
                content: `您想退出登录吗？`,
                async onOk() {
                    // 退出登录需要做的事情
                    // 1:需要发请求，通知服务器退出登录【清除一些数据：token】
                    // 2:清除项目当中的数据【userInfo、token】
                    try {
                        //如果退出成功
                        await _this.$store.dispatch('userLogout');
                        //回到首页
                        _this.$router.push('/square');
                    } catch (error) {
                        _this.$message.error(`${error}`);
                    }
                },
                onCancel() {},
            });
        }
    },
    mounted() {
        // 取出选中的导航栏id，如果没有默认100(广场)
        let init = window.sessionStorage.getItem('activeKey') || this.navList[0].id;
        this.selectedKeys.push(init);
        this.navListId = this.navList.map(item => item.id);
    }
}
</script>

<style lang="less" scoped>
    #components-layout-demo-top-side .logo {
        width: 120px;
        height: 45px;
        background: rgba(255, 255, 255, 0.2);
        float: left;
    }
    .header{
        background-color: #fff;
        overflow: hidden;
        z-index: 999;
        box-shadow: 0 1px 2px var(--main-shadow);
        padding: 0 100px;
    }
    .search_box{
        width: 200px;
        float: right;
        height: 64px;
        margin: 0 20px;
    }
    .bell_box,.shopcar_box,.logout_box{
        display: inline;
        float: right;
        padding: 0 10px ;
        font-size: 18px;
        cursor: pointer;
    }
    .bell_box:hover,.shopcar_box:hover,.logout_box:hover{
        color: var(--main-blue);
    }
    .avater_name_box{
        display: inline;
        height: 100%;
        float: right;
        cursor: pointer;
        padding: 0px 10px 0px 5px;
    }
    .avater_name_box:hover{
        background-color: rgba(199, 222, 255,0.2);
    }
</style>