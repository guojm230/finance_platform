<template>
    <el-row :style="config.style.topBar" style="padding: 0 50px">
        <el-col :span="20">
            <el-menu :default-active="this.$route.path"
                     mode="horizontal"
                     style="border-bottom: 0"
                     :background-color="config.style.topBar.backgroundColor"
                     :text-color="config.style.topBar.color"
                     :active-text-color="config.style.topBar.activeColor"
                     router>
                <el-col :span="4" class="brand">
                    <img src="@/assets/images/logo.png" class="brand-img"/>
                </el-col>
                <el-menu-item index="/index">首页</el-menu-item>
                <el-menu-item index="/products">金融产品</el-menu-item>
                <el-menu-item index="/news">新闻中心</el-menu-item>
                <el-menu-item index="/policies">政策指南</el-menu-item>
                <el-menu-item index="/examples">服务案例</el-menu-item>
                <el-menu-item index="/institutions">合作机构</el-menu-item>
                <el-menu-item index="/about">关于我们</el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="4">
            <el-menu
                    :default-active="this.$route.path"
                    mode="horizontal"
                    style="border-bottom: 0;float: right"
                    @select="onSelectLoginMenu"
            >
                <template v-if="this.$sec.isAuthenticated()">
                    <el-submenu
                            index="loged-menu"
                            :title="name"
                            style="float: right"
                    >
                        <template slot="title">{{name}}</template>
                        <el-menu-item index="logout">退出</el-menu-item>
                    </el-submenu>
                </template>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
  export default {
    name: "TopBar",
    data: function () {
      return {
        activeIndex:"1",
      }
    },
    computed:{
      name(){
        let accountInfo = this.$sec.getAccountInfo();
        return accountInfo.name ? accountInfo.name : accountInfo.username;
      },
      config(){
        return this.$store.state.config.home;
      }
    },
    methods:{
      onSelectLoginMenu(index){
        switch (index) {
          case "login":
            this.$router.push({name:"Login"});
            break;
          case "sign-up":
            this.$router.push({name:"SignUp"});
            break;
          case "user":
            this.$router.push({name:"UserMain"});
            break;
          case "logout":
            this.$sec.logout();
            this.$router.go(0);
            break;
        }
      }
    }
  }
</script>

