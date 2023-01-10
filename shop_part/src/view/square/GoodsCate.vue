<template>
    <!-- 商品展示部分 -->
    <div class="goods_cate_box">
        <!-- 商品分类导航 -->
        <div class="cate_list">
            <div class="category_box">
                <a-menu 
                v-model="current" 
                mode="horizontal" 
                style="background: none;border-bottom: none;margin: 0 auto;font-size: 18px;" 
                :default-selected-keys="['all']"  >
                    <a-menu-item key="all" style="width: 200px;text-align: center;" @click="getAllCate()">
                        <p style="margin:0;height: 32px;">
                            <a-icon type="appstore" style="font-size: 32px;text-align: center;"/>
                        </p>
                        <p style="margin:0;height: 56px">
                            全部商品
                        </p>
                    </a-menu-item>
                    <a-sub-menu v-for="item in this.categoryList" 
                    :key="item.id" id="submenu_item" 
                    style="width: 200px;text-align: center;">
                        <span slot="title" class="submenu-title-wrapper">
                            <p style="margin:0;height: 32px;">
                                <a-icon :type="item.icon" style="font-size: 32px;text-align: center;" />
                            </p>
                            <p style="margin:0;height: 56px">{{item.name}}</p>
                        </span>
                        <a-menu-item v-for="subitem in item.children" :key="subitem.id" @click="getSubCate(subitem.id)">
                            {{subitem.name}}
                        </a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </div>
        </div>
         <!-- 商品展示栏 -->
        <div v-if="this.goodsList.length" style="background-color:  var(--bottom-white);">
            <div class="goos_list">
                <div class="good_box" v-for="item in this.goodsList" :key="item.id" @click="toDetail(item.id)">
                    <GoodCard :goodInfo="item"></GoodCard>
                </div>
            </div>
            <div class="more_btn_box">
                <a-button type="default" class="btn" @click="loadingMore()">加载更多</a-button>
            </div>
        </div>
        <div v-else style="height: 400px;">
            <a-empty style="margin-top: 180px;"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import GoodCard from '../../components/square/GoodCard.vue';
export default{
    name:'GoodsCate',
    components:{
        GoodCard
    },
    data(){
        return{
            current: ['all'],
            pageData:{
                // 目前展示的分类id,id=0为默认（全部）
                cateId:0,
                // 页数
                page:1,
                // 每页条数
                limit:10,
                // 控制监听滚动的flag
                isWatchScroll:true
            },
        }
    },
    computed:{
        ...mapState({
            // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            // 注入一个参数state，其实即为大仓库中的数据
            categoryList:state => state.square.categoryList,
            goodsList:state => state.square.goodsList,
            total:state => state.square.total
        }),
    },
    watch:{

    },
    methods:{
        // 去往详情页
        toDetail(id){
            // 返回路由地址的标准化版本。还包括一个包含任何现有 base 的 href 属性。
            let routeData = this.$router.resolve({
                name:'detail',
                params:{
                    id:id
                }
            });
            window.open(routeData.href,'_blank');
        },
        // 加载更多
        loadingMore(){
            if(this.pageData.page * this.pageData.limit >= this.total){
                this.$message.warning('到底了~');
                return;
            }
            this.pageData.page = this.pageData.page + 1;
            if(this.pageData.cateId !== 0){
                // 注意只能带一个参数过去，所以得包装成对象
                this.$store.dispatch('GoodsListByCate',this.pageData);
            }else{
                this.$store.dispatch('allGoodsList',this.pageData);
            }
        },
        // 获取所有分类
        getAllCate(){
            // 切换回所有分类就将page,cateId初始化
            this.pageData.page = 1;
            this.pageData.cateId = 0;
            this.$store.dispatch('init_square');
            this.$store.dispatch('allGoodsList',this.pageData);
        },
        // 获取子分类
        getSubCate(cateId){
            // 切换到子分类分类就将page初始化
            this.pageData.page = 1;
            this.pageData.cateId = cateId
            this.$store.dispatch('init_square');
            this.$store.dispatch('GoodsListByCate',this.pageData);
        },
    },
    mounted(){
        this.$store.dispatch('categoryList').then(()=>{
            sessionStorage.setItem('categoryList',JSON.stringify(this.$store.state.square.categoryList));
        });
        // 初始化商品列表
        this.$store.dispatch('init_square');
        // 挂载的时候先不分类，展示所有商品
        this.$store.dispatch('allGoodsList',this.pageData);
    },
}
</script>

<style lang="less" scoped>
    .goos_list{
        display: grid;
        grid-template-columns: 300px 300px 300px 300px 300px;
        grid-template-rows:auto;
        grid-column-gap: 45px;
        grid-row-gap: 50px;
        padding: 30px 0;
        background-color:  var(--bottom-white);
        padding: 50px 120px;
        overflow: hidden;
    }
    .more_btn_box{
        height: 80px;
        width: 100%;
        position: relative;
        .btn{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 250px;
        }
    }
    .category_box{
        margin: 0 auto;
        display: table;
        border: none;
    }
</style>