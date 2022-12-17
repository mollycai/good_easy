<template>
    <!-- 注册页面 -->
    <div class="main_box">
        <div class="container">
            <div class="register_box">
                <div class="logo_box">
                    <img src="../assets/logo/logo.jpg" alt="" style="background-color: #999999;width: 100%;">
                </div> 
                <div class="title_box">
                    <h1>Sign up</h1>
                </div>
                <a-form :form="form" @submit="handleSubmit">
                    <a-form-item v-bind="formItemLayout" label="用户名">
                        <a-input v-decorator="['username',this.validatorRules.username]"/>
                    </a-form-item>
                    <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
                        <a-input-password v-decorator="['password',this.validatorRules.password]" type="password"/>
                    </a-form-item>
                    <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
                        <a-input-password v-decorator="['confirm',this.validatorRules.confirm]" type="password" @blur="handleConfirmBlur"/>
                    </a-form-item>
                    <a-form-item v-bind="formItemLayout" label="手机号码">
                        <a-input v-decorator="['phone',this.validatorRules.phone]" style="width: 100%">
                        <a-select slot="addonBefore" v-decorator="['prefix', { initialValue: '86' }]" style="width: 70px">
                            <a-select-option value="86">
                                +86
                            </a-select-option>
                            <a-select-option value="87">
                                +87
                            </a-select-option>
                        </a-select>
                        </a-input>
                    </a-form-item>
                    <a-form-item v-bind="formItemLayout" label="验证码">
                        <a-row :gutter="8">
                            <a-col :span="12">
                                <a-input v-decorator="['captcha',this.validatorRules.captcha]"/>
                            </a-col>
                            <a-col :span="12">
                                <a-button @click="getCode" :disabled="getCodeBtn">
                                    <span v-show="!getCodeBtn">获取验证码</span>
                                    <span v-show="getCodeBtn">重新获取({{this.time}}s)</span>
                                </a-button>
                            </a-col>
                        </a-row>
                    </a-form-item>
                    <a-form-item v-bind="tailFormItemLayout">
                    <a-checkbox v-decorator="['agreement',this.validatorRules.agreement]">
                        我已经阅读并同意
                        <a href="">
                            《xxx用户协议》
                        </a>
                        </a-checkbox>
                    </a-form-item>
                    <a-form-item v-bind="tailFormItemLayout">
                        <a-button type="primary" html-type="submit" style="width: 100%;">
                            注册
                        </a-button>
                        <div style="text-align: right;width: 100%;">
                            <router-link to="/login">
                                <a href="">
                                    已有账号，去登陆
                                </a>
                            </router-link>
                        </div>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>
  
<script> 
var _ = require('lodash')
export default {
    name:'Register',
    data() {
        return {
            confirmDirty: false,
            autoCompleteResult: [],
            form: this.$form.createForm(this, { name: 'register' }),
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 5 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 17 },
                },
            },
            tailFormItemLayout: {
                wrapperCol: {
                    xs: {
                    span: 24,
                    offset: 0,
                    },
                    sm: {
                    span: 17,
                    offset: 5,
                    },
            },
            },
            // 判断表单是否通过验证
            isPass:false,
            // 表单校验规则
            validatorRules: {
                username: {rules: [{required: true, message: '请输入用户名!'},{ min: 2, max: 15, message: '长度需在2-15个字符之间', trigger: 'blur' }]},
                password: {rules: [{required: true, message: '请输入密码!'},{validator: this.validateToNextPassword}]},
                confirm:{rules: [{required: true,message: '请再次确认你的密码!'},{validator: _.debounce(this.compareToFirstPassword,1500)}]},
                phone:{rules: [{ required: true, message: '请输入手机号码!' },{validator:_.debounce(this.rightToMobile,1500)}]},
                captcha:{rules: [{ required: true, message: '请输入手机获取的验证码!' }]},
                agreement:{valuePropName: 'checked'}
            },
            // 获取验证码按钮是否禁用
            getCodeBtn:false,
            // n秒倒计时
            time:0,
            // 定时器
            timer:null
        };
    },
    watch:{
        time(){ // 监视time如果变化就调用-1函数
            this.countDown(this.time)
        }
    },
    methods: {
        // 用户注册
        handleSubmit:_.throttle(function(e) {
            e.preventDefault();
            this.form.validateFieldsAndScroll(async (err, values) => {
                // 判断是否遵循协议
                if(!this.form.getFieldValue('agreement')) return this.$message.error('请勾选已阅读用户协议！')
                // 判断是否符合规则
                !err && this.form.getFieldValue('agreement') ? this.isPass = true : this.isPass = false
                // 符合所有规则
                if(this.isPass){
                     // 将用户信息封装成json
                     const userInfo = {
                        username:this.form.getFieldValue('username'),
                        password:this.form.getFieldValue('password'),
                        mobile:this.form.getFieldValue('phone'),
                        code:this.form.getFieldValue('captcha')
                    }
                    try {
                        await this.$store.dispatch('userRegister',userInfo)
                        // 提示后端是否返回错误信息
                        if(window.sessionStorage.getItem('message') !== null){
                            return this.$message.error(window.sessionStorage.getItem('message'))
                        }
                        this.$message.success('注册成功！')
                        this.$router.push('/login')
                    } catch (error) {
                        this.$message.error(`${error}`)
                    }
                }
            })
        },1500),
        // 失去焦点提示的规则
        handleConfirmBlur(e) {
            const value = e.target.value;
            this.confirmDirty = this.confirmDirty || !!value;
        },
        // 与第一次输入的密码比较的规则
        compareToFirstPassword(rule, value, callback) {
            const form = this.form;
            if (value && value !== form.getFieldValue('password')) {
                callback('两次输入的密码不相同!');
            } else {
                callback();
            }
        },
        // 与第二次输入的密码比较的规则
        validateToNextPassword(rule, value, callback) {
            const form = this.form;
            if (value && this.confirmDirty) {
                form.validateFields(['confirm'], { force: true });
            }
            callback();
        },
        // 校验手机号的规则
        rightToMobile(rule, value, callback){
            const regex = /^1[345789]\d{9}$/g
            if(value && !regex.test(value)){
                callback('手机号不合法!');
            }
            callback()
        },
        // 获取验证码
        async getCode(){
            const mobile = this.form.getFieldValue('phone')
            if(mobile == null){
                this.$message.warning('请输入手机号！')
            }else if(!/^1[345789]\d{9}$/g.test(mobile)){
                this.$message.warning('请输入合法的手机号！')
            }else{
                try {
                    await this.$store.dispatch('getCode',mobile)
                    this.getCodeBtn = !this.getCodeBtn
                    this.time = 60
                    this.countDown(this.time)
                } catch (error) {
                    this.$message.error(`${error}`)
                }
            }
        },
        // 时间-1
        countDown(time){ // 传入时间
            if(time <= 0) { // <=0 时完成计时，解禁按钮，清除定时器
                this.getCodeBtn = !this.getCodeBtn
                clearTimeout(this.timer)
                return
            }
            this.timer = setTimeout(()=>{
                this.time = time - 1 // 对this.time进行-1并重新赋值，触发watch
            },1000)
        },
    },
    beforeMount(){
        document.title = this.$route.meta.title
    },
    created(){
        let self = document.getElementById('Loading');
        if(self != null){
            let parent = self.parentElement;
            parent.removeChild(self);
            document.body.style.overflowY = 'scroll';
        }
    }
  };
</script>

<style lang="less" scoped>
    .main_box{
        position: relative;
        width: 100%;
        height: 100%;
        background: url("../assets/background/wallhaven-738w79.jpg") 200px 0;
    }
    .container{
        position: absolute;
        display: flex;
        height: 100%;
        left:0%;
    }
    .register_box{
        width: 600px;
        height: 100%;
        padding: 50px 70px;
        background-color: rgba(255, 255, 255);
        border-radius: 0 5px 5px 0;
    }
    
    .logo_box{
        width: 100%;
        height: 240px;
        padding: 55px 0 10px 0;
    }
    .title_box{
        width: 100%;
        padding: 10px;
        text-align: center;
    }
</style>