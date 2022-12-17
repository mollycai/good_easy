<template>
    <a-badge :status="getStatus" :text="getStatusText" />
</template>
<script>
export default{
    name:'OrderStatus',
    props:['orderStatus'],
    data(){
        return{

        }
    },
    computed:{
        // 获取状态点样式
        getStatus(){
            switch(this.orderStatus){
                case "-1":
                    return 'error';
                case "0":
                    return 'warning';
                case "1":
                    return 'processing';
                case "2":
                    return 'success';
                default:
                    return 'default';
            };
        },
        // 获取状态
        getStatusText(){
            switch(this.orderStatus){
                case "-1":
                    return '已取消';
                case "0":
                    return '未支付';
                case "1":
                    return '已支付';
                case "2":
                    return '已收货';
                default:
                    return '状态错误';
            };
        }
    }
}
</script>
<style lang="less" scoped>
</style>