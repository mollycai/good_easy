<template>
    <!-- 首页（广场） -->
    <a-layout-content style="background-color: #fff;">
        <a-layout style="background: #fff">
            <a-layout-content :style="{ minHeight: '280px' }">
                <!-- 轮播图 -->
                <BigSwiper></BigSwiper>
                <!-- 广告条 -->
                <Advertise></Advertise>
                <!-- 商品部分 -->
                <GoodsCate></GoodsCate>
            </a-layout-content>
        </a-layout>
    </a-layout-content>
</template>

<script>
import BigSwiper from '@/components/square/BigSwiper.vue'
import Advertise from '@/components/square/Advertise.vue'
import GoodsCate from '@/view/square/GoodsCate.vue'
export default{
    name:'First',
    components:{
        BigSwiper,
        Advertise,
        GoodsCate
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

</style>