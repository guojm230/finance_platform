<template>
    <section class="p-wrapper container">
        <header style="text-align: center">
            <h1 style="font-size: 1.5rem;font-weight: 400">企业信息</h1>
            <p style="font-size: 1rem;color: #5f6368;">查看企业相关信息</p>
        </header>

        <el-card
                class="item-card no-padding-card"
                shadow="never"
        >
            <div slot="header">
                <h1 class="item-card-title">公司信息</h1>
            </div>
            <el-row class="info-table">
                <el-row class="list-item" >
                    <el-col :span="4" class="list-title">
                        <span>企业名称：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{company.companyName}}
                    </el-col>
                    <el-col :span="4" class=" list-title">
                        <span>信用代码：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{company.socialCreditCode}}
                    </el-col>
                </el-row>
                <el-row class=" list-item" >
                    <el-col :span="4" class="list-title">
                        <span>法人代表：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{company.legalRepresentative}}
                    </el-col>
                    <el-col :span="4" class="list-title " >
                        <span>法人证件号：</span>
                    </el-col>
                    <el-col :span="8" class=" ">
                        {{company.credentialNumber}}
                    </el-col>
                </el-row>
                <el-row class=" list-item" >
                    <el-col :span="4" class="list-title">
                        <span>法人手机号：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{company.legalTelephone}}
                    </el-col>
                    <el-col :span="4" class="list-title " >
                        <span>对公银行账号：</span>
                    </el-col>
                    <el-col :span="8" class=" ">
                        {{company.bankAccount}}
                    </el-col>
                </el-row>
                <el-row class=" list-item" >
                    <el-col :span="4" class="list-title">
                        <span>开户行：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{company.openingBank}}
                    </el-col>
                    <el-col :span="4" class="list-title " >
                        <span>开户支行：</span>
                    </el-col>
                    <el-col :span="8" class=" ">
                        {{company.branchOpeningBank}}
                    </el-col>
                </el-row>

                <el-row class=" list-item">
                    <el-col :span="4" class="list-title ">
                        <span>经营行业：</span>
                    </el-col>
                    <el-col :span="20" class="col-10">
                        {{company.industry}}
                    </el-col>
                </el-row>

                <el-row class=" list-item">
                    <el-col :span="4" class="list-title ">
                        <span>企业位置：</span>
                    </el-col>
                    <el-col :span="20" class="col-10">
                        {{company.companyPosition}}
                    </el-col>
                </el-row>

                <el-row class=" list-item">
                    <el-col :span="4" class="list-title ">
                        <span>企业简介：</span>
                    </el-col>
                    <el-col :span="20" class="col-10">
                        {{company.companyIntroduce}}
                    </el-col>
                </el-row>
                <el-row class=" list-item">
                    <el-col :span="4" class="list-title ">
                        <span>经营范围：</span>
                    </el-col>
                    <el-col :span="20" class="col-10">
                        {{company.businessScope}}
                    </el-col>
                </el-row>
            </el-row>
        </el-card>
    </section>
</template>

<script>
  export default {
    name: "CompanyInfo",
    data(){
      return {
        company:{}
      }
    },
    methods:{
      loadData(){
        this.$http.get("users/company/"+this.$sec.getAccountInfo().id).then(res=>{
          //拼接company信息
          res.data.companyPosition =
              res.data.companyProvince + '-' + res.data.companyCity + '-' +res.data.companyArea;
          //拼接行业信息
          res.data.industry =
              res.data.firstGBIndustry + '-' + res.data.secondGBIndustry + '-' + res.data.thirdGBIndustry
          + (res.data.fourthGBIndustry ? '-' + res.data.fourthGBIndustry : '');

          this.company = res.data;
        })
      }
    },
    beforeCreate:function(){
      this.$http.get("users/is-verify/"+this.$sec.getAccountInfo().accountId).then(res=>{
        if (!res.data){
          this.$message.info('请先进行认证');
          this.$router.push({
            name:"UserVerify"
          });
        }
      })
    },
    mounted(){
      this.loadData();
    }
  }
</script>

<style scoped>

</style>
