<template>
    <!-- 评论组件 -->
    <div>
        <div class="comment_title">
            <a-icon type="message" />
            评论
        </div>
        <a-comment>
            <a-avatar slot="avatar" :src="avatar" :alt="username" class="admin_avater">{{String(this.username).substring(0,1)}}</a-avatar>
            <div slot="content">
            <a-form-item>
                <a-textarea :rows="4" :value="value" @change="handleChange" placeholder="说点什么吧..."/>
            </a-form-item>
            <a-form-item>
                <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
                    提交
                </a-button>
            </a-form-item>
            </div>
        </a-comment>
        <a-list v-if="comments.length" :data-source="comments" header="回复" item-layout="horizontal">
            <a-list-item slot="renderItem" slot-scope="item, index">
            <a-comment
                :author="item.author"
                :avatar="item.avatar"
                :content="item.content"
                :datetime="item.datetime"
            />
            </a-list-item>
        </a-list>
    </div>
</template>
<script>
  import moment from 'moment';
  export default {
    name:'Comment',
    props:['avatar','username'],
    data() {
        return {
            comments: [],
            submitting: false,
            value: '',
            moment,
        };
    },
    methods: {
        handleSubmit() {
            if (!this.value) {
            return;
            }
    
            this.submitting = true;
    
            setTimeout(() => {
            this.submitting = false;
            this.comments = [
                {
                author: this.username,
                avatar: this.avatar,
                content: this.value,
                datetime: moment().fromNow(),
                },
                ...this.comments,
            ];
            this.value = '';
            }, 500);
        },
        handleChange(e) {
            this.value = e.target.value;
        },
    },
  };
</script>
<style>
    .comment_title{
        color: rgb(100, 100, 100);
        font-size: 18px;
        font-weight: 700;
    }
    .admin_avater{
        color: #1890ff; 
        background-Color: rgb(199, 222, 255);
    }
</style>
  