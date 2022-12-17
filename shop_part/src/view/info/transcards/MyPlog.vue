<template>
    <!-- 我发布的 -->
    <div>
        <div class="goods_box" v-for="item in plogGoodsList" :key="item.id" @click="toGoodsDetail(item.id)">
            <GoodCardPro :goodInfo="item"/>
        </div>
        <div v-show="(plogGoodsList.length !==0)" class="more_btn_box">
            <a-button type="default" class="btn" @click="loadingMore()">加载更多</a-button>
        </div>
        <div v-show="(plogGoodsList.length ===0)" class="empty_box">
            <a-empty style="margin-top:50px;"/>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import GoodCardPro from '@/components/info/GoodCardPro.vue';
export default{
    name:"MyPlog",
    components:{
        GoodCardPro
    },
    data(){
        return{
            pageData:{
                user_id:'',
                page:1,
                limit:10
            },
        }
    },
    computed:{
        ...mapState({
            plogGoodsList: state => state.good.plogGoodsList,
            total:state => state.trade.total
        }),
    },
    methods:{
        // 商品详情
        toGoodsDetail(id){
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
            this.$store.dispatch('reqPlogGoodsListByUserId',this.pageData);
        },
    },
    mounted(){
        this.pageData.user_id = sessionStorage.getItem('id');
        this.$store.dispatch('init_plog');
        this.$store.dispatch('reqPlogGoodsListByUserId',this.pageData);
    },
    beforeMount(){
        document.title = this.$route.meta.title
    }
}
</script>
<style lang="less" scoped>
    .goods_box{
        cursor: pointer;
    }
    .empty_box{
        min-height:200px;
        
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
</style>