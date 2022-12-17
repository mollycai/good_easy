<template>
    <!-- 确认单商品项卡片 -->
    <div class="outer_box1">
        <div class="seller_box">
            <span style="line-height: 32px;">卖家：</span>
            <AvatarBox :avatar="order.sellerAvatar" :name="order.sellerName"/>
        </div>
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
                <div class="tag_box" v-show="order.attributes != null">
                    <a-tag :color="tagColor[order.attributes.indexOf(item)]" 
                    v-for="item in order.attributes" 
                    :key="order.attributes.indexOf(item)">
                        {{item.value}}
                    </a-tag>
                </div>
                <a-tooltip placement="bottom">
                    <template slot="title">
                        <span>点击填写备注</span>
                    </template>
                    <div class="remark_box" @click="(remark_show = true)">
                        <span class="remark_text more_text">订单备注：<span style="color:rgb(160,160,160);">{{order.remark || '无备注'}}</span></span>
                        <a-modal v-model="remark_show" ok-text="确认" cancel-text="取消" title="订单备注" @ok="handleOk"  width="760px">
                            <a-input type="textarea" v-model="order.remark" placeholder="请输入订单备注"/>
                        </a-modal>
                    </div>
                </a-tooltip>
                </div>
                <div class="price_num_box">
                    <div style="">
                        <div class="price_box">￥{{order.price.toFixed(2)}}</div>
                        <a-tag class="number_box">×{{order.number}}</a-tag>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AvatarBox from '../layout/AvatarBox.vue';
export default{
    name:'ComfirmShopCartItem',
    props:['order'],
    components:{
        AvatarBox
    },
    data(){
        return{
            remark_show:false,
            tagColor:['pink','red','orange','green','cyan','blue','purple'],
            miniMsg:[{id:101,key:'品牌',value:'Apple/苹果'},
                   {id:102,key:'型号',value:'iphone 14 Pro Max'},
                   {id:103,key:'版本',value:'国行'},
                   {id:104,key:'内存',value:'256G'}],
        }
    },
    methods:{
        handleOk(e) {
            this.remark_show = false;
        },
        // 获取首图
        getFirstImg(imgStr){
            const imgList = String(imgStr).split(',');
            const firstImg = imgList[0];
            return firstImg;
        }
    },
}
</script>
<style lang="less" scoped>
    .outer_box1{
        width: 100%;
        background-color: #fff;
        padding: 0px 30px;
        min-height: 260px;
    }
    .seller_box{
        display: flex;
        border-bottom: 1px solid rgb(220, 220, 220);
        padding: 20px 0 15px;
    }
    .outer_box2{
        padding: 30px 40px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .good_img{
            height: 120px;
            width: 120px;
            // border: black solid 1px;
            display: table-cell;
            vertical-align: middle;
            background: url(data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1JREFUeNpi+P//PwMMP3369AUyH1mMKEVwhYQUgRUSowjFakJOYBhOngEIMAB1izbs6IM8DAAAAABJRU5ErkJggg==) repeat scroll 0 0;
            cursor: pointer;
        } 
        .good_msg{
            // border: black solid 1px;
            display: flex;
            width: 85%;
            justify-content: space-between
        }
    }
    .tag_box{
        padding: 5px 0px;
        // border: 1px black solid;
    }
    .text_box{
        color:rgb(160,160,160);
        max-width: 800px;
        word-break: normal;
        .title_box{
            padding: 10px 0px 5px 0px;
            // border: black solid 1px;
            font-size: 20px;
            color: black;
            font-weight: 600;
            max-width: 500px;
        }
        .remark_box{
            cursor: pointer;
            padding: 5px 0px 0px 0px;
            .remark_text{
                color:rgb(100,100,100);
                -webkit-line-clamp: 2;/*这个属性不是css的规范属性，需要组合上面两个属性，表示显示2行。	*/
            }
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
            color: #000000;
        }
        .number_box{
            float: right;
            margin-top: 5px;
        }
    }
</style>