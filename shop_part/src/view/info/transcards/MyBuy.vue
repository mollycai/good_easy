<template>
    <!-- 我买到的 -->
    <div>
        <div class="goods_box" v-for="item in orderList" :key="item.id" @click="toOrderDetail(item.id)">
            <OrderCardPro :orderInfo="item"/>
        </div>
        <div v-show="(orderList.length !== 0)" class="more_btn_box">
            <a-button type="default" class="btn" @click="loadingMore()">加载更多</a-button>
        </div>
        <div v-show="(orderList.length === 0)" class="empty_box">
            <a-empty style="margin-top:50px;"/>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import OrderCardPro from '@/components/info/OrderCardPro.vue';
export default{
    name:"MyBuy",
    components:{
        OrderCardPro
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
            orderList: state => state.trade.orderList,
            total:state => state.trade.total
        })
    },
    methods:{
        // 订单详情
        toOrderDetail(id){
            let routeData = this.$router.resolve({
                name:'comfirmorder',
                params:{
                    orderId:id
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
            this.$store.dispatch('reqOrderList',this.pageData);
        },
    },
    mounted(){
        this.pageData.user_id = sessionStorage.getItem('id');
        this.$store.dispatch('init_trade');
        this.$store.dispatch('reqOrderList',this.pageData);
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