<template>
    <el-aside width="220px" style="margin-top: 20px">
        <el-scrollbar :native="false"
                      :noresize="true"
                      class="c-scrollbar"
        >
            <el-menu
                    :default-active="this.$route.path"
                    router
            >
                <!--<el-menu-item-group>-->
                    <!--<template slot="title">消息</template>-->
                    <!--<el-menu-item index="/user/message">-->
                        <!--<i class="iconfont icon-message_fill_light menu-icon"></i>-->
                        <!--<span slot="title">消息中心</span>-->
                    <!--</el-menu-item>-->
                <!--</el-menu-item-group>-->
                <el-menu-item-group>
                    <template slot="title">业务</template>
                    <el-menu-item index="/user/demand">
                        <i class="iconfont icon-news_light menu-icon"></i>
                        <span slot="title">我的需求</span>
                    </el-menu-item>
                    <el-menu-item index="/user/products">
                        <i class="iconfont icon-goods_new_light menu-icon"></i>
                        <span slot="title">金融产品</span>
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <template slot="title">信息</template>
                    <el-menu-item index="/user/verify">
                        <i class="iconfont icon-qi menu-icon"></i>
                        <span slot="title">用户认证</span>
                    </el-menu-item>
                    <el-menu-item index="/user/company">
                        <i class="iconfont icon-qi menu-icon"></i>
                        <span slot="title">企业信息</span>
                    </el-menu-item>
                    <el-menu-item index="/user/profile">
                        <i class="iconfont icon-settings_light menu-icon"></i>
                        <span slot="title">个人信息</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-menu>
        </el-scrollbar>
    </el-aside>

</template>

<script>
  export default {
    name: "AsideMenu"
  }
</script>

<style scoped>

</style>
