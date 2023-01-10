<template>
    <!-- 订单商品项卡片 -->
    <div class="outer_box1">
        <!-- 订单信息 -->
        <div class="outer_box2">
            <div>
                <div class="good_img">
                    <img v-lazy="getFirstImg(order.goodsImage)" alt="" style="width: 100%;">
                </div>
            </div>
            <div class="good_msg">
                <div class="text_box">
                    <div class="title_box one_text">
                        {{order.goodsName}}
                    </div>
                    <div class="desc_box">
                        共<span style="color:var(--main-blue);font-wight: 700;"> {{order.goodsNumber}} </span>件商品，
                        合计<span style="color:var(--main-blue);"> {{(((order.goodsNumber * order.totalAmount) * 100) / 100).toFixed(2)}} </span>元
                    </div>
                    <div class="order_id_box">
                        订单编号：{{order.id}}
                    </div>
                    <div class="seller_name_box one_text">
                        卖家昵称：{{order.sellerName}}
                    </div>
                    <div class="createtime_box">
                        下单时间：{{order.createTime}}
                    </div>
                    <div class="paytime_box">
                        付款时间：{{order.payTime || '未付款'}}
                    </div>
                </div>
                <div class="price_num_box">
                    <div style="">
                        <div class="price_box">￥{{((order.totalAmount * 100) / 100).toFixed(2)}}</div>
                        <a-tag class="number_box">×{{order.goodsNumber}}</a-tag>
                    </div>
                    <div class="total_price">
                        {{(order.status == 0 || order.status == -1 ? '待付款：':'已付款：')}}
                        <span class="total_price_box">￥{{(((order.goodsNumber * order.totalAmount) * 100) / 100).toFixed(2)}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 收件人信息 -->
        <div class="user_info" @click="(visible = true)">
            <div class="phone_box one_text">
                <span style="color:var(--main-black);">收件人：</span>
                <span style="color:var(--main-gray2);">{{(order.name || order.username)}}&nbsp;&nbsp;{{order.phone}}</span>
            </div>
            <div class="address_box one_text">
                <span style="color:var(--main-black);">交易地址：</span>
                <span style="color:var(--main-gray2);">{{order.address}}</span>
            </div>
            <div class="remark_box one_text">
                <span style="color:var(--main-black);">备注：</span>
                <span style="color:var(--main-gray2);">{{order.remark || '无备注'}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name:'ComfirmOrder',
    props:['order'],
    data(){
        return{
            visible:false,
            confirmOrder:{
                confirmOrderId:'',
                name:'Moly',
                phone:'18023913478',
                address:'广东省广州市天河区迎龙路161号广东工业大学龙洞校区',
                remark:'无'
            },
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
            rules: {
                phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' },
                ],
                address:[{ required: true, message: '请输入收货地址', trigger: 'blur' }],
            },
        }
    },
    methods:{
        handleOk(e) {
            
        },
        // 获取首图
        getFirstImg(imgStr){
            const imgList = String(imgStr).split(',');
            const firstImg = imgList[0];
            return firstImg;
        }
    },
    mounted(){
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
    .outer_box1{
        width: 100%; 
    }
    .outer_box2{
        background-color: var(--main-white);
        padding: 30px 40px;
        display: flex;
        justify-content: space-between;
        height: 100%;
        .good_img{
            height: 160px;
            width: 160px;
            // border: black solid 1px;
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            background: url(data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1JREFUeNpi+P//PwMMP3369AUyH1mMKEVwhYQUgRUSowjFakJOYBhOngEIMAB1izbs6IM8DAAAAABJRU5ErkJggg==) repeat scroll 0 0;
        }
    }
    .good_msg{
        padding-left: 20px;
        // border: black solid 1px;
        display: flex;
        width: 83%;
        justify-content: space-between
    }
    .tag_box{
        padding: 5px 0px;
        // border: 1px black solid;
    }
    .text_box{
        color:var(--main-gray2);
        .title_box{
            padding: 15px 0px 5px 0px;
            // border: black solid 1px;
            font-size: 18px;
            color: var(--main-black);
            font-weight: 600;
            max-width: 700px;
        }
        .desc_box  {
            padding:2px 0;
        }
        .order_id_box{
            margin-top: 5px;
        }
        .seller_name_box{
            max-width: 500px;
        }
    }
    .price_num_box{
        display: flex;
        padding:5px 0;
        flex-direction: column;
        justify-content: space-between;
        .price_box{
            text-align: right;
            font-size: 18px;
            font-weight: 500;
            color: var(--main-black);
        }
        .number_box{
            float: right;
            margin-top: 5px;
        }
        .total_price_box{
            font-size: 22px;
            font-weight: 500;
            color: var(--main-orange);
        }
    }
    .user_info{
        background-color: var(--main-white);
        margin-top: 20px;
        padding: 20px 30px;
        font-size: 15px;
        line-height: 25px;
        max-width: 1180px;
        .phone_box .address_box .remark_box{
            color: var(--main-gray1);
        }
    }
</style>