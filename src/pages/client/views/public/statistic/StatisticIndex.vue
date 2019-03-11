<template>
    <el-card
        class="item-card" style="margin-top: 15px;padding-bottom: 20px"
    >
        <header slot="header">
            <h3 style="font-size: 1.3rem;font-weight: 400;margin: 0">平台成果展示</h3>
        </header>
        <el-row
                :gutter="20"
        >
            <el-col :span="5">
                <router-link to="/statistic/registerCompanyCount" style="text-decoration: none">
                    <div style="width:132px;height:132px;border: 1px solid rgba(102, 204, 51, 1);border-radius: 50%;">
                        <div style="width:124px;height:124px;border: 1px solid lightGray;border-radius: 50%;position: relative;top:4px;left:4px;">
                            <div style="width: 62px;height: 124px;border: 3px solid rgba(102, 204, 51, 1);border-radius: 100% 0 0 100%/50%;border-right: none;position: relative;top:-4px;left:-3px;transform-origin: right center;transition:All 1s linear;" class="progress"></div>
                            <div style="margin-top: -90px;margin-left:5px;width:100%;text-align:center;">
                                <p style="height:24px;color:red;font-size:28px;display:inline;">{{statisticCount.registerCompanyCount}}</p>
                                <p style="height:24px;display:inline;font-size:14px;font-weight:bold;">家</p>
                            </div>
                        </div>
                    </div>
                    <div style="width: 132px;text-align: center;margin-top: 10px; ">
                        <i style="font-size: 1.8rem;color: rgba(102, 204, 51, 1)" class="iconfont icon-friendaddfill"></i>
                        <span >注册企业</span>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="5">
                <router-link :to="{name:'PublicProduct'}" style="text-decoration: none">
                    <div style="width:132px;height:132px;border: 1px solid rgba(102, 204, 255, 1);border-radius: 50%;">
                        <div style="width:124px;height:124px;border: 1px solid lightGray;border-radius: 50%;position: relative;top:4px;left:4px;">
                            <div style="width: 62px;height: 124px;border: 3px solid rgba(102, 204, 255, 1);border-right: none !important;border-radius: 100% 0 0 100%/50%;position: relative;top:-4px;left:-3px;transform-origin: right center;transition:All 1s linear;" class="progress"></div>
                            <div style="margin-top: -90px;margin-left:5px;width:100%;text-align:center;">
                                <p style="height:24px;color:red;font-size:28px;display:inline;">{{statisticCount.productCount}}</p>
                                <p style="height:24px;display:inline;font-size:14px;font-weight:bold;">项</p>
                            </div>
                        </div>
                    </div>
                    <div style="width: 132px;text-align: center;margin-top: 10px">
                        <i style="font-size: 1.8rem;color: rgba(102, 204, 255, 1)" class="iconfont icon-circlefill"></i>
                        <span >金融产品</span>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="5">
                <router-link to="/statistic/demandCount" style="text-decoration: none">
                    <div style="width:132px;height:132px;border: 1px solid rgba(255, 153, 51, 1);border-radius: 50%;">
                        <div style="width:124px;height:124px;border: 1px solid lightGray;border-radius: 50%;position: relative;top:4px;left:4px;">
                            <div style="width: 62px;height: 124px;border: 3px solid rgba(255, 153, 51, 1);border-radius: 100% 0 0 100%/50%;border-right: none;position: relative;top:-4px;left:-3px;transform-origin: right center;transition:All 1s linear;" class="progress"></div>
                            <div style="margin-top: -90px;margin-left:5px;width:100%;text-align:center;">
                                <p style="height:24px;color:red;font-size:28px;display:inline;">{{statisticCount.demandCount}}</p>
                                <p style="height:24px;display:inline;font-size:14px;font-weight:bold;">项</p>
                            </div>
                        </div>
                    </div>
                    <div style="width: 132px;text-align: center;margin-top: 10px">
                        <i style="font-size: 1.8rem;color: rgba(255, 153, 51, 1)" class="iconfont icon-edit_light"></i>
                        <span >需求数量</span>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="5">
                <router-link to="/statistic/demandMoney" style="text-decoration: none">
                    <div style="width:132px;height:132px;border: 1px solid rgba(102, 153, 255, 1);border-radius: 50%;">
                        <div style="width:124px;height:124px;border: 1px solid lightGray;border-radius: 50%;position: relative;top:4px;left:4px;">
                            <div style="width: 62px;height: 124px;border: 3px solid rgba(102, 153, 255, 1);border-radius: 100% 0 0 100%/50%;border-right: none;position: relative;top:-4px;left:-3px;transform-origin: right center;transition:All 1s linear;" class="progress"></div>
                            <div style="margin-top: -90px;margin-left:5px;width:100%;text-align:center;">
                                <p style="height:24px;color:red;font-size:28px;display:inline;">{{statisticCount.demandMoney}}</p>
                                <p style="height:24px;display:inline;font-size:14px;font-weight:bold;">万元</p>
                            </div>
                        </div>
                    </div>
                    <div style="width: 132px;text-align: center;margin-top: 10px">
                        <i style="font-size: 1.8rem;color: rgba(102, 153, 255, 1)" class="iconfont icon-rechargefill"></i>
                        <span >需求金额</span>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="4">
                <router-link to="/statistic/demandSuccessMoney" style="text-decoration: none">
                    <div style="width:132px;height:132px;border: 1px solid rgba(204, 153, 255, 1);border-radius: 50%;">
                        <div style="width:124px;height:124px;border: 1px solid lightGray;border-radius: 50%;position: relative;top:4px;left:4px;">
                            <div style="width: 62px;height: 124px;border: 3px solid rgba(204, 153, 255, 1);border-right: none;border-radius: 100% 0 0 100%/50%;position: relative;top:-4px;left:-3px;transform-origin: right center;transition:All 1s linear;" class="progress"></div>
                            <div style="margin-top: -90px;margin-left:5px;width:100%;text-align:center;">
                                <p style="height:24px;color:red;font-size:28px;display:inline;">{{statisticCount.demandSuccessMoney}}</p>
                                <p style="height:24px;display:inline;font-size:14px;font-weight:bold;">万元</p>
                            </div>
                        </div>
                    </div>
                    <div style="width: 132px;text-align: center;margin-top: 10px">
                        <i style="font-size: 1.8rem;color: rgba(204, 153, 255, 1)" class="iconfont icon-tagfill"></i>
                        <span >放款金额</span>
                    </div>
                </router-link>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
  export default {
    name: "StatisticIndex",
    data(){
      return {
        statisticCount:{}
      }
    },
    methods:{
      loadData(){
        this.$http.get("public/statistic/count").then(res=>{
          this.statisticCount = res.data;
        });
      }
    },
    mounted:function () {
      this.loadData();
    }
  }
</script>

<style scoped>
    .progress:hover{
        transform:rotate(180deg);
        transform-origin: right center;

        -ms-transform:rotate(180deg);
        -ms-transform-origin: right center;

        -moz-transform:rotate(180deg);
        -moz-transform-origin: right center;

        -webkit-transform:rotate(180deg);
        -webkit-transform-origin: right center;

        -o-transform:rotate(180deg);
        -o-transform-origin: right center;
    }

    .progress{
        transition: All 100ms ease-in-out;
        -webkit-transition: All 100ms ease-in-out;
        -moz-transition: All 100ms ease-in-out;
        -o-transition: All 100ms ease-in-out;
    }
</style>
