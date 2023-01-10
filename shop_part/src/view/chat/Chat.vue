<template>
    <a-layout class="bgc_box">
        <a-layout-content >
            <a-layout style="background: var(--chat-white1);margin: 15px auto;max-width: 1180px;height: 900px;">
                <a-layout-content >
                    <div class="title_box">
                        {{sellerName}}
                    </div>
                    <div class="chat_msg_box">
                        <ul>
                            <li v-for="item in msgList" :key="item.id">
                                <div class="chat_item">
                                    <div class="avater_box">
                                        <div v-if="avatar" >
                                            <img v-lazy="avatar" alt="" class="admin_avater"/>
                                        </div>
                                        <div v-else>
                                            <a-avatar class="admin_avater">{{avaterName}}</a-avatar>
                                        </div>
                                    </div>
                                    <div class="chat_text_outbox">
                                        <div class="chat_text_box more_text">{{item.msgText}}</div>
                                        <div class="tri_box"></div>
                                    </div>
                                </div>

                            </li>
                        </ul>
                    </div>
                    <div class="input_box">
                        <div class="icon_box">
                            <a-icon type="smile" class="icon"/>
                            <a-icon type="file" class="icon"/>
                            <a-icon type="picture" class="icon"/>
                        </div>
                        <textarea class="text_area"
                        type="text-area" 
                        v-model="msgText" 
                        placeholder="请输入消息" 
                        @keydown.enter="handleSendMsg(msgText)" />
                        <div class="btn_box">
                            <a-button type="primary" @click="handleSendMsg(msgText)" style="width: 100px;">发送</a-button>
                        </div>
                    </div>
                </a-layout-content>
            </a-layout>
        </a-layout-content>
    </a-layout>
    
</template>

<script>
import {mapState} from 'vuex';
// 开启WebSocket服务
const ws = new WebSocket('ws://localhost:8000');

export default{
    name:'Chat',
    data(){
        return{
            msgText:'',
            msgList:[]
        }
    },
    computed:{
        ...mapState({
            username:(state) => state.chat.username,
            avatar:(state) => state.chat.avatar,
            sellerName:(state) => state.chat.sellerName,
            sellerAvatar:(state) => state.chat.sellerAvatar
        }),
        avaterName(){
            let username = String(this.username)
            return username.substring(0,1)
        }
    },
    methods:{
        // 发送消息
        handleSendMsg(msgText){
            // 获取时间
            const datetime = new Date().getTime();
            // 提示不能发空信息
            if(!msgText.trim().length){
                this.$message.warning('不能发空白信息！');
                return;
            }
            // // 封装信息项
            // const msg_item = {
            //     username: this.username,
            //     datetime: datetime,
            //     msgText: msgText
            // }
            // this.msgList.push(msg_item);
            // 发送
            ws.send(JSON.stringify({
                id: datetime,
                username: this.username,
                datetime: datetime,
                msgText: msgText
            }));
            // 清空输入框
            this.msgText = '';
        },
        handleWsOpen(e){
            console.log('webSocket open',e);
        },
        handleWsClose(e){
            console.log('webSocket close',e);
        },
        handleWsError(e){
            console.log('webSocket error',e);
        },
        handleWsMessage(e){
            const msg = JSON.parse(e.data);
            this.msgList.push(msg);
            // console.log('webSocket message',e);
        },
        
    },
    created(){
        this.removeLoading(); 
    },
    beforeMount() {
        document.title = this.$route.meta.title
    },
    mounted(){
        this.$store.dispatch('getChatMsg');
        // 监听绑定四个事件
        ws.addEventListener('open',this.handleWsOpen.bind(this),false);
        ws.addEventListener('close',this.handleWsClose.bind(this),false);
        ws.addEventListener('error',this.handleWsError.bind(this),false);
        ws.addEventListener('message',this.handleWsMessage.bind(this),false);
    },
}
</script>

<style lang="less" scoped>
    .bgc_box{
        background: url(../../assets/background/wallhaven-738w79.jpg);
        width: 100%;
        height: 100%;
    }
    .title_box{
        padding: 10px 30px;
        border-bottom: 1px solid var(--chat-white2);
        font-size: 24px;
        font-weight: 500;
    }
    .chat_msg_box{
        height: 600px;
        width: 100%;
        overflow-y:auto;
        padding: 10px 24px;
        .chat_item{
            display: flex;
            flex-direction: row-reverse;
            font-size: 15px;
            color: var(--main-black);
            margin: 20px 0;
            .chat_text_outbox{
                display: flex;
                .chat_text_box{
                    padding: 10px ;
                    max-width: 1000px;
                    background-color: var(--main-white);
                    border-radius: 5px;
                    
                }
                .tri_box{
                    position: relative;
                    &::after{
                        position: absolute;
                        top:12px;
                        border-top: 8px solid transparent;
                        border-bottom: 8px solid transparent;
                        border-left: 5px solid var(--main-white);
                        content: "";
                        display: inline-block;
                    }
                }
            }
            .avater_box{
                margin-left: 10px;
                .admin_avater{
                    line-height: 40px;
                    width: 40px;
                    height: 40px;
                }
            }
        }
        
    }
    .input_box{
        border-top: 1px solid var(--chat-white2);
        .icon_box{
            height:37px;
            width: 100%;
            padding: 5px 24px 0;
            font-size: 20px;
            .icon{
                margin-right: 15px;
            }
            .icon:hover{
                cursor: pointer;
                color: var(--main-blue);
            }
        }
        .text_area{
            background-color: var(--chat-white1);
            width: 100%;
            height: 150px;
            padding: 5px 24px;
            border: none;
            outline: none;
            overflow-y:auto;
            resize: none;
            font-size: 15px;
            color: var(--main-black);
        }
        .btn_box{
            padding: 5px 30px;
            height: 50px;
            display: flex;
            flex-direction: row-reverse;
        }
    }
    
</style>