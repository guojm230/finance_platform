<template>
    <section class="container p-wrapper">
        <el-card
            shadow="never"
            style="margin-bottom: 20px"
            v-if="showInfoHeader"
        >
            <el-row class="info-table basic-info">
                <el-row class="list-item">
                    <el-col :span="4" class="">
                        <span>索引号：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{article.indexNumber ? article.indexNumber : '-'}}
                    </el-col>
                    <el-col :span="4" class=" ">
                        <span>主题分类：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{article.levelType ? article.levelType : '-'}}
                    </el-col>
                </el-row>
                <el-row class="list-item" >
                    <el-col :span="4" class="">
                        <span>发文机关：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{article.issueOrganization ? article.issueOrganization : '-'}}
                    </el-col>
                    <el-col :span="4" class=" ">
                        <span>成文日期：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{article.createTime ? article.createTime : '-'}}
                    </el-col>
                </el-row>
                <el-row class="list-item" >
                    <el-col :span="4" class="">
                        <span>发文字号：</span>
                    </el-col>
                    <el-col :span="8" class="">
                        {{article.issuedNumber ? article.issuedNumber : '-'}}
                    </el-col>
                    <el-col :span="4">
                        <span>主题词:：</span>
                    </el-col>
                    <el-col :span="8">
                        {{article.subjectWords ? article.subjectWords : '-'}}
                    </el-col>
                </el-row>
            </el-row>
        </el-card>
        <el-card
            shadow="never"
            class="no-padding-card"
        >
            <header style="border-bottom: 1px solid rgba(0, 0, 0, 0.125);padding-bottom: 5px">
                <div style="text-align: center">
                    <h2>{{article.title}}</h2>
                </div>
                <span style="font-size: .8rem">发布日期:</span>
                <span style="font-size: .8rem;margin-left: 5px">{{article.createTime}}</span>
            </header>

            <article class="content" v-html="article.content" style="margin-top: 20px">
            </article>
        </el-card>
    </section>
</template>

<script>

  import {articleUtil as autil} from "@/global/utils";

  export default {
    name: "ArticleDetail",
    data:function () {
      return {
        article: {},
      }
    },
    methods:{
      loadData(){
        const type =  this.$route.query.type;
        const id = this.$route.params.id;
        let url = "public/" + (type === 'policy' ? 'policies/' : 'news/')+id;
        this.$http.get(url).then(res=>{
          let article = res.data;
          article.content = autil.resolveContent(article.content);
          this.article = article;
        })
      }
    },
    computed:{
      showInfoHeader(){
        return this.$route.query.type === 'policy'
      }
    },
    mounted(){
      this.loadData();
    }
  }
</script>

<style scoped>
    .basic-info{
        font-size: 12px;
    }

    .info-table {
        padding:5px 0 !important;
        margin-bottom: 0 !important;
    }

    .list-item{
        margin-bottom: 0 !important;
        padding: 5px;
    }
</style>
