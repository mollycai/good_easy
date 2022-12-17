<template>
    <!-- 确认单页面 -->
    <a-layout id="components-layout-demo-top-side">
        <a-layout-content style="background-color: rgb(247,248,250);padding: 25px 0;">
            <a-layout style="background: rgb(247,248,250);margin: 0 auto;max-width: 1180px;">
                <a-layout-content>
                    <div class="back_box">
                        <span class="back_msg" @click="$router.push({name:'shopcart'})" >
                            <a-icon type="left" />&nbsp;返回购物车
                        </span>
                        <div class="warning_box">
                            <a-alert
                            message="提示"
                            description="若提交订单且未付款，30分钟后自动取消订单，下单后请及时付款。"
                            type="info"
                            show-icon
                            />
                        </div>
                    </div>
                    <div class="user_msg_box" @click="(visible = true)">
                        <div>
                            <div class="address_box">
                            <a-icon type="environment" style="color: #1890ff;"/>
                                {{confirmShopcartUser.address}}
                            </div>
                            <div class="name_phone_box">
                                {{confirmShopcartUser.name}}&nbsp;&nbsp;{{confirmShopcartUser.phone}}
                            </div>
                        </div>
                        <div style="line-height: 60px;">
                            <a-icon type="right" style="color: black;"/>
                        </div>
                        <!-- 订单信息弹窗 -->
                        <a-modal v-model="visible" ok-text="确认" cancel-text="取消" title="收件人信息" @ok="handleOk"  width="760px">
                            <a-form-model
                                ref="ruleForm"
                                :model="confirmShopcartUser"
                                :rules="rules"
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol"
                            >
                            <a-form-model-item ref="name" label="收件人" prop="name">
                                <a-input v-model="confirmShopcartUser.name" />
                            </a-form-model-item>
                            <a-form-model-item ref="phone" label="联系方式" prop="phone">
                                <a-input v-model="confirmShopcartUser.phone" />
                            </a-form-model-item>
                            <a-form-model-item ref="address" label="收货地址" prop="address">
                                <a-input v-model="confirmShopcartUser.address" />
                            </a-form-model-item>
                            </a-form-model>
                        </a-modal>
                    </div>    
                    <div class="comfirm_shop_box" v-for="item in comfirmList" :key="item.id">
                        <ComfirmShopCartItem :order="item"/>
                    </div> 
                    <div class="btn_box">
                        <div class="price_box"><span style="color: black;">价格明细：</span>
                            共<span style="color: #1890ff;font-size: 18px;"> {{totalNumber}} </span>
                            件商品，合计: <span style="color: #FFA116;font-size: 20px;">￥{{totalPrice.toFixed(2)}}</span>
                        </div>
                        <a-button type="primary" @click="comfirm()">
                            提交订单
                        </a-button>
                    </div>
                    <!-- <div ref="alipayWap" v-html="alipay" /> -->
                </a-layout-content>
            </a-layout>
        </a-layout-content>
    </a-layout>
</template>
<script>
import ComfirmShopCartItem from '@/components/trade/ComfirmShopCartItem.vue';
export default{
    name:'ComfirmShopCart',
    components:{
        ComfirmShopCartItem,
    },
    data(){
        return{
            visible:false,
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
            rules: {
                phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
                name: [{ required: true, message: '请输入收件人姓名', trigger: 'blur' }],
                address:[{ required: true, message: '请输入收货地址', trigger: 'blur' }],
            },
            confirmShopcartUser:{
                name: this.$store.state.user.userInfo.name,
                phone:this.$store.state.user.userInfo.mobile,
                address:this.$store.state.user.userInfo.address
            },
            userId:'',
            comfirmList:[],
            // alipay:''
        }
    },
    computed:{
        totalNumber(){
            let totalNumber = 0
            this.comfirmList.forEach(item => totalNumber += item.number)
            return totalNumber
        },
        totalPrice(){
            let totalPrice = 0
            this.comfirmList.forEach(item => totalPrice += ((item.number * item.price) * 100 / 100))
            return totalPrice
        }
    },
    watch:{
        // 监视是否添加了备注，也一起缓存进取
        comfirmList:{
            deep:true,
            handler(newValue, oldValue){
                sessionStorage.setItem('comfirmList', JSON.stringify(this.comfirmList))
            }
        }
    },
    methods:{
        handleOk(e) {
            this.visible = false;
        },
        comfirm(){
            const orders = this.comfirmList.map(item => {
                return {
                    confirmOrderId: item.id,
                    userId:this.userId,
                    remark: item.remark,
                    address:this.confirmShopcartUser.address,
                    phone:this.confirmShopcartUser.phone
                }
            });
            this.$store.dispatch('reqOrder',orders).then((res) => {
                // 渲染支付页面
                // 借助sessionStorage传送表单
                sessionStorage.setItem('alipay',res.data.form);
                // 先产生新的页面
                let routeData = this.$router.resolve({name:'pay'});
                window.open(routeData.href,'_blank');
                // 再跳转到我买到的
                this.$router.push({name:'mybuy'});
                // 把暂存的确认单也删了
                sessionStorage.removeItem('comfirmList');
            }).catch((error) => {
                this.$message.error(`${error}`);
            })
            
        }
    },
    mounted(){
        this.$store.dispatch('getUserInfo').then(()=>{
            this.confirmShopcartUser.name = this.$store.state.user.userInfo.username;
            this.confirmShopcartUser.phone = this.$store.state.user.userInfo.mobile;
            this.userId = this.$store.state.user.userInfo.id;
        })
        // 从sessionStorage中读取
        this.comfirmList = JSON.parse(sessionStorage.getItem('comfirmList'));
    },
    beforeMount(){
        document.title = this.$route.meta.title
    },
    created(){
        let self = document.getElementById('Loading');
        if(self != null){
            let parent = self.parentElement;
            parent.removeChild(self);
            document.body.style.overflowY = 'scroll';
        }
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
        .back_msg{
            cursor: pointer;
        }
    }
    .user_msg_box{
        width: 100%;
        background-color: #fff;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
        padding: 30px 30px;
        display: flex;
        justify-content: space-between;
        border-radius: 2px;
        margin-top: 20px;
        cursor: pointer;
        .address_box{
            color: black;
            font-size: 18px;
            font-weight: 600;
            line-height: 35px;
        }
        .name_phone_box{
            margin-left: 24px;
            font-size: 15px;
            line-height: 25px;
        }
    }
    .warning_box{
        margin-top: 20px;
    }
    .comfirm_shop_box{
        margin-top: 20px;
    }
    .btn_box{
        width: 100%;
        background-color: #fff;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
        padding: 20px 30px;
        border-radius: 2px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        line-height: 32px;
        .price_box{
            font-size: 15px;
            font-weight: 600;
            color: rgb(160,160,160);
        }
    }
</style>