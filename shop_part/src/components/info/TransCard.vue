<template>
    <!-- 用户的交易信息部分 -->
    <div class="card_box">
        <!-- 导航栏 -->
        <div class="trans_box">
            <a-menu mode="horizontal" style="border-bottom: none;" :default-selected-keys="selectedKeys" :selectedKeys="selectedKeys">
                <a-menu-item v-for="item in tabList" :key="item.tab_id" @click="setTabState(item.tab_id,item.route_name)"> 
                    <a-icon :type="item.tab_icon" />{{item.tab_name}}
                </a-menu-item>
            </a-menu>
        </div>
        <!-- 卡片信息栏 -->
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>

<script>
export default{
    name:'TransCard',
    components:{
    },
    data(){
        return{
            // tab栏数据
            tabList:[
                {tab_id:'100',tab_name:'我发布的',tab_icon:'shopping',route_name:'myplog'},
                {tab_id:'200',tab_name:'我卖出的',tab_icon:'money-collect',route_name:'mysell'},
                {tab_id:'300',tab_name:'我买到的',tab_icon:'file-done',route_name:'mybuy'},
                {tab_id:'400',tab_name:'售后服务',tab_icon:'property-safety',route_name:'aftersell'}
            ],
            user_id:'',
            // 选中的标签栏项
            selectedKeys:[],
            // 路由激活名称
            activeTabName:'',
        }
    },
    computed:{

    },
    methods:{
        // 设置展示的列表
        setTabState(routeKey,routeName){
            window.sessionStorage.setItem('activetabName',routeName);
            window.sessionStorage.setItem('activetabKey',routeKey);
            //将对应的路由激活名称进行存储
            this.activeTabName = routeName;
            //将对应的导航栏项id为选中的key
            this.selectedKeys[0] = routeKey;
            // 跳转
            this.$router.push({name:routeName});
        },
    },
    mounted(){
        this.user_id = sessionStorage.getItem('id');
        this.$store.dispatch('reqPlogGoodsListByUserId',this.user_id);
        // 取出选中的导航栏id，如果没有默认100
        let init = window.sessionStorage.getItem('activetabKey') || this.tabList[0].tab_id;
        this.selectedKeys.push(init);
    }
}
</script>

<style lang="less" scoped>
    .trans_box{
        background-color: #fff;
        width: 100%;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
        border-radius: 2px;
        padding: 5px 40px 2px ;
        overflow: hidden;
        min-height: 50px;
        margin-top: 25px;
        border-bottom: 2px solid #f7f8fa;
    }
    .empty_box{
        height: 300px;
        padding: 50px;
    }
    .goods_box{
        cursor: pointer;
    }
</style>