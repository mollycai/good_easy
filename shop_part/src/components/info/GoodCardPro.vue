<template>
    <!-- 横形商品卡片 -->
    <div class="main_box">
        <div class="img_msg_box">
            <div>
                <!-- 图片 -->
                <div class="good_img">
                    <img v-lazy="getFirstImg(goodInfo.image || goodInfo.goodsImage)" alt="" 
                    :class="imgHeight > imgWidth ? 'height':'width'">
                </div>
            </div>
            <div class="msg_box">
                <!-- 卖家 -->
                <div class="seller_box" v-if="goodInfo.seller || goodInfo.sellerId">
                    <a-avatar :src="goodInfo.avatar"/>
                    <span style="line-height: 20px;margin-left: 10px;">{{goodInfo.seller || goodInfo.sellerName}}</span>
                </div>
                <!-- 商品信息 -->
                <div class="title_box one_text">
                    {{goodInfo.name || goodInfo.goodsName}}
                </div>
                <!-- 自定义属性栏 -->
                <div class="tag_box" v-show="goodInfo.attributes != null">
                    <a-tag :color="tagColor[goodInfo.attributes.indexOf(item)]" 
                    v-for="item in goodInfo.attributes" 
                    :key="goodInfo.attributes.indexOf(item)">
                        {{item.value}}
                    </a-tag>
                </div>
                <!-- 价格栏 -->
                <div class="price_box">
                    <span style="font-size: 22px;font-weight: 500;color: #FFA116;">{{((goodInfo.price * 100) / 100).toFixed(2)}}</span>&nbsp;
                    <a-tag style="margin-left: 10px;">×{{goodInfo.number}}</a-tag>
                </div>
            </div>
        </div>
        <!-- 状态栏 -->
        <div class="status_box">
            <GoodStatus :goodStatus="goodInfo.status"/>
        </div>
    </div>
</template>

<script>
import { getImageSize } from '@/utils/imageSize';
import GoodStatus from '@/components/status/GoodStatus.vue';
export default{
    name:'GoodCardPro',
    props:['goodInfo'],
    components:{
        GoodStatus
    },
    data(){
        return{
            // 色盒
            tagColor:['blue','green','orange','red','purple','pink','cyan'],
            // 图片长宽
            imgWidth:0,
            imgHeight:0
        }
    },
    methods:{
        // 获取首图
        getFirstImg(imgStr){
            const imgList = String(imgStr).split(',');
            const firstImg = imgList[0];
            return firstImg;
        }
    },
    mounted(){
        // 读取图片长宽
        getImageSize(this.goodInfo.image || this.goodInfo.goodsImage).then(reslove =>{
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
        background-color: #fff;
        // box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
        // margin: 20px 0;
        padding: 20px 30px;
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid rgb(247, 248, 250);
    }
    .main_box:hover{
        background-color: rgb(249, 251, 253);
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
            .seller_box{
                padding: 5px 0px;
            }
            .title_box{
                padding: 5px 0px;
                font-size: 18px;
                color: black;
                font-weight: 500;
                max-width: 800px;
            }
            .tag_box{
                padding: 5px 0px;
            }
            .price_box{
                padding: 8px 0px 8px 0;
            }
        }
    }


</style>