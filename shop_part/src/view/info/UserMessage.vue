<template>
    <!-- 用户信息页面 -->
    <a-layout id="components-layout-demo-top-side">
        <a-layout-content style="background-color: rgb(247,248,250);padding: 25px 0;">
            <a-layout style="background: rgb(247,248,250);margin: 0 auto;max-width: 1180px;">
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