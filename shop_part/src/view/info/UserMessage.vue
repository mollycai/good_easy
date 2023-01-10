<template>
    <!-- 用户信息页面 -->
    <a-layout id="components-layout-demo-top-side">
        <a-layout-content style="background-color: var(--bottom-white);padding: 25px 0;">
            <a-layout style="background: var(--bottom-white);margin: 0 auto;max-width: 1180px;">
                <a-layout-content :style="{ minHeight: '280px' }">
                    <UserCard></UserCard>
                    <TransCard></TransCard>
                </a-layout-content>
            </a-layout>
        </a-layout-content>
    </a-layout>
</template>

<script>
import UserCard from '@/components/info/UserCard.vue'
import TransCard from '@/components/info/TransCard.vue'
export default {
    name:'UserMessage',
    components:{
        UserCard,
        TransCard,
    },
    data(){
        return{
            tabList:[]
        }
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