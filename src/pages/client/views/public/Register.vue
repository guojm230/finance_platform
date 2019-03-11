<template>
    <section
        class="p-wrapper container"
    >
        <div class="header">
            <h1 style="font-weight: 400;font-size: 1.8rem;display: inline">欢迎注册</h1>
            <div style="float: right;display: inline;padding-top: 1rem">
                <span>已有账号,</span>
                <!--<router-link :to="{name:'Register'}">立即注册</router-link>-->
                <a href="#" @click="toLogin">立即登录</a>
            </div>
        </div>
        <div>
            <el-form
                :model="user"
                size="medium"
            >
                <el-form-item label="手机">
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
                <el-form-item label="短信验证码">
                    <el-input v-model="user.scode" placeholder="请输入短信验证码">
                        <template slot="append">
                            <el-button @click="loadScode" :disabled="smsDisable">{{smsBtnText}}</el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="验证码">
                    <el-input v-model="user.vcode" placeholder="请输入验证码">
                        <img slot="append" @click="loadVcode" title="点击刷新验证码"
                             alt="验证码" :src="vImage" style="width: 110px;height: 100%"/>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loading" class="fluid-btn" @click="register">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>

<script>
  const phoneRegex = /^1\d{10}$/;

  export default {
    name: "Register",
    data: function () {
      return {
        user:{
          username : '',
          password:'',
          scode:'',
          skey:'',
          vcode:'',
          vkey:'',
        },
        vImage:'',
        smsBtnText:'获取短信验证码',
        smsTiming: false, //倒计时中
        smsTimeLength: 60,
        loading:false,
        showPwd:false,
        pwdType:"password",
      }
    },
    computed:{
      smsDisable(){
        if (!this.user.username){
          return true;
        }
        return this.smsTiming;
      }
    },
    methods:{
      toLogin(){
        this.$emit('to-login');
      },
      loadVcode(){
        this.$http.get("public/verify-code").then(res=>{
          this.user.vkey = res.headers.key;
          this.vImage = "data:image/jpeg;base64," + res.data;
        })
      },
      loadScode(){
        if (!phoneRegex.test(this.user.username)){
          this.$message.error("手机号格式不正确");
          return;
        }
        let time = this.smsTimeLength;
        this.smsTiming = true;
        this.smsBtnText = time + "秒";
        const t1 = setInterval(() => {
          time--;
          if (time === 0) {
            clearInterval(t1);
            this.smsTiming = false;
            this.smsBtnText = "获取短信验证码";
            return;
          }
          this.smsBtnText = time + "秒";
        }, 1000);
        this.$http.post("public/sms/register",{
          number: this.user.username
        }).then(res=>{
          this.user.skey = res.data;
        }).catch(reason => {
          clearInterval(t1);
          this.smsBtnText = "获取短信验证码";
        })
      },
      register(){
        if (!phoneRegex.test(this.user.username)){
          this.$message.error("手机号格式不正确");
          return;
        }
        this.loading = true;
        this.$http.post("public/users",this.user).then(res=>{
          this.$sec.login(this.user.username,this.user.password,'user').then(res=>{
            this.$message.success("注册成功，正在跳转...");
            this.loading = false;
            this.$router.push({
              name:"UserMain"
            });
          })
        }).catch(reason => {
          this.loading = false;
          if (!reason.handled){
            this.$message.error(reason.response.data.message);
          }
        })
      },
      changePwd(){
        this.pwdType = this.showPwd? "password" : "text";
        this.showPwd = !this.showPwd;
      },
    },
    mounted:function () {
      this.loadVcode();
    }
  }
</script>

<style scoped>
    .fluid-btn {
        width: 100%;
    }
</style>
