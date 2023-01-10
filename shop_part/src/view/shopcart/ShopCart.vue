<template>
    <!-- 购物车页面 -->
    <a-layout id="components-layout-demo-top-side">
        <a-layout-content style="background-color: var(--bottom-white);padding: 25px 0;">
            <a-layout style="background: var(--bottom-white);margin: 0 auto;max-width: 1180px;">
                <a-layout-content >
                    <!-- 顶部 -->
                    <div class="cart_head">
                        <div class="title_box">
                            <a-icon type="shopping-cart" />&nbsp;购物车
                        </div>
                    </div>
                    <div v-if="realShopcart.length === 0">
                        <a-empty style="margin-top: 180px;"/>
                    </div>
                    <div v-else>
                        <!-- 商品列表 -->
                        <div class="shopcart_tab">
                            <div class="tab_head">
                                <div class="tab_comluns1">选择</div>
                                <div class="tab_comluns2">商品</div>
                                <div class="tab_comluns3">数量</div>
                                <div class="tab_comluns4">单价 ￥</div>
                                <div class="tab_comluns5">小计 ￥</div>
                                <div class="tab_comluns6">操作</div>
                            </div>
                            <ul class="tab_body" v-for="(item, index) in realShopcart" :key="item.id">
                                <li class="tab_list_comluns1">
                                    <a-checkbox v-model="item.isCheck" @click="selectItem(index)" :disabled="!item.status"/>
                                </li>
                                <li class="tab_list_comluns2" @click="toDetail(item.goodsId,item.status)">
                                    <div class="good_box">
                                        <div>
                                            <div class="good_img">
                                                <img v-lazy="getFirstImg(item.goodsImage)" alt="" :class="item.imgHeight > item.imgWidth ? 'height':'width'">
                                            </div>
                                        </div>
                                        <div style="padding-left:20px;">
                                            <div class="good_name one_text">{{item.goodsName}}</div>
                                            <div class="good_value one_text" v-for="subitem in item.attributes">
                                                {{subitem.key}}：{{subitem.value}}
                                            </div>
                                            <div style="color: red;text-align: left;" v-show="!item.status">已下架</div>
                                        </div>
                                    </div>
                                </li>
                                <li class="tab_list_comluns3">
                                    <a-input-number id="inputNumber" :min="1" v-model="item.number" />
                                </li>
                                <li class="tab_list_comluns4">
                                    <span style="font-size: 18px;font-weight: 500;color: var(--main-black2);">
                                        {{(item.price).toFixed(2)}}
                                    </span>
                                </li>
                                <li class="tab_list_comluns5">
                                    <span style="font-size: 18px;font-weight: 500;color: var(--main-orange);">
                                        {{((item.price * item.number * 100) / 100).toFixed(2)}}
                                    </span>
                                </li>
                                <li class="tab_list_comluns6">
                                    <a @click="deleteGood(item.goodsName,item.id)">删除</a>
                                    <a-divider type="vertical" />
                                    <a>收藏</a>
                                </li>
                            </ul>
                        </div>
                        <!-- 底部 -->
                        <div class="bottom_box">
                            <div class="check_box">
                                <a-checkbox v-model="allChecked" @click="allSelect()"/>
                                    &nbsp;全选
                            </div>
                            <div class="account_box">
                                合计：<span style="font-size: 18px;font-weight: 500;color: var(--main-orange);">￥ {{totalPrice}}</span>
                            </div>
                            <div class="button2_box">
                                <a-button type="primary" @click="pay()">结算</a-button>
                            </div>
                        </div>
                    </div>
                </a-layout-content>
            </a-layout>
        </a-layout-content>
    </a-layout>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default{
    name:'ShopCart',
    data() {
        return {
            userId:'',
            size:'small',
        };
    },
    computed:{
        ...mapGetters(['realShopcart']),
        allChecked:{
            get(){
                return this.$store.state.shopcart.allChecked
            },
            set(val){
                return this.$store.state.shopcart.allChecked = val
            }
        },
        totalPrice:{
            get(){
                return this.$store.state.shopcart.totalPrice
            },
            set(val){
                return this.$store.state.shopcart.totalPrice = val
            }
        }
    },
    watch:{
        realShopcart:{
            immediate: true,
            deep:true,
            handler(newValue, oldValue){
                this.totalPrice = this.realShopcart.reduce((pre,item) => pre + (item['isCheck'] ? (item.price * item.number * 100) / 100 : 0), 0).toFixed(2)
            }
        },
    },
    methods: {
        // 单选
        selectItem(index) {
            this.$store.dispatch('selectItems',index)
        },
        // 全选
        allSelect() {
            this.$store.dispatch('allSelect')
        },
        // 删除购物车中的商品
        deleteGood(name,id){
            // 注意保存this
            let _this = this
            this.$confirm({
                title: `提示`,
                content: `您想将${name}从购物车中删除吗？`,
                async onOk() {
                    try {
                        await _this.$store.dispatch('delGoodFromShopcart',id);
                        _this.$message.success('删除成功！');
                        await _this.$store.dispatch('getShopcartInfo',_this.userId);
                    } catch (error) {
                        _this.$message.error(`${error}`);
                    }
                },
                onCancel() {},
            });
        },
        // 跳至商品详情
        toDetail(goodsId,status){
            if(status){
                let routeData = this.$router.resolve({
                    name:'detail',
                    params:{
                        id:goodsId
                    }
                });
                window.open(routeData.href,'_blank');
            }else{
                this.$message.warning('此商品已下架！');
            }
        },
        // 结算
        pay(){
            if(this.realShopcart.every(item => item.isCheck === false)){
                this.$message.warning('请选择要结算的商品！');
                return ;
            }
            // 过滤
            const payList = this.realShopcart.filter(item => item.isCheck);
            // 重构
            const confirmOrders = payList.map(item => item = {shopcarId:item.id,number:item.number});
            // 派发action生成确认单
            this.$store.dispatch('reqComfirmForm',confirmOrders).then(()=>{
                this.$router.push('/comfirmshop');
            }).catch((error) => {
                this.$message.error(`${error}`);
            })
        },
        // 获取首图
        getFirstImg(imgStr){
            const imgList = String(imgStr).split(',');
            const firstImg = imgList[0];
            return firstImg;
        }
    },
    async mounted() {
        // 注意异步操作
        // 觉得这个不能根据sessionStroge中的Id去查询购物车列表，防止用户篡改
        await this.$store.dispatch('getUserInfo').then(()=>{
            this.userId = this.$store.state.user.userInfo.id;
        })
        await this.$store.dispatch('getShopcartInfo',this.userId);
    },
    beforeMount() {
        document.title = this.$route.meta.title
    },
    created(){
        this.removeLoading(); 
    }
}
</script>

<style lang="less" scoped>
    .height{
        height: 100%;
    }
    .width{
        width: 100%;
    }
    .cart_head,.bottom_box{
        background-color: var(--main-white);
        width: 100%;
        box-shadow: 0 1px 2px 0 var(--main-shadow-light);
        border-radius: 2px;
        overflow: hidden;
        color: var(--main-gray2);
        padding: 20px 24px;
    }
    .bottom_box{
        display: flex;
        width: 100%;
        font-weight: 700;
        line-height: 32px;
    }
    .account_box{
        width: 100px;
    }
    .cart_head{
        display: flex;
    }
    .title_box{
        flex:8;
        font-size: 20px; 
        font-weight: 700;
        margin-bottom: 0;
        line-height: 32px;
        color: var(--main-black);
    }
    .check_box{
        flex:8
    }
    .account_box{
        flex:2
    }
    .button2_box{
        flex:1
    }
    .shopcart_tab{
        margin: 20px 0;
        background-color: var(--main-white);
        width: 100%;
        box-shadow: 0 1px 2px 0 var(--main-shadow-light);
        border-radius: 2px;
        .tab_head{
            display: flex;
            height: 60px;
            line-height: 60px;
            text-align: center;
            width: 100%;
            background-color: var(--main-white2);
            border-bottom: var(--main-white3) 1px solid;
            font-weight: 600;
            .tab_comluns1{
                flex: 1;
            }
            .tab_comluns2{
                flex: 5;
            }
            .tab_comluns3{
                flex: 3;
            }
            .tab_comluns4{
                flex: 3;
            }
            .tab_comluns5{
                flex: 3;
            }
            .tab_comluns6{
                flex: 3;
            }
        }
        .tab_body{
            display: flex;
            text-align: center;
            padding: 15px 0;
            border-bottom: var(--main-white3) 1px solid;
            .tab_list_comluns1{
                flex:1
            }
            .tab_list_comluns2{
                flex:5;
                cursor: pointer;
            }
            .tab_list_comluns3{
                flex:3
            }
            .tab_list_comluns4{
                flex:3
            }
            .tab_list_comluns5{
                flex:3
            }
            .tab_list_comluns6{
                flex:3
            }
        }
    }
    .tab_body:hover{
        background-color: var(--main-white4);
        transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .good_box{
        display: flex;
        width: 100%;
        text-align: left;
        .good_img{
            height: 100px;
            width: 100px;
            // border: black solid 1px;
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            background: url(data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1JREFUeNpi+P//PwMMP3369AUyH1mMKEVwhYQUgRUSowjFakJOYBhOngEIMAB1izbs6IM8DAAAAABJRU5ErkJggg==) repeat scroll 0 0;
        }
        .good_name{
            width: 200px;//宽度要定义好
            margin-bottom: 5px;
        }
        .good_value{
            font-size: 13px;
            color: var(--main-gray3);
        }
    }
    
</style>