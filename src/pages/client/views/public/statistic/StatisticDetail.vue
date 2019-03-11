<template>
    <section class="p-wrapper container">
        <el-card
            shadow="never"
        >
            <header>
                <el-tabs v-model="activeName"
                    shadow="never"
                    :stretch="true"
                >
                    <el-tab-pane v-for="item in allItems"
                                 :key="item.value"
                                 :label="item.name"
                                 :name="item.value"
                    ></el-tab-pane>
                    <el-tab-pane :lazy="true" label="地区" name="area">
                        <area-statistic></area-statistic>
                    </el-tab-pane>
                </el-tabs>
            </header>

            <section>
                <a-map v-show="showMap" :types="types" :item="item"></a-map>
            </section>
        </el-card>
    </section>
</template>

<script>
  import AMap from "./components/AMap";
  import AreaStatistic from "./components/AreaStatistic";

  const type1 = {name: '地区',value:1};
  const type2 = {name: '行业',value:2};
  const type3 = {name: '担保',value:3};

  export default {
    name: "StatisticDetail",
    components: {AreaStatistic, AMap},
    data:function () {
      return {
        activeName:'registerCompanyCount',
        allTypes:{
          registerCompanyCount: [type1,type2],
          demandCount:[type1,type2],
          demandMoney:[type1,type2,type3],
          demandSuccessCount:[type1,type2,type3],
          demandSuccessMoney:[type1,type2,type3]
        },
        allItems: [
          {
            name: "注册企业认证",
            value: "registerCompanyCount",
            toolPrefix:'拥有',
            toolSuffix:'家企业'
          },
          {
            name: "需求数量",
            value: "demandCount",
            toolPrefix:'',
            toolSuffix:'项'
          },
          {
            name: "需求金额",
            value: "demandMoney",
            toolPrefix:'',
            toolSuffix:'万元'
          },
          {
            name: "需求完成数量",
            value: "demandSuccessCount",
            toolPrefix:'',
            toolSuffix:'项'
          },
          {
            name: "需求完成金额",
            value: "demandSuccessMoney",
            toolPrefix:'',
            toolSuffix:'万元'
          }
        ]
      }
    },
    computed:{
      types(){
        return this.allTypes[this.activeName]
      },
      item(){
        return this.allItems.find(item =>  item.value === this.activeName)
      },
      showMap(){
        return this.activeName !== 'area';
      }
    },
    methods:{

    },
    mounted(){
      let type = this.$route.params.type;
      if (type){
        this.activeName = type;
      }
    }
  }
</script>

<style scoped>

</style>
