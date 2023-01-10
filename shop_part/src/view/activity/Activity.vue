<template>
    <!-- 活动页面 -->
        <a-layout id="components-layout-demo-top-side">
            <a-layout-content style="background-color: var(--bottom-white);padding: 25px 0;">
                <a-layout style="background: var(--bottom-white);margin: 0 auto;max-width: 1180px;">
                    <a-layout-content :style="{ minHeight: '280px' }">
                        <div class="activity_item" v-for="item in activityList" :key="item.id">
                            <div class="img_box">
                                <img :src="item.img" alt="" style="width: 100px;height: 100px;">
                            </div>
                            <div class="text_box">
                                <div class="title_box">
                                    {{item.title}}
                                </div>
                                <div class="desc_box">
                                    {{item.desc}}
                                </div>
                            </div>
                        </div>
                    </a-layout-content>
                </a-layout>
            </a-layout-content>
        </a-layout>
</template>

<script>
import{mapState} from 'vuex'
export default{
    name:'Activity',
    computed:{
        ...mapState({
            activityList: state => state.activity.activityList
        })
    },
    mounted(){
        this.$store.dispatch('getActivityList');
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
.activity_item{
    background-color: var(--main-white);
    box-shadow:  0 1px 2px 0 var(--main-shadow);
    height: 140px;
    padding: 20px 30px;
    margin-bottom: 20px;
    display: flex;
}
.activity_item:hover{
    cursor: pointer;
    background-color: var(--hover-white);
}
.text_box{
    margin-left: 20px;
    .title_box{
        font-size: 16px;
        font-weight: 700;
    }
    .desc_box{
        margin-top: 5px;
        color: var(--main-gray2);
    }
}
</style>