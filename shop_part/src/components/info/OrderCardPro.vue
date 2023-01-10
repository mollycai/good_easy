<template>
    <!-- 订单卡片组件 -->
    <div class="main_box">
        <div class="img_msg_box">
            <!-- 图片 -->
            <div>
                <div class="good_img">
                    <img v-lazy="getFirstImg(orderInfo.goodsImage)" alt="" 
                    :class="imgHeight > imgWidth ? 'height':'width'">
                </div>
            </div>
            <!-- 信息栏 -->
            <div class="msg_box">
                <div class="seller_box">
                    <span>买家/卖家：</span>
                    <AvatarBox :avatar="(orderInfo.sellerAvatar || orderInfo.customerAvatar)" :name="(orderInfo.sellerName || orderInfo.customerName)"/>
                </div>
                <div class="orderId_box one_text">
                    <span>订单号：</span>
                    <span style="color: var(--main-gray1);">{{orderInfo.id}}</span>
                </div>
                <div class="title_box one_text">
                    <span>商品：</span>
                    <span style="color: var(--main-gray1);">{{orderInfo.goodsName}}</span>
                </div>
                <div class="price_box">
                    <span>金额：</span>
                    <span style="font-weight: 500;color: var(--main-orange);">￥{{((orderInfo.money * 100) / 100).toFixed(2)}}</span>&nbsp;
                </div>
            </div>
        </div>
        <!-- 状态栏 -->
        <div class="status_box">
            <OrderStatus :orderStatus="orderInfo.status"/>
            <!-- 后端未传入此数据 -->
            <!-- <div class="time_text" v-show="orderInfo.status == 0"><a-icon type="clock-circle" /> {{m}} 分钟 {{s}} 秒</div> -->
        </div>
    </div>
</template>

<script>
import AvatarBox from '@/components/layout/AvatarBox.vue';
import OrderStatus from '@/components/status/OrderStatus.vue';
import { getImageSize } from '@/utils/imageSize';
export default{
    name:'OrderCardPro',
    props:['orderInfo'],
    components:{
        AvatarBox,
        OrderStatus
    },
    data(){
        return{
            tagColor:['blue','green','orange','red','purple','pink','cyan'],
            imgWidth:0,
            imgHeight:0,
            m:'',
            s:'',
        }
    },
    methods:{
        // 30分钟倒计时,没用到,待用
        countdown () {
            const end = new Date(this.orderInfo.createTime).getTime();// update_time是后台返的数据，代表创建订单的那一个时刻的毫秒数
            const now = new Date().getTime();  // 获取当前时间的毫秒数
            const minus = now - end;
            const m_30 = 30*60*1000; // 30分钟毫秒数，如十分钟倒计时，公式即为10*60*100，以此类推
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
        // 获取首图
        getFirstImg(imgStr){
            const imgList = String(imgStr).split(',');
            const firstImg = imgList[0];
            return firstImg;
        }
        
    },
    mounted(){
        // 读取图片长宽
        getImageSize(this.orderInfo.goodsImage).then(reslove =>{
            this.imgWidth = reslove.width;
            this.imgHeight = reslove.height;
        }).catch(reject => this.$message.error(reject));
        
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
    .main_box{
        width: 100%;
        height: 200px;
        background-color: var(--main-white);;
        padding: 20px 30px;
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid var(--bottom-white);
    }
    .main_box:hover{
        background-color: var(--hover-white);
    }
    .img_msg_box{
        display: flex;
        .good_img{
            height: 160px;
            width: 160px;
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            background: url(data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1JREFUeNpi+P//PwMMP3369AUyH1mMKEVwhYQUgRUSowjFakJOYBhOngEIMAB1izbs6IM8DAAAAABJRU5ErkJggg==) repeat scroll 0 0;
        }
        .msg_box{
            padding: 5px 0px 5px 20px;
            color: var(--main-gray2);
            line-height: 32px;
            .seller_box{
                display: flex;
                padding: 5px 0px;
            }
            .orderId_box{
                display: flex;;
                max-width: 800px;
            }
            .title_box{
                display: flex;
            }
            .price_box{
                display: flex;
            }
        }
    }


</style>