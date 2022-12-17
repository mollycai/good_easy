<template>
    <a-layout-header :style="{ background: '#fff', padding: 0}" class="header_box">
        <div class="left_box">
             <!-- 收起展开菜单栏的图标 -->
            <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="sendCollapsed()"
            />
            <!-- 面包屑导航栏 -->
            <a-breadcrumb style="display: inline;overflow: hidden;padding-right: 20px;">
                <a-breadcrumb-item v-for="item in breadcrumbItem">{{item}}</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <!-- 设置按钮 -->
        <a-popover placement="bottom">
            <template slot="content">
                <a @click="out">退出登录</a>
            </template>
        <div class="setting_box">
            <a-icon type="setting" />
        </div>
        </a-popover>
        <!-- 用户头像及用户名 -->
        <a-popover placement="bottom">
            <template slot="content">
                <a @click="turnOn('/default/defaultHome')">首页</a>
            </template>
            <div class="avater_name_box">
                <div class="avater_box">
                    <a-avatar class="admin_avater">U</a-avatar>
                </div>
                <div class="name_box">
                    <span class="admin_name">admin manager</span>
                </div>
            </div>
        </a-popover>
        <!-- 消息提示按钮 -->
        <a-popover placement="bottom">
            <template slot="content">
                    <p><a-badge :count=this.$store.state.unCheck :number-style="{ backgroundColor: '#52c41a' }">
                        <a @click="turnOn('/commodity/audit')">新增未审核</a>
                       </a-badge>
                    </p>
            </template>
            <div class="bell_box">
                <a-icon type="bell" />
            </div>
        </a-popover>
        <!-- 搜索按钮 -->
        <a-popover placement="bottom">
            <template slot="content">
                <p><a @click="turnOn('/user/form')">用户</a></p>
                <p><a @click="turnOn('/commodity/form')">商品</a></p>
                <p><a @click="turnOn('/order/form')">订单</a></p>
            </template>
        <div class="search_box">
            <a-icon type="search" />
        </div>
        </a-popover>
    </a-layout-header>
</template>

<script>
export default{
    name:'Header',
    data(){
        return{
            //侧边栏是否收起
            collapsed: false,
            //面包屑导航栏的标题数据
            breadcrumbItem:[],
            check:1,
        }
    },
    methods:{
        //按钮跳转路由的方法
        turnOn(value){
                this.$router.push(value);
            },
        //通过此方法修改collapsed状态，并传给父组件
        sendCollapsed(){
            this.collapsed = !this.collapsed
            this.$emit('setCollapsed',this.collapsed)
        },
        //退出登录方法
        out(){
            this.$http.post('/admin/logout').then(res => {
                if(res = '20000'){
                    this.$message.success('退出登录成功！')
                    window.sessionStorage.removeItem('token')
                    this.$router.push('/')
                }else{
                    this.$message.error('退出登录失败！')
                }
            })
        }
    },
    created(){
        
        //接收菜单组件传来的选中项信息
        this.$bus.$on('activeTitle',(data) => {
            this.breadcrumbItem = data
        })
    },
    // beforeDestroy(){
    //     //解绑全局总线上的事件
    //     this.$bus.$off('activeTitle')
    // }
}
</script>

<style lang="less" scoped>

    .header_box{
        overflow: hidden;
    }

    #components-layout-demo-responsive .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    #components-layout-demo-responsive .trigger:hover {
        color: #1890ff;
    }

    .left_box{
        display: inline;
        height: 100%;
        float: left;
    }

    .avater_name_box{
        display: inline;
        height: 100%;
        float: right;
        cursor: pointer;
    }

    .avater_box{
        display: inline-block;
        height: 100%;
        margin: 0 6px 0 12px;
        font-size: 15px;
    }
    .admin_avater{
        color: #1890ff; 
        background-Color: rgb(199, 222, 255);
    }

    .name_box{
        display: inline-block;
        height: 100%;
        margin: 0 12px 0 6px;
        font-size: 15px;
    }

    .setting_box,.bell_box,.search_box{
        display: inline;
        float: right;
        padding: 0 12px ;
        font-size: 18px;
        cursor: pointer;
    }
    
    .avater_name_box:hover, .setting_box:hover, .bell_box:hover,.search_box:hover {
        background-color: #f7f7f7;
    }
</style>