<template>
    <section class="p-wrapper container">
        <div class="filter-area"
        >
            <el-card
                shadow="never"
            >
                <ul style="list-style: none">
                    <li>
                        <el-radio-group v-model="filterValue.guarantee" class="filter-row" @change="search">
                            <el-radio-button label="-1" disabled class="filter-title">担保方式</el-radio-button>
                            <el-radio-button :key="item.value"
                                             v-for="item in filterTabs.guarantee"
                                             :label="item.value"
                            >
                                {{item.name}}
                            </el-radio-button>
                        </el-radio-group>
                    </li>
                    <li>
                        <el-radio-group v-model="filterValue.period" class="filter-row" @change="search">
                            <el-radio-button label="-1" disabled class="filter-title">贷款期限</el-radio-button>
                            <el-radio-button :key="item.value"
                                             v-for="item in filterTabs.period"
                                             :label="item.value"
                            >
                                {{item.name}}
                            </el-radio-button>
                        </el-radio-group>
                    </li>
                    <li>
                        <el-radio-group v-model="filterValue.loanLimit" class="filter-row" @change="search">
                            <el-radio-button label="-1" disabled class="filter-title">贷款额度</el-radio-button>
                            <el-radio-button :key="item.value"
                                             v-for="item in filterTabs.loanLimit"
                                             :label="item.value"
                            >
                                {{item.name}}
                            </el-radio-button>
                        </el-radio-group>
                    </li>
                    <li>
                        <el-radio-group v-model="filterValue.type" class="filter-row" @change="search">
                            <el-radio-button label="-1" disabled class="filter-title">融资渠道</el-radio-button>
                            <el-radio-button :key="item.value"
                                             v-for="item in filterTabs.type"
                                             :label="item.value"
                            >
                                {{item.name}}
                            </el-radio-button>
                        </el-radio-group>
                    </li>
                    <!--<li>-->
                        <!--<el-radio-group v-model="filterValue.order" class="filter-row" @change="search">-->
                            <!--<el-radio-button label="-1" disabled class="filter-title">排序方式</el-radio-button>-->
                            <!--<el-radio-button-->
                                    <!--label="count"-->
                            <!--&gt;-->
                                <!--银行销售量排序<span class="el-icon-sort-down" style="margin-left: 3px"></span>-->
                            <!--</el-radio-button>-->
                            <!--<el-radio-button-->
                                    <!--label="rate"-->
                            <!--&gt;-->
                                <!--成功率排序 <span class="el-icon-sort-down" style="margin-left: 3px"></span>-->
                            <!--</el-radio-button>-->
                        <!--</el-radio-group>-->
                    <!--</li>-->
                </ul>
            </el-card>
        </div>

        <!--产品列表-->
        <section>
            <el-card
                shadow="never"
                v-for="p in products" :key="p.id"

                class="list-item"
            >
                <el-row>
                    <el-col :span="10">
                        <el-col :span="10" >
                            <img :src="p.brandPath" style="height: 50px;width: 150px;display: inline-block"/>
                        </el-col>
                        <el-col :span="14">
                            <div style="display: inline-block;height: 50px">
                                <div>
                                    <span style="color: #05b;font-weight: bold">{{p.name}}</span>
                                </div>
                                <div>
                                    <span style="font-size: 13px">参考利率范围:{{p.rateRangeMin}}% ~ {{p.rateRangeMax}}%</span>
                                </div>
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span=10>
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
                    <el-col :span="4">
                        <div>
                            <el-button type="primary" @click="toDetail(p.id)">产品详情</el-button>
                        </div>
                        <div style="font-size: .9rem">成功率:<span style="margin-left: 5px">{{p.successRate}}%</span></div>
                        <div style="font-size: .9rem"><span style="color: #b01a2f">{{p.applyCount}}</span>家企业申请</div>
                    </el-col>
                </el-row>
            </el-card>

            <div>
                <el-pagination
                        :page-size="filterValue.pageSize"
                        layout="total,prev,pager,next,jumper"
                        :total="filterValue.total"
                        :current-page="filterValue.pageNum + 1"
                        align="center"
                        style="margin-top: 15px"
                        @prev-click="prevPage"
                        @next-click="nextPage"
                        @current-change="currentPage"
                >
                </el-pagination>
            </div>
        </section>

    </section>
</template>

<script>
  import {resolveStaticPath} from "../../../../global/utils";

  const filterTypes = [{name:'不限',value:''}, {name:'银行',value:'1'},{name:'担保',value:'2'},
    {name:'保险',value:'3'},{name:'证券',value:'4'},{name:'基金',value:'5'},{name:'小贷',value:'6'},
    {name:'创投',value:'7'},{name:'保理',value:'8'},{name:'投资公司',value:'9'}
  ];

  const periodTypes = [{name:'不限',value:''},{name:'3个月及以下',value:'3le'},{name:'6个月及以下',value:'6le'},
    {name:'9个月及以下',value:'9le'}, {name:'12月及以下',value:'12le'},{name:'12月以上',value:'12gt'}
  ];

  const guaranteeTypes = [{name:'不限',value:''},{name:'抵押',value:'1'},{name:'质押',value:'2'},
    {name:'信用',value:'3'},{name:'保证',value:'4'}
  ];

  const loanLimitTypes = [{name:'不限',value:''},{name:'100万及以下',value:'100le'},{name:'200万及以下',value:'200le'},
    {name:'500万及以下',value:'500le'}, {name:'1000万及以下',value:'1000le'},{name:'1000万以上',value:'1000gt'}
    ];

  export default {
    name: "Product",
    data: function () {
      return {
        filterTabs:{
          type:filterTypes,
          period:periodTypes,
          guarantee:guaranteeTypes,
          loanLimit:loanLimitTypes
        },
        filterValue:{
          type:'',
          period: '',
          guarantee:'',
          loanLimit:'',
          order:'count',
          pageNum:0,
          pageSize:10,
          total:0
        },
        products:[]
      }
    },
    methods:{
      loadData(){
        this.$http.get("public/simple-products",{
          params: this.filterValue
        }).then(res=>{
          this.filterValue.total = res.data.totalElements;

          this.products = res.data.content;
          this.products.forEach(p=> p.brandPath = resolveStaticPath(p.brandPath))
        })
      },
      search(){
        this.loadData();
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
      },
      nextPage(){
        this.filterValue.pageNum += 1;
        this.loadData();
      },
      prevPage(){
        this.filterValue.pageNum -= 1;
        this.loadData();
      },
      currentPage(pageNum){
        this.filterValue.pageNum = pageNum - 1;
        this.loadData();
      }
    },
    mounted: function () {
      let query = this.$route.query;

      if (query){
        if (query.loanLimit){
          this.filterValue.loanLimit = query.loanLimit;
        }
        if (query.guarantee){
          this.filterValue.guarantee = query.guarantee;
        }
        if (query.period){
          this.filterValue.period = query.period;
        }
      }

      this.loadData();
    }
  }
</script>

<style>
    .filter-title .el-radio-button__inner{
        color: black !important;
    }

    .filter-row{
        margin-bottom: 10px;
    }

    .filter-area{
        margin-bottom: 15px;
    }

    .filter-area .el-card__body{
        padding: 0;
    }

    .list-item{
        margin-bottom: 15px;
    }
</style>
