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
        this.alipay = sessionStorage.getItem('alipay');
        let _this = this;
        // 防抖避免重复支付
        this.$nextTick(() => {
            // 提交支付表单
            this.$refs.alipayWap.children[0].submit();
            setTimeout(() => {
                console.log(1)
                // this.toPayFlag = false;
            }, 500);
        });
        let self = document.getElementById('Loading');
        if(self != null){
            let parent = self.parentElement;
            parent.removeChild(self);
            document.body.style.overflowY = 'scroll';
        }
    },
}
</script>
<style lang="less" scoped>
</style>