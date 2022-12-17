<template>
    <!-- 头像和用户名组件 -->
    <div>
        <div v-if="avatar" class="avater_box">
            <img v-lazy="avatar" alt="" class="image"/>
        </div>
        <div v-else class="avater_box">
            <a-avatar class="admin_avater">{{avaterName}}</a-avatar>
        </div>
        <div class="name_box">
            <span class="admin_name">{{name}}</span>
        </div>
    </div>
</template>
<script>
export default{
    name:"AvatarBox",
    props:['avatar','name'],
    data(){
        return{
            
        }
    },
    computed:{
        //默认头像
        avaterName(){
            let username = String(this.name)
            return username.substring(0,1)
        }
    }
}
</script>
<style lang="less" scoped>
    .avater_box{
        display: inline-block;
        height: 100%;
        margin: 0 5px;
        font-size: 15px;
    }
    .admin_avater{
        color: #1890ff; 
        background-Color: rgb(199, 222, 255);
    }
    .name_box{
        display: inline-block;
        height: 100%;
        margin: 0 5px;
        font-size: 15px;
    }
    .image{
        border-radius: 50%;
        width: 32px;
        height: 32px;
    }
</style>