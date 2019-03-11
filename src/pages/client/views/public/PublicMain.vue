<!--公共模块的主页面-->
<template>
    <el-scrollbar :native="false" :noresize="true" class="c-scrollbar"
                  :style="$store.state.config.home.style.main">
        <el-container style="margin: auto;min-height: 100%" v-if="show">
            <div :style="$store.state.config.home.style.huge" v-if="$store.state.config.home.showHuge">

            </div>
            <el-header style="padding: 0">
                <top-bar></top-bar>
            </el-header>
            <el-main style="padding: 0;margin: 10px auto" class="main-content">
                <router-view></router-view>
            </el-main>
            <Footer></Footer>
        </el-container>
    </el-scrollbar>
</template>

<script>
  import TopBar from "../../../../components/layout/public/TopBar";
  import Footer from "../../../../components/layout/public/Footer";

  export default {
    name: "publicMain",
    components: {Footer, TopBar},
    data(){
      return {
        show:false
      }
    },
    created(){
      this.$http.get("public/config/home").then(res=>{
        this.$store.commit("config/commitHome",res.data);
        this.show = true;
      }).catch(reason => {
        this.show = false;
      });
    }
  }
</script>

<style scoped>
    .main-content{
        width: 100%;
        padding: 0;
        height: 100%;
        overflow: hidden;
    }
</style>
