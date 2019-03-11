<template>
    <section class="container">
        <el-card
            shadow="never"
            v-for="item in types" :key="item"
        >
            <div slot="header">
                <h3 class="item-card-title" style="margin: 0">{{item}}</h3>
            </div>
            <el-row :gutter="20">
                <el-col :span="6" v-for="ins in groupByType.get(item)" :key="ins.id" align="center"
                        style="margin-bottom: 15px">
                    <img class="ins-img" :src="ins.brandPath"/>
                </el-col>
            </el-row>
        </el-card>
    </section>
</template>

<script>
  import {resolveStaticPath} from "../../../../global/utils"

  export default {
    name: "Institution",
    data:function () {
      return {
        institutions:[],
        groupByType:new Map(),
        types:[]
      }
    },
    methods:{
      loadData(){
        this.$http.get("public/institutions").then(res=>{
          this.institutions = res.data;
          this.institutions.forEach(ins=>
            ins.brandPath = resolveStaticPath(ins.brandPath)
          );
          this.initData();
        })
      },
      //按照类型分类
      initData(){
        this.institutions.forEach(ins=>{
          let institutions = this.groupByType.get(ins.type);
          if (institutions){
            institutions.push(ins);
          } else {
            this.groupByType.set(ins.type,[ins]);
          }
        });
        this.types = this.groupByType.keys();
      }
    },
    mounted: function () {
      this.loadData();
    }
  }
</script>

<style scoped>

</style>
