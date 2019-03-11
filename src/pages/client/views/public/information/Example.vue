<template>
    <section class="container">
        <el-row
            :gutter="40"
        >
            <router-link
                    v-for="e in examples"
                    :to="'/article/'+e.id"
                    :key="e.id"
            >
                <el-col :span="8"
                >
                    <el-card
                            shadow="hover"
                            :body-style="{padding:'0px'}"
                    >
                        <div style="background-size: 100% 100%;background-repeat: no-repeat;height: 200px" :style="{
                            backgroundImage: 'url(' + (e.titlePhotoPath ? e.titlePhotoPath : require('@/assets/images/news_finacing.jpg')) + ')',
                        }">
                        </div>
                        <div style="padding: 10px">
                            <div>
                                <h4 style="margin: 0">{{e.title}}</h4>
                            </div>
                            <div v-html="e.content" style="margin-top: 10px">
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </router-link>
        </el-row>
    </section>
</template>

<script>
  import {resolveStaticPath} from "@/global/utils";
  import {articleUtil as autil} from "@/global/utils";

  export default {
    name: "Example",
    data(){
      return {
        examples:[]
      }
    },
    methods:{
      loadData(){
        this.$http.get("public/news?type=example").then(res => {
          let examples = res.data.content;
          examples.forEach(n => {
            if (n.titlePhotoPath) {
              n.titlePhotoPath = resolveStaticPath(n.titlePhotoPath);
            }
            n.content = autil.resolveSimpleContent(n.content,Math.random() * 50 + 100);
          });
          this.examples = examples;
        });
      }
    },
    mounted:function () {
      this.loadData();
    }
  }
</script>

<style scoped>

</style>
