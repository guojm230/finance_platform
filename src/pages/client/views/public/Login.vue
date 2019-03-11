<template>
    <div class="login-box">
        <div class="header">
            <h1 style="font-weight: 400;font-size: 1.8rem;display: inline">欢迎登陆</h1>
            <div style="float: right;display: inline;padding-top: 1rem">
                <span>没有账号,</span>
                <a href="#" @click="toRegister">立即注册</a>
            </div>
        </div>
        <div class="login-area">
            <el-form>
                <el-form-item label="账户">
                    <el-input v-model="user.username" placeholder="请输入11位手机号">
                        <i slot="prefix" class="el-input__icon iconfont icon-people"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input
                            v-model="user.password"
                            :type="pwdType"
                            placeholder="请输入密码"
                    >
                        <i slot="prefix" class="el-input__icon iconfont icon-unlock"></i>
                        <i slot="suffix" v-if="!showPwd" @mousedown="changePwd" @mouseup="changePwd"
                           class="el-input__icon iconfont icon-attention_light"></i>
                        <i slot="suffix" v-else @mousedown="changePwd" @mouseup="changePwd"
                           class="el-input__icon iconfont icon-attentionforbid"></i>
                    </el-input>
                </el-form-item>
                <div style="text-align: right;margin-top: -10px;margin-bottom: 10px">
                    <router-link :to="{name:'RestPassword'}">忘记密码</router-link>
                </div>

                <el-form-item>
                    <el-button type="primary" class="fluid-btn" size="small" @click="login" :loading="loading">登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

  import cof from "@/global/config";
  const phoneRegex = /^1\d{10}$/;

  export default {
    name: "Login",
    props:['showLogin'],
    data:function () {
      return {
        user:{
          username: '',
          password: '',
          vcode:''
        },
        loading:false,
        showPwd:false,
        pwdType:"password",
        showVcode: false
      }
    },
    methods:{
      login(){
        this.loading = true;

        if (!this.checkForm()){
          this.loading = false;
          return;
        }
        this.$sec.login(this.user.username,this.user.password,"user")
            .then(res => {
              const fromPath = this.$route.params.from;
              this.$router.push(fromPath?fromPath : {
                name:"UserMain"
              });
              this.loading = false;
            }).catch(reg=>{
          this.loading = false;
        })
      },
      //显示与隐藏密码
      changePwd(){
        this.pwdType = this.showPwd? "password" : "text";
        this.showPwd = !this.showPwd;
      },
      //监听回车按钮
      keyDownHandler:function (event) {

        if (this.loading) {
          return;
        }
        if (event.key && event.key.toLowerCase() === 'enter'){
          this.login();
        }
      },
      //表单校验
      checkForm(){
        if (!phoneRegex.test(this.user.username)){
          this.$message.warning("手机号格式不正确");
          return false;
        }

        if (!this.user.password){
          this.$message.warning("密码不能为空");
          return false;
        }
        return true;
      },
      closed(){
        this.$emit('closed');
      },
      toRegister(){
        this.$emit("to-register")
      }
    },
    computed:{
      vCodeUrl(){
        return cof.SERVER_URL + "public/verify-code?number="+this.user.username
      }
    },
    mounted: function () {
      window.onkeydown = this.keyDownHandler;
    }
  }
</script>

<style scoped>
    .login-box {
        margin: 0 auto;
        max-width: 350px;
    }

    .logo-area {
        text-align: center;
    }

    .fluid-btn {
        width: 100%;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
