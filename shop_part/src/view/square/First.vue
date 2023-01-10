<template>
    <!-- 首页（广场） -->
    <a-layout-content style="background-color: var(--main-white);">
        <a-layout style="background: var(--main-white);">
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
    beforeMount() {
        document.title = this.$route.meta.title
    },
    created(){
        this.removeLoading(); 
    }
}
</script>

<style lang="less" scoped>

</style>