<template>
    <section class="p-wrapper container">
        <header style="text-align: center">
            <h1 style="font-size: 1.5rem;font-weight: 400">账户设置</h1>
            <p style="font-size: 1rem;color: #5f6368;">修改个人资料和安全性设置</p>
        </header>

        <el-card class=" no-padding-card"
                 style="margin-bottom: 50px"
                 shadow="never"
        >
            <el-row style="padding-top: 15px">
                <el-col :span="10">
                    <h3 class="item-card-title">账号安全</h3>
                </el-col>
                <el-col :span="14" style="text-align: right">
                    <img src="@/assets/images/security.png" style="width: auto;height: 100px;">
                </el-col>
            </el-row>
            <div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item list-group-item-action">
                        <el-row>
                            <el-col :span="6">
                                账号:
                            </el-col>
                            <el-col :span="18">
                                {{this.$sec.getAccountInfo().username}}
                            </el-col>
                        </el-row>
                    </li>

                    <li class="list-group-item list-group-item-action" @click="toRestPassword">
                        <el-row>
                            <el-col :span="6">
                                密码:
                            </el-col>
                            <el-col :span="16">
                                修改密码
                            </el-col>
                            <el-col :span="2">
                                <i class="el-icon-arrow-right"></i>
                            </el-col>
                        </el-row>
                    </li>
                </ul>
            </div>
        </el-card>

        <el-card class="item-card no-padding-card"
            shadow="never"
                 v-if="showUserInfo"
        >
            <el-row style="padding-top: 15px">
                <el-col :span="10">
                    <h3 class="item-card-title">个人资料</h3>
                </el-col>
                <el-col :span="14" style="text-align: right">
                    <img src="@/assets/images/profile.png" style="width: auto;height: 100px;">
                </el-col>
            </el-row>
            <div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item list-group-item-action">
                        <el-row>
                            <el-col :span="6">
                                姓名：
                            </el-col>
                            <el-col :span="18">
                                {{userInfo.name}}
                            </el-col>
                        </el-row>
                    </li>
                    <li class="list-group-item list-group-item-action">
                        <el-row>
                            <el-col :span="6">
                                身份证号：
                            </el-col>
                            <el-col :span="18">
                                {{userInfo.identityNumber}}
                            </el-col>
                        </el-row>
                    </li>
                    <li class="list-group-item list-group-item-action">
                        <el-row>
                            <el-col :span="6">
                                联系电话：
                            </el-col>
                            <el-col :span="16">
                                {{userInfo.telephone}}
                            </el-col>
                        </el-row>
                    </li>
                    <li class="list-group-item list-group-item-action" @click="toEdit('固定电话','phone')">
                        <el-row>
                            <el-col :span="6">
                                固定电话：
                            </el-col>
                            <el-col :span="16">
                                {{userInfo.phone ? userInfo.phone : '-'}}
                            </el-col>
                            <el-col :span="2">
                                <i class="el-icon-arrow-right"></i>
                            </el-col>
                        </el-row>
                    </li>
                    <li class="list-group-item list-group-item-action" @click="toEdit('电子邮箱','email')">
                        <el-row class="row">
                            <el-col :span="6">
                                电子邮箱：
                            </el-col>
                            <el-col :span="16">
                                {{userInfo.email}}
                            </el-col>
                            <el-col :span="2">
                                <i class="el-icon-arrow-right"></i>
                            </el-col>
                        </el-row>
                    </li>
                    <li class="list-group-item list-group-item-action" @click="toEdit('公司职务','companyPosition')">
                        <el-row class="row">
                            <el-col :span="6">
                                公司职务：
                            </el-col>
                            <el-col :span="16">
                                {{userInfo.companyPosition ?userInfo.companyPosition :'-'}}
                            </el-col>
                            <el-col :span="2">
                                <i class="el-icon-arrow-right"></i>
                            </el-col>
                        </el-row>
                    </li>
                </ul>
            </div>
        </el-card>

        <el-dialog
            :visible.sync="showEdit"
            title="修改信息"
            width="500px"

        >
            <div>
                <el-form>
                    <el-form-item :label="editLabel">
                        <el-input v-model="userInfo[editIndex]" placeholder="请输入新的值"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" >
                <el-button @click="cancelDialog" >取消</el-button>
                <el-button type="primary" @click="editInfo">确定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
  export default {
    name: "ProfileInfo",
    data:function () {
      return {
        userInfo:{},
        accountInfo:{},
        showEdit:false,
        editLabel:"",
        editIndex:"",
        showUserInfo: false
      }
    },
    methods:{
      loadData(){
        const id = this.$sec.getAccountInfo().accountId;
        this.$http.get("users/account/"+id).then(res=>{
          this.userInfo = res.data;
        });
      },
      editInfo(){
        this.$http.post("users/"+this.userInfo.id,{
          email: this.userInfo.email,
          phone: this.userInfo.phone,
          companyPosition: this.userInfo.companyPosition
        }).then(res=>{
          this.$message.success("修改成功");
          this.cancelDialog();
          this.loadData();
        }).catch(reason => {
          if (!reason.handled){
            this.$message.error(reason.response.data.message);
          }
        })
      },
      toEdit(label,index){
        this.editLabel = label;
        this.editIndex = index;
        this.showEdit = true;
      },
      cancelDialog(){
        this.showEdit = false;
      },
      toRestPassword(){
        this.$router.push({
          name:'UserRestPassword'
        });
      }
    },
    beforeCreate:function(){
      this.$http.get("users/is-verify/"+this.$sec.getAccountInfo().accountId).then(res=>{
          this.showUserInfo = res.data;
      })
    },
    mounted:function () {
      this.loadData();
    }
  }
</script>


