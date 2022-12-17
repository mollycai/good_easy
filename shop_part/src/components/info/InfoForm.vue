<template>
    <!-- 用户详细信息表单组件 -->
    <div class="user_box">
        <div class="title_box">
            <a-icon type="profile" />&nbsp;个人资料
        </div>
        <div class="message_box">
            <!-- 个人详细资料表单 -->
            <div class="form_box">
                <a-form-model
                    ref="ruleForm"
                    :model="userInfo"
                    :rules="rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                >
                    <a-form-model-item ref="username" label="用户名" prop="username">
                        <a-input
                            v-model="userInfo.username"
                            @blur="() => {$refs.username.onFieldBlur();}"
                        />
                    </a-form-model-item>
                    <a-form-model-item label="性别" prop="sex">
                        <a-radio-group v-model="userInfo.sex">
                            <a-radio :value="1">
                                男
                            </a-radio>
                            <a-radio :value="0">
                                女
                            </a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                    <a-form-model-item ref="openId" label="微信号" prop="openId">
                        <a-input
                            v-model="userInfo.openId"
                            @blur="() => {$refs.openId.onFieldBlur();}"
                        />
                    </a-form-model-item>
                    <a-form-model-item ref="mobile" label="手机" prop="mobile">
                        <a-input
                            v-model="userInfo.mobile"
                            @blur="() => {$refs.mobile.onFieldBlur();}"
                        />
                    </a-form-model-item>
                    <a-form-model-item ref="email" label="邮箱" prop="email">
                        <a-input
                            v-model="userInfo.email"
                            @blur="() => {$refs.email.onFieldBlur();}"
                        />
                    </a-form-model-item>
                    <a-form-model-item ref="school" label="学校" prop="school">
                        <a-input
                            v-model="userInfo.school"
                            @blur="() => {$refs.school.onFieldBlur();}"
                        />
                    </a-form-model-item>
                    <a-form-model-item ref="address" label="交易地址" prop="address">
                        <a-input v-model="userInfo.address" type="textarea" />
                    </a-form-model-item>
                    <a-form-model-item label="个人简介" prop="description">
                        <a-input v-model="userInfo.description" type="textarea" />
                    </a-form-model-item>
                    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button type="primary" @click="onSubmit">
                        提交
                    </a-button>
                    <a-button style="margin-left: 10px;" @click="resetForm">
                        取消
                    </a-button>
                    </a-form-model-item>
                </a-form-model>
            </div>
            <!-- 上传头像 -->
            <div class="avater_box">
                <a-upload
                    name="multipartFile"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    action="http://139.9.48.23:8081/shop/oss/upload"
                    :before-upload="beforeUpload"
                    @change="handleChange"
                >
                    <a-tooltip v-if="this.imageUrl" placement="bottom">
                        <template slot="title">
                            <span>点击修改头像</span>
                        </template>
                        <img :src="this.imageUrl" alt="avatar" class="user_avater"/>
                    </a-tooltip>
                    <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">
                            上传头像
                        </div>
                    </div>
                </a-upload>
                <div style="width: 100px;font-size: 13px;color: #aaaaaa;line-height: 20px;">
                    支持 jpg、png、jpeg 格式大小 2M 以内的图片
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    name:'InfoForm',
    data() {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
            loading: false,
            // 校验规则
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' },{ min: 2, max: 15, message: '长度需在2-15个字符之间', trigger: 'blur' }],
                openId: [{ required: true, message: '请输入微信号', trigger: 'blur' }],
                mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' },{validator:this.rightToMobile}],
                email: [{validator:this.rightToEmail}],
                description:[{ min: 0, max: 200, message: '长度不能超过200', trigger: 'blur' }],
            },
        };
    },
    computed:{
        ...mapState({
            userInfo: (state) => state.user.userInfo,
            imageUrl: (state) => state.user.userInfo.avatar,
        }),
    },
    methods: {
        // 提交
        onSubmit() {
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    try {
                        // 注意异步处理
                        await this.$store.dispatch('updateUserInfo',this.userInfo).then(()=>{
                            this.$store.dispatch('getUserInfoById',this.userInfo.id);
                        })
                        this.$message.success('修改成功！');
                    } catch (error) {
                        this.$message.error(`${error}`);
                    }
                } else {
                    this.$message.error('校验失败，请遵守填写规则！');
                }
            });
        },
        // 重置
        resetForm() {
            this.$refs.ruleForm.resetFields();
        },
        // 上传头像的状态
        async handleChange(info) {
            if (info.file.status === 'uploading') {
                this.loading = true;
                return;
            }
            if (info.file.status === 'done') {
                const data = {
                    id:this.$store.state.user.userInfo.id,
                    avatar:info.file.response.data.imageUrl
                };
                try {
                    await this.$store.dispatch('updateUserAvatar',data).then(()=>{
                        this.$store.dispatch('getUserInfoById',this.userInfo.id);
                    })
                    this.$message.success('上传头像成功');
                } catch (error) {
                    this.$message.error(`${error}`);
                }
            }
        },
        // 上传头像之前的校验
        beforeUpload(file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                this.$message.error('只支持jpg或png文件!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                this.$message.error('图片大小必须小于2MB!');
            }
            return isJpgOrPng && isLt2M;
        },
        // 校验手机号的规则
        rightToMobile(rule, value, callback){
            const regex = /^1[345789]\d{9}$/g;
            if(value && !regex.test(value)){
                callback('手机号不合法!');
            }
            callback();
        },
        // 校验邮箱的规则
        rightToEmail(rule, value, callback){
            const regex = /^([A-Za-z0-9_\-\.]+)@([A-Za-z0-9]+)\.([A-Za-z]{2,6})$/g;
            if(value && !regex.test(value)){
                callback('邮箱不合法!');
            }
            callback();
        },
    },
};
</script>

<style lang="less" scoped>
    .avatar-uploader > .ant-upload {
        width: 128px;
        height: 128px;
    }
    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }
    .user_box{
        background-color: #fff;
        width: 100%;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
        border-radius: 2px;
        overflow: hidden;
    }
    .user_box{
        padding: 20px 30px;
        margin-top: 25px;
    }
    .title_box{
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 30px;
        color: #000;
    }
    .message_box{
        display: flex;
        .form_box{
        width: 70%;
        }
        .avater_box{
            width: 30%;
            // border: 1px solid black;
            .user_avater{
                width: 100px;
                height: 100px;
            }
        }
    }
    
</style>