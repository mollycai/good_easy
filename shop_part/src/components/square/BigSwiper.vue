<template>
    <!-- 轮播图 -->
    <div style="margin: 0 0 60px 0;" @mouseover="(visible = true)" @mouseleave="(visible = false)">
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide><div class="swiper_box"><img src="../../assets/swiper/wallhaven-738w79.jpg" alt="" class="big_img"></div></swiper-slide>
            <swiper-slide><div class="swiper_box"><img src="../../assets/swiper/wallhaven-lqyv8p.jpg" alt="" class="big_img"></div></swiper-slide>
            <swiper-slide><div class="swiper_box"><img src="../../assets/swiper/wallhaven-nedy6r.jpg" alt="" class="big_img"></div></swiper-slide>
            <swiper-slide><div class="swiper_box"><img src="../../assets/swiper/wallhaven-w8elvq.jpg" alt="" class="big_img"></div></swiper-slide>
            <div class="swiper-button-prev" slot="button-prev" v-show="visible"></div>
            <div class="swiper-button-next" slot="button-next" v-show="visible"></div>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default{
    name:'BigSwiper',
    components: {
      swiper,
      swiperSlide
    },
    data(){
        return{
            visible:false,
            swiperOption: {
                autoplay:true,
                spaceBetween: 30,
                loop: true,
                loopedSlides: 1, 
                effect: 'fade',
                scrollbar: {
                    el: '.swiper-scrollbar',
                    hide: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .swiper_box{
        height: 700px;
        width: 100%;
    }
    .big_img{
        width: 100%;
    }
    
</style>
