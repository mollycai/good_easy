<template>
    <!-- 订单页面 -->
    <a-layout id="components-layout-demo-top-side">
        <a-layout-content style="background-color: rgb(247,248,250);padding: 25px 0;">
            <a-layout style="background: rgb(247,248,250);margin: 0 auto;max-width: 1180px;">
                <a-layout-content>
                    <!-- 订单状态栏 -->
                    <div class="msg_box" v-if="(order.status == 0 || order.status == 1 || order.status == 2 )">
                        <a-steps :current="Number(order.status)">
                            <a-step v-for="item in steps" :key="steps.indexOf(item)" :title="(steps.indexOf(item) <= Number(order.status) ? item.title_y : item.title_n)">
                                <a-icon slot="icon" :type="item.icon" />
                            </a-step>
                        </a-steps>
                    </div>
                    <div class="msg_box" v-else>
                        <a-steps>
                            <a-step v-for="item in cancel" :key="cancel.indexOf(item)" :title="item.title">
                                <a-icon slot="icon" :type="item.icon" style="color:red;"/>
                            </a-step>
                        </a-steps>
                    </div>
                    <!-- 结果 -->
                    <div class="result_box" v-if="(order.status == 2)">
                        <a-result
                            status="success"
                            title="本次交易已完成!"
                            sub-title=""
                        ></a-result>
                    </div>
                    <!-- 订单信息栏 -->
                    <div class="steps-content">
                        <ComfirmOrderItem :order="order"/>
                    </div>
                    <!-- 按钮栏 -->
                    <div class="btn_box" v-if="(order.status == 0 || order.status == 1)">
                        <div>
                            <div v-if="(order.status == 0)">
                            <!-- 只有买家才有权取消订单 -->
                            <a-button type="default" @click="cancelOrder()" style="margin-right: 25px;" v-if="!(userId == order.sellerId)">
                                取消订单
                            </a-button>
                            <a-button type="primary" @click="pay()">
                                去付款
                            </a-button>
                            </div>
                            <div v-if="(order.status == 1)">
                                <a-button type="primary" @click="deliveryGoods()">
                                    确认收货
                                </a-button>
                            </div>
                        </div>
                        <div class="time_box" v-if="(order.status == 0)">
                            剩余支付时间（超时自动关闭订单）：<span class="time_text"><a-icon type="clock-circle" /> {{m}} 分钟 {{s}} 秒</span>
                        </div>
                    </div>
                    <div class="btn_box" v-if="(order.status == -1)">
                        <a-button type="danger" @click="deleteOrder()" style="margin-right: 25px;" ghost>
                            删除订单记录
                        </a-button>
                    </div>
                </a-layout-content>
            </a-layout>
        </a-layout-content>
    </a-layout>
</template>
<script>
import { mapState } from 'vuex';
import ComfirmOrderItem from '@/components/trade/ComfirmOrderItem.vue';
export default {
    name:'Order',
    components:{
        ComfirmOrderItem
    },
    data() {
        return {
            userId: '',
            steps: [
                {
                    title_n: '待拍下',
                    title_y: '已拍下',
                    content: 'First-content',
                    icon:'file-protect',
                },{
                    title_n: '待付款',
                    title_y: '已付款',
                    content: 'Second-content',
                    icon:'dollar',
                },{
                    title_n: '待收货',
                    title_y: '已收货',
                    content: 'Last-content',
                    icon:'check-circle',
                },
            ],
            cancel: [
                {
                    title: '已取消',
                    content: 'First-content',
                    icon:'close-circle',
                }
            ],
            // 剩余分钟
            m:'',
            // 剩余秒钟
            s:''
        };
    },
    computed:{
        ...mapState({
            // 订单详情
            order: state => state.trade.orderInfo
        }),
    },
    methods: {
        next() {
            this.current++;
        },
        prev() {
            this.current--;
        },
        // 取消订单
        cancelOrder(){
            let _this = this
            this.$confirm({
                title: `提示`,
                content: `您确定取消订单${this.order.id}的交易吗？`,
                async onOk() {
                    try {
                        await _this.$store.dispatch('cancelOrder',_this.order.id);
                        _this.$message.success('取消成功！');
                        // 派发订单详情
                        _this.$store.dispatch('reqOrderInfo',_this.$route.params.orderId);
                    } catch (error) {
                        _this.$message.error(`${error}`);
                    }
                },
                onCancel() {},
            });
        },
        // 删除订单记录
        deleteOrder(){
            let _this = this;
            this.$confirm({
                title: `提示`,
                content: `您确定将订单${this.order.id}的记录删除吗？`,
                async onOk() {
                    try {
                        await _this.$store.dispatch('deleteOrder',_this.order.id);
                        _this.$message.success('删除成功！');
                        _this.$router.push({name: 'mybuy'});
                    } catch (error) {
                        _this.$message.error(`${error}`);
                    }
                },
                onCancel() {},
            });
        },
        // 继续付款
        pay(){
            this.$store.dispatch('reqOrderInfo',this.$route.params.orderId);
            const data = {
                tradeNo: this.order.id
            }
            this.$store.dispatch('continueToPay',data).then((res) => {
                // 渲染支付页面
                // 借助sessionStorage传送表单
                sessionStorage.setItem('alipay',res.data.form);
                // 跳转到新的页面
                let routeData = this.$router.resolve({name:'pay'});
                window.open(routeData.href,'_blank');
            }).catch((error) => {
                this.$message.error(`${error}`);
            })
        },
        // 确认收货
        deliveryGoods(){
            const data = {
                id:this.order.id
            }
            let _this = this;
            this.$confirm({
                title: `提示`,
                content: `您是否确认已收到订单${_this.order.id}的商品？`,
                async onOk() {
                    try {
                        await _this.$store.dispatch('deliveryGoods',data);
                        _this.$message.success(`订单${_this.order.id}已完成交易！`);
                        _this.$store.dispatch('reqOrderInfo',_this.$route.params.orderId);
                    } catch (error) {
                        _this.$message.error(`${error}`);
                    }
                },
                onCancel() {},
            });
        },
        // 30分钟倒计时
        countdown () {
            const end = new Date(this.order.createTime).getTime();// update_time是后台返的数据，代表创建订单的那一个时刻的毫秒数
            const now = new Date().getTime();  // 获取当前时间的毫秒数
            const minus = now - end;
            const m_30 = 30 * 60 * 1000; // 30分钟毫秒数，如十分钟倒计时，公式即为10*60*100，以此类推
            const differ = m_30 - minus;   // 时间差
            let m = parseInt(differ / 1000 / 60 % 60);
            let s = parseInt(differ / 1000 % 60);
            this.m = m > 9 ? m : '0' + m;
            this.s = s > 9 ? s : '0' + s;
            const _this = this;
            if(m >= 0 && s >= 0) {
                if(m == 0 && s == 0) {
                    // 倒计时结束关闭订单
                    this.$store.dispatch('reqOrderInfo',this.$route.params.orderId);
                    return;
                }
                setTimeout(function () {
                    _this.countdown();
                }, 1000)
            }
        },
    },
    mounted(){
        // 派发获取订单详情
        this.$store.dispatch('reqOrderInfo',this.$route.params.orderId).then(()=>{
            this.countdown();
        })
        // 派发个人信息
        this.$store.dispatch('getUserInfo').then(()=>{
            this.userId = this.$store.state.user.userInfo.id;
        })
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
};
</script>
<style lang="less" scoped>
    .result_box{
        margin-top: 20px;
        background-color: #fff;
    }
    .msg_box{
        width: 100%;
        background-color: #fff;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
        padding: 30px 30px;
    }
    .steps-content {
      margin-top: 20px;
    }
    .steps-action {
      margin-top: 24px;
    }
    .btn_box{
        margin-top: 20px;
        width: 100%;
        background-color: #fff;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
        padding: 20px 30px;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
    }
    .time_box{
        font-size: 15px;
        line-height: 32px;
        .time_text{
            font-size: 18px;
            font-weight: 600;
            color: #f50;
        }
    }
</style>