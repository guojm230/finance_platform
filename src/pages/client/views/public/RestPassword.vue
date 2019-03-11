<template>
    <section class="p-wrapper container">
        <el-steps :active="activeStep" finish-status="success"  simple style="margin-top: 20px">
            <el-step title="验证身份" ></el-step>
            <el-step title="设置密码" ></el-step>
            <el-step title="修改成功"></el-step>
        </el-steps>

        <transition name="fade" mode="out-in">
            <el-card v-if="activeStep === 0"
                     shadow="never"
                     style="margin-top: 20px;"
                     align="center"
            >
                <el-form style="width: 30%;min-width: 300px;">
                    <el-form-item label="用户名">
                        <el-input v-model="check.username" :disabled="udisable"></el-input>
                    </el-form-item>
                    <el-form-item label="短信验证码">
                        <el-input v-model="check.scode">
                            <template slot="append">
                                <el-button @click="loadScode" :disabled="smsDisable">{{smsBtnText}}</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="commitCheck"
                            style="width: 100%"
                        >
                            提交
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </transition>

        <transition name="fade" mode="out-in">
            <el-card v-if="activeStep === 1"
                     shadow="never"
                     style="margin-top: 20px;"
                     align="center"
            >
                <el-form style="width: 30%;min-width: 300px;">
                    <el-form-item label="新密码">
                        <el-input
                                v-model="user.pwd"
                                :type="pwdType"
                                placeholder="请输入新的密码"
                        >
                            <i slot="prefix" class="el-input__icon iconfont icon-unlock"></i>
                            <i slot="suffix" v-if="!showPwd" @mousedown="changePwd" @mouseup="changePwd"
                               class="el-input__icon iconfont icon-attention_light"></i>
                            <i slot="suffix" v-else @mousedown="changePwd" @mouseup="changePwd"
                               class="el-input__icon iconfont icon-attentionforbid"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                                type="primary"
                                @click="commitPwd"
                                style="width: 100%"
                        >
                            提交
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </transition>
        <transition name="fade" mode="out-in">
            <el-card v-if="activeStep === 2 || activeStep === 4"
                     shadow="never"
                     style="margin-top: 20px;"
            >
                <div style="padding: 50px;text-align: center">
                    <i class="el-icon-success" style="color: green;font-size: 2rem"></i>
                    <span style="font-size: 1.7rem;margin-left: 10px">
                        修改成功
                    </span>
                </div>
            </el-card>
        </transition>


    </section>
</template>

<script>
  export default {
    name: "RestPassword",
    data(){
      return {
        activeStep: 0,
        check:{
          username:'',
          scode:'',
          skey:''
        },
        user:{
          id: '',
          username:'',
          code:'',
          pwd:''
        },
        showPwd:false,
        changePwd(){
          this.pwdType = this.showPwd? "password" : "text";
          this.showPwd = !this.showPwd;
        },
        pwdType:"password",
        smsBtnText:'获取',
        smsTiming: false,
        smsTimeLength: 60,
        udisable: false
      }
    },
    computed:{
      smsDisable(){
        if (!this.check.username){
          return true;
        }
        return this.smsTiming;
      }
    },
    methods:{
      nextStep(index){
        if (index){
          this.activeStep = index;
        } else{
          this.activeStep++;
        }
      },
      commitCheck(){
        this.$http.post("public/users/check",this.check).then(res=>{
          this.user = res.data;
          this.nextStep();
        }).catch(reason => {
          if (!reason.handled){
            this.$message.error(reason.response.data.message);
          }
        })
      },
      commitPwd(){
        this.$http.post("public/users/password",this.user).then(res=>{
          this.nextStep();
        }).catch(reason => {
          if (!reason.handled){
            this.$message.error(reason.response.data.message);
          }
        })
      },
      loadScode(){
        if (!this.check.username){
          this.$message.error("用户名不能为空");
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
            this.smsBtnText = "获取";
            return;
          }
          this.smsBtnText = time + "秒";
        }, 1000);
        this.$http.post("public/sms/password",{
          number: this.check.username
        }).then(res=>{
          this.check.skey = res.data;
        }).catch(reason => {
          clearInterval(t1);
          this.smsTiming = false;
          this.smsBtnText = "获取";
        })
      },
    },
    mounted:function () {
      if (this.$sec.isAuthenticated()){
        this.udisable = true;
        this.check.username = this.$sec.getAccountInfo().username;
      }
    }
  }
</script>

<style scoped>
    .fade-leave-active{
        transition: opacity 0s ease;
    }
    .fade-enter-active {
        transition: opacity .8s ease;
    }
    .fade-enter, .fade-leave-to
        /* .component-fade-leave-active for below version 2.1.8 */ {
        opacity: 0;
    }
</style>
