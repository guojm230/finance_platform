<template>
    <div>
        <div style="position: relative;">
            <div class="carousel-area">
                <el-carousel height="400px" indicator-position="none" arrow="never">
                    <el-carousel-item v-for="(item,index) in images" :key="index">
                        <img :src="item.path" style="height: 400px;" width="100%"/>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="aside-area">
                <div style="padding:15px 15px 0 15px;">
                    <el-row style="border-bottom: #f0f9eb dashed 1px">
                        <el-col :span="16">
                            <h2 style="font-weight: 600;font-size: 1.7rem;margin: 0;display: inline-block">我要贷款</h2>
                        </el-col>
                        <el-col :span="8" align="right">
                            <el-button type="info" size="small" v-if="$sec.isAuthenticated()" @click="toManager">
                                <span style="font-weight: 600;font-size: 0.8rem">管理中心</span>
                            </el-button>
                            <el-button type="info" size="small" v-else  @click="toLogin">
                                <span style="font-weight: 600;font-size: 0.8rem">立即登录/注册</span>
                            </el-button>

                        </el-col>
                    </el-row>
                    <div class="search-area" style="margin: 10px auto;padding: 0 10px;">
                        <div style="margin-bottom: 10px" v-for="(item,index) in filterOptions" :key="index" >
                            <label style="color: #ccc;
                                    font-weight:bold;
                                    margin-right: 15px;
                                    width: 30%;
">
                                {{item.label}}
                            </label>
                            <el-select
                                    v-model="productFilter[item.index]"
                                    size="small"
                                    style="width: 70%"
                            >
                                <el-option
                                        v-for="(op,index) in item.options"
                                        :key="index"
                                        :value="op.value"
                                        :label="op.name"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div>
                            <el-button style="width: 100%" type="danger" @click="search" size="medium">
                                <span style="font-weight: bold;font-size: 1.1rem">搜索贷款</span>
                            </el-button>
                        </div>
                    </div>
                </div>
                <div style="margin-top: 10px">
                    <div>
                        <span class="iconfont icon-hotfill" style="color: red"></span>
                        <span style="margin-left: 5px;font-size: .8rem;color: #199ad9;">热门贷款搜索:</span>
                    </div>
                    <ul style="list-style: none;padding: 0">
                        <li style="display: inline-block;width: 33%;text-align: center">
                                    <span style="font-size: .8rem">
                                        <router-link :to="{path:'/products',query:{
                                            loanLimit: '100le'
                                        }}" class="no-link">100万企业贷款</router-link>
                                    </span>
                        </li>
                        <li style="display: inline-block;width: 33%;text-align: center">
                                    <span style="font-size: .8rem">
                                        <router-link :to="{path:'/products',query:{
                                            loanLimit: '500le'
                                        }}" class="no-link">500万信用贷款</router-link>
                                    </span>
                        </li>
                        <li style="display: inline-block;width: 33%;text-align: center">
                                    <span style="font-size: .8rem">
                                        <router-link :to="{path:'/products',query:{
                                            guarantee: '3'
                                        }}" class="no-link">信用贷款</router-link>
                                    </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <section class="container" style="margin: auto">
            <!--统计数据-->
            <statistic-index></statistic-index>

            <el-row
                    :gutter="20"
            >
                <el-col :span="12">
                    <el-card
                            shadow="hover"
                    >
                        <header slot="header">
                            <h3 style="font-size: 1.3rem;font-weight: 400;margin: 0">热门新闻</h3>
                        </header>
                        <!--<el-card-->
                        <!--class="el-card"-->
                        <!--shadow="never"-->
                        <!--:body-style="{-->
                        <!--padding: '20px 0'-->
                        <!--}"-->
                        <!--&gt;-->
                        <ul class="articles" style="border: 0">
                            <li v-for="n in newsList" :key="n.id" class="item">
                                <router-link :to="'article/'+n.id">
                                    <el-row
                                            :gutter="20"
                                            class="no-padding-card"
                                    >
                                        <el-col :span="24" class="title">
                                            {{n.title}}
                                        </el-col>
                                        <!--<el-col :span="6" style="font-size: 15px;min-width: 130px" align="right">-->
                                        <!--{{n.createTime}}-->
                                        <!--</el-col>-->
                                    </el-row>
                                </router-link>
                            </li>
                        </ul>
                        <!--</el-card>-->
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card
                            shadow="hover"
                    >
                        <header slot="header">
                            <h3 style="font-size: 1.3rem;font-weight: 400;margin: 0">最新政策</h3>
                        </header>
                        <!--<el-card-->
                        <!--class="el-card"-->
                        <!--shadow="never"-->
                        <!--:body-style="{-->
                        <!--padding: '20px 0'-->
                        <!--}"-->
                        <!--&gt;-->
                        <ul class="articles">
                            <li v-for="n in policyList" :key="n.id" class="item">
                                <router-link :to="'article/'+n.id+'?type=policy'">
                                    <el-row
                                            :gutter="20"
                                            class="no-padding-card"
                                    >
                                        <el-col :span="24" class="title">
                                            {{n.title}}
                                        </el-col>
                                        <!--<el-col :span="6" style="font-size: 15px;min-width: 130px" align="right">-->
                                        <!--{{n.createTime}}-->
                                        <!--</el-col>-->
                                    </el-row>
                                </router-link>
                            </li>
                        </ul>
                        <!--</el-card>-->
                    </el-card>
                </el-col>
            </el-row>

            <el-card
                    style="margin-top: 15px"
                    class="item-card"
                    shadow="hover"
            >
                <header slot="header">
                    <h3 style="font-size: 1.3rem;font-weight: 400;margin: 0">热门产品</h3>
                </header>
                <el-card
                        shadow="never"
                        v-for="p in products" :key="p.id"
                        class="list-item"
                        style="margin-bottom: 15px;border: 0"
                >

                    <el-row>
                        <el-col :span="10">
                            <el-col :span="10" >
                                <img :src="p.brandPath" style="height: 50px;width: 150px;display: inline-block"/>
                            </el-col>
                            <el-col :span="14">
                                <div style="display: inline-block;height: 50px">
                                    <div>
                                        <span>{{p.name}}</span>
                                    </div>
                                    <div>
                                        <span style="font-size: 13px">参考利率范围:{{p.rateRangeMin}}% ~ {{p.rateRangeMax}}%</span>
                                    </div>
                                </div>
                            </el-col>
                        </el-col>
                        <el-col :span="1">
                            <span>&nbsp;</span>
                        </el-col>
                        <el-col :span=8>
                            <div>
                                贷款额度: {{p.loanLimitMin}}万元~{{p.loanLimitMax}}万元
                            </div>
                            <div>
                                担保方式：{{p.guaranteeMode}}
                            </div>

                            <div>
                                贷款期限：{{p.creditPeriodMin}}个月~{{p.creditPeriodMax}}个月
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <span>&nbsp;</span>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="primary" @click="toDetail(p.id)">产品详情</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-card>

            <el-card
                    class="item-card"
                    shadow="hover"
            >
                <header slot="header">
                    <h3 style="font-size: 1.3rem;font-weight: 400; margin: 0">合作机构</h3>
                </header>
                <el-card
                        shadow="never"
                        style="border: 0"
                >
                    <el-row :gutter="20" >
                        <el-col :span="6" v-for="ins in institutions" :key="ins.id" align="center"
                                style="margin-bottom: 15px">
                            <img class="ins-img" :src="ins.brandPath"/>
                        </el-col>
                    </el-row>
                </el-card>
            </el-card>

            <el-dialog :visible.sync="showLogin"  width="500px" class="dialog"
            >
                <login  @to-register="toRegister"></login>
            </el-dialog>

            <el-dialog :visible.sync="showRegister"  width="500px" class="dialog"
            >
                <register  @to-login="toLogin"></register>
            </el-dialog>
        </section>
    </div>
</template>

<script>
  import {resolveStaticPath} from "@/global/utils";
  import Login from "./Login";
  import Register from "./Register";
  import StatisticIndex from "./statistic/StatisticIndex";

  const loanLimitTypes = [{name:'不限',value:''},{name:'100万及以下',value:'100le'},{name:'200万及以下',value:'200le'},
    {name:'500万及以下',value:'500le'}, {name:'1000万及以下',value:'1000le'},{name:'1000万以上',value:'1000gt'}
  ];
  const guaranteeTypes = [{name:'不限',value:''},{name:'抵押',value:'1'},{name:'质押',value:'2'},
    {name:'信用',value:'3'},{name:'保证',value:'4'}
  ];

  const periodTypes = [{name:'不限',value:''},{name:'3个月及以下',value:'3le'},{name:'6个月及以下',value:'6le'},
    {name:'9个月及以下',value:'9le'}, {name:'12月及以下',value:'12le'},{name:'12月以上',value:'12gt'}
  ];

  export default {
    name: "Home",
    components: {StatisticIndex, Register, Login},
    data:function () {
      return {
        images:this.$store.state.config.home.carouselItems,
        products:[],
        filterOptions:[{
          label: "贷款金额",
          index:"loanLimit",
          options:loanLimitTypes
        },
          {
            label: "贷款期限",
            index:'period',
            options:periodTypes
          },
          {
            label: "担保方式",
            index:"guarantee",
            options:guaranteeTypes
          }
        ],
        productFilter:{
          loanLimit:"",
          guarantee:'',
          period:'',
        },
        showLogin:false,
        showRegister: false,
        newsList:[],
        policyList:[],
        institutions:[]
      }
    },
    methods:{
      loadData(){
        this.$http.get("public/simple-products",{
          params: {
            pageNum:0,
            pageSize:4
          }
        }).then(res=>{
          this.products = res.data.content;
          this.products.forEach(p=> p.brandPath = resolveStaticPath(p.brandPath))
        });

        this.$http.get("public/news",{
          params:{
            pageNum:0,
            pageSize:7
          }
        }).then(res=>{
          this.newsList = res.data.content;
        });

        this.$http.get("public/policies",{
          params:{
            pageNum:0,
            pageSize:7
          }
        }).then(res=>{
          this.policyList = res.data.content;
        });

        this.$http.get("public/institutions?type=1").then(res=>{
          res.data.forEach(ins=>
              ins.brandPath = resolveStaticPath(ins.brandPath)
          );
          this.institutions = res.data;
        })
      },
      toLogin(){
        this.showRegister = false;
        this.showLogin = true;
      },
      toRegister(){
        this.showLogin = false;
        this.showRegister = true;
      },
      closed(){
        this.showLogin = false;
      },
      search(){
        this.$router.push({
          path:"/products",
          query:this.productFilter
        });
      },
      toManager(){
        this.$router.push({
          name:"UserMain"
        })
      },
      toDetail(id){
        if (this.$sec.isAuthenticated()){
          this.$router.push({
            name:'UserProductDetail',
            params:{
              id: id
            }
          })
        } else {
          this.$router.push({
            name:'ProductDetail',
            params:{
              id: id
            }
          })
        }
      }
    },
    mounted:function () {
      this.loadData();
      if (this.$route.params.login){
        this.toLogin();
      }
    }
  }
</script>

<style scoped>
    .dialog /deep/ .el-dialog__body{
        padding-top: 0;
    }
    .no-link{
        color: #f2f2f2;
    }

    .carousel-area{
        position: relative;
    }

    .aside-area{
        position: absolute;
        background-color:#515151;
        width: 30%;
        max-width: 400px;
        top:40px;
        bottom: 40px;
        opacity: 0.9;
        right: 50px;
        z-index: 10;
        height: 320px;
        padding: 10px;
        box-sizing: border-box;
        color: #f0f9eb;
    }

    .articles{
        list-style: none;
        padding-left: 0;
        margin: 0;
    }

    .articles .item:hover{
        color: #495057;
        text-decoration: none;
        background-color: #f8f9fa;
    }

    .articles a{
        text-decoration: none;
        color: #1b1e21 !important;
    }

    .articles .item{
        padding: 10px 20px;
        border-bottom: 1px solid #f2f2f2
    }

    .articles .item .title{
        font-size: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
    }

</style>
