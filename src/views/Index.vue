<template>
  <div>
    <el-container>
      <el-menu
        :default-active="$route.path"
        unique-opened
        collapse
        router
        class="el-menu-demo"
        text-color="#303133"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-cpu"></i>
          </template>
          <el-menu-item-group>
            <span slot="title">仪表盘</span>
            <el-menu-item index="/index">
              <i class="menu-item-icon el-icon-minus"></i>仪表盘
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-office-building"></i>
          </template>
          <el-menu-item-group>
            <span slot="title">项目管理</span>
            <el-menu-item index="/projects">
              <i class="menu-item-icon el-icon-minus"></i>项目管理
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-user"></i>
          </template>
          <el-menu-item-group>
            <span slot="title">普通用户</span>
            <el-menu-item index="/users">
              <i class="menu-item-icon el-icon-minus"></i>用户列表
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <span slot="title">管理员</span>
            <el-menu-item index="/admins">
              <i class="menu-item-icon el-icon-minus"></i>管理员列表
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-menu"></i>
          </template>
          <el-menu-item-group>
            <span slot="title">轮播管理</span>
            <el-menu-item index="/bannerlist">
              <i class="menu-item-icon el-icon-minus"></i>轮播列表
            </el-menu-item>
            <el-menu-item index="/banneradd">
              <i class="menu-item-icon el-icon-minus"></i>新增轮播
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <span slot="title">通告管理</span>
            <el-menu-item index="/postlist">
              <i class="menu-item-icon el-icon-minus"></i>通告列表
            </el-menu-item>
            <el-menu-item index="/createpost">
              <i class="menu-item-icon el-icon-minus"></i>新增通告
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <span slot="title">相关链接</span>
            <el-menu-item index="/links">
              <i class="menu-item-icon el-icon-minus"></i>链接列表
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-chat-dot-square"></i>
          </template>
          <el-menu-item-group>
            <span slot="title">消息中心</span>
            <el-menu-item index="/messages">
              <i class="menu-item-icon el-icon-minus"></i>消息中心
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>

      <el-main>
        <!-- <el-header style="text-align: right; font-size: 14px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 16px">&nbsp;关于我</i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click="toMyCenter">设置</span></el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>-->

        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$message({
        message: "再见!",
        type: "success",
        center: true
      });
      return;
    }
  }
};
</script>

<style>
.el-aside {
  background-color: rgb(238, 241, 246);
}
.el-main {
  height: 100vh;
}
</style>