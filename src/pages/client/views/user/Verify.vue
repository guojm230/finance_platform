<template>
    <section class="p-wrapper container">
        <div v-if="userVerify.status === null || userVerify.status === -1">
            <header style="text-align: center">
                <h1 style="font-size: 1.5rem;font-weight: 400;margin: 0">信息认证</h1>
                <p style="font-size: 1rem;color: #5f6368;">请填写个人和企业的相关信息</p>
            </header>

            <el-card
                    class="item-card no-padding-card"
                    shadow="never"
            >
                <header class="item-card-header">
                    <h3 class="item-card-title">企业信息</h3>
                </header>

                <el-form
                        label-position="right"
                        label-width="120px"
                        :model="param"
                        :rules="companyRules"
                >
                    <el-form-item label="企业名称" prop="companyName">
                        <el-col :span="10">
                            <el-input v-model="param.companyName"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="统一信用代号" prop="socialCreditCode">
                        <el-col :span="10">
                            <el-input v-model="param.socialCreditCode"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="法人代表" prop="legalRepresentative">
                        <el-col :span="10">
                            <el-input v-model="param.legalRepresentative"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="法人证件号" prop="credentialNumber">
                        <el-col :span="10">
                            <el-input v-model="param.credentialNumber"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="法人手机" prop="legalTelephone">
                        <el-col :span="10">
                            <el-input v-model="param.legalTelephone"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="对公银行账号" prop="bankAccount">
                        <el-col :span="10">
                            <el-input v-model="param.bankAccount"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="开户行">
                        <el-col :span="10">
                            <el-input v-model="param.openingBank"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="开户行分支行">
                        <el-col :span="10">
                            <el-input v-model="param.branchOpeningBank"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="公司行业" prop="industry">
                        <el-select
                                v-model="param.firstGBIndustry"
                                placeholder="请选择一级行业"
                                style="margin-right: 5px"
                                :disabled="!industries[0].able"
                                @change="switchIndustries(0)"
                        >
                            <el-option v-for="ins in industries[0].values"
                                       :key="ins.id"
                                       :label="ins.name"
                                       :value="ins.id"
                            >
                            </el-option>
                        </el-select>
                        <el-select
                                v-model="param.secondGBIndustry"
                                placeholder="请选择二级行业"
                                style="margin-right: 5px"
                                :disabled="!industries[1].able"
                                @change="switchIndustries(1)"
                        >
                            <el-option v-for="ins in industries[1].values"
                                       :key="ins.id"
                                       :label="ins.name"
                                       :value="ins.id"
                            >
                            </el-option>
                        </el-select>
                        <el-select
                                v-model="param.thirdGBIndustry"
                                placeholder="请选择三级行业"
                                style="margin-right: 5px"
                                :disabled="!industries[2].able"
                                @change="switchIndustries(2)"
                        >
                            <el-option v-for="ins in industries[2].values"
                                       :key="ins.id"
                                       :label="ins.name"
                                       :value="ins.id"
                            >
                            </el-option>
                        </el-select>
                        <el-select
                                v-model="param.fourthGBIndustry"
                                placeholder="请选择四级行业"
                                style="margin-right: 5px"
                                :disabled="!industries[3].able"
                                @change="switchIndustries(3)"
                        >
                            <el-option v-for="ins in industries[3].values"
                                       :key="ins.id"
                                       :label="ins.name"
                                       :value="ins.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="企业所属地" prop="area">
                        <el-select
                                v-model="param.companyProvince"
                                class="inline-select"
                                placeholder="请选择省"
                                :disabled="!areas._1.able"
                                @change="switchAreas(1,'companyProvince')"
                        >
                            <el-option v-for="area in areas._1.values"
                                       :key="area.id"
                                       :value="area.id"
                                       :label="area.name"
                            >

                            </el-option>
                        </el-select>
                        <el-select
                                v-model="param.companyCity"
                                class="inline-select"
                                placeholder="请选择市"
                                :disabled="!areas._2.able"
                                @change="switchAreas(2,'companyCity')"
                        >
                            <el-option v-for="area in areas._2.values"
                                       :key="area.id"
                                       :value="area.id"
                                       :label="area.name"
                            >

                            </el-option>
                        </el-select>
                        <el-select
                                v-model="param.companyArea"
                                class="inline-select"
                                placeholder="请选择区"
                                :disabled="!areas._3.able"
                                @change="switchAreas(3,'companyArea')"
                        >
                            <el-option v-for="area in areas._3.values"
                                       :key="area.id"
                                       :value="area.id"
                                       :label="area.name"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="公司简介">
                        <el-col :span="10">
                            <el-input v-model="param.companyIntroduce" type="textarea"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="经营范围">
                        <el-col :span="10">
                            <el-input v-model="param.businessScope" type="textarea"></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
            </el-card>

            <el-card class="item-card no-padding-card"
                     shadow="never"
            >
                <header class="item-card-header">
                    <h3 class="item-card-title">联系人信息</h3>
                </header>
                <el-form
                        :model="param"
                        label-width="120px"
                        label-position="right"
                        :rules="userInfoRules"
                >

                    <el-form-item label="姓名" prop="name">
                        <el-col :span="10">
                            <el-input v-model="param.name"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="身份证号" prop="identityNumber">
                        <el-col :span="10">
                            <el-input v-model="param.identityNumber"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="手机号" prop="telephone">
                        <el-col :span="10">
                            <el-input v-model="param.telephone"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="职位">
                        <el-col :span="10">
                            <el-input v-model="param.companyPosition"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="电子邮箱" prop="email">
                        <el-col :span="10">
                            <el-input v-model="param.email"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="固定电话">
                        <el-col :span="10">
                            <el-input v-model="param.phone"></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
            </el-card>

            <el-card class="item-card no-padding-card"
                     shadow="never"
            >
                <header class="item-card-header">
                    <h3 class="item-card-title">证件类信息</h3>
                </header>

                <div>
                    <el-card
                            shadow="never"
                            class="item-card"
                    >
                        <div slot="header">
                            营业执照
                        </div>
                        <div style="margin-top: 15px">
                            <el-row>
                                <el-col :span="16">
                                    <el-upload
                                            :action="action"
                                            :headers="headers"
                                            list-type="picture-card"
                                            :limit="1"
                                            :before-upload="onBeforeUpload"
                                            :on-success="licenceUploadSuccess"
                                    >
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </el-col>
                                <el-col :span="8">
                                    <ul style="list-style: none">
                                        <li>1.营业执照正、副本或盖红章后的复印件扫描件</li>
                                        <li>2.文件大小不超过10M</li>
                                    </ul>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                    <el-card
                            shadow="never"
                            class="item-card"
                    >
                        <div slot="header">
                            法人代表身份证扫描件
                        </div>
                        <div style="margin-top: 15px">
                            <el-row>
                                <el-col :span="16">
                                    <el-upload
                                            :action="action"
                                            :headers="headers"
                                            list-type="picture-card"
                                            :limit="2"
                                            :before-upload="onBeforeUpload"
                                            :on-success="legalUploadSuccess"
                                    >
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </el-col>
                                <el-col :span="8">
                                    <ul style="list-style: none">
                                        <li>1.需包括身份证正反面</li>
                                        <li>2.最多上传两个文件,单个文件大小不超过10M</li>
                                    </ul>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                    <el-card
                            shadow="never"
                            class="item-card"
                    >
                        <div slot="header">
                            企业信息采集授权书
                        </div>
                        <div style="margin-top: 15px">
                            <el-row>
                                <el-col :span="16">
                                    <el-upload
                                            :action="action"
                                            :headers="headers"
                                            list-type="picture-card"
                                            :limit="1"
                                            :before-upload="onBeforeUpload"
                                            :on-success="authUploadSuccess"
                                    >
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </el-col>
                                <el-col :span="8">
                                    <ul style="list-style: none">
                                        <li>1.信息采集授权书需要加盖企业公章</li>
                                        <li>2.只能上传一个文件，文件大小不超过10M</li>
                                        <li><a href="http://localhost:8089/resources/download/5?access_token=0754eb47-66e4-48c1-bcc2-ebeb669b414c">《信息采集及信息查询委托授权书》模板</a></li>
                                    </ul>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </div>
            </el-card>
            <div style="margin-top: 20px;text-align: center">
                <el-button type="primary" round style="width: 80%" :loading="loading" @click="commit">提交</el-button>
            </div>
        </div>
        <div v-if="userVerify && userVerify.status === 0" style="text-align: center;margin-top: 50px">
            <i class="el-icon-loading" style="color: green;font-size: 2rem"></i>
            <span style="font-size: 1.7rem;margin-left: 10px">
                        正在审批中
            </span>
        </div>
        <div v-if="userVerify && userVerify.status === 1" style="text-align: center;margin-top: 50px">
            <i class="el-icon-success" style="color: green;font-size: 2rem"></i>
            <span style="font-size: 1.7rem;margin-left: 10px">
                        已认证
            </span>
        </div>
    </section>
</template>

<script>
  import cof from "@/global/config"

  export default {
    name: "Verify",
    data: function () {
      return {
        param:{
          accountId:this.$sec.getAccountInfo().accountId,
          companyArea:'',
          companyProvince:'',
          companyCity:'',
          firstGBIndustry:'',
          secondGBIndustry:'',
          thirdGBIndustry:'',
          fourthGBIndustry:'',
        },
        industries:[
          {
            index:'firstGBIndustry',
            able:true,
            values:[]
          },
          {
            index:'secondGBIndustry',
            able:false,
            values:[]
          },
          {
            index:'thirdGBIndustry',
            able:false,
            values:[]
          },
          {
            index:'fourthGBIndustry',
            able:false,
            values:[]
          }
        ],
        areas:{
          _1: {
            able: true,
            values: []
          },
          _2: {
            able: false,
            values: []
          },
          _3: {
            able: false,
            values: []
          }
        },
        action: cof.SERVER_URL+"resources",
        headers:{
          authorization: 'bearer '+this.$sec.getAccessToken()
        },
        data:{
          accountId: this.$sec.getAccountInfo().accountId,
          uploaderName: this.$sec.getAccountInfo().name
        },
        companyRules:{
          companyName:{required: true, message: '请输入企业名称', trigger: 'blur'},
          socialCreditCode:{required: true, message: '请输入统一信用代号', trigger: 'blur'},
          legalRepresentative:{required: true, message: '请输入法人代表', trigger: 'blur'},
          credentialNumber:{required: true, message: '请输入证件号', trigger: 'blur'},
          legalTelephone:{required: true, message: '请输入法人手机号', trigger: 'blur'},
          bankAccount:{required: true, message: '请输入对公银行账号', trigger: 'blur'},
          industry:{required: true, message: '请选择企业国标行业', trigger: 'blur'},
          area:{required: true, message: '请选择企业所属地', trigger: 'blur'}
        },
        userInfoRules:{
          name:{required: true, message: '请输入企业名称', trigger: 'blur'},
          identityNumber:{required: true, message: '请输入身份证号', trigger: 'blur'},
          telephone:{required: true, message: '请输入手机号', trigger: 'blur'},
          email:{required: true, message: '请输入电子邮箱', trigger: 'blur'}
        },
        userVerify:{},
        loading:false
      }
    },
    methods:{
      loadAreas(){
        this.$http.get("public/commons/areas").then(res=>{
          this.areas._1.values=res.data;
        })
      },
      loadIndustries(){
        this.$http.get("public/commons/industries").then(res=>{
          this.industries[0].values=res.data;
        })
      },
      switchIndustries(level){
        const maxLevel = 3;
        if (level === maxLevel){
          return;
        }
        for (let j = level + 2;j<=maxLevel;j++){
          this.industries[j].able = false;
          this.param[this.industries[j].index] = '';
        }

        this.param[this.industries[level+1].index] = '';

        let val = this.param[this.industries[level].index];
        this.$http.get("public/commons/industries?pId="+val).then(res=>{
          if (res.data != null && res.data.length > 0 ){
            this.industries[level+1].values=res.data;
          } else {
            const lastLevelValue = this.param[this.industries[level].index];
            this.industries[level].values.forEach(ins=>{
              if (ins.id === lastLevelValue){
                this.industries[level+1].values = [ins];
              }
            });
            this.param[this.industries[level+1].index] = lastLevelValue;
          }
          this.industries[level + 1].able = true;
        })

      },
      switchAreas(i,index){
        if (i === 3){
          return;
        }
        let pid = this.param[index];
        if (i === 1) {
          this.areas['_' + (i + 2)].able = false;
          this.areas['_' + (i + 1)].able = true;
          this.param.companyCity = '';
          this.param.companyArea = ''
        }

        if (i === 2) {
          this.areas['_' + (i + 1)].able = true;
          this.param.companyArea = ''
        }
        this.$http.get("public/commons/areas?pId=" + pid).then(res => {
          this.areas['_' + (i + 1)].values = res.data;
        })
      },
      licenceUploadSuccess(response,file,fileList){
        this.param.businessLicenceRid = response
      },
      legalUploadSuccess(response,file,fileList){
        if (fileList.length === 1){
          this.param.legalRepresentativeRid1 = response
        } else {
          this.param.legalRepresentativeRid2 = response
        }
      },
      authUploadSuccess(response,file,fileList){
        this.param.certificateAuthorizationRid = response
      },
      onBeforeUpload(file){
        if (file.size > 10*1024*1024){
          this.$message.error("文件大小必须低于10M");
          return false
        }
        return true;
      },
      commit(){
        this.loading = true;
        this.$http.post('users/verify',this.param).then(res=>{
          this.$message.success("提交成功");
          this.$router.back();
          this.loading = false;
        }).catch(reason => {
          if (!reason.handled){
            this.$message.error(reason.response.data.message);
            this.loading = false;
          }
        })
      }
    },
    beforeCreate:function(){
      this.$http.get("users/verifies/"+this.$sec.getAccountInfo().accountId+"/last").then(res=>{
        this.userVerify = res.data;
      })
    },
    mounted: function () {
      this.loadAreas();
      this.loadIndustries();
    }
  }
</script>

<style scoped>
    .inline-select{
        margin-right: 5px;
    }
</style>
