<template>
    <section class="container p-wrapper">

        <header style="margin-bottom: 20px">

            <el-carousel type="card" height="200px"
                         indicator-position="none"
                         arrow="hover"
                         :autoplay="false"
                         @change="switchItem"
            >
                <el-carousel-item>
                    <el-col align="center">
                        <el-card
                                shadow="hover"
                                style="width: 250px;height: 170px"
                                :body-style="{padding:'5px'}"
                        >
                            <img src="@/assets/images/policy_country.jpg" style="width: 240px;height: 160px"/>
                            <div class="level">
                                <span style="color: #f2f2f2;font-size: 1.3rem">国家相关政策</span>
                            </div>
                        </el-card>
                    </el-col>

                </el-carousel-item>
                <el-carousel-item>
                    <el-col align="center">
                        <el-card
                                shadow="hover"
                                style="width: 250px;height: 170px"
                                :body-style="{padding:'5px'}"
                        >
                            <img src="@/assets/images/policy_province.jpg" style="width: 240px;height: 160px"/>
                            <div class="level"
                            >
                                <span style="color: #f2f2f2;font-size: 1.3rem">省相关政策</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-carousel-item>
                <el-carousel-item>
                    <el-col align="center">
                        <el-card
                                shadow="hover"
                                style="width: 250px;height: 170px"
                                :body-style="{padding:'5px'}"
                        >
                            <img src="@/assets/images/policy_city.jpg" style="width: 240px;height: 160px"/>
                            <div class="level"
                            >
                                <span style="color: #f2f2f2;font-size: 1.3rem">市相关政策</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-carousel-item>
            </el-carousel>
        </header>

        <el-card
            shadow="never"
        >
            <ul style="min-height: 130px;margin-bottom: 20px"
                class="articles"
            >
                <li v-for="n in showList" :key="n.id" class="item" style="height: 130px;">
                    <router-link :to="'/article/'+n.id+'?type=policy'" style="display: block">
                        <div style="text-align: center;width: 15%;
                        display: inline-block;
                        height: 100%;
                        vertical-align: top;
                        padding: 20px 0;"
                        >
                            <h4 style="margin: 0;font-size: 1rem" class="text-muted">2019-05</h4>
                            <h2 style="margin: 30px 0 0 0;font-weight: 400;font-size: 2rem">12</h2>
                        </div>
                        <div
                                style="display: inline-block;height: 100%;margin-left: 5px;vertical-align: top;width:20%;"
                        >
                            <img v-if="n.titlePhotoPath" :src="n.titlePhotoPath"
                                 style="width: 200px;height: 130px;display: block"/>
                            <img v-else src="@/assets/images/news_finacing.jpg"
                                 style="width: 200px;height: 100%;display: block"/>
                        </div>
                        <div
                                style="display: inline-block;height: 100%;margin-left: 20px;vertical-align: top;width: 60%"
                        >
                            <div>
                                <h4 style="margin: 0;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{n.title}}</h4>
                            </div>
                            <div class="content" v-html="n.content">
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </el-card>
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
    </section>
</template>

<script>
  import {articleUtil as autil} from "@/global/utils";

  export default {
    name: "Policy",
    data(){
      return {
        showList:[],
        types:['country','province','city'],
        filterValue:{
          level:'country',
          pageNum:0,
          pageSize:10,
          total:0
        }
      }
    },
    methods:{
      loadData(){
        this.$http.get("public/policies",{
          params: this.filterValue
        }).then(res=>{
          this.filterValue.total = res.data.totalElements;
          let pList = res.data.content;

          pList.forEach(p=>{
            p.content = autil.resolveSimpleContent(p.content);
          });

          this.showList = pList;
        })
      },
      switchItem(index){
        this.filterValue.level = this.types[index];
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
    }
  }
</script>

<style scoped>
    .level{
        position: absolute;bottom: 10px;
        width: 230px;
        background-color: #fd5e39;
        opacity: 0.9;
        margin: 0 5px;
        text-align: center
    }

    .list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to
        /* .list-leave-active for below version 2.1.8 */ {
        opacity: 0;
        transform: translateX(30px);
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

    .item .content{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:4;
    }

</style>
