<template>
    <!-- 首页商品卡片组件 -->
    <section class="cards">
        <article class="card" >  
        <a href="#">
            <div class="img_box">
                <div><img v-lazy="bigImage" alt="" :class="imgHeight >= imgWidth ? 'height':'width'"/></div>
            </div>
        </a>
        <div class="card__info">
            <div class="card__name one_text"> {{goodInfo.goodsName || goodInfo.name}}</div>
            <h3 class="card__price">￥{{((goodInfo.price * 100) / 100).toFixed(2)}}</h3>
            <span class="card__seller">
                <AvatarBox :avatar="goodInfo.avatar" :name="goodInfo.sellerName"/>
            </span>
        </div>
        </article>
    </section>
</template>
<script>
import { getImageSize } from '@/utils/imageSize';
import AvatarBox from '@/components/layout/AvatarBox.vue';
export default{
    name:'GoodsCard',
    props:['goodInfo'],
    components:{
        AvatarBox
    },
    data(){
        return{
            imgWidth:0,
            imgHeight:0
        }
    },
    computed:{
        //默认头像
        avaterName(){
            let username = `${this.$store.state.user.userInfo.username}`
            return username.substring(0,1)
        },
        bigImage(){
            let imageStr = this.goodInfo.image
            let firstImage = imageStr.split(',')[0]
            return firstImage
        }
    },
    mounted(){
        // 读取图片长宽
        getImageSize(this.goodInfo.image).then(reslove =>{
            this.imgWidth = reslove.width;
            this.imgHeight = reslove.height;
        }).catch(reject => this.$message.error(reject));
    }
}
</script>
<style lang="less" scoped>
    .height{
        height: 275px;
        overflow: hidden;
    }
    .width{
        width: 275px;
        overflow: hidden;
    }
    .card {
        margin-right: 25px;
        transition: all .4s cubic-bezier(0.175, 0.885, 0, 1);
        background-color: #fff;
        overflow: hidden;
        box-shadow: 0px 8px 10px -7px rgba(0, 0, 0,0.1);
    }
    .card:hover {
        box-shadow: 0px 15px 18px -8px rgba(0, 0, 0,0.1);
        transform: scale(1.1, 1.1);
    }
    .card__info {
        z-index: 999;
        background-color: #fff;
        padding: 16px 20px;
        height: 136px;
        position: relative;
    }
    .card__name {
        text-transform: uppercase;
        font-size: 15px;
        letter-spacing: 2px;
        font-weight: 500;
        color: black;
        overflow: hidden;
        width: 250px;
    }
    .card__price {
        margin-top: 5px;
        margin-bottom: 10px;
        color: #FFA116;
        font-weight: 700;
        font-size: 20px;
    }
    .card__seller{
        margin: 5px 0 15px 0;
        float: right;
        display: flex;
    }
    .img_box{
        width: 275px;
        height: 275px;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        background: url(data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1JREFUeNpi+P//PwMMP3369AUyH1mMKEVwhYQUgRUSowjFakJOYBhOngEIMAB1izbs6IM8DAAAAABJRU5ErkJggg==) repeat scroll 0 0;
    }
</style>