<template>
    <section>
        <el-row
            :gutter="20"
        >
            <el-col :span="17">
                <header>
                    <h3 style="font-weight: 400;font-size: 1.3rem">新闻资讯</h3>
                </header>
                <el-card
                        shadow="hover"
                        class="item-card news-card"
                        body-style="padding:0;"
                        v-for="n in news"
                        :key="n.id"
                >
                    <div
                            class="news-photo"
                            style="max-width: 300px"
                            :style="{
                            backgroundImage:
                            'url(' + (n.titlePhotoPath ? n.titlePhotoPath : require('@/assets/images/news_finacing.jpg')) + ')',
                        }"
                    >
                    </div>
                    <div
                            class="news-content"
                    >
                        <header class="header">
                            <h4 style="margin-top: 0;display: inline-block;font-size: 1.3rem">{{n.title}}</h4>
                            <span style="font-size: .8rem;margin-left: 10px"
                                  class="text-muted">{{n.createTime}}</span>
                        </header>
                        <div class="summary" style="margin:-1rem 0 0 0;font-size: 14px" v-html="n.content">

                        </div>
                        <div class="footer">
                            <el-button plain type="danger" @click="toDetail(n.id)" size="mini">了解更多</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <!--热门新闻吧-->
            <el-col :span="7">
                <header>
                    <h3 style="font-weight: 400;font-size: 1.3rem">热门新闻</h3>
                </header>
                <router-link
                        :to="'/article/'+h.id"
                        :key="h.id"
                        v-for="h in hotNews"
                        style="text-decoration: none;"
                >
                    <el-card
                            shadow="hover"
                            class="item-card"
                            :body-style="{padding:0}"

                    >
                        <div style="background-size: 100% 100%;background-repeat: no-repeat;height: 200px" :style="{
                            backgroundImage: 'url(' + (h.titlePhotoPath ? h.titlePhotoPath : require('@/assets/images/news_finacing.jpg')) + ')',
                        }">
                        </div>
                        <div style="
                        text-align: center;padding: 10px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis">
                            <span style="font-weight: bold;color: #007bff">{{h.title}}</span>
                        </div>
                    </el-card>
                </router-link>

            </el-col>

        </el-row>

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
  import {resolveStaticPath} from "@/global/utils";
  import {articleUtil as autil} from "@/global/utils";

  export default {
    name: "news",
    data(){
      return {
        news:[],
        hotNews:[],
        filterValue:{
          pageNum:0,
          pageSize:10,
          total:0
        }
      }
    },
    methods:{
      loadData(){
        this.$http.get("public/news",{
          params: this.filterValue
        }).then(res=>{
          this.filterValue.total = res.data.totalElements;
          let news = res.data.content;
          news.forEach(n=>{
            if (n.titlePhotoPath){
              n.titlePhotoPath = resolveStaticPath(n.titlePhotoPath);
            }
            n.content = autil.resolveSimpleContent(n.content);
          });
          this.news = news;
        });
      },
      loadHotNews(){
        this.$http.get("public/hot-news").then(res=>{
          let hotNews = res.data;
          hotNews.forEach(n=>{
            if (n.titlePhotoPath){
              n.titlePhotoPath = resolveStaticPath(n.titlePhotoPath);
            }
            n.content = autil.resolveSimpleContent(n.content);
          });
          this.hotNews = hotNews;
        });
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
      },
      toDetail(id){
        this.$router.push('/article/'+id);
      }
    },
    mounted(){
      this.loadData();
      this.loadHotNews();
    }
  }
</script>

<style scoped>
    .news-content{
        height: 170px;
        padding: 10px;
        width: 70%;
        display: inline-block;
        position: relative;
        vertical-align: top;
    }

    .news-photo{
        background-size: 100% 100% !important;
        background-repeat: no-repeat;
        vertical-align: top;
        width: 30%;
        position: relative;
        max-width: 300px;
        height: 170px;
        display: inline-block;
    }


    .news-card{
        height: 170px;
        position: relative;
    }

    .news-content .footer{
        text-align: right;
        padding: 10px;
        width: 100%;
        border-top: #f0f9eb solid 1px;
        position: absolute;
        right: 10px;
        bottom: 0;
    }

    .news-content .summary{
        overflow: hidden;
        text-overflow:ellipsis;
        /*height: 5rem;*/
        display: -webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:3;
    }

    .news-summary{
        width: 100%;
    }

    *{
        box-sizing: border-box;
    }
</style>
