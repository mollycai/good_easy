<template>
    <!-- 登录页面 -->
    <div class="main_box">
        <div class="container">
            <!-- 账号密码登录 -->
            <div class="login_pwd">
                <!-- logo -->
                <div class="logo_box">
                    <img src="../assets/logo/logo.jpg" alt="" style="background-color: #999999;width: 100%;">
                </div> 
                <!-- 标题 -->
                <div class="title_box">
                    <h1>Get Started!</h1>
                </div>
                <!-- 账号密码登录 -->
                <div class="pwd_box" v-show="isShow">
                    <!-- 用户名密码表单 -->
                    <a-form
                    id="components-form-demo-normal-login"
                    :form="pwdForm"
                    class="login-form"
                    @submit="pwdLogin"
                    >
                        <a-form-item>
                            <a-input v-decorator="['username',this.validatorRules.username]" placeholder="用户名">
                                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-input-password v-decorator="['password',this.validatorRules.password]" type="password" placeholder="密码" >
                                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                            </a-input-password>
                        </a-form-item>
                        <a-form-item>
                            <a-checkbox>
                                记住我
                            </a-checkbox>
                            <a class="login-form-forgot" href="javascript:;">
                                忘记密码
                            </a>
                            <a-button type="primary" html-type="submit" class="login-form-button">
                                登录
                            </a-button>
                            <router-link to="/register">
                                <a href="javascript:;">
                                    立即注册
                                </a>
                            </router-link>
                            <a href="javascript:;" class="login-mobile" @click="isShow = !isShow">
                                手机号登录
                            </a>
                        </a-form-item>
                    </a-form>
                </div>
                <!-- 手机号登录 -->
                <div class="mobile_box" v-show="!isShow">
                    <a-form
                    id="components-form-demo-normal-login"
                    :form="mobileForm"
                    class="login-form"
                    @submit="mobileLogin"
                    >
                        <a-form-item>
                            <a-input v-decorator="['phone',this.validatorRules.phone]" style="width: 100%" placeholder="手机号">
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
                        <a-form-item>
                            <a-row style="display:flex;justify-content: space-between;">
                                <a-col style="flex: 5;">
                                    <a-input v-decorator="['captcha',this.validatorRules.captcha]" placeholder="验证码"/>
                                </a-col>
                                <a-col style="flex: 1;"></a-col>
                                <a-col style="flex: 1;">
                                    <a-button @click="getCode" :disabled="getCodeBtn">
                                        <span v-show="!getCodeBtn">获取验证码</span>
                                        <span v-show="getCodeBtn">重新获取({{this.time}}s)</span>
                                    </a-button>
                                </a-col>
                            </a-row>
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" html-type="submit" class="login-form-button">
                                登录
                            </a-button>
                            <a href="javascript:;" class="login-mobile" @click="isShow = !isShow">
                                用户名密码登录
                            </a>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
var _ = require('lodash')
export default {
    name:'Login',
    data(){
        return{
            // 控制表单是否展示
            isShow:true,
            // 创建账号密码登录的表单
            pwdForm:this.$form.createForm(this,{ name: 'pwd_login' }),
            // 创建手机号登录表单
            mobileForm:this.$form.createForm(this,{ name: 'mobile_login' }),
            // 每个控件的验证规则
            validatorRules: {
                username: {rules: [{required: true, message: '请输入用户名!'}]},
                password: {rules: [{required: true, message: '请输入密码!'}]},
                // remember: {valuePropName: 'checked',initialValue: true,},
                phone:{rules: [{ required: true, message: '请输入手机号码!' },{ validator: _.debounce(this.rightToMobile,1500)}]},
                captcha:{ rules: [{ required: true, message: '请输入手机收到的验证码!' }] },
            },
            // 账号密码表单校验是否通过
            pwdPass:false,
            // 手机号验证码表单校验是否通过
            mobilePass:false,
            // 获取验证码按钮是否禁用
            getCodeBtn:false,
            // n秒倒计时
            time:0,
            // 定时器
            timer:null,
        }
    },
    watch:{
        time(){ // 监视time如果变化就调用-1函数
            this.countDown(this.time)
        }
    },
    methods: {
        // 校验手机号的规则
        rightToMobile(rule, value, callback){
            const regex = /^1[345789]\d{9}$/g
            if(value && !regex.test(value)){
                callback('手机号不合法!')
            }
            callback()
        },
        // 节流，防止用户狂点 用户名密码登录
        pwdLogin:_.throttle(async function(e){
            // 阻止默认事件
            e.preventDefault()
            // 规则校验
            this.pwdForm.validateFields((err, values) => {
                !err ? this.pwdPass = true : this.pwdPass = false
            })
            if(this.pwdPass){
                // 将用户信息封装成json
                const user = {
                    username:this.pwdForm.getFieldValue('username'),
                    password:this.pwdForm.getFieldValue('password')
                }
                try {
                    await this.$store.dispatch('userLogin',user)
                    this.$message.success('登录成功！')
                    this.$router.push({name:'first'})
                } catch (error) {
                    this.$message.error(`${error}`)
                }
            }
        },1500),
        // 获取验证码, 总觉得不够优雅但不知道怎么改善
        async getCode(){
            const mobile = this.mobileForm.getFieldValue('phone')
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
        // 节流，防止用户狂点 手机验证码登录
        mobileLogin:_.throttle(async function(e){
            // 阻止默认事件
            e.preventDefault();
            // 规则校验
            this.mobileForm.validateFields((err, values) => {
                !err ? this.mobilePass = true : this.mobilePass = false
            });
            if(this.mobilePass){
                const user = {
                    mobile:this.mobileForm.getFieldValue('phone'),
                    code:this.mobileForm.getFieldValue('captcha')
                }
                try {
                    await this.$store.dispatch('moblieLogin',user)
                    this.$message.success('登录成功！')
                    this.$router.push({name:'first'})
                } catch (error) {
                    this.$message.error(`${error}`)
                }
            }
        },1500),
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
    #components-form-demo-normal-login .login-form {
        max-width: 300px;
    }
    #components-form-demo-normal-login .login-form-forgot ,.login-mobile{
        float: right;
    }
    #components-form-demo-normal-login .login-form-button {
        width: 100%;
    }
    .main_box{
        position: relative;
        width: 100%;
        height: 100%;
        background: url("../assets/background/wallhaven-738w79.jpg") -200px 0;
    }
    .container{
        position: absolute;
        display: flex;
        height: 100%;
        right:0%;
    }
    .login_pwd,.login_mobile{
        width: 500px;
        height: 100%;
        padding: 50px 70px;
        background-color: rgba(255, 255, 255);
        border-radius:5px 0 0 5px;
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
    .mobile_box{
        margin-top: 20px;
    }
    .mobile_shade,.pwd_shade{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
        opacity: 0;
    }
</style>