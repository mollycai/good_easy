<template>
    <!-- 活动页面 -->
    <div>
        敬请期待
    </div>
</template>

<script>
export default{
    name:'Activity',
    beforeMount(){
        document.title = this.$route.meta.title;
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