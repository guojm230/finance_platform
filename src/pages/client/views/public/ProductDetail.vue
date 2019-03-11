<template>
    <section class="container">
        <el-col v-if="showDetail">
            <el-card
                shadow="never"
                class="no-padding-card"
            >
                <div slot="header">
                    <h1 class="item-card-title" style="margin: 0">商品详情</h1>
                </div>
                <el-row class="info-table">
                    <!--头部-->
                    <el-row style="margin-bottom: 20px">
                        <img style="width: 124px;height: 46px;display: inline-block" :src="product.brandPath" :alt="product.publisherName"/>
                        <div style="margin-left: 20px;display: inline-block">
                            <h3>{{product.name}}</h3>
                            <span>发布机构：</span> {{product.publisherName}}
                        </div>
                    </el-row>
                    <el-row class="list-item" >
                        <el-col :span="4" class="list-title">
                            <span>参考利率范围：</span>
                        </el-col>
                        <el-col :span="8" class="im-value">
                            {{product.rateRangeMin}}% ~ {{product.rateRangeMax}}%
                        </el-col>
                        <el-col :span="4" class=" list-title">
                            <span>还款方式：</span>
                        </el-col>
                        <el-col :span="8" class="im-value">
                            {{product.repaymentMode}}
                        </el-col>
                    </el-row>
                    <el-row class=" list-item" >
                        <el-col :span="4" class="list-title">
                            <span>贷款额度：</span>
                        </el-col>
                        <el-col :span="8" class="im-value">
                            {{product.loanLimitMin}}万元 ~ {{product.loanLimitMax}}万元
                        </el-col>
                        <el-col :span="4" class="list-title " >
                            <span>贷款期限：</span>
                        </el-col>
                        <el-col :span="8" class="im-value ">
                            {{product.creditPeriodMin}}个月 ~ {{product.creditPeriodMax}}个月
                        </el-col>
                    </el-row>
                    <el-row class=" list-item" >
                        <el-col :span="4" class="list-title">
                            <span>担保方式：</span>
                        </el-col>
                        <el-col :span="8" class="">
                            {{product.guaranteeMode}}
                        </el-col>
                        <el-col :span="4" class="list-title " >
                            <span>联系电话：</span>
                        </el-col>
                        <el-col :span="8" class=" ">
                            {{product.telephone}}
                        </el-col>
                    </el-row>
                    <el-row class=" list-item" >
                        <el-col :span="4" class="list-title">
                            <span>贷款额度：</span>
                        </el-col>
                        <el-col :span="8" class="">
                            {{product.loanLimitMin}}万元 ~ {{product.loanLimitMax}}万元
                        </el-col>
                        <el-col :span="4" class="list-title " >
                            <span>贷款期限：</span>
                        </el-col>
                        <el-col :span="8" class=" ">
                            {{product.creditPeriodMin}}个月 ~ {{product.creditPeriodMax}}个月
                        </el-col>
                    </el-row>

                    <el-row class=" list-item">
                        <el-col :span="4" class="list-title ">
                            <span>产品简介：</span>
                        </el-col>
                        <el-col :span="20" class="content" v-html="product.introduce">
                        </el-col>
                    </el-row>
                    <el-row class=" list-item">
                        <el-col :span="4" class="list-title ">
                            <span>适用客户：</span>
                        </el-col>
                        <el-col :span="20" class="content">
                            {{product.applicableCustomers}}
                        </el-col>
                    </el-row>
                    <el-row class=" list-item">
                        <el-col :span="4" class="list-title ">
                            <span>申请条件：</span>
                        </el-col>
                        <el-col :span="20" class="content">
                            <p v-html="product.applyRequirements">

                            </p>
                        </el-col>
                    </el-row>
                    <el-row class=" list-item">
                        <el-col :span="4" class="list-title ">
                            <span>提交材料：</span>
                        </el-col>
                        <el-col :span="20" class="content" v-html="product.submissions">
                        </el-col>
                    </el-row>

                    <el-row class=" list-item">
                        <el-col :span="4" class="list-title ">
                            <span>申请流程：</span>
                        </el-col>
                        <el-col :span="20" class="content" v-html="product.applyWorkflow">
                        </el-col>
                    </el-row>
                </el-row>

                <el-row>
                    <el-col>
                        <el-button type="primary" round class="fluid-btn" @click="apply" style="margin-bottom: 15px" >
                            申请
                        </el-button>
                    </el-col>
                    <el-col>
                        <el-button type="warning" round @click="back" class="fluid-btn">
                            返回
                        </el-button>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <div v-else>

        </div>
    </section>
</template>

<script>
  import {resolveStaticPath} from "../../../../global/utils";

  export default {
    name: "ProductDetail",
    data:function () {
      return {
        product:{},
        showDetail:true
      }
    },
    methods:{
      loadData(id){
        this.$http.get("public/products/"+id).then(res=>{
          const product = res.data;
          product.brandPath = resolveStaticPath(product.brandPath);
          this.product = product;
        })
      },
      back(){
        this.$router.back()
      },
      apply(){
        if (!this.$sec.isAuthenticated()){
          this.$confirm('申请产品需要先登录，是否跳转到登录界面？','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            this.$router.push({
              name:'PublicHome',
              params:{
                login:true
              }
            })
          }).catch()
        } else {
          this.$http.post("products/applies", {
            applierId: this.$sec.getAccountInfo().accountId,
            productId: this.$route.params.id
          }).then(res => {
            this.$message.success("申请成功");
            this.back();
          }).catch(reason => {
            if (!reason.handled) {
              this.$message.error(reason.response.data.message);
            }
          })
        }
      }
    },
    mounted: function () {
      this.loadData(this.$route.params.id);
    }
  }
</script>

<style scoped>
    .fluid-btn{
        width: 100%
    }
</style>
