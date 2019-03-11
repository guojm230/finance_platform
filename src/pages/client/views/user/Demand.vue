<template>
    <section class="p-wrapper container">
        <el-card
            shadow="never"
            class="item-card"
        >
            <div slot="header" style="border-bottom: 0;padding: 0">
                <h4 class="item-card-title">我的需求</h4>
            </div>

            <el-tabs v-model="filterValue.status" @tab-click="handleClick">
                <el-tab-pane label="申请中" name="0"></el-tab-pane>
                <el-tab-pane label="全部" name="-2"></el-tab-pane>
                <el-tab-pane label="成功" name="1"></el-tab-pane>
                <el-tab-pane label="失败" name="-1"></el-tab-pane>
            </el-tabs>
            <el-table
                :data="applyList"
            >
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="right" inline class="demo-table-expand">
                            <el-form-item label="申请编号:">
                                <span>{{ props.row.id}}</span>
                            </el-form-item>
                            <el-form-item label="商品名称:">
                                <span>
                                    <router-link :to="{name:'UserProductDetail',params: {id: props.row.productId}}">
                                        {{ props.row.productName }}
                                    </router-link>
                                </span>
                            </el-form-item>
                            <el-form-item label="申请时间:">
                                <span>{{ props.row.applyTime }}</span>
                            </el-form-item>
                            <el-form-item label="申请状态:">
                                <span>{{ props.row.status }}</span>
                            </el-form-item>
                            <el-form-item label="消息:">
                                <span>{{ props.row.message }}</span>
                            </el-form-item>
                        </el-form>
                    </template>

                </el-table-column>
                <el-table-column label="序号" type="index" width="50px"></el-table-column>
                <el-table-column label="商品名称" prop="productName"></el-table-column>
                <el-table-column label="申请时间" prop="applyTime"></el-table-column>
                <el-table-column label="申请状态" prop="status"></el-table-column>
                <!--<el-table-column label="操作" >-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button type="primary" size="small">详情</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
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
</template>

<script>
  export default {
    name: "Demand",
    data: function(){
      return{
        defaultActive:"0",
        applyList: [],
        filterValue:{
          applierId:this.$sec.getAccountInfo().accountId,
          status: 0,
          pageNum: 0,
          pageSize: 10,
          total: 0
        }
      }
    },
    methods: {
      loadData(){
        this.$http.get("products/applies",{
          params: this.filterValue
        }).then(res=>{
          this.applyList = res.data.content;

          this.filterValue.total = res.data.totalElements;
        })
      },
      handleClick(){
        this.loadData();
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
      this.loadData();
    }
  }
</script>

<style scoped>

.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>
