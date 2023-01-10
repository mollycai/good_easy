<template>
    <div>
        <div ref="alipayWap" v-html="alipay" />
    </div>
</template>
<script>
export default{
    name:'Pay',
    data(){
        return{
            alipay:''
        }
    },
    methods:{

    },
    mounted(){
        // 渲染支付页面
        this.alipay = localStorage.getItem('alipay');
        // 防抖避免重复支付
        this.$nextTick(() => {
            // 提交支付表单
            this.$refs.alipayWap.children[0].submit();
            setTimeout(() => {
                // this.toPayFlag = false;
            }, 500);
        });
        this.removeLoading(); 
    },
    beforeMount() {
        document.title = this.$route.meta.title
    },
}
</script>
<style lang="less" scoped>
</style>