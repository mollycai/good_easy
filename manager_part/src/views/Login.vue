<template>
    <div class="base">
      <!-- 注册登录界面 -->
     <div  class="login">     
          <!--密码登录表单-->
          <div  class="loginArea">
              <transition
                      name="animate__animated animate__bounce"
                      enter-active-class="animate__fadeInUp"
                      appear
              >
              <!-- 标语 -->
              <div class="title">
                  Login
              </div>
              </transition>



              <transition
                      name="animate__animated animate__bounce"
                      enter-active-class="animate__fadeInUp"
                      appear
              >
              <!-- 密码框和用户名框 -->
              <div class="pwdArea">
                 <div style="flex: 1;justify-content: center;display: flex;align-items: center">
                     <a-input class="username" v-model="adminUser.username" style="width: 265px"  placeholder="用户名">
                      <a-icon slot="prefix" type="user" />
                     </a-input>
                 </div>
                  <div style="flex: 1;justify-content: center;display: flex;align-items: center">
                      <a-input-password placeholder="密码"  v-model="adminUser.password" style="width: 265px" >
                          <a-icon slot="prefix" type="lock" />
                      </a-input-password>
                  </div>
              </div>
              </transition>
              
              <!-- 登录注册按钮 -->
              <transition
                      name="animate__animated animate__bounce"
                      enter-active-class="animate__fadeInUp"
                      appear
              >
              <div class="btnArea">
                  <a-button type="primary" style="background-color: #252e7b;letter-spacing: 5px" @click="AdminLogin"  >
                      登录</a-button>
              </div>
              </transition>
          </div>
          <!-- /密码登录表单/-->
     </div>    
    </div>
  </template>
  
  <script>
      import 'animate.css';
      // eslint-disable-next-line no-unused-vars
  export default {
  
      name:'Login',
      data(){
          return{
              //密码登录表单数据
              adminUser:{
                  username:'',
                  password:''
              }
          }
      },
      methods:{
          //用户登录
          AdminLogin(){
              this.$http.post("/admin/login", this.adminUser).then((res) => {
                      if(res.data.code=="20000"){
                        console.log(res)
                      window.sessionStorage.setItem("token",res.data.data.token)
                      localStorage.setItem("user",JSON.stringify(res.data))
                      this.$message.success("登陆成功！")
                      this.$router.push("/user")
                      }
                      else{
                      this.$message.error("用户名或密码错误！")
                      console.log(res)
                      }
              }).catch(err=>{
                console.log(err)
              })
          }
           }
  
  }
  </script>
  
  <style>
  .base{
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url("../assets/images/bc5.png");
      background-size: 100%;
  }
  .login{
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
  }
  .loginArea{
      background-color: rgba(255,255,255,0.8); 
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      height: 400px;
      width: 350px;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
  }
  .title{
      width: 70%;
      flex:1;
      border-bottom: 1px solid #252e7b;
      display: flex;
      align-items: center;
      color: #252e7b;
      font-weight: bold;
      font-size: 24px;
      justify-content: center;
  }
  .pwdArea{
      width: 100%;
      flex:2;
      display: flex;
      flex-direction: column;
  }
  .pwdArea input:focus{
      border: 2px solid #252e7b;
  }
  .btnArea{
      flex:1;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
   }
  </style>