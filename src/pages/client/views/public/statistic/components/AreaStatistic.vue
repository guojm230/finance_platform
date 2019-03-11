<template>
    <section>
        <el-table
                :data="tableData"
                :style="{marginTop:'20px'}"
                :show-summary="true"
        >
            <el-table-column prop="name" align="center" label="地区"></el-table-column>
            <el-table-column prop="registerCompanyCount" align="center" label="注册认证企业数量"></el-table-column>
            <el-table-column align="center"  label="融资需求情况">
                <el-table-column prop="demandCount" align="center" label="需求数量"></el-table-column>
                <el-table-column prop="demandMoney" align="center" label="需求金额(万元)"></el-table-column>
            </el-table-column>
            <el-table-column align="center"  label="融资完成情况">
                <el-table-column prop="demandSuccessCount" align="center" label="放款户数"></el-table-column>
                <el-table-column prop="demandSuccessMoney" align="center" label="放款金额(万元)"></el-table-column>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
  export default {
    name: "AreaStatistic",
    data(){
      return {
        tableData:[]
      }
    },
    methods:{
      loadData(){
        this.$http.get("public/statistic",{
          params:{
            type:1,
            pcode:410000
          }
        }).then(res=>{
          this.tableData = res.data;
        })
      }
    },
    mounted(){
      this.loadData();
    }
  }
</script>

<style scoped>

</style>
