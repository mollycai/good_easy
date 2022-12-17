<template>
    <a-badge :status="getStatus" :text="getStatusText" />
</template>
<script>
export default{
    name:'GoodStatus',
    props:['goodStatus'],
    data(){
        return{

        }
    },
    computed:{
        // 获取状态点样式
        getStatus(){
            switch(this.goodStatus){
                case -2:
                    return 'error';
                case 0:
                    return 'processing';
                case 1:
                    return 'success';
                case 2:
                    return 'warning';
                default:
                    return 'default';
            };
        },
        // 获取状态
        getStatusText(){
            switch(this.goodStatus){
                case -2:
                    return '不通过';
                case 0:
                    return '审核中';
                case 1:
                    return '已审核';
                case 2:
                    return '已下架';
                default:
                    return '状态错误';
            };
        }
    }
}
</script>
<style lang="less" scoped>
</style>